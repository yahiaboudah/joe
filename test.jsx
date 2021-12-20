
//@include "xto/src/xto.jsx"
xto.load("$$$$/DATA");

try
{
    var hh = new HTTP("http://jsonplaceholder.typicode.com/posts/1/comments");
    hh.request("GET");
    var rr = hh.response();
    $.writeln(rr.statusMessage);
    $.writeln(rr.payload);
}

catch(e) {$.writeln("Error in line: {0}".re(e.line))}