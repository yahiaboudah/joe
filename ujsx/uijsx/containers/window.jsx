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
    this.win = new Window(this.wintype);
    /*===================================================================*/

    // size:
    if(!this.nosize)
    {
        this.win.preferredSize.width = this.assign(
            this.width,200,
            ["number"],
            defSizeFunc
        );
        this.win.preferredSize.height = this.assign(
           this.height,200,
           ["number"],
           defSizeFunc);
    }

    // custom props:
    this.win.text          = this.assign(this.title,        "untitled",          ["string"]         );
    this.win.orientation   = this.assign(this.orientation,  "column",            undefined          );
    this.win.alignChildren = this.assign(this.alignChildren, undefined         , ["array", "string"]);
    this.win.closeButton   = this.assign(this.closeButton,   true,               undefined          );

    for(i=-1; ++i<falseProps.length;) this.win[falseProps[i]] = this.assign(this[falseProps[i]], 0,          undefined  );
    for(i=-1; ++i<evHndFuncs.length;) this.win[evHndFuncs[i]] = this.assign(this[evHndFuncs[i]], undefined, ["function"]);

    /*=========== Populate with children ===============*/
    with(this) populate(win, children);

}; Object.extends(_Window, _Container);

// internal:
_Window.prototype.populate = function(w, cs){
    
    for(i=-1; ++i< cs.length;)
    {
        c = cs[i];
        cc= w.add(c.type);  
        // for every c:
        for(pp in c) if(c.hasOwnProperty(pp) && pp != "type")
        {
            cc[pp] = c[pp];
        }
    }
}

// class funcs:
_Window.alert   = Function("c", "Window.alert(c.msg, c.title, c.errIcon)");
_Window.confirm = Function("c", "Window.confirm(c.msg, c.defNo, c.title)");
_Window.find    = Function("c", "Window.find(c.type, c.title)")
_Window.prompt  = Function("c", "Window.prompt(c.msg, c.defValue, c.title)");

// win obj funcs:
_Window.prototype.show   = Function("this.win.show()");
_Window.prototype.close  = Function("this.win.close()");
_Window.prototype.center = Function("this.win.center()");