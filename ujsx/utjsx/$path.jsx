

function Path(ip){
    this.parts = ip.split("/");
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