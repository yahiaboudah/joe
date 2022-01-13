//@include "src/xto.jsx"
xto.load("PRIM/Function");
xto.load("PRIM/Array");
xto.load("PRIM/Object");
xto.load("PRIM/String");
xto.load("DATA/JSON");


function Expression(fn, cfg)
{
  this.func = fn;
  this.config = cfg;
  this.result = this.func.toString();

  this.parseGen();
  this.standardReplace(true);
  
  return this.result;
}

// [PROPS]
Expression.xt({
  PATTERNS: {
    "GEN": /GEN\[\((.*)\)\,(.*)\,(.*)\,(.*)\]/g
  }
})

Expression.prototype.xt({
  standardReplace: function()
  {
    this.result = this.result._replace(this.config);
  }
})

Expression.prototype.xt({

  parseGen: function()
  {
    var F = this.result;
    var cfg = this.config;
    var G = [], i=-1;

    while(match = Expression.PATTERNS.GEN.exec(F))
    {
        G.push({
            firstIndex: match.index,
            lastIndex: match.index + match[0].length,
            config : {},
            expr: match[1],
            keys: match[1].match(/\$(\w+)/g),
            startsWith: match[2],
            endsWith: match[3],
            joinedWith: match[4]
        })
    }

    var g, R, j;
    while(++i<G.length)
    {
          R = []; j =-1;
          g = G[i];
          
          // get relevant keys:
          var k;
          for(k in cfg) if(k.in(cfg) && k.in(g.keys)) g.config[k] = cfg[k];

          // get array size:
          var genSize = g.config[Object.first(g.config)].length >>> 0;
          
          //if array sizes don't match, continue:
          var real_config = Object.values(g.config).filter(function(v){
            
          })

          Object.mostRecurring(oo, Array, "length");

          if(!(
            Object.values(g.config).every(function(v){
              return is(v, Array) && v.length == genSize
            }))
          )
          {
            $.writeln("Invalid GEN expression");
            if()
          }

          while(++j<genSize)
          {
            R.push(g.expr._replace(g.config, function(v){return v[j]}));
          }

          R = deser(g.startsWith) + R.join(deser(g.joinedWith)) + deser(g.endsWith);

          // Replace 
          F = F.replaceBetween(
            g.firstIndex,
            g.lastIndex,
            R
          )
    }

    this.result = F;
  }
})

Function.prototype.expression = function(cfg)
{
    var F = this.toString();
    

    return F._replace(cfg);
}


$.writeln(new Expression(function(){
    var i = textIndex -1;
    if(
      GEN[(($p0 <= i && $p1 <= 78 && $p4 <=55)), "", "||\n0", "||\n"]
    ){100}else{$p3};
  }, {
    "$p0": [2,3,5],
    "$p1": [2,3,1],
    "$p4": 44,
    "$p3": 45
}).result)
