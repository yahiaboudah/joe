
//@include "xto/src/xto.jsx"

var shapeLayer = app.project.activeItem.layer(1);

$.writeln(x = new RegExp(
    [
        "^(.*):\/\/",         // => anything://
        "([A-Za-z0-9\-\.]+)", // => www.mywebsite.com
        ":?([0-9]+)?",        // => :8080 (optional)
        "(.*)$"               // => knazekn (anything at the end)
    
    ].join('')                // => anything://www.mywebsite.com:8080knazekn

).exec("ikn:/www.azeknaze.com:7070knaze"))

// $.writeln(x[1])