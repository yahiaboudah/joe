
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
            var fstr = ss,
                args = argsArr,
                i    = -1;
    
            while(++i <args.length)
            {
                fstr = fstr.replace(this.pat(i), args[i]);
            }
    
            return fstr;
        },

        arr: function(a, argsArr)
        {
            var oa = []; //output array
            for(var i=0; i<a.length; i++)
            {
                var k = a[i];
                switch (k.constructor)
                {
                    case String:
                        oa.push(this.str(k, argsArr));
                        break;

                    case Array:
                        oa.push(this.arr(k, argsArr));
                        break;
                    
                    case Object:
                        oa.push(this.obj(k, argsArr));
                        break;
                
                    default: oa.push(k);
                }
            }

            return oa;
        },

        obj: function(oo, argsArr)
        {
            var newo = {}, k;
            for(x in oo) if(oo.hasOwnProperty(x))
            {
                k = oo[x];
                switch (k.constructor)
                {
                    case Array:
                        newo[x] = this.arr(k, argsArr);
                        break;
                    
                    case String:
                        newo[x] = this.str(k, argsArr);
                        break;
                    
                    case Object:
                        newo[x] = this.obj(k, argsArr);
                        $.writeln("---> " + Object.keys(newo[x]))
                        break;

                    default: 
                        newo[x] = k;
                        break;
                }
            }

            $.writeln(newo.hasOwnProperty("yoyo"))
            return newo;
        }
    }
    
    switch (this.constructor)
    {
        case String:
            return ff.str(this, fargs);

        case Array:
            return ff.arr(this, fargs);
        
        case Object:
            return ff.obj(this, fargs);

        default: return this;
    }
}

Object.prototype.in = function()
{

}

Object.prototype.is = function()
{

}

Object.prototype.isnt = function()
{

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
