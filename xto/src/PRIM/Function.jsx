
// [BIND BODY TIME]
Function.prototype.xt({
    
    body: function(repConfig)
    {   
        var _replace = function(SS, cfg)
        {
            var S = SS;
            for(x in cfg) if(x.in(cfg))
            {
                S = S.split(x).join(cfg[x])
            }
            return S;
        }

        return _replace(this.toString()
                    .replace(/^[^{]*\{[\s]*/,"    ")
                    .replace(/\s*\}[^}]*$/,""), repConfig);
    },
    
    time: function(thisArg, args, n)
    {
        const MICS = 1000000;
        var F = this;

        var tt = 0, k  = n || 1;
        while(k--)
        {
            $.hiresTimer;
            F.apply(thisArg, args);
            tt += $.hiresTimer;
        }
    
        return ((tt/n)/MICS);
    },
})

// [PARSING, CHECKING ARGS]
Function.prototype.xt({
    
    getArgs: function(nocom)        /*
    * Get a function args 
    (eg. this.getArgs(Arguments.getArgs) => ["nocom"])
    */
    {  
        if(!nocom) nocom = true;
        return this.toString().split(/\)\/*/)[0]
                        .replace(/^[^(]*[(]/, '')  
                        .replace(/\s+/g, '')
                        .replace(nocom?/\/\*([\s\S]*?)\*\//g:'','')
                        .split(',');    
    },

    params: function()
    /** 
    * Extract parameter names and types.
    */
    {
        var P = this.getArgs(), pLen = P.length;
        var k = 0;

        while(++k<pLen)
        {
            var p = P[k],
                s = p.split("*/"),
                z = s[0], o = s[1];
            
            P[k] = z.slice(0, 2) == "/*"?
                    "{0}:{1}".re(z.slice(2), o):
                    "Any:{0}".re(z);
        }

        return P;
    },

    check: function(/*Object*/ args, /*Boolean*/ opt, /*Boolean*/ lmt)
    { 
        const BAD_ARG = "BadArg in {0}\nArg {1} is [{2}] and not [{3}]";
        var S = $.stack.split("\n");

        if(!(opt && opt.is(Boolean))) opt = false;
        if(!(lmt && lmt.is(Boolean))) lmt = true;

        var FName   = S[S.length - 3].split("(")[0],
            FParams = this.params();
        
        if((g = args.length) != (p = FParams.length))
        {
            if(g>p && lmt)  throw Error("Extra Args were supplied in {0}.".re(FName));
            if(g<p && !opt) throw Error("Missing args in {0}".re(FName)); 
        }

        for(i in args) if(i.in(args)) 
        {
                var _S  = FParams[i].split(':'),
                    PType = _S[0].toLowerCase(),
                    PName = _S[1];
                
                var AValue = args[i],
                    AType  = (!!AValue?AValue.constructor.name.toLowerCase():
                                undefined);

                if(
                    !AType ||
                    (PType).in(["any", AType])
                ) continue;

                throw Error(
                    BAD_ARG.re(
                        FName,
                        "[{1}:{0}]".re(PName, i),
                        AType, PType
                ));
        }
    },

})