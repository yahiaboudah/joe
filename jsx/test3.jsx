
Array.prototype.remove = function(g, cb)
{
    
    for(var i =0; i<this.length; i++)
    {
        if(typeof cb == "function") g = cb(g);
        if(this[i] == g) this.splice(i, 1);
    }
}

inspect = function(k)
{
    var io = 
    {
        type : typeof k,
        cns  : k.constructor.name,
        strr : k.toString(),
        PPS  : k.reflect.properties,
        FUNS : k.reflect.methods
    }

    if(io.cns == "Object")
    {
        var keys = [];
        for(x in k) if(k.hasOwnProperty(x))
        {
            keys.push(x);
            io.PPS.remove(x, function(z){return z.toString()});
        }
        io["keys"] = keys;
    }

    io.PPS = io.PPS.join(",");
    io.FUNS = io.FUNS.join(",");
    return io;
}

var ss = inspect({hello: "hi", bro: "aze"});
$.writeln(ss.toSource());