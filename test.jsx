
//@include "xto/src/xto.jsx"

var shapeLayer = app.project.activeItem.layer(1);

ShapeLayer.prototype.getPropNum = function(propName)
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

    // var MN = "ADBE Vector";

    
    var MN = 
    {
        group: "ADBE Vector Group"
    }

    var c = this.property("Contents"), i = 0, num = 0;
    while(++ i < c.numProperties+1)
    {
        if(c.property(i).matchName == MN["group"]) num++;
    }

    return num;
}

var n = shapeLayer.getPropNum("Group");
$.writeln("Number of groups is: {0}".re(n));