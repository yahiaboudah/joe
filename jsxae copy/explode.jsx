
MATCH_NAMES = 
{
    // GRAPHIC PROPERTIES
    stroke: "ADBE Vector Graphic - Stroke",
    fill  : "ADBE Vector Graphic - Fill",

    // TRANSFORM
    transform: "ADBE Vector Transform Group",

    // SHAPES
    rect: "ADBE Vector Shape - Rect",
    ellipse: "ADBE Vector Shape - Ellipse",
    star: "ADBE Vector Shape - Star",

    // FILTER
    merge: "ADBE Vector Filter - Merge",

    // GROUP:
    group: "ADBE Root Vectors Group",
    pathGroup: 'ADBE Vectors Group',
    path: "'ADBE Vector Group'"
}

PROPS = 
{
    stroke    : ["composite", "color", "strokeWidth", "lineCap", "lineJoin", "miterLimit"],
    fill      : ["composite", "fillRule", "color"],
    transform : ["anchorPoint", "position", "scale", "skew", "skewAxis", "rotation", "opacity"],
    rect      : ["shapeDirection", "size", "position", "roundness"],
    ellipse   : ["shapeDirection", "size", "position"],
    star      : ["shapeDirection, type", "points", "position", "rotation", 
                "innerRadius", "outerRadius", "innerRoundness", "outerRoundness"
                ]    
}

function explodeLayer(layer) 
{
    var layers   = [], newLayer,
        allProps = layer.contents.properties();

    // Loop through contents:
    allProps.forEach(function(_prop, idx)
    {
        if(!_prop.enabled) return;

        newLayer = layer.clone({

            name    : "{0} - {1}".f(layer.name, _prop.name),
            enabled : false,
            shy     : true
        });

        copyProperties
        (
            _prop, 
            newLayer.contents.addProperty(_prop.matchName)
        )

        layers.push(newLayer);
    })

    layers.forEach(function(layer){
        layer.enabled = true;
        layer.shy     = false;
    })

    return layers;
}

function cloneLayer(layer) 
{
    var newLayer = layer.containingComp.layers.addShape();
    // single argument function, no index or array usage.
    PROPS.transform.forEach(AVLayer.prototype.copy.bind(layer, [undefined/*prop*/, newLayer]));

    return newLayer;
}

function copyProperties(origin, target) 
{
    var copyProp = function()
    {
        this.target[this.origin].setValue(this.origin[this.origin].value);
    }

    origin.properties().forEach(function(_prop){
        
        if(!(_prop.enabled && target.canAddProperty(_prop.matchName))) return;
        
        var prop = target.addProperty(_prop.matchName);

        //------------------------------------------------

        switch (_prop.matchName) 
        {

            case MATCH_NAMES.merge:
                prop["mode"].setValue(_prop["mode"].value);
                return;

            case MATCH_NAMES.blendMode:
                prop.setValue(_prop.value);
                return;

            case MATCH_NAMES.shapeGroup:
                prop.property(MATCH_NAMES.shape)
                    .setValue(_prop.property(MATCH_NAMES.shape).value);
                return;

            case MATCH_NAMES.group:
            case MATCH_NAMES.pathGroup:
            case MATCH_NAMES.path:
                copyProperties(_prop, prop);
                return;
        }

        //------------------------------------------------
        
        var __propsList = PROPS[Object.getKeyByValue(MATCH_NAMES, _prop.matchName)];
        if(!__propsList) return;

        __propsList.forEach(copyProp, {origin: _prop, target:prop})
    })
}
(function createWindow(){

    w = new Window("palette", "EXPLODE SHAPE!");
    b = w.add("iconbutton", undefined, "/d/media/explode.png");
    b.text = "EXPLODE!";
    b.onClick = function explode()
    {
        // Check if multiple layers selected
        var comp   = app.project.activeItem,
            layers = comp.sel(ShapeLayer),
            layer  = layers[0];
        
        if(layer.is(undefined))       throw Error("Select at least 1 Shape Layer!");
        if(layers[1].isnt(undefined)) throw Error("Select Only 1 Shape Layer!");
    
        app.wrapUndo(
    
            ShapeLayer.prototype.explode,
            layer
        )();
    };

    return w;

})().show();