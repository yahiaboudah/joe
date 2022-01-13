
//@include "src/xto.jsx";
xto.load("PRIM/Object");

var a = {

    "hi": [4,7],
    "hia": [4,7],
    "hell": [4,7,7],
    "nono": [4,4,7],
    "nonoff": [4,4,7],
}

$.writeln(Object.mostRecurring(a, Array, "length").se())