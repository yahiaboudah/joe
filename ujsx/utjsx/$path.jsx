

function Path(){
    
    this.ps = [];
    
    var ag = Array.prototype.slice.call(arguments),
        ln = ag.length,
        id = -1;
    
    while(++id<ln) Array.prototype.push.apply(this.ps, ag[id].split("/"));
}

Path.prototype.py = function(){
    e0 = this.ps.shift();
    e1 = this.ps.shift();
    rt = [e0, e1].join("\\\\");
    bd = this.ps.join("\\");
    return [rt, bd].join("\\");
}

Path.prototype.resolve = function(s/*slash*/){ // 0 => /, 1=> \\
    return this.ps.join(!s? "/": "\\");
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