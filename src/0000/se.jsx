//=============================
delete(Object.prototype.se);
Object.prototype.se = function()
{
    var that = this;

    var indent        = 0,
        defaultIndent = 8;

    var space = function(n){
        var s = "";
        while(n--) s+= " ";
        return s;
    }
    
    function _se(kk, dt)
    {
        var k = kk;
        if(k === undefined || k === null) return "undefined";
        if(!!dt) indent = dt;
        var str = "",
            kC  = k.constructor.name;

        switch(kC)
        {
            case "Object":
            case "Array":
            
                str += 
                    {
                        Array:  space(indent) + "[\n",
                        Object: space(indent) + "{\n"    
                    }[kC];

                var v,
                    x,
                    C,
                    LINK    = " : ";
                    vindent = indent;

                for(x in k) if(k.hasOwnProperty(x))
                {
                    v = k[x];
                    C = ((v === undefined || v === null)? undefined:v.constructor.name);
                    LINK += "[" + C + "] ";

                    if( C == "Object"
                    ||  C == "Array")
                    {
                        vindent += defaultIndent;
                        LINK += "\n";
                    }
                    
                    str += (
                            space(indent) 
                            + x
                            + LINK
                            + _se(v, vindent)
                            + "\n"
                            );

                    LINK = " : ";
                    vindent = indent;
                }

                str += 
                    {
                        Array :  space(indent) + "]",
                        Object:  space(indent) + "}"
                    }[kC];

                indent -= defaultIndent;
                if(indent < 0) indent = 0;
                break;

            default:
                str += k.toString();
                break;
        }

        return str;
    }

    return (
            "-----------------------"
        + "\n"
        + _se(that)
        + "\n"
        + "======================="
    )
}
