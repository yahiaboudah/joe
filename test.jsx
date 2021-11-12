
//@include "xto/src/xto.jsx"

xto.load("CSTR$Python");

$.writeln(Python.testPython());

$.writeln(xto.LOADED.asModule.se());
$.writeln(xto.LOADED.asDepend.se());

// $.writeln({"a": {
//     "hello": "hi",
//     "word": "name",
//     "extra": ["no", "no"]
// }}.se())