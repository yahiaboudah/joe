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
/**
 * get the amount of pixels each group of a shape 
 * layer occupies, all listed in an Array.
 * This works by storing the visiblity status of each
 * group. then:
 * 1) Make groups enabled 1 at a time, retrieve area.
 * 2) Push area into the areas array.
 * 3) Finally restore the original visibility status
 * 4) Return the areas.
 * @returns Array 
 */
ShapeLayer.prototype.areas = function(){
    
    var areas    = [],
        visibles = [],
        contents = this.property("Contents"),
        numProps = contents.numProperties,
        i        = 0;

    while(++i < numProps+1)
    {
        visibles.push(contents.property(i).enabled); 
        contents.property(i).enabled = false;
    }   
    
    i = 1;
    contents.property(i).enabled = true;
    areas.push(this.area() * this.alpha());
    
    while (++i< numProps+1)
    {
        contents.property(i-1).enabled = false;
        contents.property(i+0).enabled = true;
        areas.push(this.area() * this.alpha());
    }   i = 0;

    while(++i < numProps+1)
    {
        contents.property(i).enabled = visibles[i-1];
    }

    return areas;
}

ShapeLayer.prototype.distances = function(startingPoint){

    var distances  = [],
        comp       = app.project.activeItem,
        contents   = this.property("Contents"),
        numProps   = contents.numProperties;
        
    var src = this.sourceRectAtTime(comp.time, false);
        wd  = src.width;
        ht  = src.height;

    var i =0;
    for(;++i< numProps+1;){
      
        pos = contents.property(i).property("Transform").property("Position").value;
      
        switch (startingPoint) {
       
            case morphing.CONSTANTS.SORTING_DIRECTIONS.topleft:
               dist = Math.sqrt(Math.pow((pos[0]-src.left),2)+Math.pow((pos[1]-src.top),2));
               break;
            case morphing.CONSTANTS.SORTING_DIRECTIONS.leftRight:
               dist = pos[0]-src.left;
               break;
            case morphing.CONSTANTS.SORTING_DIRECTIONS.rightLeft:
               dist = WIDTH - (pos[0]-src.left);
               break;   
            case morphing.CONSTANTS.SORTING_DIRECTIONS.topdown:
               dist = pos[1] - src.top;
               break;
            case morphing.CONSTANTS.SORTING_DIRECTIONS.bottomUp:
               dist = HEIGHT - (pos[1] - src.top)
               break;
            case morphing.CONSTANTS.SORTING_DIRECTIONS.closestTo:
               if(typeof selectedLayerName != "undefined"){
                    selectedLayer = comp.layers.byName(selectedLayerName);
                    selLayerPos = selectedLayer.transform.position;
                    // TODO: Figure out the position coordinates of the
                    // elements relative to the comp coordinate system.
                    // Then simply subtract the distances to figure which
                    // ones are closer than others.
                }else{
                    alert(errMsg.selectedLayer);
                }  
            default:
                alert(errMsg.invalidSortingDirection);
                break;
      }
      distances[distances.length] = dist;
    }
    return distances;
}