
//@include "xto/src/xto.jsx"

xto.load("CSTR$Python");
xto.load("CSTR$Table");

$.writeln(Python.testPython());

$.writeln(xto.LOADED.asModule);
$.writeln(xto.LOADED.asDepend.$$$$$MISC);
$.writeln(xto.LOADED.asDepend.String); 