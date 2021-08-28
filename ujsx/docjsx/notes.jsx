
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