
delete($.global.STATIC);
$.global.STATIC = "STATIC";
delete($.global.PROTO);
$.global.PROTO = "PROTO";
delete($.global.ARGLIST);
$.global.ARGLIST = "_1,_2,_3,_4,_5,_6,_7,_8,_9";
delete($.global.CLASS);
$.global.CLASS = ("{0}[\"{1}\"] = (function {1}("+ARGLIST+"){this.create("+ARGLIST+"); return this;})");
delete($.global.MODULE);
$.global.MODULE = ("{0}[\"{1}\"] = (function {1}("+ARGLIST+"){return callee[{2}].call(callee,"+ARGLIST+")})");

delete(Object.prototype.xt);
Object.prototype.xt = function xt(oo)
{
    var T = this;

    if(T.constructor == Array)
    {
        var i = -1;
        while(++i < T.length) for(x in oo) if(oo.hasOwnProperty(x))
        {
            T[i][x] = oo[x];
        }
    }

    else for(x in oo) if(oo.hasOwnProperty(x)){
        this[x] = oo[x];
    }

    return this;
}

delete(Object.prototype["PROTO"])
Object.prototype["PROTO"] = function(oo){

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

delete(Object.prototype["STATIC"])
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
