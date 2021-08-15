
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
}

_Window = function _Window(cfg){
    
}; Object.extends(_Window, _Widget);

_Button = function _Button(cfg){
    _Widget.call(this);
    this.type = "button";
}; Object.extends(_Button, _Widget);