
ShapeLayer

    [STATIC]
    ({  
        __name__: "ATTRIBS",  

        PROPS:
        {
            stroke    : ["composite", "color", "strokeWidth", "lineCap", "lineJoin", "miterLimit"],
            fill      : ["composite", "fillRule", "color"],
            transform : ["anchorPoint", "position", "scale", "skew", "skewAxis", "rotation", "opacity"],
            rect      : ["shapeDirection", "size", "position", "roundness"],
            ellipse   : ["shapeDirection", "size", "position"],
            star      : ["shapeDirection, type", "points", "position", "rotation", 
                        "innerRadius", "outerRadius", "innerRoundness", "outerRoundness"]    
        }
    })

    [PROTO]
    ({    
        /**
            * effect:Axis
            * content:group
        */
        
        __name__: "SETTERS",

        add: function(what, cfg)
        {
            what  = what.split(':');
            var T = what[0], P = what[1]; //Type & Property

            var matchNames = 
            {
                group : "ADBE Vector Group",
                stroke: "ADBE Vector Graphic - Stroke",
                strokeWidth: "ADBE Vector Stroke Width",
                fill: "ADBE Vector Graphic - Fill",
                fillColor: "ADBE Vector Fill Color",
            }

            var S = this,
                G = S.property(T == "effect"? "Effects": "Contents");
                G = G.canAddProperty(P)? G.addProperty(P): // can add P? add it
                    G.canAddProperty(matchNames[P])?G.addProperty(matchNames[P]): // try calling the matchName
                    undefined; // otherwise G is undefined
            
            if(!G) return G;

            if(cfg)
            {
                if(is(cfg.name, String)) G.name = cfg.name;

                if(is(cfg.stroke, Number))
                {
                    G.addProperty(matchNames["stroke"]).property(matchNames["strokeWidth"]).setValue(cfg.stroke);
                }

                if(is(cfg.fillColor, Array))
                {
                    G.property("Color").setValue(cfg.fillColor);
                }
            }

            return G;
        },

        moveFirstVertex : function(idx){
        
            var i = 0,
                c = this.property("Contents"),
                n = c.numProperties + 1;
        
            while(++i<n) c.property(i).moveFirstVertex(idx);
        }
    })

    [PROTO]
    ({
        __name__: "GETTERS",

        get: function(matchName, all)
        {
            var L = this, i=0, PP = [];
            while(++i<L.content.numProperties+1)
            {
                if(L.content.property(i).matchName == matchName)
                {
                    PP.push(L.content.property(i));
                }
            }

            return all?PP:PP[0];
        },

        numProp: function(propName){

            const propTypes = {
                "Graphic": 
                {
                    Stroke: "Stroke",
                    GradientStroke: "G-Stroke",
                    Fill: "Fill",
                    GradientFill : "G-Fill"
                },
                
                "Filter": 
                {
                    MergePaths: "Merge",
                    OffsetPaths: "Offset",
                    PuckerAndBloat: "PB",
                    RoundCorners: "RC",
                    TrimPaths: "Trim",
                    TwistPaths: "Twist",
                    WigglePaths: "Roughen",
                    WiggleTransform: "Wiggler",
                    ZigZag: "ZigZag",
                },
            
                "Shape": 
                {
                    PolyStar: "Star",
                    Rectangle: "Rect",
                    Ellipse: "Ellipse",
                    Custom: "Group"
                }
            }

            if(_in(propName, ["Shape", "Filter", "Graphic", "Group"]))
            {
                propName = "ADBE Vector {0}{1}".re(propName, propName != "Group"?" - .*":"");
            }
        
            var x;
            for(propType in propTypes) if(propType.in(propTypes))
            {
                if(!!(x = propType[propName])) propName = "ADBE Vector {0} - {1}".re(propType, x); 
            }

            propName = new RegExp(propName || "ADBE Vector .*", 'g');
            var c = this.property("Contents"), i = 0, k = 0;
            while(++ i<c.numProperties+1) if(propName.test(c.property(i).matchName)) k++;
        
            return k;
        },

        grabProps : function()
        // layer.grabProps("Group", "Shape"); => Group 1, Rectangle 1
        {

            var _TYPES = 
            [
                "Group",
                "Shape",
                "Graphic",
                "Filter"
            ];
        
            var T = arguments.slice(), A= [], i=-1;
            var C = this.content;

            while(++i<C.numProperties+1){
                prop = C.property(i);
                mn = prop.matchName.split('-')[0].trim().split(" ").pop();
                if(types.includes(mn)) allProps.push(prop);
            }
        
            return A;
        },

        area : function(t){

            c = this.containingComp;
            t = t || c.time;
        
            sr = this.sourceRectAtTime(t, false); //sourceRect
            sc = this.transform.scale.value; //scale
            
            return Math.mult.apply(null,
                ([sr.width, sr.height] ^ (sc/100))
            );
        },

        alpha : function(t){
        
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
        },

        areas : function(roundit){
            
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
        },

        distances : function(origin)
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
    })