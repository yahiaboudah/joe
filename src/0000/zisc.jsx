



//=====================================
//-------------------------------------
//------------- EXTRA -----------------

Object.prototype._toSource = function()
{
    var T = this;
    
    switch(T.constructor)
    {
        case String: return "\"{0}\"".re(T);
        case Array:
            var i =-1;
            while(++i<T.length) T[i] = T[i]._toSource()
            return "[{0}]".re(T.join(','));

        case Object:
            var kvpairs = []
            for(k in T) if(k.in(T)) kvpairs.push("\"{0}\":{1}".re(k.toString(), T[k]._toSource()));
            return "{{0}}".re(kvpairs.join(','));
        
        case Number:
        case Boolean: 
            return T;

        case Date:
            var struct = "FullYear-Month-Date-Hours-Minutes-Seconds", i = -1, ff = struct.split('-'), ss =[];
            while(++i<ff.length) ss.push(Date.prototype["getUTC{0}".re(ff[i])].call(T));

            return Object.prototype.re.apply("{0}-{1}-{2}T{3}:{4}:{5}Z", ss);

        default: 
            return T._toSource();
    }
}

Object.prototype.slice = function(n)
{
    return Array.prototype.slice.call(this, n);
}

$.global.is = function is(what)
{
    if(what == undefined) what = "undefined";
    return Object.prototype.is.apply(what, arguments.slice(1));
}

$.global._in = function _in(what, oo)
{
    return Object.prototype.in.call(what, oo);
}

// String * operator:
String.prototype['*'] = function(op, joinChar){
    
    joinChar = joinChar || "";
    var ss = this, ts = [ss];
    if(isNaN(op = Math.floor(op || 0))) return ss;
    
    while(op--) ts.push(ss);
    return ts.join(joinChar);
}

// Special Array _join that accepts a function arg:
Array.prototype._join = function(chr){
    var A = this, s = "";

    if(is(chr, undefined)) return A.join('');

    switch(chr.constructor)
    {
        case Function:
            var i = -1;
            while(++i<A.length) s+= chr(A[i], i);
            break;
        
        default: s = A.join(chr.toString())
    }
    
    return s;
}

// Function bind function:
Function.prototype.bind = function(T) //This 
{
    var F = this;
    var A = arguments.slice(1);

    return function(){
        return F.apply(T, arguments.slice());
    }
}