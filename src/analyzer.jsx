
//@include "xto.jsx"
xto.load("PRIM/Array");
xto.load("DATA/File");

var pp = "c:/xto/src/MATH/Bezier.jsx";

var ff = File(pp);
ff.open();
var dd = ff.read();
// $.writeln(dd);

ff.close();

var RX = /\[PROTO\][\t\r\n\s]*\(\{([^]*)\}\)/g;

$.writeln(dd.match(RX))