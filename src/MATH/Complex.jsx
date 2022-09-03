

eval(CLASS.re("$.global", "Complex"))

    [PROTO]
    ({
        __name__: "CONSTRUCTOR",
        
        create: function(re, im){
            this.x = +re;
            this.y = +im;
        }
    })

    [STATIC]
    ({
        ZERO : new Complex(0, 0),
        UNITY: new Complex(1, 0),
        I    : new Complex(0, 1)
    })

    [PROTO]
    ({
        __name__: "DISPLAYERS",

        toString: function()
        {
            return "{0}{2}{1}{3}".re(
                this.x,
                this.y?this.y:'',
                this.y>0?'+':this.y==0?'':'-',
                this.y?this.y:'i'
                );
        },
    })

    [PROTO]
    ({
        __name__: "OPOVR",
        
        '+': function(z)
        {
            var xy = this.def(z);

            return new Complex(
                this.x + xy.x,
                this.y + xy.y
            )
        },

        '-': function(z)
        {
            if(!z) return new Complex(-this.x, -this.y);
            return rev?
                    z + (-this):
                    (this + (-z));
        },

        '*': function(z)
        {
            var xy = this.def(z);
            
            return new Complex(
                this.x * xy.x - this.y * xy.y,
                this.x * xy.y + this.y * xy.x
            )
        },

        '/': function(z, rev)
        {
            if(z instanceof Complex) return this*(z.invert());

            return rev?
                    z * this.inv():
                    this * (1/z);
        },

        '==': function(z)
        {
            var xy = this.def(z);
            
            return this.x == xy.x
                && this.y == xy.y; 
        },

        '~': function()
        {
            return new Complex(this.x, -this.y);
        },

        '^': function(n, rev)
        {
            if(rev) return NaN;

            if(n !== ~~n) return NaN;
            if(n  == 0)   return Complex.UNITY;
            if(n  <  0)   return 1/(this ^ (-n));
            
            var r = +this;
            while(--n) r *= this;
            
            return r;
        },

        '<<': function(aDeg, rev)
        { // RIGHT TO LEFT ROTATION around [0, 0]
            if(rev) return NaN;
            if(!aDeg) return +this;

            var a = aDeg * (Math.PI / 180);
            var z = new Complex(Math.cos(a), Math.sin(a));

            return this * z;
        },

        '>>': function(aDeg, rev)
        { // LEFT TO RIGHT ROTATION around [0, 0]
            if(rev) return NaN;
            return this << (-aDeg);
        }
    })

    [PROTO]
    ({
        __name__: "GETTERS",

        valueOf: function()
        {
            return !this.y?
                    this.x:
                    NaN;
        },

        magnitude: function()
        {
            var x = this.x, y = this.y;
            return Math.sqrt(x*x + y*y);
        },

        invert: function()
        {
            var x = this.x, y = this.y;

            if(!this) return NaN;
            return (this)*(1/(x*x + y*y));
        },

        argumentRad: function()
        {
            if(!this) return NaN;
            return Math.atan2(this.y, this.x);
        },

        argumentDeg: function()
        {
            return (180/Math.PI) * this.argumentRad();
        },

        def: function(z)
        {
            return  z instanceof Complex?
                    z:
                    {x: +(z||0), y:0}
        }
    })