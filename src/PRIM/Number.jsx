$.global.num = function(n){return new Number(n)}

// [OPERATOR OVERLOADING]
Number.prototype.xt({

    '^': function(v)
    {
        var N = this;
        return Math.pow(N, v);
    }
})

// [Range Functions]
Number.prototype.xt({

    inRange: function(range, x, y)
    {   
        // x,y if <= or < (strict or not)
        var N = this;
        x = x? (N >= range[0]): N > range[0];
        y = y? (N <= range[1]): N < range[1];

        return x && y;
    }
})