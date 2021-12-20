
//@include "xto/src/xto.jsx"
xto.load("$$$$/DATA");

try
{
    var hh = new HTTP("http://jsonplaceholder.typicode.com/todos/25");
    hh.request("GET");
    var rr = hh.response();
    $.writeln(rr.statusMessage);
    $.writeln(rr.payload);
}

catch(e) {$.writeln(e.line)}