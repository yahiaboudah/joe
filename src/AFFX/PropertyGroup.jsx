
PropertyGroup

    [PROTO]
    ({
        __name__: "CHECKERS",
            
        containingComp : function()
        {
            var DEPTH = this.propertyDepth, P = this;
        
            while(DEPTH--) P = P.parentProperty;
            
            return P.containingComp;
        },

        is : function()
        {
            var P = this,
                A = arguments.slice();

            var match = P.matchName.split(' ')[2];
            
            var i = -1;
            while(++i<A.length) if(match == A[i]) return true;
        
            return false;
        },

        isnt : function()
        {
            return !this.is.apply(this, arguments.slice());
        }
    })

    [PROTO]
    ({
        __name__: "GETTERS",
        
        properties : function()
        {
            var P = [];

            var i = -1;
            while(++i <this.numproperties) P.push(this.property(i));

            return P;
        },

        get: function(propName, time)
        {
            var pp = this.property(propName);
            return (time? pp.valueAtTime(time): pp.value);
        }
    })

    [PROTO]
    ({
        __name__: "SETTERS",

        set: function(propName, value, time)
        {
            time?
            this.property(propName).setValueAtTime(time, value):
            this.property(propName).setValue(value)
        },
        
        moveFirstVertex : function(index)
        {    
            const ERRS = 
            {
                PROP_INVALID : "Property needs to be a shape, path group, or path"
            }
        
            if(this.isnt("Group", "Path", "PathGroup")) throw Error(ERRS.PROP_INVALID)
        
            if(this.isnt("Group")) return this.mFirstVertex(index);
        
            return this.properties().forEach(function(prop){
        
                if(prop.is("Path")) prop.mFirstVertex(index);
            })
        },

        mFirstVertex : function(index, t)
        {
            const ERRS = 
            {
                INVALID_INDEX: "The index \"{0}\" is invalid".f(index)
            }
        
            t = t.is(Number)? t: this.containingComp().time;
        
            var getIndex = Array.prototype[index + "Index"];
            if(getIndex.isnt(Function)) throw Error(ERRS.INVALID_INDEX);
        
            var path = this.path.value;
        
            var i = getIndex.call (path.vertices, index),    //index   
                m = Math.floor    (path.vertices.length/2); //midpoint
        
            var dirRota = (i < m)? "L": "R", 
                numRota = (i < m)?  i : (path.vertices.length - i);
        
            var shape = new $Shape(
            {
                vertices    : path.vertices   .rotate(dirRota, numRota),
                inTangents  : path.inTangents .rotate(dirRota, numRota),
                outTangents : path.outTangents.rotate(dirRota, numRota),
                isClosed    : path.isClosed
            })
        
            !this.path.numKeys?
            path.setValue(shape):
            path.setValueAtTime(this.keyTime(this.$nearestKeyIndex("L", t)), shape);
        },

        $nearestKeyIndex : function(lr, t)
        // nearest after -t- or before -t-: (lr: "R" = "RIGHT", "L" = "LEFT"):
        {  
            t = t.is(Number)? t: this.containingComp().time;
        
            if(this.isnt("Path")) throw TypeError("{0} only works for Path".re(callee.name));
            if(!this.numKeys) return 0;
            
            keyIndex = this.nearestKeyIndex(t);
            keyTime  = this.keyTime(keyIndex);
        
            if(keyIndex == 1) return keyIndex;
            if((keyTime > t) && lr == "R") return keyIndex;
            if((keyTime > t) && lr == "L") return keyIndex-1;
            if((keyTime < t) && lr == "L") return keyIndex;
            if((keyTime < t) && lr == "R") return keyIndex+1;
        },

        // TEXT RELATED: [ANIMATORS]:
        // Find a way to verify that the property is a text Animator.
        addTextFill: function(color)
        {
            const ANIM_PROPS = "ADBE Text Animator Properties",
                    FILL_PROP  = "ADBE Text Fill Color";
            
            if(this.property(ANIM_PROPS).is(undefined)) return this;

            var pp = this.property(ANIM_PROPS).addProperty(FILL_PROP);
            pp.color = color;

            return pp;
        },

        addExpressionSelector: function(name, basedOn, expressionStr)
        {
            const EXPR_SELECTOR = "ADBE Text Expressible Selector";
            if(sel = this.property("Selectors").is(undefined)) return this;

            sel = sel.addProperty(EXPR_SELECTOR);
            sel.name = name; // find the count of a given name
            sel.property("Based On").setValue(basedOn);
            sel.property("Amount").expression = expressionStr;

            return sel;
        },

        getParent: function(level)
        {
            var P = this,
                L = level || 1;

            while(L--) P = P.parent;
            return P;
        },

        copyPropertiesTo: function(target)
        {
            var origin = this;
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
                    case MN("merge"):
                        prop["mode"].setValue(_prop["mode"].value);
                        return;
        
                    case MN("blendMode"):
                        prop.setValue(_prop.value);
                        return;
        
                    case MN("shapeGroup"):
                        prop.property(MATCH_NAMES.shape)
                            .setValue(_prop.property(MATCH_NAMES.shape).value);
                        return;
        
                    case MN("group"):
                    case MN("pathGroup"):
                    case MN("path"):
                        copyProperties(_prop, prop);
                        return;
                }
        
                //------------------------------------------------
                
                var __propsList = PROPS[Object.getKeyByValue(MATCH_NAMES, _prop.matchName)];
                if(!__propsList) return;
        
                __propsList.forEach(copyProp, {origin: _prop, target:prop})
            })
        }
    })