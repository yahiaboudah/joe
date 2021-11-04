
MATCH_NAMES = {
  STROKE : "ADBE Vector Graphic - Stroke",
  STROKE_WIDTH: "ADBE Vector Stroke Width",
  PATH: "ADBE Vector Shape - Group",
  TRIM: "ADBE Vector Filter - Trim",
  TRIM_END: "ADBE Vector Trim End",
  FILL: "ADBE Vector Graphic - Fill",

}

function addStroke(layer, swv, expr){

    var defVals = {
      stroke: 6
    }
    
    if(typeof layer == "undefined") throw Error("Select a shape!");
    if(typeof swv   == "undefined") swv  = defVals.stroke;
    if(typeof expr  == "undefined") expr = false;

    var s  = layer.content.addProperty(MATCH_NAMES.STROKE),
        sw = s.property(MATCH_NAMES.STROKE_WIDTH);
    
    if(!expr) return sw.setValue(swv);
    
    layer.property("Effects").addProperty("Slider Control");
    sw.expression = (function(){
      
      fkt = effect("Slider Control")("Slider").value; 
      fkt? fkt:$strokeVal

    }).body().replace("$strokeVal", defVals.stroke);

    return 1;
}

function createLines(
  ori,
  x0,x1,
  y0,y1,
  basis,
  strokeWidth
  )
  {
  
  ori = (ori == "v")?1:0;

  (  ori  && (x0 >= x1) )? $.error =("First value is always less"):0;
  ( !ori  && (y0 >= y1) )? $.error =("First value is always less"):0;

  function len(k0, k1)
  {
    return Math.round(((k1-k0)/basis)+2);
  }
  function getVerts(idx)
  {
    var vert;
    if(ori)
      {
        vert = x0 + basis * idx;
        vert = [[vert, y0],[vert, y1]]
      }
      else
      {
        vert = y0 + basis * idx;
        vert = [[x0, vert],[x1, vert]]
      }
      return vert;
  }

  var shape    = new Shape(),
      numLines = ori? len(x0,x1): len(y0,y1),
      precompName = [numLines, (ori? "Verical":"Horizontal"), "Lines"].join(" "),
      comp     = app.project.activeItem,
      precomp;

  app.beginUndoGroup(callee.name);

  for(var i=-1;++i<numLines;)
  {
      shape.vertices = getVerts(i);
      
      var shapeLayer = comp.layers.addShape(),
          path       = shapeLayer.content.addProperty(MATCH_NAMES.PATH);
      
      path.path.setValue(shape);
      shapeLayer.addStroke(strokeWidth);
      shapeLayer.name = "line {0}".f(i);
  }

  precomp = comp.layers.precompose(Array.range(numLayers), precompName, true);
  
  app.endUndoGroup();
  return precomp;
}

function createGrid
(
  /*int*/x0/*=-4000*/,
  /*int*/x1/*=-4000*/,
  /*int*/y0/*=-3000*/,
  /*int*/y1/*=-3000*/,
  /*int*/xbasis/*=100*/,
  /*int*/ybasis/*=100*/,
  /*int*/strokeWidth/*=2*/
)
{
  Arguments.check(arguments);
  for(var k in {"v":0,"h":0}) createLines(k ,x0 ,x1 ,y0 ,y1 ,xbasis ,strokeWidth);
}

