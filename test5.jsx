//@include "src/xto.jsx"
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
                            name: "special nested stroke"
                        }
                    ]
                }
            ]
        },

        {
            matchName: "ADBE Vector Graphic - Stroke",
            name: "customStroke"
        }
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
        while(++i<ch.length)
        {
            if(!S.content.canAddProperty(ch[i].matchName)) continue;
            
            p = S.content.addProperty(ch[i].matchName)
            p.name = ch[i].name;

            if(ch[i].matchName == "ADBE Vector Group") make(p, ch[i]);
        }
    }

    make(S, oo);
    return S;
}

var s = ShapeLayer.fromAEObject(K);