delete(Object.prototype.is);
Object.prototype.is = function()
{
    var O = this, T;

    var A = Array.prototype.slice.call(arguments),
        T = (O == "undefined")? undefined: O.constructor; //type

    var i = -1;
    while(++i<A.length) if(T == A[i]) return true;

    return false;
}