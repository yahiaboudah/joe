
delete(Array.prototype.every);
//@include "src/xto.jsx";
xto.load("PRIM/String");
xto.load("PRIM/Array");

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


try{
    $.writeln([1, 1].every(function(x){return x == 1;}))
}
catch(e)
{
    $.writeln(e);
}