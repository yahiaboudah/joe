
Number

    [PROTO]
    ({
        __name__: "RANGE",

        inRange: function(range, x, y)
        {   
            // x,y if <= or < (strict or not)
            var N = this;
            x = x? (N >= range[0]): N > range[0];
            y = y? (N <= range[1]): N < range[1];

            return x && y;
        }
    })

    [PROTO]
    ({
        __name__: "OPOVR",

        '^': function(v)
        {
            var N = this;
            return Math.pow(N, v);
        }
    })

    [PROTO]
    ({
        __name__: "JSON",
        toJSON: function(){
            return this.valueof();
        }
    })