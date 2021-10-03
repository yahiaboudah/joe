/*******************************************************************************
		Name:           $math
		Desc:           Math extensions and utils.
		Path:           /utjsx/$math.jsx
		Created:        2109 (YYMM)
		Modified:       2110 (YYMM)
*******************************************************************************/

(function ComplexNumbers(g, s)
{
    // UTILITIES
    // ---------------------------
    var mSqr = Math.sqrt,
        mCos = Math.cos,
        mSin = Math.sin,
        mAtan2 = Math.atan2,
        kDeg = 180/Math.PI,
        kRad = Math.PI/180,
        m2 = function(){return this.x*this.x+this.y*this.y;},
        eq = function(z){return this.x==z.x && this.y==z.y;},
        cx = function(z){return z instanceof cstr;},
        df = function(z){return cx(z)?z:{x:+(z||0),y:0};};
    
    // CONSTRUCTOR
    // ---------------------------
    var cstr = function Complex(re,im)
        {
        this.x = +re;
        this.y = +im;
        };
    
    // INTERFACE (INCLUDING OPERATORS)
    // ---------------------------
    cstr.prototype = {
        toString: function()
            {
            return [this.x,this.y].toString();
            },
        valueOf: function()
            {
            return (this.y)?NaN:this.x;
            },
        // MAGNITUDE : |Z|
        mag: function()
            {
            return mSqr(m2.call(this));
            },
        // INVERSION : 1/Z
        inv: function()
            {
            if( this==0 ) return NaN;
            return (~this)*(1/(m2.call(this)));
            },
        // ARGUMENT (PHASE) in radians
        arg: function()
            {
            if( this==0 ) return NaN;
            return mAtan2(this.y,this.x);
            },
        // ARGUMENT (PHASE) in degrees
        deg: function()
            {
            return kDeg*this.arg();
            },
        // ADDITION
        "+": function(z)
            { // Supports: +Z | Z+X | X+Z | Z+Z'
            var xy = df(z);
            return new cstr(
                this.x + xy.x,
                this.y + xy.y
                );
            },
        // MULTIPLICATION
        "*": function(z)
            { // Supports: Z*X | X*Z | Z*Z'
            var xy = df(z);
            return new cstr(
                this.x*xy.x - this.y*xy.y,
                this.x*xy.y + this.y*xy.x
                );
            },
        // SUBTRACTION
        "-": function(z,rev)
            { // Supports: -Z | Z-X | X-Z | Z-Z'
            if( !z ) return new cstr(-this.x,-this.y);
            return (rev)?(z+(-this)):(this+(-z));
            },
        // DIVISION 
        "/": function(z, rev)
            { // Supports: Z/X | X/Z | Z/Z'
            if( cx(z) ) return this*(z.inv());
            return (rev)?(z*this.inv()):this*(1/z);
            },
        // EQUALITY
        "==": function(z)
            { // Supports: Z==X | X==Z | Z==Z'
            return eq.call(this,df(z));
            },
        // CONJUGATE FORM
        "~": function()
            { // Supports: ~Z
            return new cstr(this.x,-this.y);
            },
        // INTEGER POWER
        "^": function(n,rev)
            { // Supports: Z^N
            if( rev || n!==~~n ) return NaN;
            if( n==0 ) return cstr.unity;
            if( n<0 ) return 1/(this^(-n));
            var r = +this; // clone
            while( --n ) r*=this;
            return r;
            },
        // ROTATION
        "<<": function(/*degrees*/aDeg,rev)
            { // counterclockwise rotation about [0,0]
            if( rev ) return NaN;
            if( !aDeg ) return +this;
            var a = aDeg*kRad,
                z = new cstr(mCos(a),mSin(a));
            return this*z;
            },
        ">>": function(/*degrees*/aDeg,rev)
            { // clockwise rotation about [0,0]
            if( rev ) return NaN;
            return this<<(-aDeg);
            },
        };
    
    // CONSTANTS
    // ---------------------------
    cstr.zero = new cstr(0,0);
    cstr.unity = new cstr(1,0);
    cstr.i = new cstr(0,1);

    g[s] = cstr;

})($.global, "Complex");

(function MathExtens(){
    
    Math.mult = function(){
        var args = Array.prototype.slice.call(arguments);
        
        var i = args.length, mm = 1;
        while(i--) mm *= args[i];
    
        return mm
    }

})();