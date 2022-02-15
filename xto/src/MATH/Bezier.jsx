["Bezier.prototype", "VALUE AT T", "CURVE SPLITTING", "DEGREE ELEVATION", "DERIVATIVE", "CURVE ALIGNEMENT", "BOUNDING BOXES", "ARC LENGTH", "CURVATURE"],
["Bezier", "UTILS"]

$.global.Bezier = function Bezier(coords)
{
    this.points = [];
    for(c in coords) this.points.push(coords[c]);
    this.degree = this.points.length -1;

    this.start = coords[0];
    this.end   = coords[coords.length-1];
    this.controls = (coords.shift(), coords.pop(), coords);
}

Bezier.prototype.toString = function()
{
    return this.points.se();
}

// [VALUE AT T]
Bezier.prototype.xt("VALUE AT T", {

    pointsWithStep: function(step, method)
    {
        var P = [], p;
        var t = 0, tn = 1;

        if(!(step && step.is(Number))) step = 0.1; 
        step = Math.abs(step <= 1?step:(1/step));

        for(;t <= tn; t += step)
        {
            // p = this["{0}_pointAt".re(method || 'M')](t);
            P.push(this.DC_pointAt(t));
        }

        return P;
    },

    // w/ DeCastaljau's algorithm:
    DC_pointAt: function DC(t, p)
    {
        if(!(p && p.is(Array))) p = this.points;

        var len = p.length;
        if(len == 1) return p[0];

        var pp = [], i = -1;
        while(++i<len-1)
        {
            pp[i] = (1-t) * p[i] + t * p[i+1];
        }

        return DC(t, pp);
    },

    // w/ Bernstein polynomials:
    BR_pointAt: function(t)
    {
        var P = this.points;

        var sum = 0, i = -1;
        while(++i<=n) sum += (Bezier.Bernstein(i, n, t) * P[i]);

        return sum;
    },

    // w/ Matrix operations:
    M_pointAt: function(t)
    {
        // QUADRATIC BEZIER CURVE EXAMPLE:

        var T = M([
            [1, t, t^2]
        ]);

        var M = M([
            [1 ,  0, 0],
            [-2,  2, 0],
            [1 , -2, 1]
        ]);

        var P = M(this.points);

        return T * M * P;
    },
})

