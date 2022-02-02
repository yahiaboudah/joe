
$.global.Logger = function Logger(){};

Logger.xt({

    LEVELS: 
    {
        NONSET: 0,
        DEBUG: 10,
        INFO: 20,
        WARNING: 30,
        ERROR: 40,
        CRITICAL: 50
    },

    DATES: 
    {
        FULL     : "toString",
        TIME     : "toTimeString",
        TIMEONLY : "toLocaleTimeString",
        WEEKDAY  : "toLocaleString"
    },

    getScriptName: function()
    {
        return $.stack.split("\n")[0].replace(/\[|\]/g, "");
    },

    getScriptPath: function(){
        return File($.stack).fsName;
    }

})

Logger.prototype.xt({

    formatMsg: function(oo)
    {
        return this.format._replace({
            
            $time: oo.time,
            $message: oo.message,
            $level: oo.level
        });
    },

    now: function()
    {
        return new Date(Date.now())[Logger.DATES[this.DateType]]();
    },

    config: function(cfg)
    {
        return this.xt(Object.adapt(cfg,{

            name: Logger.getScriptName(),
            path: Logger.getScriptPath(),
            level: 0,
            DateType: "TIME",
            format: "XTO_LOGGER: $time:$level:$message",
            enabled: true
        }));
    },
})

var LS = Logger.LEVELS;
for(L in LS) if(L.in(LS) && L != "NONSET")
{
    Logger.prototype[L.toLowerCase()] = Function('MSG', (function(){

        var LG = this;
        if(LG.enabled && (LG.level <= Logger.LEVELS[$L]))
        {
            MSG = this.formatMsg({
                level: $L,
                message: MSG,
                time: LG.now()
            });

            File(LG.path).$write(MSG, 'a');
            return this;
        }
    }).body({$L:L}))
}