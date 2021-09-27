

function Path(){

    this.ps = [];
    
    var ag = Array.prototype.slice.call(arguments),
        ln = ag.length,
        id = -1;
    
    while(++id<ln) this.ps.push(ag[id].split("/"));
}

Path.prototype.py = function(){
    return [[
        this.ps.shift(),
        this.ps.shift()].join("\\\\"),
        this.ps.join("\\")
    ].join("\\");
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