function stringify(o, pad)
{//------------------------------------
 // r: Result, V:value, o:Object, k:Key.
    var r      = "";
    S = " ".repeat(pad * stringify.level);
    C = ": ";
    J = "\n";
    T = _m.typeof(o); 


    if(T == 'object')
    {
        if(stringify.level > stringify.maxLevel) return _m.bracket( T.title() + " w/len: " + Object.size(o)); 

        r += "{\n";
        for(k in o) if(o.hasOwnProperty(k))
        {
            V = o[k];
            TT = _m.typeof(V); // object, array, file, regexp, date..etc

            if(TT == 'object') stringify.level++;
            V = stringify(V);
            
            r +=  (S + k + C + V + J); //(space)key: [Type]: Value (\n)
        }
        r += "}";
        return r;
    }

    /*
    if(T == 'array')
    {
        var i =0, len = o.length;
        for(;i < len ;i++)
        {
            V = o[i];
            T = _m.typeof(V);
            if(['object', 'array'].includes(T))
            {
                a = 1;
                stringify.level++;
                if(a) V = stringify(V, pad * (stringify.level));
                else  V = _m.bracket( T.title() + " w/len: " + Object.size(V));// [Type w/len: 6]
            }
            else //if value:
            {
                V  = _m.bracket(T.title()) + ": " + V.toString(); // [Type]: Value
            }
            r +=  (!i?J:'') + (S + i + C + V + ',' + J); //(space)key: [Type]: Value (\n)
        }
        return _m.bracket(r); // [0:[Number]:1, 1:[Number]:2, 2:[Number]:3]
    }
    */
    
    return _m.bracket(T.title()) + ": " + o.toString(); //[Type]: value
}
stringify.level = 0;
stringify.maxLevel = 1;

newO = stringify(new Date(Date.now()), 4);
$.writeln(newO);