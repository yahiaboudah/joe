
Array.xt({

    range: function(n)
    {
        var arr = [], i = -1;

        while(++i<n) arr[i] = (i+1);
        return arr;
    },

    clone: function(arr)
    {
        return eval("[{0}]".re(String(arr)));
    }
})

// [every]
Array.prototype.every = function(cb, thisArg)
{
    if(!is(cb, Function)) throw TypeError("CB not a function");

    var k,O = Object(this);

    for(k in O) if(k.in(O))
    {
        if(cb.call(thisArg, O[k], k, O) == false) return false;
    }
    
    return true;
}

Array.prototype.forEach = function(cb, thisArg)
{
    if(!cb.is(Function)) throw TypeError("CB not a function");

    var O = Object(this);
    for(x in O) if(x.in(O)){

        cb.apply(
            thisArg || {}, 
            [O[x], x, O].concat(arguments.slice())
        )
    }

    return this;
}

// [Array Functions]
Array.prototype.xt({

    indexOf: function(e, fromIdx) {

        var k,
            O = Object(this);
            len = O.length >>> 0,
            n = fromIdx | 0;

        if(!len || len <= n) return -1;

        k = Math.max(n >= 0 ? n : (len - Math.abs(n)),
            0
        )-1;

        while(++k<len) if(k in o && o[k] === e) return k;

        return -1;
    },

    includes: function(k)
    {
        return this.indexOf(k) > -1;
    },

    remove: function(e, all)
    {
        var k,
            O = Object(this);
            len = O.length >>> 0;
        
        k = -1;
        while(++k<len) if(this[k] == e)
        {
            this.splice(i, 1);
            if(!all) break;
            len--; k--;
        }

        return this;
    },

    rotate: function(dir, k){
        
        var a = Array.clone(this);
        switch(dir){
            case "l": while(k--)    a.push(a.shift());
            case "r": while(k-->-1) a.unshift(a.pop());
        }

        return a;
    },

    reduce: function(cb)
    {    
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
    },

    map: function(cb, thisArg)
    {
        if(!cb.is(Function)) throw TypeError("CB not a function");

        var k,O = Object(this),

        A = new Array(O.length >>> 0);
        for(k in O) if(k.in(O))
        {
            A[k] = cb.call(thisArg, O[k], k, O);
        }
        
        return A;
    },

    filter: function(cb, thisArg)
    {     
        var k,O = Object(this), A;
        
        if(!cb.is(Function)) throw new TypeError("CB not a function");

        for(k in O) if(k.in(O))
        {
            if(cb.call(thisArg, O[k], k, O)) A.push(O[k]);
        }

        return A;
    },

    select: function(cb, thisArg)
    {
        return Array.prototype.filter.apply(this, [cb, thisArg]);
    },

    sortedIndices: function()
    {
        var a = this;
        return Array.range(a.length).sort(function(x,y){
            return a[x-1] > a[y-1];
        })
    }
})

// [MATH Related Functions]
[PROTO]
({
    __name__: "MATH",

    math2: function(type, xory)
    {
        return Math[type].apply(null, this.map(function(x){
            return x[xory]
        }))
    },

    mapToDistance: function(offset)
    //@@requires ["module.PROTO.map"]
    {
        if(!is(offset, Array)) offset = [0, 0];

        return this.map(function(v){
            return Math.sqrt(
                Math.pow(v[0] - offset[0], 2) + 
                Math.pow(v[1] - offset[1], 2)
            )
        })
    },

    getIndex: function(type)
    {
        var A = Object(this);
        if(!type) return A[0];

        if(type.is(Number))  return A.indexOf(type);
        if(!type.is(String)) return A[0];

        type = type.replace(/[^0-9a-zA-Z]/gi, "").toLowerCase();
        
        var minx = A.indexOf(A.math2('min',0)),
            miny = A.indexOf(A.math2('min',1)),
            maxx = A.indexOf(A.math2('max',0)),
            maxy = A.indexOf(A.math2('max',1)),
            m;

        switch(type)
        {
            case "up"   : return maxy;
            case "down" : return miny;
            case "left" : return minx;
            case "right": return maxx;
            
            case "upperLeft":                            
                m = A.mapToDistance([minx,miny]);
                return m.indexOf(Math.min.apply(null, m));

            case "bottomLeft":
                m = A.mapToDistance([minx,maxy]);
                return m.indexOf(Math.min.apply(null, m));

            case "upperRight":
                m = A.mapToDistance([maxx,miny]);
                return m.indexOf(Math.min.apply(null, m));

            case "bottomRight":
                m = A.mapToDistance([maxx,maxy]);
                return m.indexOf(Math.min.apply(null, m));

            default:
                return A[0];
        }
    }
});

// [Operator Overloading]:
Array.prototype.xt({

    '+': function(v)
    {
        var A = Object(this);
        if(!(v && v.is(Array))) return A;
        
        var aLen = A.length,
            vLen = v.length;
        
        var R = A.concat(v.slice(aLen));
        if(aLen > vLen) aLen = vLen;

        while(aLen--) R[aLen] += v[aLen];

        return R;
    },

    '-': function(v)
    {
        var A = Object(this);
        if(!(v && v.is(Array))) return A;

        for(x in v) if(x.in(v)) v[x] = -v[x];
        return Array.prototype['+'].call(A, v);
    },

    '*': function(v)
    {
        var A = Object(this);
        var aLen = A.length >>> 0,
            vLen = v.length >>> 0;
        var R;
        if(!v) return A;
        
        if(v.is(Number))
        {
            R = A.concat();
            while(aLen--) R[aLen] *= v;
            return R;
        }

        if(v.is(Array))
        {
            R = A.concat(v.slice(aLen));
            if(aLen > vLen) aLen = vLen;

            while(aLen--) R[aLen] *= v[aLen];

            return R;
        }

        return A;
    },

    '/': function(v, rev)
    {
        var A = Object(this);
        if(!(v && v.is(Number)) || rev) return A;

        return A * (1/v);
    }
})