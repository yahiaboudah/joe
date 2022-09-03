//@include "src/xto.jsx"
xto.load("AFFX/CompItem");
xto.load("AFFX/Layer");
xto.load("$$$$/DEBG");

// var shape = layr.content.property(1);
// var poop = shape.property("ADBE Vectors Group").property("ADBE Vector Shape - Group").property("ADBE Vector Shape");
// $.writeln(poop.value.vertices.join("\n"))

// layer("Shape Layer 1")
//         .property("ADBE Root Vectors Group")
//         .property("ADBE Vector Group")
//         .property("ADBE Vectors Group")
//         .property("ADBE Vector Shape - Group")
//         .property("ADBE Vector Shape")

// $.writeln(
//     layr.property("ADBE Root Vectors Group") // Contents
//         .property("ADBE Vector Group") // Shape 1
//         .property("ADBE Vectors Group") // Shape 1 Contents
//         .property("ADBE Vector Shape - Group") // Path 1
//         .property("ADBE Vector Shape") // Path
//         .value.vertices.join('\n') // Shape Value
// )

// $.writeln(
//     layr.property("ADBE Root Vectors Group")
//         .property("ADBE Vector Filter - Zigzag")
//         .ridgesPerSegment.value
// )

var dd = {

    // ADBE Vector Filter - Name
    "RC": ["Radius"],
    "Zigzag": ["size", "ridgesPerSegment", "points"],
    "Twist": ["angle", "center"],
    "Merge": ["mode"],
    "Offset": ["amount", "lineJoin", "miterLimit", "copies", "copyOffset"],
    "PB": ["amount"],
    "Repeater": [
        "copies", "offset", "composite",
        "transform/anchorPoint",
        "transform/position",
        "transform/scale",
        "transform/rotation",
        "transform/startOpacity",
        "transform/endOpacity"
    ],
    "Trim": [
        "start", "end", "offset", "trimMultipleShapes"
    ],
    
    "Roughen": [
        "size", "detail", "points", "wigglesPerSecond", "correlation",
        "temporalPhase", "spatialPhase", "randomSeed"
    ],

    "Wiggler": [
        "wigglesPerSecond", "correlation", "temporalPhase", "spatialPhase",
        "randomSeed",

        "transform/anchorPoint",
        "transform/position",
        "transform/scale",
        "transform/rotation"
    ],

    // ADBE Vector Graphic - Name
    "Stroke": 
    [
        "composite", "color", "opacity",
        "strokeWidth", "lineCap", "lineJoin",
        "miterLimit", "dashes",
        
        "dashes/offset",
        "dashes/dash #",
        "dashes/gap #"

        "taper/startLength",
        "taper/endLength"
        "taper/startWidth",
        "taper/endWidth",
        "taper/startEase",
        "taper/endEase",
        "wave/amount",
        "wave/units",
        "wave/wavelength",
        "wave/phase",
    ],
    "GradientStroke": 
    [
        "composite", "colors", "opacity",
        "type", "startPoint", "endPoint",
        "strokeWidth", "lineCap", "lineJoin",
        "miterLimit", "dashes",
        
        "dashes/offset",
        "dashes/dash #",
        "dashes/gap #"

        "taper/startLength",
        "taper/endLength"
        "taper/startWidth",
        "taper/endWidth",
        "taper/startEase",
        "taper/endEase",
        "wave/amount",
        "wave/units",
        "wave/wavelength",
        "wave/phase",
    ],
    "Fill": [
        "composite", "fillRule", "color", "opacity"
    ],
    "GradientFill": [
        "composite", "fillRule", "type", "startPoint", "endPoint",
        "colors", "opacity"
    ],

    // ADBE Vector Group
    "Root": [
        "transform/anchorPoint",
        "transform/position",
        "transform/scale",
        "transform/rotation",
        "transform/opacity",
        "transform/skew",
        "transform/skewAxis",
    ],

    // ADBE Vector Shape - Name
    "Rectangle": [
        "size", "position", "roundness"
    ],
    "Ellipse": [
        "size", "position"
    ],
    "PolyStar": [
        "type", "points", "position", "rotation", "innerRadius",
        "outerRadius", "innerRoundness", "outerRoundness"
    ],
    "Group":[   
        "path"
    ]
}

var i=0, C = layr.content;

$.writeln($.reflct(C.property(2), "props").se())

while(++i<C.numProperties)
{
    $.writeln(C.property(i).matchName)
}