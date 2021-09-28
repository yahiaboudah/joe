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
($.global.hasOwnProperty("_m")) || (function(host, self){

    //@include "$string.jsx"
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

    self.frame = function(str, size){
        
        var size    = typeof size == "undefined"?50: size;
        var block   = String.fromCharCode(9632); // the block character: ■
        var entry   = ((size+2) / 2) - (str.length / 2);
        return      ( 
                    block.repeat(size+2)+
                    "\n"+
                    block.repeat(3)+" ".repeat(entry) + str + " ".repeat(size-entry-str.length-4) +block.repeat(3-str.length%2)+ 
                    "\n"+
                    block.repeat(size+2)+
                    "\n"
                    );
    }
}($.global, {toString: function(){return "_m"}}));