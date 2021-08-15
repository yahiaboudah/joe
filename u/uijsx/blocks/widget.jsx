//@include "element.jsx"

_Widget = function _Widget(cfg, type){
    _Element.call(this, cfg, typeof type == "undefined"? "widget": type);
}; Object.extends(_Widget, _Element);