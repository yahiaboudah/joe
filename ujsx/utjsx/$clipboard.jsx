/*******************************************************************************
		Name:           $clipboard
		Desc:           A clipboard manager.
        API :           get, set, clear
		Created:        2106 (YYMM)
		Modified:       2107 (YYMM)
*******************************************************************************/
/******************************************************************************/

($.global.hasOwnProperty("ClipBoard") || (function (host, self){
    
    //@include "$fstring.jsx"
    host[self] = self;

    I = {};

    I.notLoaded = true;
    I.libPath   = "C:/Users/me/desktop/aesys.dll"; 

    I.load = function()
    {
        I.lib = new ExternalObject(("lib:{0}".f(I.libPath)));
        I.notLoaded = false; 
    }
    
    self.unload = function()
    {
        I.lib.unload();
    }
    self.get = function()
    {
        if(I.notLoaded) I.load();
        c = I.lib.getClipboard();
        return c;
    }
    self.set = function(cc)
    {
        if(I.notLoaded) I.load();
        I.lib.setClipboard(cc);
        return true;
    }
    self.clear = function(){
        if(I.notLoaded) I.load();
        I.lib.clearClipboard();
        return true;
    }

}($.global, {"toString": function(){return "ClipBoard"}})))
