
app

    [STATIC]
    ({
        __name__: "DOUNDO",

        wrapUndo: function(F, T)
        {
            var A = arguments.slice(2);

            return function()
            {
                app.beginUndoGroup(F.name);
                F.apply(T, A);
                app.endUndoGroup();
            }
        },
        
        doUndo: function(F, T, offset)
        {
            // execute F:
            app.wrapUndo(F, T || {}, arguments.slice(3))();
            
            // undo with an offset time:
            app.setTimeout(function(){
                app.executeCommand(
                    app.findMenuCommandId("Undo {0}".re(F.name))
                );
            }, offset || 0);
        
        },
    })

    [STATIC]
    ({

        __name__: "SUBTITLES",
        
        /**
            * Convert this: 
            * [
            {
                animation: "move it up",
                duration : 2
            },
            {
                animation : "move it down",
                duration  : 3
            }
            ]
            
            to this:
            {
            "move it up": 2,
            "move it down": 3
            }
        
        */
        makeAnimMarkers: function(animObj)
        {  
            var oo = {}, i =0;
            oo[animObj[i]["animation"]] = 0;
            for(;++i<animObj.length;)oo[animObj[i]["animation"]] = animObj[i-1]["duration"]; 
        
            return oo;
        }
    })