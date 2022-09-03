delete(Object.prototype.in);
Object.prototype.in = function(oo)
{
    var T = this;

    switch(oo.constructor)
    {
        case Object:
            return oo.hasOwnProperty(T);
        
        case Array:
            /*
                if T is a number, treat it as the index
                if T is a string, treat it as an element
            */
            
            if(!isNaN(T) && T == parseInt(T) && !!oo[T]) return true;

            if(T.constructor == String)
            {
                var i = -1, len = oo.length;
                while(++i<len) if(oo[i] == T) return true;
            }
            return false;
            
        default:
            return false;
    }
}