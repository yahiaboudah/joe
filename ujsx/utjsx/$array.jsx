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
//---
/******************************************************************************/

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
Array.prototype.remove = function(k, a) {

    if(typeof a != "boolean") a = false;


    var i = -1,
        len = this.length;
    
    while (i < len) {
        
        if (this[i] != k) continue;
        
        this.splice(i, 1);
        if(!a) break;
        
        len--;
    }

    return this;
}
Array.prototype.println = function() {
    
    $.writeln(this.join("\n"));
}
Array.prototype.includes = function(k) {
    return this.indexOf(k) > -1;
}

Array.prototype.rotate = function(d, i){
    a = this; // eval("["+String(this)+"]");
    
    if(d == "l")  while(i--) a.push(a.shift());
    if(d == "r") while(i--) a.unshift(a.pop());

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

Array.range = function(l){
    
    arr = [],
    i   = -1;

    for(;++i<l;) arr[i] = (i+1);
    return arr;
}

Array.prototype.sortedIndices = function(){
    a = this;
    return Array.range(a.length).sort(function(x,y){
        return a[x-1] > a[y-1];
    })
}

Array.prototype.min = function(){
    return Math.min.apply(null, this);
}

Array.prototype.max = function(){
    return Math.max.apply(null, this);
}

Array.prototype.math2D = function(typ, xory)
{
    return Math[typ].apply(null, this.map(function(x){
        return x[xory]
    }))
}

Array.prototype.upIndex = function(){
    return this.indexOf(this.math2D("max", 1));
}
Array.prototype.bottomIndex = function(){
    return this.indexOf(this.math2D("min", 1));
}
Array.prototype.leftIndex = function(){
    return this.indexOf(this.math2D("min", 0));
}
Array.prototype.rightIndex = function(){
    return this.indexOf(this.math2D("max", 0));
}
Array.prototype.upperLeftIndex = function(){
    
    a = this;
    o = {
        x: a.math2D("min", 0),
        y: a.math2D("min", 1)
    }
    
    m = a.map(function(v){
        return Math.sqrt(Math.pow( v[0] - o.x,2) + Math.pow(v[1] - o.y,2));
    }).min();

    return a.indexOf(m);
}
Array.prototype.upperRightIndex = function(){
    
    a = this;
    o = {
        x: a.math2D("max", 0),
        y: a.math2D("min", 1)
    }
    
    m = a.map(function(v){
        return Math.sqrt(Math.pow( v[0] - o.x,2) + Math.pow(v[1] - o.y,2));
    }).min();

    return a.indexOf(m);
}

Array.prototype.bottomRightIndex = function(){
    
    a = this;
    o = {
        x: a.math2D("max", 0),
        y: a.math2D("max", 1)
    }
    
    m = a.map(function(v){
        return Math.sqrt(Math.pow( v[0] - o.x,2) + Math.pow(v[1] - o.y,2));
    }).min();

    return a.indexOf(m);
}
Array.prototype.bottomLeftIndex = function(){
    
    a = this;
    o = {
        x: a.math2D("min", 0),
        y: a.math2D("max", 1)
    }
    
    m = a.map(function(v){
        return Math.sqrt(Math.pow( v[0] - o.x,2) + Math.pow(v[1] - o.y,2));
    }).min();

    return a.indexOf(m);
}