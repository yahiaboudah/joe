
//@include "element.jsx"

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