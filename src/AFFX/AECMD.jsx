// [AE COMMAND NUMBERS]:

eval(MODULE.re("$.global", "AECMD", "get"))

    [STATIC]
    ({
        get: function(cmd)
        {
            return {
                SAVE_AS_FRAME: 2104
            }[cmd];
        }
    })