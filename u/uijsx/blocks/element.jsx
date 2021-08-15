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
