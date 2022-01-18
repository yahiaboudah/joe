
//@include "src/xto.jsx"
xto.load("AFFX/ShapeLayer");
xto.load("AFFX/CompItem");
xto.load("AFFX/Layer");
xto.load("AFFX/PropertyGroup");
xto.load("PRIM/Object");
xto.load("$$$$/Debg");

layr.add("Contents:fill", {fillColor: [20,100,70,2]/255});
$.writeln(layr.anchorPoint.value)
layr.centerAnchorPoint(4)
$.writeln(layr.anchorPoint.value)