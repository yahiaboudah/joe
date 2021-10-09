
//====================================================================================================================================
//====================================================================================================================================
//============================================ PROGRESS BAR ==========================================================================
function ProgressBar(min, max, current)
{
    var _window,
        _progressBar,
        _infos,
        _real,
        _cursor,
        _isVisible;

    this.testInfos = 'Processing element $current/$max';

    this.constructor = function(min, max, current)
    {
        _this = this;
        _isVisible = false;

        _real = { min : min, max : max, current : current };
        _cursor = { min : 0, max : 100, current : 0 };

        _cursor.max = (_real.max - _real.min) + 1;

        // Instanciate the window
        _window = new Window('palette', "configs.title", undefined, {
            resizeable : false,
            borderless : 'not quite true',
        });
        _window.preferredSize = [420, 40];

        // Instanciate the progress bar
        _progressBar = _window.add("progressbar", undefined, _cursor.min, _cursor.max);
        _progressBar.preferredSize.width = 400;
        _progressBar.show();

        // Instanciate text infos
        _infos = _window.add("statictext", undefined, 'Loading, please wait', {
            justify: 'center'
        });
        _infos.preferredSize = [400, 17];

        this.update(current);


        return this;

    }

    this.start = function () {
        _isVisible = true;
        this.update(_real.current)
        _window.show();
    }

    this.end = function () {
        _window.hide();
    }

    this.update = function(step) {

        _real.current = step;
        _cursor.current = (_real.current + 1) - _real.min;

        var infos = this.testInfos._replace({
            $current: _cursor.current,
            $max    : _cursor.max
        });

        _progressBar.value = _cursor.current;
        _infos.text = infos;

        updateGraphics();
    }

    function updateGraphics() {
        if(!_isVisible) return;
        _window.update();
    }

    return this.constructor(min, max, current);

}

// ====================================================================================================================================
// ====================================================================================================================================

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

    var pb = new ProgressBar(1, allProps.length, 1);
    pb.start();

    // Loop through contents:
    allProps.forEach(function(_prop, idx)
    {
        pb.update(idx);
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

    pb.end();

    layers.forEach(function(layer){
        layer.enabled = true;
        layer.shy     = false;
    })

    return layers;
}

function explode()
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
        
        var __propsList = PROPS[Object.getKeyByValue(MATCH_NAMES, _prop.matchName)];
        if(!__propsList) return;

        __propsList.forEach(copyProp, {origin: _prop, target:prop})
    })

    for(var i=1; i <= origin.numProperties; i++) 
    {

        switch (_prop.matchName) 
        {

            case 'ADBE Vector Filter - Merge':
            copyProperty('mode', _prop, prop)
            break;

            case 'ADBE Vector Blend Mode':
            prop.setValue( _prop.value );
            break;
            
            case 'ADBE Vector Shape - Group':
            copyPropertyShape(_prop, prop);
            break;

            case 'ADBE Root Vectors Group':
            case 'ADBE Vectors Group':
            case 'ADBE Vector Group':
            copyProperties(_prop, prop, prefix += '    ')
            break;

        }

    }

}

function copyPropertyShape(origin, target)
{
    target.property('ADBE Vector Shape').setValue( origin.property('ADBE Vector Shape').value );
}

(function createWindow(){

    w = new Window("palette", "EXPLODE SHAPE!");
    b = w.add("iconbutton", undefined, "/d/media/explode.png");;
    b.text = "EXPLODE!";
    b.onClick = explode;

    return w;

})().show();