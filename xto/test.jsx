//@include "src/xto.jsx"
xto.load("PRIM/Function");
xto.load("PRIM/Array");
xto.load("PRIM/Object");
xto.load("PRIM/String");

Function.prototype.expression = function(cfg)
{
    var F = this.toString();
    var R = /GEN\[\((.*)\)\,(.*)\,(.*)\,(.*)\]/g;
    var G = [];

    while(match = R.exec(F))
    {
        G.push({
            firstIndex: match.index,
            lastIndex: match.index + match[0].length,
            config : {
              "$p0": [4, 5, 7],
              "$p1": [1, 2, 3]
            },
            expr: match[1],
            keys: match[1].match(/\$(\w+)/g),
            startsWith: match[2],
            endsWith: match[3],
            joinedWith: match[4]
        })
    }

    var g = G[0], vals, genSize = Object.first(g.config).length >>> 0;
    
    var valid = Object.value(g.config).every(function(v){
        return is(v, Array) && v.length == genSize
    }) && Object.validateKeys(cfg, Object.keys(g.config));

    var genResult = [], i=-1;
    while(++i<genSize)
    {
      genResult.push(
        g.expr._replace(cfg, function(v){return v[i]})
      );
    }

    genResult = g.startsWith + genResult.join(g.joinedWith) + g.endsWith;

    F.replaceBetween(
      g.firstIndex,
      g.lastIndex,
      genResult
    );

    return genResult;

}

// function getExpression(points){
  
//     return .expression({
      
//       $p0: [[0, points.length], points, i, 0],
//       $p1: [[0, points.length], points, i, 1]
//     }) 
// }

function dogshit(){
  var i = textIndex -1;
  if(
    GEN[($p0 <= i && $p1 <= 78), "", "0", "||\n"]
  ){100}else{0};
}

var e = dogshit.expression({
  "$p0": [2,3,4],
  "$p1": [2,3,5]
})

$.writeln(e);