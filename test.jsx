////@include "xto/src/xto.jsx"
// xto.load("PRIM$Array");

// arr = [6,7,89];

// $.writeln(arr.map(function(x){
//     return x-1;
// }))

function waitFor()
{
    var t = 0;
    while(t < 6000)
    {
        $.writeln(t);
        $.sleep(1000);
        t += 1000;
        if(t == 3000) return 'returned';
    }

    return 555;
}

var v = waitFor();

$.writeln(v);