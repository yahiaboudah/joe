
/*
    @requires ["AFFX/CompItem" , "DATA/File"]
*/

// [CONSTRUCTORS]: {create, fromArray, fromEntries}
Object.xt({
    
    create: function(proto)
    {
        function F(){}
        F.prototype = proto;
    
        return new F();
    },

    fromKeys: function(A, defV)
    {
        var O = {}, i=-1;
        while(++i<A.length) O[A[i]] = defV || 0;

        return O;
    },

    fromArray: function(A)
    {    
        var O = {};
        for(a in A) if(a.in(A) && A[a].is(Array))
        {
            O[A[a][0]] = A[a][1];
        }

        return O;
    },

    fromEntries: function(A)
    {
        var O = {};
        for(a in A) if(a.in(A)) O[A[a]] = '';

        return O;
    },
})

// [GETTERS]: {pureKeys, keys, values, size, keyExists}
Object.xt({

    first: function(oo)
    {
        for(x in oo) if(x.in(oo)) return x;
    },

    /*
    allKeys returns the keyPaths that lead to a value that
    is not an Object
    */
    allKeys: function allKeys(oo, noObject)
    {
        var K = ks = [];
        for(var x in oo) if(x.in(oo))
        {
            v = oo[x];
            if(is(v, Object))
            {
                if(!noObject) K.push(x);
                ks = allKeys(v, noObject), i=-1;
                while(++i<ks.length) K.push("{0}/{1}".re(x, ks[i]));
            }
            else K.push(x);
        }

        return K;
    },

    keys: function keys(oo)
    {
        var A = [];
        for(x in oo) if(x.in(oo)) A.push(x);
        return A;
    },

    detailedKeys: function detailedKeys(oo)
    {
        var DK = {"keys": []}

        var k, e;
        for(k in oo) if(k.in(oo))
        {
            e = oo[k];
            if(is(e, Object)) (DK[k] = detailedKeys(e), DK.keys.push(k));
            else DK.keys.push(k);
        }

        return DK;
    },

    /*
    * Create nested Object.value
    */
    value: function(oo, P)
    {
        if(!is(P, String)) return undefined;
        var V;
        eval("V = oo{0};".re(P.split('/')._join(function(x){return "[\"{0}\"]".re(x)})));

        return V;
    },

    values: function(oo)
    {
        var V = [];
        for(x in oo) if(x.in(oo)) V.push(oo[x]);

        return V;
    },

    detailedValues: function detailedValues(oo)
    {
        var V = {"values": []};
        
        var k,e;
        for(k in oo) if(k.in(oo))
        {
            e = oo[k];
            if(is(e, Object)) (V[k] = detailedValues(e) ,V["values"].push(e));
            else V.values.push(e);
        }

        return V;
    },

    nestedSize: function nestedSize(oo)
    {
        var S = {size: 0};

        var k, e;
        for(k in oo) if(k.in(oo))
        {
            e = oo[k];
            if(is(e, Object)) (S[k] = nestedSize(e), S.size++);
            else S.size++;
        }

        return S;
    },

    size: function(oo)
    {
        var k, S=0;
        for(k in oo) if(k.in(oo)) S++;
        return S;
    },

    mostRecurring: function(oo, cns, prop)
    {
        var x,v;
        var bb = {};
        var cc = {};
        var dd = {};

        for(x in oo) if(x.in(oo))
        {
            v = oo[x];
            if(is(v, cns)) bb[x] = v[prop];
        }

        for(x in bb) if(x.in(bb))
        {
            if(bb[x].in(cc)) cc[bb[x]] = cc[bb[x]]+1;
            else cc[bb[x]] = 1;
        }

        var max = 0, L;
        for(x in cc) if(x.in(cc))
        {
            if(cc[x] > max)
            {
                max = cc[x];
                L = x;
            }
        }
        
        for(x in bb) if(x.in(bb))
        {
            if(bb[x] == L) dd[x] = oo[x];
        }

        return dd;
    }
})

// [SETTERS]: {modify, adapt}
Object.xt({
    
    modify: function(oo, P, V, debug)
    {
        var K = P.split('/'),
            S = "oo{0}".re(K._join(function(x){return "[\"{0}\"]".re(x)}));

        var expr = "{0} = {1};".re(S, V._toSource());
        if(debug) $.writeln("{0}(path={1},value={2}): expr={3}".re("Object.modify",P,V,expr))
        eval(expr);

        return oo;
    },

    // Work on nested adapt:
    adapt: function adapt(oo, O, nested) //O is the template object
    {
        if(!is(O, Object)) throw Error("Template Obejct is undefined!")
        if(!is(oo, Object)) return O;
        if(is(nested, undefined)) nested = true;
        
        for(var k in O) if(k.in(O) && k.in(oo) && !!(v=oo[k]))
        {
            if(is(O[k], Object) && nested) O[k] = adapt(v, O[k], nested);
            else O[k] = v;
        }

        return O;
    }

})

