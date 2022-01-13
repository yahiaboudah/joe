//@include "src/xto.jsx"
xto.load("PRIM/Function");

Function.prototype.expression = function(cfg)
{
    var F = this.toString();
    var R = /GEN\[\((.*)\)\,(.*)\,(.*)\,(.*)\]/g;
    var G = [];

    while(match = R.exec(F))
    {
        G.push({
            config : {
              "$p0": [4, 5, 7],
              "$p1": [1, 2, 3]
            }
            expr: match[1],
            keys: match[1].match(/\$(\w+)/g),
            startsWith: match[2],
            endsWith: match[3],
            joinedWith: match[4]
        })
    }

    var g = G[0], vals, genSize = Object.first(g.config).length >>> 0;
    
    var valid = Object.values(g.config).every(function(v){
        return is(v, Array) && v.length == genSize
    })

    // var rr = /GEN\[.*\]/g;
    // var mm = rr.exec(this.body())[0];

    // mm = mm.slice(4,-1); i = mm.length;

    // var segmentPattern = /\)\,\"/g;
    // var segmentMatch   = segmentPattern.exec(mm);

    // segmentString = mm.slice(1, segmentPattern.lastIndex);

    // return mm;
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

dogshit.expression()