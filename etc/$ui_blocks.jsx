Object.extends = function (child, parent) {
    
    function F() {}
    F.prototype = parent.prototype;
    
    child.prototype = new F();
};

_Element = function _Element(cfg, type){
    
    this.type   = (typeof type == "undefined"? "element": type);
    this.x      = 0;
    this.y      = 0;
    this.width  = 10;
    this.height = 10;

    this.define(cfg);
}

_Element.prototype.define = function(cfg){
    if(cfg) for(x in cfg){
        try {
            this[x] = cfg[x]
        } catch(e) {continue};
    }
}

_Element.prototype.assign = function(val, def, types, callback){
    
    type    = val === undefined?
              "undefined":
              val.constructor.name.toLowerCase(); 
    
    badType = false;

    if(types instanceof Array)
    {   
        badType = true;
        for(var i=0, l = types.length;i <l; i++)
        {
            if(type == types[i])
            {
                badType = false;
                break;
            }
        }
    }
    
    if(type == "undefined" || badType) return def;

    if(typeof callback == "function")
    {
        notDef = callback.call(null, val);
        return (notDef || badType)? def:val;
    }
    return val;
}




// CONTAINER:

    _Container = function _Container(cfg){
        _Element.call(this, cfg);

    }; Object.extends(_Container, _Element);

    _Container.prototype.populate = function(obj, children){
        
        for(i=0, len= children.length; i<len; i++)
        {
            y = children[i];
            obj.add(y.type, undefined, y.text);
        }
    }

// CONTAINERS:

    _Group = function _Group(cfg){
        _Widget.call(this, cfg, "group");
    }; Object.extends(_Group, _Container);

    _Panel = function _Panel(cfg){
        _Widget.call(this, cfg, "panel");
    }; Object.extends(_Panel, _Widget);

    _Tab = function _Tab(cfg){
        _Widget.call(this, cfg, "tab");
    }; Object.extends(_Tab, _Container);

    _TabbedPanel = function _TabbedPanel(cfg){
        _Widget.call(this, cfg, "tabbedpanl");
    }; Object.extends(_TabbedPanel, _Container);


// WIDGET:
    _Widget = function _Widget(cfg, type){
        _Element.call(this, cfg, typeof type == "undefined"? "widget": type);
    }; Object.extends(_Widget, _Element);



// WINDOW:

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


// BUTTON:
_Button = function _Button(cfg){	
    _Widget.call(this, cfg, "button");

	// validate/ sanitize arguments before passing them to this;
	//=========================================================

	this.characters = 0;
	this.text = "";
	
	this.justify = "center";
	this.shortcutKey = "";
	this.enabled = 1;
	this.active = 0;
	this.visible = 1;
	this.helpTip = "";
	this.properties = {};
	this.indent = 0;
	this.alignment = "center";

	//========================
	this.onClick = cfg.onClick;
	
	this.eventListeners = [
		// [eventName:str, function handler(){...}:func, capturePhase:bool]
		// ...
	]
	this.onActivate = cfg.onActivate;
	this.onDeactivate = cfg.onDeactivate;
	this.onShortcutKey = cfg.onShortcutKey;

}; Object.extends(_Button, _Widget);

// ICON BUTTON:


function _IconButton(cfg)
{
    DISTINCT_PROPS:
    this.img = cfg.img.standard;
    
    SPECIAL_PROPS:
    this.specialProps = 
    {
        style: cfg.style
    }

    ARGS:
    var b = this.add("iconbutton", undefined, 
    ScriptUI.newImage(
        img,
        cfg.img.disabled || img, 
        cfg.img.clicked  || img, 
        cfg.img.hover    || img
    ), 
    this.specialProps);

    PROPS:
    Object.modify(b,{
        onClick   : cfg.onClick,
        alignment : cfg.alignment,
        helpTip   : cfg.helpTip
    })

    EVENT_LISTENERS: 
    var listen = cfg.eventListeners;
    for(evType in listen)
    {
        if(!listen.hasOwnProperty(evType)) continue;
        for(ev in listen[evType]) 
        {
            if(!listen[evType].hasOwnProperty(ev)) continue;
            b.addEventListener(evType, listen[evType][ev].bind(b))
        }
    }
}

myButton = new _IconButton({
    
    img:
    {
        standard:  "/d/icons/img/sova.png", 
        disabled: "/d/icons/img/kj.png",
        clicked:  "/d/icons/img/kj.png",
        hover:    "/d/icons/img/sova.png"
    },
    
    style: "toolbutton",
    onClick: function(){
        alert("hello world");
    },
    alignment: ["center", "top"],
    helpTip  :"test iconbutton",

    eventListeners: {
        "mousedown": []
    }
})
