
;eval(MODULE.re("$.global", "ShapeBank"))

    [STATIC]
    ({
        __name__: "FILE",

        bank: 0,
        bankPath: "c:/xto/banks/shape.json",
        
        getBank: function()
        //@@requires ["this.bankPath", "this.bank"]
        //@@requires ["DATA.JSON"]
        {
            return ShapeBank.bank || (ShapeBank.bank = deser(this.bankPath)); 
        }
    })

    [STATIC]
    ({

        __name__: "GETTERS",

        shape: function(name, props)
        //@@requires ["PRIM.Object.adapt"]
        //@@requires ["module.STATIC.getBank"]
        //@@requires ["PRIM.String.PROTO._replace"]
        {
            var S = ShapeBank.getBank()[name];

            // Seperate independet variables from dependent ones
            var P = S.params, I = {}, D = {};
            
            for(p in P) if(p.in(P))
            {
                if(is(P[p], Number) && !is(P[p], String)) I[p] = P[p]
                else D[p] = is((fn = eval(P[p])), Function)? fn:undefined; 
            }

            props = Object.adapt(props, I);

            // loop through all:
            var i = -1;
            while(++i < S.vertices.length)
            {
                // Replace all "radius" strings with the actual value supplied
                // in passed props Object, find a solution for dependent
                // variables

                var vx = S.vertices[i][0],
                    vy = S.vertices[i][1];

                var ix = S.intang[i][0],
                    iy = S.intang[i][1];

                var ox = S.outang[i][0],
                    oy = S.outang[i][1];

                S.vertices[i][0] = eval(vx._replace(I));
                S.intang[i][0]   = eval(ix._replace(I));
                S.outang[i][0]   = eval(ox._replace(I));

                S.vertices[i][1] = eval(vy._replace(I));
                S.intang[i][1]   = eval(iy._replace(I));
                S.outang[i][1]   = eval(oy._replace(I));
            }
        }
    })