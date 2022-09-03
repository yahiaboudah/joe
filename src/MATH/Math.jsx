
Math

    [STATIC]
    ({
        __name__: "MULTIPLIERS",
        
        mult : function()
        {    
            var A = arguments.slice(); 
            var i = A.length, k = 1;
            while(i--) k *= A[i];
        
            return k;
        }
    })

    [STATIC]
    ({
        __name__: "CONVERTERS",

        degToRad : function(D)
        {
            return D * Math.PI / 180;
        },

        radToDeg : function(R)
        {
            return R * 180 / Math.PI;
        }
    })

    [STATIC]
    ({
        __name__: "BINOMIALS",

        PASCALS: [[1]],

        // Binomial Coefficients:
        BC: function(n, i)
        {
            var P = this.PASCALS;
            var N = P.length;
            if(n <= N) return P[n][i];

            var k = n;
            while(k > N)
            {
                A = [1];
                PA = P[P.length-1], i = -1;
                while(++i < PA.length-1)
                {
                    A.push(PA[i] + PA[i+1]);
                }
                A.push(1);
                P.push(A);
                k++;
            }

            this.PASCALS = P;
            return P[n][i];
        },

        Bernstein: function(i, n, t)
        //@@requires ["this.BC"]
        {
            return this.BC(n, i) * ((1-t)^(n-i)) * (t^i);
        },
    })

    [STATIC]
    ({
        __name__: "ROOT_FINDING",
        
        // [Newton-Raphson for root-finding]
        nraphson: function(F, DF, maxIter, tolerance)
        {
            if(!is(maxIter, Number))   maxIter = 20;
            if(!is(tolerance, Number)) tolerance = 0.001;

            var x = 5, x0;
            
            var i = -1;
            while((++i < maxIter) && (Math.abs(x-x0) > tolerance))
            {
                x0 = x - F.call(x)/DF.call(x);
                x = x0;
            }

            return x0;
        }
    })