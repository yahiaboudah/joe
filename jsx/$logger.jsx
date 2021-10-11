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
(function (H, S)
{        
    H[S] = S;

    I         = {};
    I.levels  = 
    {
        NONSET: 0,
        DEBUG: 10,
        INFO: 20,
        WARNING: 30,
        ERROR: 40,
        CRITICAL: 50
    };
    
    I.dttypes = 
    {
        FULL     : "toString",
        TIME     : "toTimeString",
        TIMEONLY : "toLocaleTimeString",
        WEEKDAY  : "toLocaleString"
    }
    
    I.mkFile  = function(path, str)
    {
        return File(path).$write(str);
    }
    
    I.writeMsg = function(str, mode)
    {
        File(self.path).$write(str, mode || "a");
    }

    I.getMsg = function(msg, lvl, noww)
    {
        return "{0}:{1}:{2}\n".f(noww, lvl, msg);
    }

    I.now    = function()
    {
        return new Date(Date.now())[I.dttypes[self.dttype]]();
    }

    I.getScriptName = function(){
        return $.stack.split("\n")[0].replace(/\[|\]/g, "");
    }

    I.getScriptPath = function(){
        return File($.stack).fsName;
    }

    self.config = function(cfg)
    {
        if(cfg.isnt(Object)) cfg = {};

        if(cfg.name.isnt(String))     cfg.name    = I.getScriptName();
        if(cfg.path.isnt("Path"))     cfg.path    = I.getScriptPath();
        if(cfg.level.isnt(Number))    cfg.level   = 0;
        if(cfg.dttype.isnt(String))   cfg.dttptye = "TIME";
        if(cfg.format.isnt(String))   cfg.format  = "*time:*level:*message";  
        if(cfg.enabled.isnt(Boolean)) cfg.enabeld = true;
    }

    self.make = function(){ I.mkFile(self.path, ""); }

    for (k in I.levels) if(k != "NONSET"){
        
        self[k.toLowerCase()] = Function("msg", (function(){

            if(this.enabled && (this.level <= I.levels[$lvl]))
            {
                I.writeMsg(I.getMsg($lvl, msg, I.now()) , "a");
            }
        }).replace("$lvl", k));
    }

}($.global, {toString: function(){ return "logger"}})));