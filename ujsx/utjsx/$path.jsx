

function Path(){
    
    this.ps = [];
    
    var ag = Array.prototype.slice.call(arguments),
        ln = args.length,
        id = -1;
    
    while(++i<ln) Array.prototype.push.apply(this.ps, ag[i].split("/"));
}

Path.prototype.resolve = function(s/*slash*/){ // 0 => /, 1=> \\
    return this.parts.join(!s? "/": "\\");
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

pp = new Path("d:/media", "Memes");
$.writeln(Folder(pp.resolve(1)).exists)
// ps = pp / "Memesplusplus";

// $.writeln(ps.mkdir())
// $.writeln(ps.parts)