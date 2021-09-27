

function Path(){

    this.ps = [];
    
    var ag = Array.prototype.slice.call(arguments),
        ln = ag.length,
        id = -1;
    
    while(++id<ln) this.ps = this.ps.concat(ag[id].split("/"));
}

Path.prototype.py = function(){
    var e1, e2, rt, bd;
    e1 = this.ps.shift();
    e2 = this.ps.shift();
    rt = [e1, e2].join("\\\\");

    return [rt, bd].join("\\")
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

Path.prototype.toString = function(){
    return this.resolve();
}

// Path.prototype["/"] = function(op){

//     return new Path([
//         this.toString(),
//         op
//     ].join('/'));
// }