
//@include "xto/src/xto.jsx"
xto.load("$$$$/DATA");

try
{
    var hh = new HTTP("http://uniquefreshtranscendentsecret.neverssl.com/online");
    hh.request("GET");
    var rr = hh.response();
    $.writeln(rr.statusMessage);
}

catch(e) {$.writeln(e.line)}