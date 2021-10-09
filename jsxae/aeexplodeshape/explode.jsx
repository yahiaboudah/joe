
//====================================================================================================================================
//====================================================================================================================================
//============================================ PROGRESS BAR ==========================================================================
function ProgressBar(min, max, current) {

    var _window,
        _progressBar,
        _infos,
        _real,
        _cursor,
        _isVisible;

    this.testInfos = 'Processing element :current on :max';

    this.constructor = function(min, max, current) {

        _this = this;
        _isVisible = false;

        _real = { min : min, max : max, current : current };
        _cursor = { min : 0, max : 100, current : 0 };

        _cursor.max = (_real.max - _real.min) + 1;

        // Instanciate the window
        _window = new Window('palette', configs.title, undefined, {
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

        var infos = this.testInfos
        .replace(':current', _cursor.current)
        .replace(':max', _cursor.max);

        _progressBar.value = _cursor.current;
        _infos.text = infos;

        cDebug(infos);

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


function explodeLayer(layer) {

    cLog('Exploding layer : ' + layer.name);

    // Get the elements of the original shape layer
    var contents = layer.property("Contents");
    var layers = [];

    if(contents.numProperties > configs.itemAmountWarning) {

        var go = confirm(
            'You have more than ' + configs.itemAmountWarning + ' elements. '
            + 'Execution time might be long, are you sure you want to continue ?'
        );

        if(!go) return;

    }

    var pb = new ProgressBar(1, contents.numProperties, 1);
    pb.start();

    // Browse through contents array
    for(var i = contents.numProperties; i > 0; i--) {

        // Get the original property
        var _prop = contents.property(i);
        pb.update(contents.numProperties - i)

        // Skip the property if not enabled
        if (!_prop.enabled) continue;

        // Duplicate the original layer and rename with property name
        var new_layer = emptyDuplicateLayer(layer)

        new_layer.name = layer.name + ' - ' + _prop.name;
        new_layer.enabled = false;
        new_layer.shy = true;

        layers.push(new_layer);

        if (!new_layer.property("Contents").canAddProperty(_prop.matchName)) continue;

        var prop = new_layer.property("Contents").addProperty(_prop.matchName)

        copyProperties(_prop, prop, '')

    }

    pb.end();

    for(var i = 0; i < layers.length; i++) {
        layers[i].enabled = true;
        layers[i].shy = false;
        if(configs.dryRun) layers[i].remove();
    }

    return layers;

}

function explode() {

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

function cloneLayer(layer) {

    var properties = 
    [
        "anchorPoint",
        "position",
        "scale",
        "rotation",
        "opacity"
    ],
    newLayer = layer.containingComp.layers.addShape();

    properties.forEach(function(prop){
        layer.copy(prop).to(newLayer)
    });

    return newLayer;
}

function copyProperties(origin, target, prefix) {

    origin.properties().forEach(function(_prop){

        if(!(_prop.enabled && target.canAddProperty(_prop.matchName))) return;
        
        var prop = target.addProperty(_prop.matchName),
            copy = copyProperty.bind({origin: _prop, target: prop});
        
        
    })

    for(var i=1; i <= origin.numProperties; i++) {

        

        var copyProp = copyProperty.bind({origin: _prop, target: prop});

        PROPS[MATCH_NAMES.find(_prop.matchName)].forEach(function(prop){
            copyProp(prop);
        })

        switch (_prop.matchName) 
        {
            case 'ADBE Vector Materials Group':
            // skip
            break;

            case 'ADBE Vector Filter - Merge':
            copyProperty('mode', _prop, prop)
            break;

            //=================================================
            case 'ADBE Vector Graphic - Stroke':
            PROPS.stroke.forEach(function(pp){copyProp(pp)})
            copyPropertyStroke(_prop, prop);
            break;

            case 'ADBE Vector Graphic - Fill':
            copyPropertyFill(_prop, prop);
            break;

            case 'ADBE Vector Transform Group':
            copyPropertyTransform(_prop, prop);
            break;

            case 'ADBE Vector Shape - Rect':
            copyPropertyRect(_prop, prop);
            break;

            case 'ADBE Vector Shape - Ellipse':
            copyPropertyEllipse(_prop, prop);
            break;

            case 'ADBE Vector Shape - Star':
            copyPropertyStar(_prop, prop);
            break;

            case 'ADBE Vector Shape - Group':
            copyPropertyShape(_prop, prop);
            break;

            case 'ADBE Vector Blend Mode':
            prop.setValue( _prop.value );
            break;

            case 'ADBE Root Vectors Group':
            case 'ADBE Vectors Group':
            case 'ADBE Vector Group':
            copyProperties(_prop, prop, prefix += '    ')
            break;

        }

    }

}

function copyProperty(name) {
    this.target[name].setValue(this.origin[name].value);
}

function copyPropertyShape(origin, target) {
    target.property('ADBE Vector Shape').setValue( origin.property('ADBE Vector Shape').value );
}
function copyPropertyStroke(origin, target) {

    copyProperty('composite', origin, target);
    copyProperty('color', origin, target);
    copyProperty('strokeWidth', origin, target);
    copyProperty('lineCap', origin, target);
    copyProperty('lineJoin', origin, target);
    copyProperty('miterLimit', origin, target);

    // TOFIX : dash are present, no mater if deleted or not ! (disabled for now)
    // if(false && origin.dash.enabled) {
    //
    //     for(var i=1; i <= origin.dash.numProperties; i++) {
    //
    //         var dashProp = origin.dash.property(i);
    //
    //         if(dashProp.enabled)
    //             target.dash.addProperty(dashProp.matchName).setValue(dashProp.value);
    //
    //     }
    //
    // }

}
function copyPropertyFill(origin, target) {

    copyProperty('composite', origin, target);
    copyProperty('fillRule', origin, target);
    copyProperty('color', origin, target);

}
function copyPropertyTransform(origin, target)
{
    PROPS.transform.forEach(copyProperty.bind({origin: origin, target: target}));
}

function copyPropertyRect(origin, target)
{
    PROPS.rect.forEach(function(prop))
    copyProperty('shapeDirection', origin, target)
    copyProperty('size', origin, target)
    copyProperty('position', origin, target)
    copyProperty('roundness', origin, target)
}
function copyPropertyEllipse(origin, target) {
    copyProperty('shapeDirection', origin, target)
    copyProperty('size', origin, target)
    copyProperty('position', origin, target)
}
function copyPropertyStar(origin, target) {
    copyProperty('shapeDirection', origin, target)
    copyProperty('type', origin, target)
    copyProperty('points', origin, target)
    copyProperty('position', origin, target)
    copyProperty('rotation', origin, target)
    copyProperty('innerRadius', origin, target)
    copyProperty('outerRadius', origin, target)
    copyProperty('innerRoundness', origin, target)
    copyProperty('outerRoundness', origin, target)
}

(function createWindow(){

    w = new Window("palette", "EXPLODE SHAPE!");
    b = w.add("iconbutton", undefined, "/d/media/explode.png");;
    b.text = "EXPLODE!";
    b.onClick = explode;

    return w;

})().show();