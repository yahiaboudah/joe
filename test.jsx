
//@include "xto/src/xto.jsx"
xto.load("$$$$/DATA");

try
{
    var hh = new HTTP("http://jsonplaceholder.typicode.com/posts/");
    hh.request("GET");
    var rr = hh.response();
    $.writeln(rr.statusMessage);
    $.writeln($.deser(rr.payload)[88].body);
}

catch(e) {$.writeln("Error in line: {0}".re(e.line))}