/*******************************************************************************
		Name:           $array
		Desc:           Some polyfills for the Array class.
		Path:           /utils/$array.jsx
		Require:        ---
		Encoding:       ÛȚF8
		Kind:           Part of the Utils.
		API:            forEach, indexOf, includes, remove, println
		Todo:           ---
		Created:        2106 (YYMM)
		Modified:       2107 (YYMM)
*******************************************************************************/

(function ArrayPolyfills()
{
    if(!String.prototype.f)
    {
        // format: "my name is {0} and my fname is {1}".f(name, fname)
        String.prototype.f = function(){
            
            var fstr = this,
                args = Array.prototype.slice.call(arguments),
                i    = -1;

            while(++i <args.length)
            {
                fstr = fstr.replace( RegExp("\\{" + i + "\\}", "gi"),
                    args[i]
                );
            }

            return fstr;
        }
    }
    
    Function.prototype.body = function(repConfig)
	{
		if(!String.prototype._replace)
		{
			String.prototype._replace = function(repCfg){
		
				var str = this;
				for(x in repCfg) if(repCfg.hasOwnProperty(x))
				{
					str = str.split(x).join(repCfg[x])
				}
				return str;
			}
		}
		
		return this.toString()
			   .replace(/^[^{]*\{[\s]*/,"    ")
			   .replace(/\s*\}[^}]*$/,"")._replace(repConfig || {});
	}

    Array.range = function(l){
        
        var arr = [], i = -1;

        while(++i<l) arr[i] = (i+1);
        return arr;
    },

    Array.prototype.forEach = function(callback, thisArg) {

        if (this == null) throw new TypeError('Array.prototype.forEach called on null or undefined');
        if (typeof callback !== "function") throw new TypeError(callback + ' is not a function');


        var T, k,
            O = Object(this);
            len = O.length >>> 0;
        if (arguments.length > 1) T = thisArg;
        k = 0;
        
        while (k < len) {

                var kValue;
                if (k in O) {
                    kValue = O[k];
                    callback.call(T, kValue, k, O);
                }
                k++;
        }


        return this;
    };
    Array.prototype.indexOf = function(el, fromIdx) {

        "use strict";
        if (this == null) throw new TypeError('"this" is null or not defined');


        var k,
            o = Object(this);
            len = o.length >>> 0,
            n = fromIdx | 0;


        if (len === 0) return -1;
        if (n >= len) return -1;

        k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
        for (; k < len; k++) {
                if (k in o && o[k] === el) return k;
        }


        return -1;
    };
    Array.prototype.remove = function(k, all) {

        if(typeof all != "boolean") all = false;


        var i   = -1,
            len = this.length;
        
        while (++i < len) 
        {
            if(this[i] != k) continue;
            
            this.splice(i, 1);
            if(!all) break;    
            len--;
        }
        return this;
    }
    Array.prototype.includes = function(k) {
        return this.indexOf(k) > -1;
    }
    Array.prototype.rotate = function(d, i){
        
        a = this; // eval("["+String(this)+"]");
        
        switch (d) 
        {
            case "l": while(i--)    a.push(a.shift())
            case "r": while(i-->-1) a.unshift(a.pop())
        }

        return arr;
    }
    Array.prototype.reduce = function(cb) {
        
        'use strict';
        if (this == null)             throw TypeError('Reduce called on null or undefined');
        if (typeof cb !== 'function') throw TypeError(cb + ' is not a function');
        var t = Object(this), len = t.length >>> 0, k = 0, value;
        
        if(arguments.length == 2) 
        {
        value = arguments[1];
        } 
        else 
        {
        while (k < len && !(k in t)) k++; 
        if (k >= len) throw TypeError('Reduce of empty array with no initial value');
        value = t[k++];
        }

        for (; k < len; k++) 
        {
        if (k in t) value = cb(value, t[k], k, t);
        }
        
        return value;
    }
    Array.prototype.map = function(cb) {

        if (this == null) throw TypeError('Map array is null or not defined');
    
        var T,
            A,
            k,
            O   = Object(this),
            len = O.length >>> 0;
    
        if (typeof cb !== 'function') throw TypeError(cb + ' is not a function');
        if (arguments.length > 1) T = arguments[1];
        A = new Array(len);
        k = -1;
    
        while (++k < len) {

        var kValue, mappedValue;
    
        if (k in O) 
        {
            kValue = O[k];
            mappedValue = cb.call(T, kValue, k, O);
            A[k] = mappedValue;
        }
        }
        
        return A;
    }
    Array.prototype.forEvery = function(cb){
        var a = this;
        for(var i=0; i<a.length; i++)
        {
            if(cb.call(null, a[i], i) == false) return false;
        }
        return true;
    }
    Array.prototype.max = function(prop)
    {
        if(!prop) return Math.max.apply(null, this);
        
        a = eval(this.toSource());
        k = a.length;
        while(k--) a[k] = a[k][prop];
        
        return Math.max.apply(null, a)
    }
    Array.prototype.min = function(prop)
    {
        if(!prop) return Math.min.apply(null, this);
        
        a = eval(this.toSource());
        k = a.length;
        while(k--) a[k] = a[k][prop];
        
        return Math.min.apply(null, a)
    }
    Array.prototype.sortedIndices = function(){
        var a = this;
        return Array.range(a.length).sort(function(x,y){
            return a[x-1] > a[y-1];
        })
    }
    Array.prototype.math2D = function(type, xory)
    {
        return Math[type].apply(null, this.map(function(x){
            return x[xory]
        }))
    }

    /**
     * 
     */
    var tempFunc = "return this.indexOf(this.math2D(\"{0}\", {1}))";
    Array.prototype.upIndex     =  Function(tempFunc.f("max", 1));
    Array.prototype.bottomIndex =  Function(tempFunc.f("min", 1));
    Array.prototype.leftIndex   =  Function(tempFunc.f("min", 0));
    Array.prototype.rightIndex  =  Function(tempFunc.f("max", 0));
    /**
     * 
     */

    
    /**
     *
     *  
     */
    var doubleTempFunc = function(ytype, xtype){
        
        return (function(){

            var a = this;
            var o = {
                x: a.math2D(xtype, 0),
                y: a.math2D(ytype, 1)
            }
            
            var m = a.map(function(v){
                return Math.sqrt(Math.pow( v[0] - o.x,2) + Math.pow(v[1] - o.y,2));
            }).min();
    
            return a.indexOf(m);    
        }).body({
            xtype: xtype,
            ytype: ytype,
        })
    }

    Array.prototype.upperLeftIndex   = doubleTempFunc("min", "min");
    Array.prototype.upperRightIndex  = doubleTempFunc("min", "max");
    Array.prototype.bottomRightIndex = doubleTempFunc("max", "max");
    Array.prototype.bottomLeftIndex  = doubleTempFunc("max", "min");
    
    /*
    *
    *
    */
})();