
Object.extends = function (child, parent) {
    
    function F() {}
    F.prototype = parent.prototype;
    
    child.prototype = new F();
};

_Widget = function _Widget(cfg){
    
    this.type = "widget";
    this.x      = 0;
    this.y      = 0;
    this.width  = 10;
    this.height = 10;

    this.define(cfg);
}

_Widget.prototype.define = function(cfg){
    if(cfg) for(x in cfg){
        try {
            this[x] = cfg[x]
        } catch(e) {continue};
    }
}

_Widget.prototype.populate = function(children){
    
    for(i=0, len= children.length; i<len; i++)
    {
        y = children[i];
        this.win.add(y.type, undefined, y.text);
    }

}

_Button = function _Button(cfg){
    _Widget.call(this);
    this.define(cfg);
    this.type = "button";
}; Object.extends(_Button, _Widget);

_StaticText = function _StaticText(cfg){
    _Widget.call(this);
    this.define(cfg);
    this.type = "edittext";
}; Object.extends(_StaticText, _Widget);

_Window = function _Window(cfg){

    _Widget.call(this);

    this.type = "window";
    this.win = new Window(cfg.type);
    this.define(cfg);
    this.populate(cfg.children);

}; Object.extends(_Window, _Widget);

_Window.prototype.show = function(){
    this.win.show();
}

new _Window({
    type: "palette",
    children: [
        new _Button({
            text: "some button text"
        }),
        new _StaticText({
            text: "static text text"
        })
    ]
}).show();