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
/**
 * Get the alpha value for a shape layer by writing an expression
 * and grabbing the result from a temporary Color Control.
 * @returns float
 */
ShapeLayer.prototype.alpha = function(){

    Function.prototype.body = function(){
        return this.toString()
               .replace(/^[^{]*\{[\s]*/,"")
               .replace(/\s*\}[^}]*$/,"");
    }

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
    delete(Function.prototype.body);
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

ShapeLayer.prototype.moveFirstVertex = function(idx){

    var i = 0,
        c = this.property("Contents"),
        n = c.numProperties + 1;

    for(;++i<n;) c.property(i).moveFirstVertex(idx);
}

ShapeLayer.prototype.distances = function(origin){


    Number.prototype["^"] = function(op){
        return Math.pow(this, op);
    }
    Array.prototype.map = function(cb) {
        if (this == null) throw TypeError('Map array is null or not defined');
        var T,A,k,O   = Object(this),len = O.length >>> 0;
        if (typeof cb !== 'function') throw TypeError(cb + ' is not a function');
        if (arguments.length > 1) T = arguments[1];
        A = new Array(len); k = -1;
        while (++k < len) {
          var kValue, mappedValue;
          if (k in O){
            kValue = O[k];
            mappedValue = cb.call(T, kValue, k, O);
            A[k] = mappedValue;
          }
        } return A;
    }

    prop = function(c, n, pp)
    {
        return c.property(n)
                .property("Transform")
                .property(pp).value;
    }
    num = function(v){
        return new Number(v);
    }

    funcs = {

        topleft: function(pos){
            return Math.sqrt(
                            (num(pos[0] - src.left) ^ 2) 
                          + (num(pos[1] - src.top ) ^ 2)
                   );
        },
        left: function(pos){
            return pos[0] - src.left;
        },
        right: function(pos){
            return wd - (pos[0] - src.left);
        },
        top: function(pos){
            return pos[1] - src.top;
        },
        bottom: function(pos){
            return ht - (pos[1] - src.top);
        },
        custom: function(pos){
            // TODO: Figure out the position coordinates of the
            // elements relative to the comp coordinate system.
            
            // Then simply subtract the distances to figure which
            // ones are closer than others.
        }
    }

    var positions  = [],
        origin     = origin || "topleft";
        contents   = this.property("Contents"),
        numProps   = contents.numProperties;
        
    var src = this.sourceRectAtTime(this.containingComp.time, 0);
        wd  = src.width;
        ht  = src.height;

    for(i=0;++i<numProps+1;) positions.push(prop(contents,i, "Position"))

    dists = positions.map(funcs[origin]);

    /**************************/
    delete(Array.prototype.map);
    delete(Number.prototype["^"]);
    funcs = prop = num = positions 
    = origin = contents = numProps
    = src = wd = ht = null;
    /*************************/

    return dists;
}



// Math.sum = function(){
//     args = Array.prototype.slice.call(arguments);
//     for(i=-1, sum=0;++i<args.length;) sum += args[i];
//     return sum;
// }

// layer = app.project.activeItem.layer(1);
// dists = layer.distances("left");

// $.writeln(dists);