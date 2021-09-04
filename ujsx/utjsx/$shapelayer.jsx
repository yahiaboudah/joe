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
Function.prototype.body = function(){
	return this.toString()
		   .replace(/^[^{]*\{[\s]*/,"")
           .replace(/\s*\}[^}]*$/,"");
}

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
/**
 * Get the alpha value for a shape layer by writing an expression
 * and grabbing the result from a temporary Color Control.
 * @returns float
 */
ShapeLayer.prototype.alpha = function(){

    var cc = this.property("Effects").addProperty("Color Control"); // color control
        cp = cc.property("Color"); // color prop

    cp.expression = (function(){

        sr = thisLayer.sourceRectAtTime();
        sc = transform.scale;

        w = sc[0] * sr.width  / 200;
        h = sc[1] * sr.height / 200;
        p = [toWorld([sr.left,0])[0] + w,toWorld([0,sr.top])[1]+h];

        thisLayer.sampleImage(p,[w,h])
    
    }).body();
    rgba = cp.value;

    cc.remove();
    return rgba[3];
}
