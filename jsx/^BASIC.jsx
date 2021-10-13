
Object.prototype.toSource = function()
{
    var oo = [];
    var kk = [];
    for(x in this) if(this.hasOwnProperty(x))
    {
        kk.push(x); oo.push(this[x]);
    }
    
    var str = [];
    for(var i = 0; i<kk.length;i++)
    {
        str.push(kk[i].toString() + ": " + oo[i].toSource());
    }
    return str.join("\n");
}

// replace {0} {1} {2} with args[0] args[1] args[2]..
var f = function(/*reps*/)
{
    // get reps, convert to string:
    var fargs = Array.prototype.slice.call(arguments);
    var thiss = fargs[0]; fargs.shift();
    for(var g = -1; ++g<fargs.length;) fargs[g] = fargs[g].toString();

    var ff = 
    {
        pat: function(k)
        // the pattern to look for:
        {
            return RegExp("\\{" + k + "\\}", "gi");
        },

        str: function(ss, argsArr)
        {
            var i = -1;

            while(++i <argsArr.length) ss = ss.replace(this.pat(i), argsArr[i]);
            return ss;
        },

        obj: function(oo, argsArr)
        {
            var newo = {Array: [], Object: {}}[oo.constructor.name],
                k;
            
            for(x in oo) if(oo.hasOwnProperty(x))
            {
                k = oo[x];
                switch (k.constructor)
                {   
                    case String:
                        newo[x] = ff.str(k, argsArr);
                        break;

                    case Object:
                    case Array:
                        newo[x] = callee(k, argsArr);
                        break;

                    default: 
                        newo[x] = k;
                        break;
                }
            }

            return newo;
        }
    }

    switch (thiss.constructor)
    {
        case String:
            return ff.str(thiss, fargs);

        case Object:
        case Array:
            return ff.obj(thiss, fargs);

        default: return this;
    }
}

$.writeln("---> ", f({
    some: "{0}",
    thiss: "{1} {2} {3}",
    stuqsdff: ["{0} hello", "{3} darlin"],
    heyy: "{2}",
    sdsd: {
        obj: "{0} himalaya"
    },
    azeaez:
    {
        hima: "{3} yesman!"
    }
},"one", "two", "three", "four").toSource());


// IS, IN, RE