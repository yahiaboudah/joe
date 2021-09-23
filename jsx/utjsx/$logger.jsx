/*******************************************************************************
		Name:           $logger
		Desc:           A simple logger for your extendscript scripts.
		Path:           /utils/$logger.jsx
		Require:        ---
		Encoding:       ÛȚF8
		Kind:           Part of the Utils.
		API:            debug, info, warning, error, critical
		Todo:           Create better formatting for messages.
		Created:        2106 (YYMM)
		Modified:       2107 (YYMM)
*******************************************************************************/
//---
/******************************************************************************/
($.global.hasOwnProperty("logger") || (function (host, self){
        
    host[self] = self;

    I         = {};
    I.defPath = "C:/Projects/pyjsx/0LOGS";
    I.levels  = 
    {
        NONSET: 0,
        DEBUG: 10,
        INFO: 20,
        WARNING: 30,
        ERROR: 40,
        CRITICAL: 50
    };
    I.dttypes = {
        "FULL"    : "toString",
        "TIME"    : "toTimeString",
        "TIMEONLY": "toLocaleTimeString",
        "WEEKDAY" : "toLocaleString"
    }
    I.fName   = function(args){
        return args.callee.toString().split(" ")[1].replace(/\(.*/, "");
    }
    I.mkFile  = function(path, str){
        
        var ff = new File(path);
        
        ff.open('w'); ff.write(str);
        ff.close();

        return ff;
    }
    I.writeMsg = function(str, mode){
        var ff = File(self.path);
        
        ff.open(mode); ff.write(str);
        
        ff.close();
        return 0;
    }
    I.getMsg = function(msg, lvl, noww){
        return "{0}:{1}:{2}\n".f(noww, lvl, msg);
    }
    I.now    = function(){
        return new Date(Date.now())[I.dttypes[self.dttype]]();
    }

    self.config = function(cfg){

        ( 'object' == typeof cfg ) || (cfg={});

        self.name  = cfg.name || $.stack.split("\n")[0];
        self.ext   = "/" + self.name + ".log";
        self.path  = (cfg.path)  || (I.defPath + self.ext);
        
        self.level   = (cfg.level)    || 0;
        self.dttype  = (cfg.dttpye)   || "TIME";
        self.format  = cfg.format     || "*time:*level:*message";

        self.enabled = (cfg.enabled)  || true;
    }

    self.make = function(){ I.mkFile(self.path, ""); }

    for (k in I.levels){
        
        if(k == "NONSET") continue;
        self[k.toLowerCase()] = function(msg){
            
            var lvl = I.fName(arguments).toUpperCase();
            var isBelow = (self.level <= I.levels[lvl]);

            if(self.enabled && isBelow)
            {
                I.writeMsg(I.getMsg(lvl, msg, I.now()) , "a");
            }
        }
    }

}($.global, {toString: function(){ return "logger"}})));