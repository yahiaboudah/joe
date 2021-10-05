/*******************************************************************************
		Name:           $misk 🍊
		Desc:           A collection of misc functions.
		Path:           /utils/$misk.jsx
		Require:        fstring, json
		Encoding:       ÛȚF8
		API:            ---
		Created:        2106 (YYMM)
		Modified:       2110 (YYMM)
*******************************************************************************/

// 🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊
//                                              MISK                                                                  🍊
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

    self.frame = function(str, frameChar, entry)
    {
        if(typeof str == "undefined") str = "undefined";
        str       = str.toString();
        entry     = typeof entry != "number" ? 20: entry;
        frameChar = typeof frameChar == "undefined"?"■": frameChar; 
        str       = str + ((str.length%2)?" ":"");

        String.prototype["*"] = function(op, joinChar)
        {
            if(!$.global.strr)
            {
                $.global.strr = function(s){return new String(s)};
            }

            var str = this, fstr = [fstr];
            if(isNaN(op = Math.floor(op))) return str;
            
            while(op--) fstr.push(str);
            return fstr.join(joinChar); 
        }

        var isEmoji = function(ss){ return ss.length == 2 }
        
        var B   = strr(frameChar),
            S   = strr(" ");
        
        var EMOJ_WIDTH = isEmoji(B)? 1.8: 1;
        var tsize = (entry * 2) + (((str.length+4) / frameChar.length));
        tsize /= EMOJ_WIDTH;

        //####################################################
        //#
        var framo   = "{0}\n{1}\n{0}".f(

            B * tsize,   // ■■■■■■
            
            "{0}{1}{0}".f( // ■       HELLO        ■

                B * 2, // ■
                "{0}{1}{0}".f((S * entry), str) //      STR        
            )
        );
        //#
        //#####################################################

        delete(String.prototype["*"]);
        delete(String.prototype.isEmoji);
        strr = str = B = S = entry = null;
        return framo;

    }

}($.global, {toString: function(){return "misk"}})); $.sleep(0);
//                                                                                                                     🍊
//🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊
// =====================================================================================================================
// 🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪
//                                                  UNIT TEST                                                         🧪
(function(host){

    //@include "$xester.jsx"

    host.test = function()
    {    
        Xester.test(host,
        {
            "should frame \"hello alien\" properly": function()
            {
                var myFrame = [
                    "■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■",
                    "■■                    hello alien                     ■■",
                    "■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■"
                ].join("\n");
                var heFrame = this.frame("hello alien");
                var cond    = (heFrame == myFrame);
                return cond;
            }
        });
    }
})($.global.misk, "test");
//                                                                                                                    🧪
// 🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪

if($.stack.split("\n")[0] == "[" + $.fileName.split("/").pop() + "]")
{
    misk.test();
}