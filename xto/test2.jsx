
//@include "src/xto.jsx";
xto.load("PRIM/String");


var f,l;

var ss = "hello world hello  sister";
var rr = /(hello)(\s+)/g;

while(m = rr.exec(ss))
{
    ss = ss.replaceBetween(
        m.index,
        m.index + m[1].length,
        "hi"
    );
}

$.writeln(ss);