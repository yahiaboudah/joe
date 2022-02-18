
$.global.STATIC = "STATIC";
$.global.PROTO = "PROTO";
$.global.ARGLIST = "_1,_2,_3,_4,_5,_6,_7,_8,_9";
$.global.CLASS = ("{0}[\"{1}\"] = (function {1}("+ARGLIST+"){this.create("+ARGLIST+"); return this;})");

Object.prototype[PROTO] = function(oo){

    if(oo.prototype == "undefined") return this;

    var x,k, g = oo.__name__ || "";

    for(x in oo) if(oo.hasOwnProperty(x)){
        if(x == "__name__" || x == "__proto__") continue;
        k = oo[x];
        if(k.constructor == Function) k.__group__ = g;
        this.prototype[x] = k;
    }

    return this;
}

Object.prototype[STATIC] = function(oo){

    var x,k;
    var g = oo.__name__ || '';
    for(x in oo) if(oo.hasOwnProperty(x))
    {
        if(x == "__name__" || x == "__proto__") continue;
        k = oo[x];
        if(typeof k == "function") k.__group__ = g;
        this[x] = k;
    }

    return this;
}