function Axis(numDashes ,textIncluded){
  
  var comp = app.project.activeItem;
  var lineShape = comp.layers.addShape();
  var namePrompt = prompt("Enter the name of the axis","Axis: ");
  lineShape.name = namePrompt.toString();
  var axisProp = lineShape.property("Effects").addProperty("Axis");
  // Just add Group 1
  var mainLineGroup = lineShape.content.addProperty("ADBE Vector Group");
  mainLineGroup.name = "line";
  // add a path prop:
  lineShape.property("Contents").property(mainLineGroup.name).property("Contents").addProperty("ADBE Vector Shape - Group");
  var mainLineExpression = "var start = effect(\"Axis\")(\"Start\");\n"
    +"var end = effect(\"Axis\")(\"End\");\n"
    +"createPath(points =[[start,0], [end,0]],\n"
    +"inTangents = [], outTangents = [], is_closed = false)";
  lineShape.property("Contents").property(mainLineGroup.name).property("Contents").property("Path 1").property("Path").expression = mainLineExpression;
  // add a stroke prop:
  var mainLineStroke = lineShape.property("Contents").property(mainLineGroup.name).property("Contents").addProperty("ADBE Vector Graphic - Stroke");
  mainLineStroke.property("ADBE Vector Stroke Width").setValue(4);

  // Now create the other dashes:
  for(var i=0;i<numDashes;i++){
    var dash = lineShape.property("Contents").addProperty("ADBE Vector Group");
    dash.name = "dash "+i;
    lineShape.property("Contents").property(dash.name).property("Contents").addProperty("ADBE Vector Shape - Group");
    lineShape.property("Contents").property(dash.name).property("Contents").addProperty("ADBE Vector Graphic - Stroke");

    var dashPathExpression = "var start = thisComp.layer(\""+lineShape.name+"\").effect(\"Axis\")(\"Start\");\n"
    +"var spacingout = thisComp.layer(\""+lineShape.name+"\").effect(\"Axis\")(\"Spacingout\");\n"
    +"var end =thisComp.layer(\""+lineShape.name+"\").effect(\"Axis\")(\"End\");\n"
    +"var factor = 30;\n"
    +"var dashLength = effect(\"Axis\")(\"Dash length\");\n"
    +"var pos = start+"+i+"*spacingout;\n"
    + "var dashLen = 0;\n"
    +"if(pos-end<-20){dashLen = dashLength;}\n"
    +"else{dashLen = dashLength*Math.exp(-Math.pow(end-pos,2)/(2*factor*factor));}\n"
    +"createPath(points =[[pos,-dashLen/2], [pos,dashLen/2]],\n"
    +"inTangents = [], outTangents = [], is_closed = false)";

    //var dashStrokeExpression = "thisComp.layer(\""+lineShape.name+"\").effect(\"Axis\")(\"Stroke Width\");";
    lineShape.property("Contents").property(dash.name).property("Contents").property("Path 1").property("Path").expression = dashPathExpression;
    lineShape.property("Contents").property(dash.name).property("Contents").property("Stroke 1").property("Stroke Width").setValue(4);
}
if(textIncluded){
for(var i=0;i<numDashes;i++){
  var textLayer = comp.layers.addText();
  textLayer.shy = true;
  // Editing the source text
  textLayer.sourceText.expression = "var num = thisComp.layer(\""+lineShape.name+"\").effect(\"Axis\")(\"Count\")+"
  +i+"*thisComp.layer(\""+lineShape.name+"\").effect(\"Axis\")(\"Basis\");\
  Math.round(10*num)/10";
  textLayer.name = textLayer.sourceText.value;

  //Anchor Point of the text
  textLayer.transform.anchorPoint.expression= "var x = sourceRectAtTime(time,false).width/2 + sourceRectAtTime(time,false).left;\
  var y = sourceRectAtTime(time,false).height/2 + sourceRectAtTime(time,false).top;\
  [x,y]";

  // Position of the text
  var positionExpression = "var x0 = thisComp.layer(\""+lineShape.name+"\").effect(\"Axis\")(\"Start\");"
  +"var spacingout = thisComp.layer(\""+lineShape.name+"\").effect(\"Axis\")(\"Spacingout\");"
  +"var x = (thisComp.width/2)+"+i+"*spacingout+x0+thisComp.layer(\""+lineShape.name+"\").transform.position[0]-960;"
  +"var y = thisComp.layer(\""+lineShape.name+"\").transform.position[1]+55;"
  +"[x,y]";

  textLayer.transform.position.expression = positionExpression;

  //Opacity of the text
  var opacityExpression = "var end0 =thisComp.layer(\""+lineShape.name+"\").effect(\"Axis\")(\"End\");\
  var pos = transform.position[0]-thisComp.width/2;\
  if(pos-end0 <-10){100}\
  else{100*Math.exp(-Math.pow(end0-pos,2)/(2*30*30))}";

  textLayer.transform.opacity.expression = opacityExpression;

  // END TEXT RELATED THINGS HERE
}
}
 lineShape.property("Effects").property("Axis").property("Start").setValue(-(numDashes*100 -100)/2);
 lineShape.property("Effects").property("Axis").property("End").setValue((numDashes*100 -100)/2);
}

