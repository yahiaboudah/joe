/*******************************************************************************
		Name:           $shapelayer
		Desc:           Shape layer utils.
		Path:           /utjsx/$shapelayer.jsx
		Require:        ---
		Encoding:       ÛȚF8
		Kind:           Part of the Utils.
		API:            ---
		Created:        2109 (YYMM)
		Modified:       2109 (YYMM)
*******************************************************************************/

/**
 * Calculates the area of the given shape layer..
 * @param {CompItem} c 
 * @returns the area of "this" shapelayer.
 */
ShapeLayer.prototype.area = function(c){

    if(!c || !c instanceof CompItem) c = app.project.activeItem;

    sr = this.sourceRectAtTime(c.time, false); //sourceRect
    sc = this.transform.scale.value; //scale
    
    return sr.width * sr.height * sc[0] * sc[1] / 10000;
}

ShapeLayer.prototype.alpha = function(){

    var colorControl = this.property("Effects").addProperty("Color Control");
        colorProp    = colorControl.property("Color");

    var exp = 
    [
    "sr = thisLayer.sourceRectAtTime()",
    "sc = transform.scale",
    
    "w = sc[0] * sr.width  / 200",
    "h = sc[1] * sr.height / 200",
    "p = [toWorld([sr.left,0])[0] + w,toWorld([0,sr.top])[1]+h]",
    
    "thisLayer.sampleImage(p,[w,h])"

    ].join(";\n");

    colorProp.expression = exp;
    rgba = colorProp.value;

    colorControl.remove();
    return rgba[3];
}

function x(){



    sr = thisLayer.sourceRectAtTime();

    sc = transform.scale;

    w = sc[0] * sr.width  / 200;

    h = sc[1] * sr.height / 200;

    p = [toWorld([sr.left,0])[0] + w,toWorld([0,sr.top])[1]+h];

    thisLayer.sampleImage(p,[w,h])
}

function body(ff){
    ff = ff.toString();
    ff = ff.replace(/^[^{]*\{[\s]*/,"    ")
           .replace(/\s*\}[^}]*$/,"");
    return ff;
}

$.writeln(body(x))

// sel = app.project.activeItem.selectedLayers[0];
// $.writeln(sel.alpha());