// [DEBUGGERS]: {info, write, print, inspect}
Object.xt({
    
    info: function()
    {
    
        var o = {
            prop: "properties",
            func: "methods",
            errMsg: "Can inspect properties or methods only! (prop/func)"
        }
    
        if (chk = Arguments.paramCheck(arguments, true)) throw Error(chk.errMsg);
        if (["prop", "func"].indexOf(info) < 0)          throw Error(o.errMsg);
        if (typeof obj == "undefined")                   throw Error("An undefined value was passed");
        if (typeof exec == "undefined")   exec   = false;
        if (typeof objSrc == "undefined") objSrc = false;
        if (typeof cr == "undefined")     cr     = false; 
        if (typeof info == "undefined")   info   = "prop";
    
    
        info = o[info];
        var props = obj.reflect[info];
            str   = "";
    
    
        if (info == o.prop) {
                props.forEach(function(prop) {
                        val = objSrc ? thiss[prop].toSource() : thiss[prop];
                        str += prop + " : " + uneval(val) + "\n";
                })
        }
    
        if (info === o.func) {
                props.forEach(function(prop) {
                        val = "";
                        if (exec) {
                                prop = prop.toString();
                                if (!prop.startsWith("set")) {
                                        eval("try {val = thiss." + prop + "();}" +
                                                "catch(e) { val = e; }");
                                }
                        }
                        str += (prop + " : " + (val));
                })
        }
    
    
        if (cf) new File($.fileName.replace(/\.[a-zA-Z]+/, ".info.txt")).$create(str);
        return str;
    },

    print: function(obj, lvl, writeit)
    {
        if(typeof obj == "undefined") return "undefined";
        if(typeof lvl  == "undefined") lvl = Math.pow(2, 10);
        if(typeof noprint == "undefined") writeit = false;
    
        var str = "",
            hdr = "",
            max = 50;
    
        hdr = "[{0}]: w/len: {1}".re(obj.constructor.name, Object.size(obj));
        str    = (frame(hdr, max) + Object.stringify(obj, lvl));
    
    
        if (writeit) $.writeln(str);
        
        return str;
    },

    write: function(obj, FP, appnd)
    {
        if(is(oo, undefined)) throw Error("Arg not an object");
        if(is(FP, undefined)) FP = File($.fileName).fsName; 
        if(is(ap, undefined)) ap = true;

        ff    = new File(FP + $.scriptName()).withExtension(".md"),
        wr    = Object.print(obj, true, false);
        
        if (ff.exists && apnd) ff.$write(wr, 'a');
        else ff.$create(wr);
        return ff.fsName;
    },

    inspect: function(oo)
    {
        var ps = Object.fromEntries(oo.reflect.properties),
            fs = Object.fromEntries(oo.reflect.methods);
    
        for(x in ps) if(x.in(ps)) ps[x] = oo[x];
        for(y in fs) if(y.in(fs)) fs[y] = "[\"\"] => {0}".re(oo[y].call(undefined, []));
    
        return {
            pp: ps,
            ff: fs
        };
    },
})

// [VALIDATORS]: {dcKeys, validate, validateKeys}
Object.xt({
                    
    keyExists: function(oo, keyPath)
    {
        var K = keyPath.split('/'), i= -1;
        while(++i<K.length)
        {
            if(!oo.hasOwnProperty(K[i])) return false;
            oo = oo[K[i]];
        }

        return true;
    },
    
    dcKeys: function cKeys(a, b){

        if(!(
            
            a && b &&
            a.is(Object) && b.is(Object) &&
            Object.size(a) == Object.size(b)

        ))  return false;

        for(x in a) if(x.in(a)){
            
            if(!x.in(b)) return false;
            
            if(a[x].is(Object))
            {
                if(!(
                    
                    b[x].is(Object) &&
                    Object.dcKeys(a[x], b[x])
                
                )) return false;
            }
        }

        return true;
    },

    validate:  function(oo, bo)
    {   // I don't like this function
        var type = function(v)
        {
            if(v.in([undefined, null])) return 'undefined';
            if(typeof v == 'xml')       return 'xml';
            return v.constructor.name.toLowerCase();
        }
    
        if(type(oo) != type(bo))  return false; 
        if(type(oo) == 'object')  return Object.dcKeys(oo, bo);
        if(type(oo) == 'array')   return !(oo<bo || oo<bo);
    
        return (oo == bo);
    },

    validateKeys: function(oo, keys)
    {
        var i =-1;
        while(++i<keys.length)
        {
            if(!Object.keyExists(oo, keys[i])) return false;
        }
        
        return true;
    }
})