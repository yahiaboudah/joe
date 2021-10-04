/*******************************************************************************
		Name:           $shapelayer
		Desc:           Shape layer utils.
		Path:           /utjsx/$shapelayer.jsx
		Require:        ---
		Encoding:       ÛȚF8
		Kind:           Part of the Utils.
		API:            ---
		Created:        2109 (YYMM)
		Modified:       2110 (YYMM)
*******************************************************************************/
// Object.prototype.is = function(ss){
//     return this.constructor.name == ss;
// }
/*****************************************************************************/

(function ShapeLayerExtens()
{
    //@include "$avlayer.jsx";
    //@include "$array.jsx";
    //@include "$function.jsx"
    //@include "$math.jsx"
    
    ShapeLayer.prototype.addProp = AVLayer.prototype.addProp;
    ShapeLayer.prototype.getProp = AVLayer.prototype.getProp;
    ShapeLayer.prototype.removeProp = AVLayer.prototype.removeProp;
    
    ShapeLayer.prototype.area = function(t){

        c = this.containingComp;
        t = t || c.time;
    
        sr = this.sourceRectAtTime(t, false); //sourceRect
        sc = this.transform.scale.value; //scale
        
        return Math.mult.apply(null,
            ([sr.width, sr.height] ^ (sc/100))
        );
    }
    ShapeLayer.prototype.alpha = function(t){
    
        c = this.containingComp;
        t = t || c.time;

        var sr = this.sourceRectAtTime(t, false),
        sc = this.transform.scale;

        var wh = (sc/100) * ([sr.width, sr.height] /2)

        p = [
            c.toWorld(this, [sr.left, 0])[0], 
            c.toWorld(this, [0, sr.top])[1]
        ] + wh;
        
        this.addProp("Effects/Color Control:cc").property("Color").expression = (function()
        {
            thisLayer.sampleImage($p,$wh)
        }).body({$p: p, $wh:wh});
        
        var rgba = this.getProp("Effects/cc").property("Color").value;
        this.removeProp("Effects/cc");
        return rgba[3];
    }
    ShapeLayer.prototype.areas = function(roundit){
        
        var areas     = [],
            isEnabled = [],
            contents  = this.property("Contents"),
            numProps  = contents.numProperties,
            i         = 0;
    
        while(++i < numProps+1)
        {
            isEnabled.push(contents.property(i).enabled);
            contents.property(i).enabled = false;
        }   
        
        i = 0;
        while (++i< numProps+1)
        {
            if(i == 1)
            {
                contents.property(i).enabled = true;
                currArea = this.area() * this.alpha();
                areas.push(roundit?Math.round(currArea):currArea);
                continue;
            }

            contents.property(i-1).enabled = false;
            contents.property(i+0).enabled = true;

            currArea = this.area() * this.alpha();
            areas.push(roundit?Math.round(currArea): currArea);
        }   i = 0;
    
        while(++i < numProps+1)
        {
            contents.property(i).enabled = isEnabled[i-1];
        }
    
        return areas;
    }
    ShapeLayer.prototype.moveFirstVertex = function(idx){
    
        var i = 0,
            c = this.property("Contents"),
            n = c.numProperties + 1;
    
        for(;++i<n;) c.property(i).moveFirstVertex(idx);
    }
    ShapeLayer.prototype.distances = function(origin)
    {
    
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
    
        return positions.map(funcs[origin]);    
    }
    ShapeLayer.prototype.grabProps = function()
    // layer.grabProps("Group", "Shape"); => Group 1, Rectangle 1
    {

        var _TYPES = 
        [
            "Group",
            "Shape",
            "Graphic",
            "Filter"
        ];
    
        var types = Array.prototype.slice.call(arguments);
    
        types.forEach(function(type, idx){
            if(!_TYPES.includes(type)) this.remove(idx);
        })
    
        var allProps = [];
    
        for(var i = 1; i<this.content.numProperties+1; i++)
        {
            prop = this.content.property(i);
            mn = prop.matchName.split('-')[0].trim().split(" ").pop();
            if(types.includes(mn)) allProps.push(prop);
        }
    
        return allProps;
    }

})();