
//@include "src/xto.jsx"
xto.load("AFFX/ShapeLayer");
xto.load("AFFX/CompItem");
xto.load("AFFX/PropertyGroup");
xto.load("PRIM/Object");
xto.load("$$$$/Debg");

var s = comp.layer(1);
var fillGroup = s.add("Contents:fill");

$.writeln(fillGroup.name);
fillGroup.set("Color", [1,1,1,1])
$.writeln(fillGroup.get("Color"))