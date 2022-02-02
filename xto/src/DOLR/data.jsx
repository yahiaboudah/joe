// [CLIPBOARD]
$.xt({

    clipboardLibFile: false,
    clipboardLib : 0,

    
    chkClipboard: function(p)
    {
        if(!$.clipboardLibFile)
        {
            var ff = File(p);
            (ff.encoding = "UTF-8", ff.open('w'), ff.write($.clipboardLib), ff.close()); 
            $.clipboardLibFile = true;
            $.clipBoardLib = 0;
        }
    },

    getClipboard: function(){
        
        var path = Folder.userData + "/xto$clipboard.dll";
        
        $.chkClipboard(path);
        return (new ExternalObject("lib:" + path)).getClipboard();
    },

    setClipboard: function(){

        var path = Folder.userData + "/xto$clipboard.dll";

        $.chkClipboard(path);
        return (new ExternalObject("lib:" + path)).setClipboard();
    }
})

// [CMD]
$.xt({
    
    silentCmdVBS: function(batPath)
    {
        return [
            "Set WshShell = CreateObject(\"WScript.Shell\")", 
            "WshShell.Run chr(34) & \"{0}\" & Chr(34), 0",
            "Set WshShell = Nothing"
        ].join("\n").re(batPath);
    },

    cmd: function(myCommand, silentMode)
    {
        silentMode = is(silentMode, undefined)?true: silentMode;

        if(!silentMode) return system.callSystem("cmd /c \"{0}\"".re(myCommand));

        var vbs = (Folder.temp / "XTO_DOLLAR_DATA_cmd.vbs").create(
            $.silentCmdVBS(
                (bat= (Folder.temp / "XTO_DOLLAR_DATA_cmd.bat").create(myCommand)).fsName.replace('/', '\\')
            )
        );
        vbs.$execute(100, function(){this.remove(); bat.remove();});
    },

    wget: function(fp, link)
    {   // get images from the web with cmd utility: [WGET]

        system.callSystem("cd {0} & wget -O {1} {2}".re(
                
                Folder(File(fp).path).fsName.replace(/\\/gi, '/'),
                fp.replace(/\\/gi, '/'),
                link
        ));
    }
})