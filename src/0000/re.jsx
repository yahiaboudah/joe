
delete(Object.prototype.re);
Object.prototype.re = function(/*replacements*/)
{
    // get args array:
    var fargs = Array.prototype.slice.call(arguments);
    if(!fargs) return this;

    //toString() the args
    for(a in fargs) if(fargs.hasOwnProperty(a)){
        if(fargs[a] === undefined){
            fargs[a] = "undefined";
            continue;    
        }
        fargs[a] = fargs[a].toString();
    }
    
    var ff = 
    {
        pat: function(k)
        // the pattern to look for:
        {
            return RegExp("\\{" + k + "\\}", "gi");
        },

        str: function(ss, A)
        {
            var i = -1;
            while(++i <A.length)
            {
                ss = ss.replace(ff.pat(i), A[i]);
            }
            return ss;
        },

        obj: function(oo, A)
        {
            var newo = {Array: [], Object: {}}[oo.constructor.name],
                k;
            
            for(x in oo) if(oo.hasOwnProperty(x))
            {
                k = oo[x];
                x = ff.str(x, A);
                switch (k.constructor)
                {   
                    case String:
                        newo[x] = ff.str(k, A);
                        break;

                    case Object:
                    case Array:
                        newo[x] = ff.obj(k, A);
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
