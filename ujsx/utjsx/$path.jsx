

function Path(){
    
    this.parts = [];
    
    var args = Array.prototype.slice.call(arguments),
        len  = args.length,
        i    = -1;
    
    while(++i<len)
    {
        arg = args[i];
        spt = arg.split("/");
        Array.prototype.push.apply(this.parts, spt);
    } 
}

Path.prototype.resolve = function(){
    return this.parts.join("/");
}

Path.prototype.exists = function(){
    return Folder(this.resolve()).exists;
}

Path.prototype.mkdir = function(){
    if(this.exists()) return false;
    return Folder(this.resolve()).create();
}

Path.prototype["/"] = function(op){
    
    curr = this;
    cStr = curr.resolve();
    newPath = [cStr, op].join("/");

    return new Path(newPath);
}

pp = new Path("d:/media");
ps = pp / "Memesplusplus";

$.writeln(ps.mkdir())
$.writeln(ps.parts)