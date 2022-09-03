
// Example
// =========================================
// $.writeln(new Expression(function(){

//     var i = textIndex -1;
//     if(
//          GEN[(($p0 <= i && $p1 <= 78 && $p3 <=55)), "", "||\n0", "||\n"]
//     ){100}else{$p3};

//          GEN[($p0 == "is great"), "", "\n", "\n"]
//     }, 
//     {
//     "$p0": [2,3,5],
//     "$p1": [2,3,1],
//     "$p3": 45
// }).result); ==> valid expression string

eval(CLASS.re("$.global", "Expression"))

    [PROTO]
    ({
        create: function(fn, cfg)
        {
            this.func = fn;
            this.config = cfg;
            this.result = this.func.toString();

            this.parseGen();
            this.standardReplace();
            
            return this.result;
        }
    })

    [STATIC]
    ({
        __name__: "PATTERNS",
        
        PATTERNS: {
            "GEN": /GEN\[\((.*)\)\,(.*)\,(.*)\,(.*)\]/g
        }   
    })

    [PROTO]
    ({
        __name__: "REPLACERS",
        
        standardReplace: function()
        //@@requires ["PRIM.String.PROTO.REPLACERS._replace"]
        {
            this.result = this.result._replace(this.config);
        }
    })


    [PROTO]
    ({
        __name__: "PARSERS",

        parseGen: function()
        //@@requires ["PRIM.Object.mostRecurring", "PRIM.Object.first"]
        //@@requires ["DATA.JSON", "PRIM.String.PROTO.REPLACERS._replace"]
        {
            var F = this.result;
            var cfg = this.config;
            var G = [], i=-1;

            while(match = Expression.PATTERNS.GEN.exec(F))
            {
                G.push({
                    firstIndex: match.index,
                    lastIndex: match.index + match[0].length,
                    config : {},
                    expr: match[1],
                    keys: match[1].match(/\$(\w+)/g),
                    startsWith: match[2],
                    endsWith: match[3],
                    joinedWith: match[4]
                })
            }

            var g, R, j;
            var offset = 0;
            while(++i<G.length)
            {
                R = []; j =-1;
                g = G[i];
                            
                // get relevant keys, and select the arrays with the most recurring length:
                var k;
                for(k in cfg) if(k.in(cfg) && k.in(g.keys)) g.config[k] = cfg[k];
                g.config = Object.mostRecurring(g.config, Array, "length");
                // get array size:
                var genSize = g.config[Object.first(g.config)].length >>> 0;

                while(++j<genSize)
                {
                    R.push(g.expr._replace(g.config, function(v){return v[j]}));
                }


                if(!R.length) return F;
                R = deser(g.startsWith) + R.join(deser(g.joinedWith)) + deser(g.endsWith);

                // Replace 
                F = F.replaceBetween(
                    g.firstIndex + offset,
                    g.lastIndex + offset, 
                    R
                );

                offset += (R.length -( g.lastIndex - g.firstIndex));
            }

            this.result = F;
        }
    })