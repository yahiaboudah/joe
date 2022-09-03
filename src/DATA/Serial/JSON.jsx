

;eval(MODULE.re("$.global", "JSON", "stringify"))

    [STATIC]
    ({
        __name__: "REGX",

        rx_one: /^[\],:{}\s]*$/,
        rx_two: /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
        rx_three: /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
        rx_four: /(?:^|:|,)(?:\s*\[)+/g,
        rx_escapable: /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        rx_dangerous: /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g
    })

    [STATIC]
    ({
        __name__: "FIXERS",

        // leading zero
        lzero: function(n)
        {
            return "{0}{1}".re(n<10? '0':'', n)
        },

        quote: function(string)
        //@@requires ["module.STATIC.REGX.rx_escapable"]
        {
            rx_escapable.lastIndex = 0;
            var isRxEsc = rx_escapable.test(string);
            if(!isRxEsc) return "\"{0}\"".re(string);

            return "\"{0}\"".re(string.replace(rx_escapable, function(a){
                
                var c = meta[a];
                return is(c, String)
                        ? c
                        : "\\u" + ("0000" + a.charCodeAt(0).toString(16)) .slice(-4);
            }));
        }
    })

    [STATIC]
    ({
        __name__: "STR_FUNC",

        j_str: function j_str(key, holder)
        //@@requires ["module.STATIC.quote"]
        //@@requires ["PRIM.Date.PROTO.JSON.toJSON"]
        //@@requires ["PRIM.Boolean.PROTO.JSON.toJSON"]r
        //@@requires ["PRIM.String.PROTO.JSON.toJSON", "PRIM.Number.PROTO.JSON.toJSON"]
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

                    if(is(value, Array))
                    {
                        length = value.length, i = -1;
                        for(;++i<length;) partial[i] = j_str(i, value) || "null";

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
                            k = rep[i], v = j_str(k, value);
                            if(!v) continue;
                            partial.push("{0}:{1}{2}".re(quote(k), gap?" ":"", v));
                        }
                    }
                    
                    else for(k in value) if(k.in(value))
                    {
                        v = j_str(k, value);
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
    })

    [STATIC]
    ({
        __name__: "GLOBALS",

        gap: undefined,
        indent: undefined,
        rep: undefined,

        meta:{

            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            "\"": "\\\"",
            "\\": "\\\\"
        },

        stringify: function(value, replacer, space)
        {
            this.rep = replacer;
            if(!this.rep.is(undefined, Function, Array)) throw new Error("JSON: Invalid Replacer");

            this.indent = is(space, String)?space:is(space, Number)?str(' ') * space:'';
            this.gap = '';

            return this.j_str('', {'': value});
        },

        parse: function(text, reviver)
        //@@requires ["module.STATIC.REGX"]
        {
            var j;
            
            function walk(holder, key)
            {
                var k;
                var v;
                var value = holder[key];
                if(is(value, Object)) for(k in value) if(k.in(value))
                {
                    v = walk(value, k);
                    v? (value[k] = v): (delete value[k]);
                }
                return reviver.call(holder, key, value);
            }

            text = new String(text);
            this.rx_dangerous.lastIndex = 0;
            
            if(this.rx_dangerous.test(text))
            {
                text = text.replace(this.rx_dangerous, function (a) {
                    return (
                        "\\u"
                        + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                    );
                });
            }

            if(
                this.rx_one.test(
                    text
                        .replace(this.rx_two, "@")
                        .replace(this.rx_three, "]")
                        .replace(this.rx_four, "")
                )
            ){
                j = eval("({0})".re(text));
                return is(reviver, Function)
                       ? walk({"": j}, "")
                       : j;
            }

            throw new SyntaxError("JJ.parse");
        }
    })