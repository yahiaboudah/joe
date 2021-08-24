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
    var evHndFuncs = ["Close", "Activate", "Move", "Moving", "Resize", "Resizing", "ShortcutKey", "Show"],
        falseProps = ["spacing", "margins","resizeable", "minimizeButton", "maximizeButton", "independent", "borderless"];
    
    var defSizeFunc = function(x){return x <= 10},
        winTypeFunc = function(t){return ((t != "window") && (t != "palette") && (t != "dialog"))}

    this.wintype = this.assign(this.wintype, "palette", ["string"], winTypeFunc);

    /*===================== make a Window instance ======================*/
    this.win = new Window(this.wintype);
    /*===================================================================*/

    // size:
    this.win.preferredSize.width = this.assign(this.width,200, undefined, defSizeFunc);
    this.win.preferredSize.height = this.assign(this.height,200, undefined, defSizeFunc);

    // custom props:
    this.win.text = this.assign(this.title, "untitled", ["string"]);
    this.win.orientation = this.assign(this.orientation, "column");
    this.win.alignChildren = this.assign(this.alignChildren, ["left", "center"], ["array", "string"]);
    this.win.closeButton = this.assign(this.closeButton, true);

    // false props:
    for(i=-1; ++i<falseProps.length;){ 
        p = falseProps[i];
        this.win[p] = this.assign(this[p], 0);
    }
    // event handler functions:
    for(i=-1; ++i<evHndFuncs.length;){
        f = "on" + (f = evHndFuncs[i]);
        this.win[f] = this.assign(this[f], function(){}, ["function"]);
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
