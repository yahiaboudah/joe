
//@include "xto/src/xto.jsx"

var shapeLayer = app.project.activeItem.layer(1);

ShapeLayer.prototype.propNum = function(propName)
{
    var GRAPHIC = 
    {
        Stroke: "Stroke",
        GradientStroke: "G-Stroke",
        Fill: "Fill",
        GradientFill : "G-Fill"
    },
    
    FILTERS = 
    {
        MergePaths: "Merge",
        OffsetPaths: "Offset",
        PuckerAndBloat: "PB",
        RoundCorners: "RC",
        TrimPaths: "Trim",
        TwistPaths: "Twist",
        WigglePaths: "Roughen",
        WiggleTransform: "Wiggler",
        ZigZag: "ZigZag",
    },

    SHAPES = 
    {
        PolyStar: "Star",
        Rectangle: "Rect",
        Ellipse: "Ellipse",
        Custom: "Group"
    };

    // prop name preprocessing:

    if(_in(propName, ["Shape", "Filter", "Graphic", "Group"]))
    {
        propName = "ADBE Vector {0}".re(propName, propName != "Group"?" - .*":"");
    }

    var x;
    if(!!(x = GRAPHIC[propName])) propName = "ADBE Vector Graphic - {0}".re(x);
    if(!!(x = FILTERS[propName])) propName = "ADBE Vector Filter - {0}" .re(x);
    if(!!(x = SHAPES[propName]))  propName = "ADBE Vector Shape - {0}"  .re(x);

    propName = new RegExp(propName || "ADBE Vector .*", 'g');
    var c = this.property("Contents"), i = 0, k = 0;
    while(++ i<c.numProperties+1) if(propName.test(c.property(i).matchName)) k++;

    return k;
}

$.writeln("Number of filters is: {0}".re(shapeLayer.propNum("Filter")));
$.writeln("Number of graphic is: {0}".re(shapeLayer.propNum("Graphic")));
$.writeln("Number of shapes is: {0}".re(shapeLayer.propNum("Shape")));
$.writeln("Number of groups is: {0}".re(shapeLayer.propNum("Group")));
$.writeln("Number of all props is: {0}".re(shapeLayer.propNum()));
