
//@include "$object.jsx";

// replace {0} {1} {2} with args[0] args[1] args[2]..
Object.prototype.f = function(/*reps*/)
{
    // get reps, convert to string:
    var fargs = Array.prototype.slice.call(arguments);
    for(var g = -1; ++g<fargs.length;) fargs[g] = fargs[g].toString();

    var ff = 
    {
        pat: function(k)
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
            var newo = (oo.constructor == Array)?
                       []:
                       oo.constructor == Object?
                       {}:
                       undefined;
            k;

            for(x in oo) if(oo.hasOwnProperty(x))
            {
                k = oo[x];
                switch (k.constructor)
                {   
                    case String:
                        newo[x] = this.str(k, argsArr);
                        break;

                    case Object:
                    case Array:
                        newo[x] = this.obj(k, argsArr);
                        break;

                    default: newo[x] = k;
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

$.writeln({
    some: "{0}",
    thiss: "{1} {2} {3}",
    stuff: ["{0} hello", "{3} darlin"],
    heyy: "{2}",
    yolo: {
        obj: "{0} himalaya"
    },
    yoyo:
    {
        hima: "{3} yesman!"
    }
}.f("one", "two", "three", "four").yolo);


// IS, IN, RE