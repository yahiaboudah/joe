
Function.prototype.body = function(){
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
}

function getExpression(points){
  
    return (function()
    {
      var i = textIndex -1;
      if(
        GEN[($p0 <= i && $p1 <= 78), "", "||\n", "0"]
      ){100}else{0};
    
    }).expression({
      
      $p0: [[0, points.length], points, i, 0],
      $p1: [[0, points.length], points, i, 1]
    }) 
}  