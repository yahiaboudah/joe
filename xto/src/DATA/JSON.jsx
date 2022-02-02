
$.global.JSON = (function()
{
    var JJ = {};

    "use strict";

    var rx_one = /^[\],:{}\s]*$/;
    var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
    var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
    var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
    var rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    var rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

    function f(n)
    {
        return "{0}{1}".re(
            (n < 10)? '0': '',
            n
        )
    }

    function quote(string)
    {
        rx_escapable.lastIndex = 0;
        var isRxEsc = rx_escapable.test(string);
        if(!isRxEsc) return "\"{0}\"".re(string);

        return "\"{0}\"".re(string.replace(rx_escapable, function(a){
            
            var c = meta[a];
            return c.is(String)
                    ? c
                    : "\\u" + ("0000" + a.charCodeAt(0).toString(16)) .slice(-4);
        }));
    }

    function str(key, holder) 
    {
        var i;
        var k;          
        var v;          
        var length;
        var mind = gap;
        var partial;
        var value = holder[key];

        if(is(value, Object) && is(value.toJSON, Function))
        {
            value = value.toJSON(key);
        }

        if(is(rep, Function)) value = rep.call(holder, key, value);

        switch(typeof value)
        {                        
            case "boolean":
            case "number" : if(!isFinite(value)) return "null";
            case "null"   : return String(value);

            case "string": return quote(value);
            case "object":
                
                if(!value) return "null";
                
                gap += indent;
                partial = [];

                if(value.is(Array))
                {
                    length = value.length, i = -1;
                    for(;++i<length;) partial[i] = str(i, value) || "null";

                    v = !partial.length? "[]"
                        : gap ?
                            "[\n{0}]".re(
                                gap
                                + partial.join(",\n" + gap) + "\n"
                                + mind
                            )
                            : "[{0}]".re(partial.join(','));
                    gap = mind;
                    return v;
                }

                if(rep && is(rep, Object))
                {
                    length = rep.length >>> 0, i = -1;
                    while(++i<length)
                    {
                        if(!rep[i].is(String)) continue;
                        k = rep[i], v = str(k, value);
                        if(!v) continue;
                        partial.push("{0}:{1}{2}".re(quote(k), gap?" ":"", v));
                    }
                }
                
                else for(k in value) if(k.in(value))
                {
                    v = str(k, value);
                    if(!v) continue;
                    partial.push("{0}:{1}{2}".re(quote(k), gap?" ":"", v));
                }
                
                v = !partial.length? "{}" : gap
                    ? "{\n{0}{1}\n{2}}".re(gap, partial.join(",\n" + gap), mind)
                    : "{{0}}".re(partial.join(","));
                
                gap = mind;
                return v;
            }
    }

    Date.prototype.toJSON = function()
    {
        return isFinite(this.valueOf())?
            (
                "{0}-{1}-{2}T{3}:{4}:{5}Z".re(
                    this.getUTCFullYear(),
                    this.getUTCMonth(),
                    this.getUTCDate(), //Date or day?
                    this.getUTCHours(),
                    this.getUTCMinutes(),
                    this.getUTCSeconds()
                )
            ) : null;
    }
    Boolean.prototype.toJSON = function() {return this.valueOf()};
    String.prototype.toJSON  = function() {return this.valueOf()};
    Number.prototype.toJSON  = function() {return this.valueOf()};

    var gap;
    var indent;
    var meta = 
    {    
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        "\"": "\\\"",
        "\\": "\\\\"
    };

    var rep;

    JJ.stringify = function(value, replacer, space)
    {
        rep = replacer;
        if(rep && !rep.is(Function, Array)) throw new Error("JSON: Invalid Replacer");

        indent = is(space, String)?space:is(space, Number)?new String(' ') * space:'';
        gap = '';

        return str('', {'': value});
    }

    JJ.parse = function (text, reviver)
    {
        var j;
        function walk(holder, key)
        {
            var k;
            var v;
            var value = holder[key];
            if(value.is(Object)) for(k in value) if(k.in(value))
            {
                v = walk(value, k);
                v? (value[k] = v): (delete value[k]);
            }
            return reviver.call(holder, key, value);
        }

        text = new String(text);
        rx_dangerous.lastIndex = 0;
        
        if (rx_dangerous.test(text))
        {
            text = text.replace(rx_dangerous, function (a) {
                return (
                    "\\u"
                    + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                );
            });
        }

        if(
            rx_one.test(
                text
                    .replace(rx_two, "@")
                    .replace(rx_three, "]")
                    .replace(rx_four, "")
            )
        ){
            j = eval("({0})".re(text));
            return (typeof reviver === "function")
                ? walk({"": j}, "")
                : j;
        }

        throw new SyntaxError("JJ.parse");
    }

    return JJ;
})();

$.global.xt({

    ser: function(value, replacer, space)
    {
        return $.global.JSON.stringify(value, replacer, space);
    },

    deser: function(text, reviver)
    {
        return $.global.JSON.parse(text, reviver);
    }
})