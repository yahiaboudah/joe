
Object.create = function (proto) {

    function F() {}
    F.prototype = proto;

    return new F();
};

Object.extends = function (child, parent) {
    child.prototype = Object.create(parent.prototype);
};

_Widget = function _Widget(cfg){
    this.type = "widget";
}

_Widget.prototype.showme = function(){
    return "my type is proudly: " + this.type;
}
_Widget.prototype.updateme = function(){
    return "my type is proudly: " + this.type;
}


_Button = function _Button(cfg){
    this.type = "button";
    _Widget.call(this);
}; Object.extends(_Button, _Widget);

_Button.prototype.showme = function(){
    return "A proud button";
}


w = new _Widget({hi: "greetings"});
b = new _Button({hi: "newButton I am!"});

// $.writeln(w.__proto__.toSource());
$.writeln(b.toSource());

$.writeln(w.showme());
try{
    $.writeln(b.showme());
}catch(e){
    $.writeln(e);
}
