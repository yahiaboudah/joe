

function dynamicLine(c ,x0 ,y0 ,x1 ,y1){

  defVals = {
    anchorPoint: [0,0],
  }

  c = c || app.project.activeItem;
  
  var shape   = new makeShapeWithPath(c, 2 ,true);
  var path    = shape.content.property(MATCH_NAMES.PATH);
  var argName = Arguments.getArgs(callee);
  var i       = -1;
  var args    = arguments;
  var expr    = ""; 

  for(;++i<args.length;)
  {
    a = arguments[i];
    n = argName[i];

    if(a instanceof Array) // if it's layers you want to connect:
    {
      arrRepCfg = 
      {
        $argName: n,
        $argLayer: a[0].name,
        $argType: a[1]
      }

      expr += (function(){
        
        var $argName     = thisComp.layer("$argLayer").transform.position[$argType] - ($argType? 540 : 960);
        var anch$argName = thisComp.layer("$argLayer").transform.anchorPoint[$argType];

      }).body()._replace(arrRepCfg)
      
    }
    else //if it's points you want to connect:
    {
      expr += (function(){

        var $argName      = $argValue;
        var anch$argName  = 0;

      }).body()._replace({$argName  : n, $argValue : a });

    }
  }

  // now make the path with createPath() with all the shit you made previously
  expr += (function(){
      
    createPath(
    points      = [[x0-anchx0,y0-anchy0],[x1-anchx1,y1-anchy1]],
    inTangents  = [], 
    outTangents = [], 
    is_closed   = true)
  
  }).body();
  
  // set the expression value, and zero the anchor point:
  path.path.expression = expr;
  shape.transform.anchorPoint.setValue(defVals.anchorPoint);
  
  // frick layer off:
  return layer;
}