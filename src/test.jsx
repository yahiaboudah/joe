// //@include "xto+.jsx"

// xto.loadStruct();

// function collapse(currPad){

//     var oo = {};
//     var L, contents, linePad, parent, pad; 

//     while(true)
//     {
//         L = collapse.file.readln();
//         contents = trim(L), linePad = padding(L);
//         pad = linePad - currPad;
//         if(!contents) continue;

//         if(!pad)    oo[parent = contents] = {};
//         if(pad>0)   oo[parent][contents] = {};
//         if(collapse.file.eof || pad<0)   return oo;
//     }
// }

var file = File("C:/xto/src/xto.cfg");
file.open('r');
//Use arrays instead to populate with structure data

function padding(str){
    (pad = /^\s*/).exec(str);
    return pad.lastIndex;
}

function trim(str){
    return str.replace(/^\s*|\s*$/,'');
}

function line(str){
    return {
        contents: trim(str),
        padding: padding(str)
    }
}


function processXaml(file){

    var A = [];
    var address = [];

    var lineProcessor = function(lvl, str)
    {
        if(!str) return;

        var evalStr = "A", i = -1, iLvl = lvl;
        while(++i<lvl) evalStr += ("[" + address[i] + "].branches");
        evalStr += ".push({name: \"" + str + "\", branches:[]})";
        
        eval(evalStr);

        //Increment address
        if(address[lvl] === undefined) address.push(0);
        else address[lvl] = address[lvl]+1;

        //Reset all next addresses
        while(++iLvl<address.length) address[iLvl] = -1;
    }

    file.open('r');
    while(!file.eof) lineProcessor(padding(line = file.readln())/4, trim(line))

    return A;
}

function processLine(A, str, lvl)
{
    
    address = [];
    while(lvl--){
        
    }

    if(lvl == 0){
        A.push({
            name: str,
            branches: []
        })
    }

    if(lvl == 1){
        var i1 = A.length-1;
        A[i1].branches.push({
            name: str,
            branches: []
        })
    }

    if(lvl == 2){
        address.push(i1)
        var i1 = A.length-1;
        var i2 = A[i1].branches.length-1;
        A[i1].branches[i2].branches.push({
            name: str,
            branches: []
        })
    }

    if(lvl == 3){
        var i1 = A.length-1;
        var i2 = A[i1].branches.length-1;
        var i3 = A[i1].branches[i2].branches.length-1;
        A[i1].branches[i2].branches[i3].branches.push({
            name: str,
            branches: []
        })
    }

    if(lvl == 4){
        var i1 = A.length-1;
        var i2 = A[i1].branches.length-1;
        var i3 = A[i1].branches[i2].branches.length-1;
        var i4 = A[i1].branches[i2].branches[i3].branches.length-1;
        A[i1].branches[i2].branches[i3].branches[i4].branches.push({
            name: str,
            branches: []
        })
    }

    if(lvl == 5){
        
        var i1 = A.length-1;
        var i2 = A[i1].branches.length-1;
        var i3 = A[i1].branches[i2].branches.length-1;
        var i4 = A[i1].branches[i2].branches[i3].branches.length-1;
        var i5 = A[i1].branches[i2].branches[i3].branches[i4].branches.length -1;
        A[i1].branches[i2].branches[i3].branches[i4].branches[i5].branches.push({
            name: str,
            branches: []
        })
    }

    return A;
}

function collapseNext(oo, defaultPad){

    var line = file.readln();

    if(file.eof) return oo;

    $.writeln(
        "Iteration: " + oo.toSource() + "\n"
        + "DEFAULT_PAD: " + defaultPad + "\n"
        + "AT LINE: " + trim(line) + " ("+ padding(line) +")"
    );

    var str = trim(line);
    var pad = padding(line);

    if(pad == defaultPad){
        $.writeln("PAD = DEFAULT PAD\n")
        oo[str] = {};
        return collapseNext(oo, pad);
    }

    if(pad > defaultPad){
        $.writeln("PAD > DEFAULT PAD")
        // $.writeln("pad: " + pad + " for: " + str)
        var subOO = {};
        subOO[str] = {};
        $.writeln("LAST OO is: " + last(oo) + "\n")
        var collapseNextResult = collapseNext(subOO, pad);
        // $.writeln("Last is: " + last(oo));
        // return;
        // $.writeln(last(oo))
        oo[last(oo)] = collapseNextResult.crop;
        oo[collapseNextResult.last] = {};

        collapseNext(oo, defaultPad);
    }

    if((pad < defaultPad)) {
        $.writeln("PAD < DEFAULT PAD\n")
        return {
            "crop": oo,
            "last": str
        };
    }
}

// If the branches are null then the branch
// is automatically considered a leaf:

// Transform the json structure into a tree
// Walk the tree and get the leafs based on the
// particular branch

// [new Branch(name = "XTO", branches = [
//     new Branch(name = "INOP", branches = [...]),
//     new Branch(name = "PRIM", branches = [...]),
//     new Branch(name = "TABLE", leafs = [
//         new Leaf(name = "draw", props = {
//             version = 1, age = 10, speed = 0.1
//         })
//     ])
// ])]



function loaderFunc(){
    $.writeln("loading: " + this.path);
}

var bind = function(func, T) //This 
{
    var F = func;
    var A = Array.prototype.slice.call(arguments, 2);

    return function(){
        return F.apply(T, A.concat(Array.prototype.slice.call(arguments)));
    }
}

xto = {
    load: bind(loaderFunc, {path: "xto"}),

    PRIM: {
        load: bind(loaderFunc, {path: "xto.PRIM"})
    }
}

// xto.PRIM.load()
// the key points to the value only
/* and perhaps to the next key as well
{} is equivilant to new Object({}) so there is
no information inside the newly created instance
about where it fits in any hirearchy, it is simply
pointed to from some key somewhere
This is the hypothesis

The only possible solution in this case would be to
to bind a loadFunc to different contexts
*/

xto.load(PRIM.String)

// This one is probably garbage
// var oo = {
//     someProp: 45,
//     other : {
//         access: function(){
//             $.writeln(this)
//         }
//     }
// }

xto.load("PRIM")

load(xto.root.PRIM.String.Replacers)
load()

access(oo.other)
oo.other.access()

// xto.load();
// xto.PRIM.load();
// xto.PRIM.String.load();

// xto = new Branch();
// xto.addBranch("PRIM")
// xto.getBranch("PRIM/String").loadLeafs();

// xto.PRIM.String = new Leaf();

// $.writeln(Object.prototype.toSource())
// $.writeln(xto.__proto__.toSource())

// try{
//     var A = [];
//     while(!file.eof){
//         var line = file.readln();
//         if((contents = trim(line)) == "") continue;
//         A = processLine(A, contents, padding(line)/4)
//     }
// }
// catch(e){
//     $.writeln(e.line);
// }
// $.writeln(collapse(0²).se())

// $.writeln(A.toSource())

// var finalArr = processXaml(File('C:/xto/src/xto.cfg'))
// $.writeln(finalArr.toSource())

