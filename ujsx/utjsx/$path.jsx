

function Path(ip){
    this.parts = ip.split("/");
}

Path.prototype.resolve = function(){
    return this.parts.join("/");
}

Path.prototype["/"] = function(op){
    
    curr = this;
    cStr = curr.resolve();
    newPath = [cStr, op].join("/");

    return typeof this.constructor;
}

pp = new Path("c:/hello");
ps = pp / "newdir";

$.writeln(ps)