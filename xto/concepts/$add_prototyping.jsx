
// function codebox(c){

//   c.layers.$add("text", {text: codeStr}, {
    
//     style: 
//     {
//       size: 45,
//       font: "DejaVuSansMono",
//       color: [0,0,0],
//       position: [ src.left+50,src.top+55 ],
//     },
//     parent: box
//   });

//   c.layers.$add("shape", {}, {

//     groups: [
//     // GROUPS
//       {
//         name: "rect",
//         children: [
//           {
//             type: "rectangle",
//             name: "myRect1",
//             fill: {color: [1,1,1,1], param: 0}
//           }
//         ]
//       }
//     // GROUPS
//     ]
    
//   })
// }

//@include "../src/xto.jsx"
xto.load("PRIM/Object");
xto.load("$$$$/Debg");
xto.load("AFFX/ShapeLayer");
xto.load("AFFX/Layer");
xto.load("AFFX/CompItem");
xto.load("AFFX/LayerCollection");



var K = {
    name: "myshape",
    children: [
        {
            matchName: "ADBE Vector Group",
            name: "plot",
            transform: {
                anchorPoint: [],
                position: [],
                scale: [],
                rotation: 0,
                opacity: 0,
            },
            children: [
                {
                    matchName: "ADBE Vector Shape - Group",
                    name: "mypath"
                },

                {
                    matchName: "ADBE Vector Group",
                    name: "hello nested",
                    children: [
                        {
                            matchName: "ADBE Vector Graphic - Stroke",
                            name: "special nested stroke",
                        }
                    ]
                }
            ]
        },

        {
            matchName: "ADBE Vector Graphic - Stroke",
            name: "customStroke",
            opacity: 55,
            "wave/amount": 98
        }
    ]
}

var dd = 
{
    // ADBE Vector Group
    "Root": [
        "transform/anchorPoint",
        "transform/position",
        "transform/scale",
        "transform/rotation",
        "transform/opacity",
        "transform/skew",
        "transform/skewAxis",
    ],

    // ADBE Vector Filter - Name
    "RC": ["Radius"],
    "Zigzag": ["size", "ridgesPerSegment", "points"],
    "Twist": ["angle", "center"],
    "Merge": ["mode"],
    "Offset": ["amount", "lineJoin", "miterLimit", "copies", "copyOffset"],
    "PB": ["amount"],
    "Repeater": [
        "copies", "offset", "composite",
        "transform/anchorPoint",
        "transform/position",
        "transform/scale",
        "transform/rotation",
        "transform/startOpacity",
        "transform/endOpacity"
    ],
    "Trim": [
        "start", "end", "offset", "trimMultipleShapes"
    ],
    
    "Roughen": [
        "size", "detail", "points", "wigglesPerSecond", "correlation",
        "temporalPhase", "spatialPhase", "randomSeed"
    ],

    "Wiggler": [
        "wigglesPerSecond", "correlation", "temporalPhase", "spatialPhase",
        "randomSeed",

        "transform/anchorPoint",
        "transform/position",
        "transform/scale",
        "transform/rotation"
    ],

    // ADBE Vector Graphic - Name
    "Stroke": 
    [
        "composite", "color", "opacity",
        "strokeWidth", "lineCap", "lineJoin",
        "miterLimit", "Dashes",
        
        "Dashes/offset",
        "Dashes/dash#",
        "Dashes/gap#",

        "taper/startLength",
        "taper/endLength",
        "taper/startWidth",
        "taper/endWidth",
        "taper/startEase",
        "taper/endEase",
        "wave/amount",
        "wave/units",
        "wave/wavelength",
        "wave/phase",
    ],
    "GradientStroke": 
    [
        "composite", "colors", "opacity",
        "type", "startPoint", "endPoint",
        "strokeWidth", "lineCap", "lineJoin",
        "miterLimit", "Dashes",
        
        "Dashes/offset",
        "Dashes/dash#",
        "Dashes/gap#",

        "taper/startLength",
        "taper/endLength",
        "taper/startWidth",
        "taper/endWidth",
        "taper/startEase",
        "taper/endEase",
        "wave/amount",
        "wave/units",
        "wave/wavelength",
        "wave/phase",
    ],
    "Fill": [
        "composite", "fillRule", "color", "opacity"
    ],
    "GradientFill": [
        "composite", "fillRule", "type", "startPoint", "endPoint",
        "colors", "opacity"
    ],

    // ADBE Vector Shape - Name
    "Rectangle": [
        "size", "position", "roundness"
    ],
    "Ellipse": [
        "size", "position"
    ],
    "PolyStar": [
        "type", "points", "position", "rotation", "innerRadius",
        "outerRadius", "innerRoundness", "outerRoundness"
    ],
    "Group":[
        "path"
    ]
}

ShapeLayer.fromAEObject = function fromAEObject(oo)
{
    var comp = app.project.activeItem;
    var S = comp.layers.addShape();
    S.name = oo.name;
    
    function make(S, oo)
    {
        var ch = oo.children, i= -1;
        var p;
        var mn;
        while(++i<ch.length)
        {
            // If matchName is invalid: continue:
            if(!S.content.canAddProperty(ch[i].matchName)) continue;

            // Otherwise: add Element
            p = S.content.addProperty(ch[i].matchName);

            // Give external values (name/shy/etc..)
            p.name = ch[i].name;

            // If element is a group: recursively do the same for its children:
            if(ch[i].matchName == "ADBE Vector Group"){
                make(p, ch[i]);
                continue;
            }
            
            // Otherwise: get down to biz

            // Get the matchName name:
            mn = ch[i].matchName.split('-')[1].replace(/\s+/, ''); // => 
            
            // get a values Object based on a template and the values supplied:
            valuesObj = Object.adapt(ch[i], Object.fromKeys(dd[mn]));
            
            // Populate internal values:
            var vs;
            for(var v in valuesObj) if(v.in(valuesObj))
            {
                // set value here:
                if((vs = v.split('/')).length > 1)
                {
                    if(vs[1].indexOf('#') > -1) vs[1] = vs[1].replace('#', '');
                    var canYou = p[vs[0]][vs[1]].canSetExpression;
                    if(!canYou) continue;

                    p[vs[0]][vs[1]].setValue(valuesObj[v]);
                    continue;
                }
                if(!!valuesObj[v]) p[v].setValue(valuesObj[v]);
            }
        }
    }

    make(S, oo);
    return S;
}

var s = ShapeLayer.fromAEObject(K);
$.writeln(s.name);
