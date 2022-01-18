
//@include "src/xto.jsx"
xto.load("AFFX/ShapeLayer");
xto.load("AFFX/CompItem");
xto.load("PRIM/Object");
xto.load("$$$$/Debg");

var s = comp.layer(1);
var fillGroup = s.add("Contents:fill");
$.writeln($.reflct(fillGroup, "props").se());