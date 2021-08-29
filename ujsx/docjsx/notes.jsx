
// scopes:
// var customScope = {
//     b: "some extra saucy shit!"
// }

// var b = "hello from global!"

// function whatsThis(arg, anotherarg){
//     $.writeln(arg);
//     $.writeln(anotherarg);
//     return this.b;
// }


// thisis = whatsThis.call(customScope, ["first", "second"]);
// $.writeln(thisis);


// // comma operator
// c ="c";
// d = "d";

// // d = "newd";
// // c = "newc";
// // stuff = d + c;

// // same as:
// stuff = (
//     d = "newd",
//     c = "newc",
//     d + c
//     )

// $.writeln(stuff)

// function Utils(){
//     extend = function(x,c) { for(b in c) x[b] = c[b] } 
//     extend(this,
//         {
//         stuff: function(){
//             return 'stuff is good';
//         }
//     })

//     $.global[{
//         toString: function(){
//             return "python";
//         }
//     }] = function(){
//         return "v 1.0.2";
//     }
// }

// function Main(){
//     Utils.call(this);
// }

// m = new Main("some shit");
// $.writeln(m.stuff())
// $.writeln(python())

// String.prototype.pushAt = function(i, p, d, n) {
    
//     d = (typeof d == "undefined")? true: d;
//     n = (typeof d == "undefined")? 1: n;
//     f = this.substring(0,i);
//     l = this.substring(d? (i+n): i);

//     return f + p + l;
// }

// s = "&1 get &2 me an &3 icecream";

// a = ["one", "two", "three"];

// function __(s){

//     arra = Array.prototype.slice.call(arguments, 1);
//     patt = /&/g;
    
//     while(!!patt.exec(s))
//     {
//       li = patt.lastIndex -1;
//       no = s[li+1];
//       if(isNaN(no)) continue;
//       s = s.pushAt(li, arra[no-1], true, 2);
//     }

//     return s;
// }

// $.filePath   = File($.fileName).fsName;
// $.folderPath = Folder(File($.fileName).path).fsName;

// finals = __("&1 get &2 me an &3 icecream", "one", "two", "three");
// $.writeln(finals);

// patt = /^(table)\s+\[\d+\,\d+\]\(\d+\)/g;
// str = "table [5,5](22)"


$.writeln((str.match(patt)))