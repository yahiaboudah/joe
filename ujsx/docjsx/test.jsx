

function getsome (){
    return Array.prototype.slice.call(arguments);
}


args = getsome();
$.writeln(args.toSource())