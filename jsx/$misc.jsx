/*******************************************************************************
		Name:           $misc
		Desc:           A collection of misc functions to aid with extendscript
                        development.
		Path:           /utils/$misc.jsx
		Require:        JSON, String: repeat.
		Encoding:       ÛȚF8
		Kind:           Part of the Utils.
		API:            print, isDef, kv, simpletimeit, caller, trim, serialize,
                        deserialize
		Todo:           ---
		Created:        2106 (YYMM)
		Modified:       2107 (YYMM)
*******************************************************************************/
// ---
/******************************************************************************/

(function misctest(host, self){

    I = {
        T: "✔️",
        F: "❌",
        test: function(H, tests)
        {
            for(x in tests) if(tests.hasOwnProperty(x))
            {
                $.writeln("{0} {1}".f(tests[x].call(H)? this.T: this.F, x));
            }
        }
    }

    var tests = 
    {
        "should frame \"hello alien\" properly": function()
        {
            var myFrame = [
                "■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■",
                "■■                    hello alien                ■■",
                "■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■"
            ].join("\n");
            var heFrame = this.frame("hello alien", undefined, "DEFAULT");
            $.writeln(heFrame);
            var cond    = (heFrame == myFrame);
            return cond;
        }
    }

    host[self] = function(){
        I.test(host, tests);
    }
})($.global.misc ,"test");

misc.test();

(function(host, self){
    
    //@include "$fstring.jsx"
    //@include "$json.jsx"
    host[self] = self;

    self.caller = function(){
        var stack = $.stack.split('\n'),
            len   = stack.length;
        return len === 4 ? null : stack[len - 4].split("(")[0];
    }

    self.reflect = function($obj, $type){

        for(var i=0, str = "", ps = $obj.reflect[$type], len = ps.length; i<len; i++)
        {
            k    = ps[i].toString();
            str += "{0}: {1}\n".f(k, uneval(win[k]));
        }   
        
        return str;
    }

    self.frame = function(str, size, frameChar)
    {
        size = typeof size != "number" ? 50: size;

        String.prototype["*"] = function(op)
        {
            var str = this;
            var fstr= [fstr];
            op = parseInt(op); if(isNaN(op)) return str;
            while(op--) fstr.push(str);
            return fstr.join(""); 
        };

        var strr = function(ss){ return new String(ss);}

        var blocks = 
        {
            "DEFAULT": "■",
            "ROCKET" : "🚀",
            "FIRE"   : "🔥",
            "CELEBRATE": "🎉"
        }

        var B   = strr(blocks[frameChar || "DEFAULT"]),
            S   = strr(" ");

        var entry   = ((size+2) / 2) - (str.length / 2);

        var framo   = "{0}\n{1}\n{2}".f(

            B * (size + 2),   
            
            "{0}{1}{2}{3}{4}".f(
         
                B * 2,
                S * entry,
                str,
                S * (size-entry-str.length-2),
                B * (3-str.length % 2)
            ),

            B * (size + 2)
        );

        delete(String.prototype["*"]);
        strr = null;
        return framo;

    }

}($.global, {toString: function(){return "misc"}}))