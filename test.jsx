
Function.prototype.body = function(repConfig){
    return this.toString()
    .replace(/^[^{]*\{[\s]*/,"    ")
    .replace(/\s*\}[^}]*$/,"")._replace(repConfig || {});
}


String.prototype._replace = function(repCfg){
            
    var str = this;
    for(x in repCfg) if(repCfg.hasOwnProperty(x))
    {
        str = str.split(x).join(repCfg[x])
    }
    return str;
}

Function.prototype.expression = function(cfg)
{
    // find gen
    var rr = /GEN\[.*\]/g;
    var mm = rr.exec(this.body())[0];

    mm = mm.slice(4,-1); i = mm.length;

    var segmentPattern = /\)\,\"/g;
    var segmentMatch   = segmentPattern.exec(mm);

    segmentString = mm.slice(1, segmentPattern.lastIndex);

    return mm;
    
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
    GEN[($p0 <= i && $p1 <= 78), "", "||\n", "0"]
  ){100}else{0};
}

$.writeln(dogshit.expression())