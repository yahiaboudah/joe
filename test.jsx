
//@include "xto/src/xto.jsx"

var shapeLayer = app.project.activeItem.layer(1);

ShapeLayer.prototype.$get = function(v)
{
    return "{0} is set".re(v);
}

var G = shapeLayer.$get("jabze");

$.writeln(G)