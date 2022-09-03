
$

    [STATIC]
    ({
        __name__: "DETECTIVES",

        reflct: function(k, what)
        {
            var props = k.reflect.properties, i=-1;
            var funcs = k.reflect.methods, j=-1;

            var P = {}, propKey,
                F = {};

            while(++j<funcs.length)
            {
                try
                {
                    F[funcs[j]] = k[funcs[j]].call(undefined);
                }
                catch(e)
                {
                    F[funcs[j]] = "undefined";
                }
            }

            while(++i<props.length)
            {
                propKey = props[i].toString();
                if(propKey == '__proto__') continue;

                try{ P[propKey] = k[props[i]];}
                catch(e){ P[propKey] = undefined; }
            }

            return {
                props: P,
                funcs: F
            }[what];
        },

        scan: function(what)
        {
            
            var oo = {};
            
            var lines = $.summary().split("\n"), i=-1,
                re = /(\d+)\s+(\w+)/, m;

            while(++i<lines.length)
            {
                m = re.exec(lines[i]);
                if(m) oo[m[2]] = m[1];
            }

            return what && oo[what]?oo[what]: oo;
        }
    })
    
    [STATIC]
    ({
        __name__: "LOGGERS",
        
        log: function(msg)
        {
            var fn = $.fileName.split('/').pop(),
                fr = File("{0}/{1}.log".re(
                        Folder(File($.fileName).parent).fsName,
                        fn)
                        );
            
            return (
                fr.encoding = "UTF-8", fr.open('a'), 
                fr.write("\n{0}".re(msg || '')), 
                fr.close()
            );
        }
    })

    [STATIC]
    ({
        __name__: "CHECKERS",

        inside: function(ff)
        {
            return ($.stack.split("\n")[0] == "[{0}]".re(ff.split("/").pop()));
        },

        caller: function(){
            
            var stack = $.stack.split('\n'),
                len   = stack.length;
            
            if(len == 4) return null;
            return stack[len - 4] .split('(')[0];
        },

        $sleep: function(ms, msg){
            if(!is(ms, Number)) return;
            if(is(msg, String)) $.writeln("{0}: Sleeping for {1} ms..".re(msg, ms));

            $.sleep(ms);
        },
    })