function point(c, radius){

  c = c || app.project.activeItem;
  if(typeof radius == "undefined") radius = 8;
  
  const kconst = 1.81066;
  var stretch = radius/ kconst,
      cn      = callee.name;
  
  var shape = new $Shape({
    vertices    : [[-radius,0],[0,radius],[radius,0],[0,-radius]],
    inTangents  : [[0,-stretch],[-stretch,0],[0,stretch],[stretch,0]],
    outTangents : [[0,stretch],[stretch,0],[0,-stretch],[-stretch,0]],
    closed      : true
  });

  var layer = makeShapeWithPath(c, 0);
  var path  = layer.content.property(MATCH_NAMES.PATH).path;
  path.setValue(shape);
  
  layer.addFill();

  layer.name = "{0} #{1}".f(cn ,app.numObjComment(c, cn));
  layer.comment = ser({
    type  : cn,
    radius: radius
  });

  return layer;
}

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

// prompts:
function createAxisButtonClicked()
{
  Axis
  (
    $prompt("Enter number of dashes: ", 20, parseFloat),
    confirm("Do you want to put nums:")
  );
}
function drawGraphButtonClicked(){
  draw
  (
    $prompt("Enter the drawing time: ", 1.2, parseFloat)
  );
}
function transitionToButtonClicked()
{
  transitionTo(
    $prompt("Enter the transition time: ", 1.2, parseFloat)
  );
}

function createPointButtonClicked(){
  point(
    prompt("Enter a radius of your choosing: ",8)
  );
}

Array.prototype.forEvery(cb)
{
  var arr = this,
      ln  = arr.length;
  
  switch (cb.constructor) 
  {
    case String   : cb = new Function("x", "return "+ cb);
    case Function : cb = cb;
  }

  while(ln--) if(!cb.call(0, arr[ln])) return false;

  return true;
}

Array.prototype.forEach(cb)
{
  var arr = this,
      ln  = arr.length;

  while(ln--) arr[ln] = cb.call(0, arr[ln], ln);
}

function dynamicLineButtonClicked(){

  if(selLayersArr.length != 2) throw Error("Select two layers!");
  
  ps   = [];
  args = Arguments.getArgs(dynamicLine);
  for(a in args) ps.push(prompt(("Enter " + args[a]), 100));
  
  if(ps.forEvery("x == \"s\"")) ps.forEach(parseFloat)
  else ps.forEach(function(p, i){
    p = [selLayersArr[i>1?1:0], i%2]
  })

  dynamicLine.apply(0, ps);
}

// actual clicks!
Object.modifyProp("onClick",{
  createGridButton     : app.wrapUndo(createGridButtonClicked),
  graphFunctionButton  : app.wrapUndo(graphFunctionButtonClicked),
  createAxisButton     : app.wrapUndo(createAxisButtonClicked),
  drawGraphButton      : app.wrapUndo(drawGraphButtonClicked),
  getSelectedLayers    : app.wrapUndo(function getSelectedLayers(){
      alert(app.project.activeItem.sel());
  }),
  resetSelectedLayers  : app.wrapUndo(function empty(){
    selLayersArr = [];
  }),
  transitionToButton   : app.wrapUndo(transitionToButtonClicked),
  createPointClicked   : app.wrapUndo(createPointButtonClicked),
  dynamicLineButton    : app.wrapUndo(dynamicLineButtonClicked),
  handButton           : app.wrapUndo(function createHand(){
    hand($prompt("Enter the hand scale!", 28, parseFloat))
  })

})

win.center();
win.show();
