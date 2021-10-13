
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
        str.push(kk[i].toString() + ": " + oo[i].toString());
    }
    return str.join("\n");
}

delete(Object.prototype.re);
Object.prototype.re = function(/*reps*/)
{
    // get reps, convert to string:
    var fargs = Array.prototype.slice.call(arguments);
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
                        newo[x] = ff.obj(k, argsArr);
                        break;

                    default: 
                        newo[x] = k;
                        break;
                }
            }

            return newo;
        }
    }

    switch (this.constructor)
    {
        case String:
            return ff.str(this, fargs);

        case Object:
        case Array:
            return ff.obj(this, fargs);

        default: return this;
    }
}

delete(Object.prototype.xt);
Object.prototype.xt = function(oo)
{
    for(x in oo) if(oo.hasOwnProperty(x)) this[x] = oo[x];
}

delete(Object.rm);
Object.rm = function(mo)
{
    eval([
        
        mo + "= undefined",
        "delete( " + mo + ")"

    ].join(";"))
}

delete(Object.prototype.is);
Object.prototype.is = function()
{
    var _args = Array.prototype.slice.call(arguments), i = -1;
    var what = this.constructor;

    while(++i<_args.length) if(what == _args[i]) return true;

    return false;
}