// [UTILITIES: BERNSTEIN, BINOMIAL COEFF..]
Bezier.xt(, "UTILS"{

    PASCALS: [[1]],

    mapToDistance: function(A, offset)
    {
        if(!offset) offset = [0, 0];

        var A = A;
        for(x in A) if(x.in(A))
        {
            A[x] = Math.sqrt(
                    Math.pow(A[x][0] - offset[0], 2)
                    + Math.pow(A[x][1] - offset[1], 2)
            );
        }

        return A;
    },

    // Binomial Coefficients:
    BC: function(n, i)
    {
        var P = Bezier.PASCALS;
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

        Bezier.PASCALS = P;
        return P[n][i];
    },

    Bernstein: function(i, n, t)
    {
        return Bezier.BC(n, i) * ((1-t)^(n-i)) * (t^i);
    },

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

// [CRUVE SPLITTING]
Bezier.prototype.xt({

    DC_split: function(t)
    {
        var L = R = [];

        var DC = function DC(z, p)
        {
            var len = p.length,
                one = (len === 1);

            L.push(p[0]);
            R.push(one?p[0]:p[len-1]);
            if(one) return;

            var pp = [], i = -1;
            while(++i<len-1)
            {
                pp[i] = (1-t) * p[i] + t * p[i+1];
            }

            DC(z, pp);
        }

        DC(t, this.points);
        return [L, R];
    },

    M_split: function()
    {

    }
})

// [DEGREE ELEVATION]
Bezier.prototype.xt({

    // DE_MATRIX = [
    //     [1,0,0,0],
    //     [1/k, (k-1)/k,0,0],
    //     [0, 2/k,(k-2)/k,0],
    //     [0,0, 3/k, (k-3)/k],
    //     [0,0,0,1]
    // ],
    
    DE_Matrix: function()
    {
        var P = this.points;
        var D = this.degree;
        var N = this.degree + 1;

        var DMX = new M(N+1, N);
        DMX.set(0, 0, 1);
        DMX.set(N, N-1, 1);

        while(++i < N)
        {
            DMX.set(i, i-1, i/N);
            DMX.set(i, i, (N-i)/N);
        }

        return DMX;
    },

    M_elevate: function()
    {
        return this.DE_Matrix() * M(this.points);
    },

    elevate: function()
    {
        var P = this.points,
            D = this.degree;

        var Q = [P[0]];

        var i = 0, s;
        while(++i<=D)
        {
            s = (i/(D+1));
            Q[i] = s*P[i-1] + (1-s)*P[i];
        }

        Q.push(P[D]);
        return new Bezier(Q);
    },

    elevateN: function(n)
    {
        var B = this;
        while(n--) B = B.elevate();

        return B;
    }
})

// [DERIVATIVE]
Bezier.prototype.xt({

    // return a Bezier of order (D-1)
    derivative: function()
    {
        var P = this.points,
            D = this.degree;

        var i = -1, PP = [];
        while(++i<=(D-1))
        {
            PP.push(D*(P[i+1]-P[i]));
        }

        return new Bezier(PP);
    },

    // return derivative value
    deriv: function(t)
    {
        return this.derivative().M_pointAt(t);
    }
})

// [CURVE ALIGNMENT]
Bezier.prototype.xt({

    // A = R*T*P:
    alignAlongX: function()
    {
        var P = this.points, Q;

        // 1) Translate by -P0
        var T = P[0] * -1;
        for(p in P) if(p.in(P)) P[p] = P[p] + T;
        
        // 2) Rotate by θ (find θ first): x,y of last point
        var x = P[P.length-1][0],
            y = P[P.length-1][1];

        var R = M([
            [1/Math.sqrt(1+(y/x)*(y/x)), y/Math.sqrt(x*x+y*y)],
            [-y/Math.sqrt(x*x+y*y), 1/Math.sqrt(1+(y/x)*(y/x))]
        ]);
        
        Q = R * M(P);

        return aligned = new Bezier(Q);
    }
})

// [BOUNDING BOXES]
Bezier.prototype.xt({

    getXs: function()
    {
        var P = this.points, Q;
        for(x in P) if(x.in(P)) Q.push(P[x][0])

        return Q;
    },

    getYs: function()
    {
        var P = this.points, Q;
        for(x in P) if(x.in(P)) Q.push(P[x][1])

        return Q;
    },

    BBox: function(T/*ightness*/)
    {
        switch(T)
        {
            case 0: // do min/max of Bezier-polygon
                break;
            
            case 1: 
                // find roots of (x'(t) = 0) and (y'(t) = 0)
                break;
            case 2:
                /*
                    1) Align the curve
                    2) Find roots of x'(t) = 0, y'(t) = 0
                    3) De-align the BBox back using -T and inv(R[θ])
                */
                break;
        }
        //return bounding box:
        return [B0, B1]
    },

})

// [ARC LENGTH FUNCTION]
Bezier.prototype.xt({

    // using curve FLattening 
    FL_length: function(n)
    {
        var B = this;
        
        var i = -1, L = [];
        while(++i<n)
        {
            L.push(B.M_pointAt((i+1)/n) 
                    - B.M_pointAt(i/n));
        }

        return Math.sum.apply(
            null, 
            Bezier.mapToDistance(L, [0,0])
        );
    }
})

// [CURVATURE]
Bezier.prototype.xt({

    kappa: function(t)
    {
        var B = this;
        var D = B.derivative();
        var S = D.deriv(t);
            D = D.M_pointAt(t);

        return (
            (D[0] * S[1] - S[0] * D[1])
            /
            Math.pow(D[0]*D[0] + D[1]*D[1], 1.5) 
        )
    }
})