
// REGEX FOR LATER:
/*
var RX = /\[PROTO\][\t\r\n\s]*\(\{([^]*)\}\)/g;
$.writeln(dd.match(RX))
*/

//@include "xto.jsx"
xto.load("PRIM/Array");
xto.load("DATA/File");

function tokenize(str)
{
    var TOKENS = [];
    var i = -1, c, val = "", typ;
    var RE = 
    {
        spc: /\s/,
        num: /[0-9]/,
        ltr: /[a-z]/,
    }

    while(++i<str.length)
    {
        c = str[i];
        val = c;
        $.writeln(c)

        if(c == '=') typ = "OPR";
        
        // STRING DETECTOR
        if(c == '"' && typ = "STR") while((c = str[++i]) !== '"') val+=c;
        // SKIP SPACES
        if(RE.spc.test(c)) continue;
        // LETTER
        if(RE.ltr.test(c) && (typ = "LTR")) while(RE.ltr.test(c = str[++i])) val+= c;
        // NUMBER
        if(RE.num.test(c) && (typ = "NUM")) while(RE.num.test(c = str[++i])) val+= c;
        
        TOKENS.push({type: typ, value: val});
    }

    return TOKENS;
}

var pp = "c:/xto/src/test.jsx";

var ff = File(pp);

$.writeln("Opening [{0}] ==> {1}\n-----------------"
          .re(pp, ff.open()));

var dd = ff.read();
$.writeln(dd);
$.writeln(tokenize(dd).se());

$.writeln("=======");
ff.close();