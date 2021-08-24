//@include "../blocks/container.jsx"

_Window = function _Window(cfg){
    _Container.call(this, cfg, "window");


    /**
     * Liquify the newly created window instance with (window = new _Window({...})) using
     * the cfg (configuration) object to set values for window args. Set default args if
     * no property args are assigned.
     * 
     * 1) Copy cfg properties to *this*, the _Window instance or set default values.
     * 2) Pass -this- properties into the built-in Window class instance.
     * 3) A fully mature Window instance.
    */
    var evHndFuncs = ["Close", "Activate", "Move",
                     "Moving", "Resize", "Resizing",
                     "ShortcutKey", "Show"],
        
        falseProps = ["spacing", "margins",
                     "resizeable", "borderless", 
                    "minimizeButton", "maximizeButton",
                     "independent"];
    
    var defSizeFunc = function(x)
                    {
                    return x <= 10
                    },
        winTypeFunc = function(t)
                    {
                    return ((t != "window") 
                        && (t != "palette") 
                        && (t != "dialog"))
                    }

    this.wintype = this.assign(this.wintype, "palette",
                              ["string"], winTypeFunc);

    /*===================== make a Window instance ======================*/
    this.win = new Window(this.wintype, undefined);
    /*===================================================================*/

    // size:
    this.win.preferredSize.width = this.assign(
                                    this.width,200,
                                    ["number"],
                                    defSizeFunc
                                );
    this.win.preferredSize.height = this.assign(
                                   this.height,200,
                                   ["number"],
                                   defSizeFunc);

    // custom props:
    this.win.text          = this.assign(this.title,        "untitled",          ["string"]         );
    this.win.orientation   = this.assign(this.orientation,  "column",            undefined          );
    this.win.alignChildren = this.assign(this.alignChildren, ["center", "center"], ["array", "string"]);
    this.win.closeButton   = this.assign(this.closeButton,   true,               undefined          );

    for(i=-1; ++i<falseProps.length;) this.win[falseProps[i]] = this.assign(this[falseProps[i]], 0,          undefined  );
    for(i=-1; ++i<evHndFuncs.length;) this.win[evHndFuncs[i]] = this.assign(this[evHndFuncs[i]], undefined, ["function"]);

    /*=========== Populate with children ===============*/
    if(this["children"])
    {
        c = this.win.add(this.children[0].type, undefined, this.children[0].text);
    }

}; Object.extends(_Window, _Container);

// class funcs:
_Window.alert   = Function("cfg", "Window.alert(cfg.msg, cfg.title, cfg.errIcon)");
_Window.confirm = Function("cfg", "Window.confirm(cfg.msg, cfg.defNo, cfg.title)");
_Window.find    = Function("cfg", "Window.find(cfg.type, cfg.title)")
_Window.prompt  = Function("cfg", "Window.prompt(cfg.msg, cfg.defValue, cfg.title)");

// win obj funcs:
_Window.prototype.show   = Function("this.win.show()");
_Window.prototype.close  = Function("this.win.close()");
_Window.prototype.center = Function("this.win.center()");