//@include "../blocks/container.jsx"

_Window = function _Window(cfg){
    _Container.call(this, cfg, "window");


    var evHndFuncs = ["Close", "Activate", "Move", "Moving", "Resize", "Resizing", "ShortcutKey", "Show"],
        falseProps = ["spacing", "margins","resizeable", "minimizeButton", "maximizeButton", "independent", "borderless"];
    
    var defSizeFunc = function(x){return x <= 10},
        winTypeFunc = function(t){return ((t != "window") && (t != "palette") && (t != "dialog"))}

    // Window properties:
    this.wintype = this.assign(this.wintype, "palette", ["string"], winTypeFunc);
    
    this.win = new Window(this.wintype);
    
    // size:
    this.win.preferredSize.width = this.assign(this.width,200, undefined, defSizeFunc);
    this.win.preferredSize.height = this.assign(this.height,200, undefined, defSizeFunc);

    // custom props:
    this.win.text = this.assign(this.title, "untitled", ["string"]);
    this.win.orientation = this.assign(this.orientation, "column");
    this.win.alignChildren = this.assign(this.alignChildren, ["left", "center"], ["array", "string"]);
    this.win.closeButton = this.assign(this.closeButton, true);

    // false props:
    for(i=0; i<falseProps.length;i++, p= falseProps[i]){ 
        this.win[p] = this.assign(this[p], 0);
    }
    // Event handling:
    for(i=0; i<evHndFuncs.length;i++, f = "on" + (f = evHndFuncs[i])){
        this.win[f] = this.assign(this[f], undefined, ["function"]);
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
