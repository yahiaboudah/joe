  var currComp = app.project.activeItem;
  // var currTime = currComp.time;
  //Plotting a function with a lot of vertices:

  function PlotStandardFunction(functionText,xbasis,ybasis,start,end,stepSize){
    this.xbasis = xbasis;
    this.ybasis = ybasis;
    this.functionText = functionText;
    var shapeLayer = app.project.activeItem.layers.addShape();
    var path = shapeLayer.content.addProperty("ADBE Vector Shape - Group");
    var length = Math.floor((((end-start)*xbasis)/stepSize)+2);
    var approx = 10000;
    var vertices=[];
    var inTangents=[];
    var outTangents=[];
    var shape = new Shape();
    var generator = new Function("x","return "+functionText+";");

    for(var i =0;i<length;i++){
      x = ((stepSize * i) + start* xbasis);
      y = (-ybasis) * Math.round(approx*generator(((stepSize * i) + start* xbasis)/xbasis))/approx;
      vertices.push([x,y]);
      }

     shape.vertices=vertices;
     shape.inTangents = inTangents;
     shape.outTangents = outTangents;
     shape.closed=false;

     path.path.setValue(shape);
     addStroke(shapeLayer,5);
     shapeLayer.name = functionText;
     shapeLayer.comment = functionText;
     shapeLayer.effect.addProperty("xAxis");

      this.functionShape = shapeLayer;
  }

  //Plotting a function with less vertices:
  function Plot(functionText,functionDerivativeText,xbasis,ybasis,start,end,stepSize){
    var shapeLayer = app.project.activeItem.layers.addShape();
    var path = shapeLayer.content.addProperty("ADBE Vector Shape - Group");
    var length = Math.floor((((end-start)*xbasis)/stepSize)+2);
    var k = (100/stepSize) * 3;
    var approx = 10000;
    var vertices=[];
    var inTangents=[];
    var outTangents=[];
    var shape = new Shape();
    var generator = new Function("x","return "+functionText+";");
    var generatorDeriv = new Function("x","return "+functionDerivativeText+";");

    for(var i =0;i<length;i++){
      x = ((stepSize * i) + start* xbasis);
      y = (-ybasis) * Math.round(approx*generator(((stepSize * i) + start* xbasis)/xbasis))/approx;
      y0 = (ybasis/k) * Math.round(approx*generatorDeriv(((stepSize * i) + start* xbasis)/xbasis))/approx;
      vertices.push([x,y]);
      inTangents.push([-100/k,y0]);
      outTangents.push([100/k,-y0]);
      }

    shape.vertices=vertices;
    shape.inTangents = inTangents;
    shape.outTangents = outTangents;
    shape.closed=false;

    path.path.setValue(shape);
    addStroke(shapeLayer,5);
    shapeLayer.name = functionText;
    shapeLayer.comment = functionText;
    shapeLayer.effect.addProperty("xAxis");
    return shapeLayer;
 }

Plot.prototype = {
    draw: function(interval){
        var functionShape = this.functionShape;
        var currComp = app.project.activeItem;
        var trim = functionShape.content.addProperty("ADBE Vector Filter - Trim");
        trim.property("ADBE Vector Trim End").setValueAtTime(currComp.time,0);
        trim.property("ADBE Vector Trim End").setValueAtTime(currComp.time+interval,100);
    },

    transitionTo: function(newFunction,interval){
        if( !(newFunction instanceof ShapeLayer) ){
        alert("Please pass a shape layer as a parameter");
    }

  var newPath0 = newFunction.content.property("ADBE Vector Shape - Group");
  var newPath = newPath0.path;
  var functionShape = this.functionShape;
  var currPath0 = functionShape.content.property("ADBE Vector Shape - Group");
  var currPath = currPath0.path;
  var currComp = app.project.activeItem;
  currPath.setValueAtTime(currComp.time, currPath.value);
  currPath.setValueAtTime(currComp.time+interval,newPath.value);
}
}

function Point(radius){
   radius = (typeof radius !== 'undefined')?radius:8;
   this.radius = radius;
   var stretch = radius/1.81066;
   var shape = new Shape();
   shape.vertices = [[-radius,0],[0,radius],[radius,0],[0,-radius]];
   shape.inTangents = [[0,-stretch],[-stretch,0],[0,stretch],[stretch,0]];
   shape.outTangents = [[0,stretch],[stretch,0],[0,-stretch],[-stretch,0]];
   shape.closed = true;
   var layer = new createShapeLayerWithPath(0);
   var path0 = layer.content.property("ADBE Vector Shape - Group");
   path0.path.setValue(shape);
   addFill(layer);
   var currComp = app.project.activeItem;
   layer.name = "circle"+currComp.layers.length;
   layer.comment = radius;
   this.layer = layer;
   this.name = layer.name;
}
// I dont understand why is the Point prototype undefined:
/*
 Point.prototype = {
   attachToFunction: function(passedFunction){
     var positionExpression =
     "var x = thisLayer.position[0]+960;\n"
     +"var fx = new Function(\"x\",\"return "+passedFunction.functionText+";\");\n"
     +"var xbasis ="+passedFunction.xbasis+" ;\n"
     +"var ybasis ="+passedFunction.ybasis+";\n"
     +"[x,-ybasis*fx((x-960)/xbasis)+540]";
     this.layer.transform.position.expression = positionExpression;
   },
   attachToHand: function(hand){
   var positionExpression = "thisComp.layer(\""+hand.layer.name+"\").transform.position";
   this.layer.transform.position.expression = positionExpression;
   }
}
*/

function show(timeInterval){
   var currentComp = app.project.activeItem;
   var layers = currentComp.selectedLayers;
   var layer = layers[0];
   var currTime = currentComp.time;
   layer.transform.opacity.setValueAtTime(currTime,0);
   layer.transform.opacity.setValueAtTime(currTime+timeInterval,100);
}

 function hide(timeInterval){
   var currentComp = app.project.activeItem;
   var layers = currentComp.selectedLayers;
   var layer = layers[0];
   var currTime = currentComp.time;
   layer.transform.opacity.setValueAtTime(currTime,100);
   layer.transform.opacity.setValueAtTime(currTime+timeInterval,0);
 }

 function draw(layer,interval,d){
  var currComp = app.project.activeItem;
  var trim = layer.content.addProperty("ADBE Vector Filter - Trim");
  trim.property("ADBE Vector Trim Start").setValue((d==1)?0:100);
  trim.property("ADBE Vector Trim End").setValueAtTime(currComp.time,(d==1)?0:100);
  trim.property("ADBE Vector Trim End").setValueAtTime(currComp.time+interval,(d==1)?100:0);
 }

 function DynamicLine(x0,y0,x1,y1){
   var shape = new createShapeLayerWithPath(2,true);
   this.layer = shape;
   var path0 = shape.content.property("ADBE Vector Shape - Group");
   var pathEx = "";
   var argName = ["x0","y0","x1","y1"];
   for(var i=0; i<arguments.length;i++){
     if(arguments[i] instanceof Array){
       pathEx += "var "+argName[i]+" = thisComp.layer(\""+arguments[i][0].name+"\").transform.position["+arguments[i][1]+"]-(("+arguments[i][1]+"==0)?960:540);\n";
       pathEx += "var anch"+argName[i]+" = thisComp.layer(\""+arguments[i][0].name+"\").transform.anchorPoint["+arguments[i][1]+"];";
     }else{
       pathEx += "var "+argName[i]+"="+arguments[i]+";\n";
       pathEx += "var anch"+argName[i]+" = 0;";
     }
   }

   var pathExpression = pathEx
   +"createPath(points = [[x0-anchx0,y0-anchy0],[x1-anchx1,y1-anchy1]],\n"
   +"inTangents = [], outTangents = [], is_closed = true)";

   path0.path.expression = pathExpression;

   return this.layer;
 }

function attachXPosition(attached,attachedOn){
  var positionExpression = "[thisComp.layer("+attachedOn.name+").transform.position[0],thisLayer.position[1]]";
  attached.transform.position.expression = positionExpression;
}

 //adding stroke to an existing shape layer:
 function addStroke(shape,strokeWidthValue,expression){
     switch (arguments.length) {
       case 0: alert("select a shape");
       case 1: strokeWidthValue = 6;
       case 2: expression = false;
       case 3: break;
       default: alert("check your arguments boy");
     }

     var stroke = shape.content.addProperty("ADBE Vector Graphic - Stroke");
     var strokeWidth = stroke.property("ADBE Vector Stroke Width");
     if(!expression){
       strokeWidth.setValue(strokeWidthValue);
     }else{
       shape.property("Effects").addProperty("Slider Control");
       strokeWidth.expression = "effect(\"Slider Control\")(\"Slider\").value == 0? 5: effect(\"Slider Control\")(\"Slider\")";
      }
  }

  //centering the anchor point of a layer:
 function centerAnchorPoint(layer){
    var comp = app.project.activeItem;
    var x = layer.sourceRectAtTime(comp.time,false).width/2 + layer.sourceRectAtTime(comp.time,false).left;
    var y = layer.sourceRectAtTime(comp.time,false).height/2 + layer.sourceRectAtTime(comp.time,false).top;
    layer.anchorPoint.setValue([x,y]);
}

 //creating lines:
 function createLines(type,x0,x1,y0,y1,basis,strokeWidth){
   var boo = (type=="vertical")?true:false;

   if(boo){if(x0>=x1){alert("First value is always less!");}}
   else{if(y0>=y1){alert("First value is always less!");}}

   var count = 0;
   var shape = new Shape();
   var length = boo?Math.round(((x1-x0)/basis)+2):Math.round(((y1-y0)/basis)+2);
   var indicies = [];
   var currComp = app.project.activeItem;

   app.beginUndoGroup("Lines Creation");

   for(var i=0;i<length;i++){
   var vert = boo?x0+(basis*i):y0+(basis*i);
   shape.vertices=boo?[[vert,y0],[vert,y1]]:[[x0,vert],[x1,vert]];
   var shapeLayer = currComp.layers.addShape();
   var path = shapeLayer.content.addProperty("ADBE Vector Shape - Group");
   path.path.setValue(shape);
   addStroke(shapeLayer,strokeWidth);
   shapeLayer.name = i;
   indicies[indicies.length]=i+1;
   }
   app.endUndoGroup();

   var comp = app.project.activeItem.layers.precompose(indicies,type,true);
   currComp.layer(1).transform.opacity.setValue(10);
   return comp;
}

 // function create a total grid:
  function createGrid(x0,x1,y0,y1,xbasis,ybasis,strokeWidth){
    switch (arguments.length) {
      case 0: x0=-4000;
      case 1: x1=4000;
      case 2: y0=-3000;
      case 3: y1=3000;
      case 4: xbasis=100;
      case 5: ybasis=100;
      case 6: strokeWidth=2;
      case 7:break;
      default: alert('invalid argument type')
    }
    createLines("vertical",x0,x1,y0,y1,xbasis,strokeWidth);
    createLines("horizontal",x0,x1,y0,y1,ybasis,strokeWidth);
  }

  // create a line:
  function Line(x0, x1, strokeWidthValue){
     var shapeLayer = new Shape();
     shapeLayer.vertices = [[x0,0],[x1,0]];
     var line = app.project.activeItem.layers.addShape();
     var path = line.content.addProperty("ADBE Vector Shape - Group");
     path.path.setValue(shapeLayer);

     addStroke(line,strokeWidthValue);
     line.name = "line";

     this.layer = line;
  }

  Line.prototype = {
    attachToPoints : function(point1,point2){

      if(arguments.length != 2){
        alert("Please pass two points as parameters");
      }

      var line = this.layer;

      var positionExpression ="thisComp.layer(\""+point1.name+"\").transform.position";

      var rotationExpression = "var p0 =thisComp.layer(\""+point1.name+"\").transform.position;\n"
     +"var p1 =thisComp.layer(\""+point2.name+"\").transform.position;\n"
     +"var rot =  (p1[0]-p0[0]) ==0?0: radiansToDegrees(Math.atan((p1[1]-p0[1])/(p1[0]-p0[0])));"
     +"rot";
     line.transform.position.expression = positionExpression;
     line.transform.rotation.expression = rotationExpression;
    }
  }

  function Hand(scale){
    scale  = (typeof scale !== 'undefined')? scale: 28;
    var importedFile = app.project.importFile(new ImportOptions(File("hand.ai")));
    var layer = currComp.layers.add(importedFile);
    layer.transform.anchorPoint.setValue([161,236]);
    layer.transform.scale.setValue([scale,scale]);
    this.layer = layer;
  }

  function createShapeLayer(shapeObj,strokeWidth){
    var line = app.project.activeItem.layers.addShape();
    var path = line.content.addProperty("ADBE Vector Shape - Group");
    path.path.setValue(shapeObj);
    addStroke(line,strokeWidth);

    return line;
  }

  function createShapeObject(vertices,inTangents,outTangents,state){
    var shapeObj = new Shape();
    shapeObj.vertices=vertices;
    shapeObj.inTangents = inTangents;
    shapeObj.outTangents = outTangents;
    shapeObj.closed = state;

    return shapeObj;
  }

  function populateXAxis(x0,strokeWidthValue,textValue,dashLength){
    var comp = app.project.activeItem;
    //create dashes:
    var shapeObj = createShapeObject([[x0,dashLength/2],[x0,-dashLength/2]],[],[],false);
    createShapeLayer(shapeObj,strokeWidthValue);

    //create numbers:
    var textLayer = comp.layers.addText(textValue);
    textLayer.position.setValue([(comp.width/2)+x0,540+40]);
    centerAnchorPoint(textLayer);
  }

   //Create a shape and add a path directly:
   function createShapeLayerWithPath(strokeWidth,expressionStroke){
    var line = app.project.activeItem.layers.addShape();
    var path = line.content.addProperty("ADBE Vector Shape - Group");
    addStroke(line,strokeWidth,expressionStroke);
    return line;
  }

  function addFill(shape){
    var fill = shape.content.addProperty("ADBE Vector Graphic - Fill");
    return fill;
  }

  function staticXAxis(start,end,spacingout,count,dashLength,strokeWidth){
    createLines(0,start,end,strokeWidth+2);

    var length = ((end-start)/spacingout)+2;
    var indicies = [];
    for(var i=0; i<length; i++){
      populateXAxis((start+(spacingout*i)),strokeWidth,count+i,dashLength);
      indicies[indicies.length]=(2*i)+1;
      indicies[indicies.length]=2*(i+1);
  }

    var compo = app.project.activeItem.layers.precompose(indicies,"xAxis",true);
    compo.name="xAxis";
  }

  function dynamicXAxis(numDashes,textIncluded){
    switch (arguments.length) {
      case 0: numDashes = 80;
      case 1: textIncluded = false;
      case 2: break;
      default:alert('invalid arguments length')
    }
    var comp = app.project.activeItem;
    var shape = new createShapeLayerWithPath(5);
    shape.name= "xLine";
    shape.effect.addProperty("xAxis");
    var path = shape.content.property("ADBE Vector Shape - Group");
    var axisExpression = "var x0 = effect(\"xAxis\")(\"Start\");\
      var x1 = effect(\"xAxis\")(\"End\");\
      createPath(points =[[x0,0], [x1,0]],\
        inTangents = [], outTangents = [], is_closed = false)";
      path.path.expression = axisExpression;

      for(var i=0;i<numDashes;i++){
      var dash = new createShapeLayerWithPath(3);
      dash.effect.addProperty("Dashes");
      var path = dash.content.property("ADBE Vector Shape - Group");
      var dashPathExpression = "var x0 = thisComp.layer(\""+shape.name+"\").effect(\"xAxis\")(\"Start\");\
      var end0 =thisComp.layer(\""+shape.name+"\").effect(\"xAxis\")(\"End\");\
      var spacingout =thisComp.layer(\""+shape.name+"\").effect(\"xAxis\")(\"Spacingout\");;\
      var factor = 30;\
      var dashLength0 = effect(\"Dashes\")(\"Dash length\");\
      var pos = x0+"+i+"*spacingout;\
      var dashLength = 0;\
      if(pos-end0<-20){dashLength = dashLength0;}\
      else{dashLength = dashLength0*Math.exp(-Math.pow(end0-pos,2)/(2*factor*factor));}\
      createPath(points =[[pos,-dashLength/2], [pos,dashLength/2]],\
      inTangents = [], outTangents = [], is_closed = false)";
      path.path.expression = dashPathExpression;

      if(textIncluded){
      var textLayer = comp.layers.addText();
      textLayer.sourceText.expression =
      "var num = thisComp.layer(\""+shape.name+"\").effect(\"xAxis\")(\"Count\")+"
      +i+"*thisComp.layer(\""+shape.name+"\").effect(\"xAxis\")(\"Basis\");\
      Math.round(10*num)/10";
      textLayer.name = textLayer.sourceText.value;
      textLayer.transform.anchorPoint.expression="\
      var x = sourceRectAtTime(time,false).width/2 + sourceRectAtTime(time,false).left;\
      var y = sourceRectAtTime(time,false).height/2 + sourceRectAtTime(time,false).top;\
      [x,y]";
      dash.name = textLayer.sourceText.value;

      var positionExpression = "\
      var x0 = thisComp.layer(\""+shape.name+"\").effect(\"xAxis\")(\"Start\");\
      var spacingout = thisComp.layer(\""+shape.name+"\").effect(\"xAxis\")(\"Spacingout\");;\
      var x = (thisComp.width/2)+"+i+"*spacingout+x0;\
      var y = thisComp.layer(\""+shape.name+"\").transform.position[1]+40;\
      [x,y]";
      textLayer.transform.position.expression = positionExpression;

      var opacityExpression = "\
      var end0 =thisComp.layer(\""+shape.name+"\").effect(\"xAxis\")(\"End\");\
      var pos = transform.position[0]-thisComp.width/2;\
      if(pos-end0 <-10){100}\
      else{100*Math.exp(-Math.pow(end0-pos,2)/(2*30*30))}\
      ";
      textLayer.transform.opacity.expression = opacityExpression;
  }
}
}

  function dynamicYAxis(numDashes){
    var comp = app.project.activeItem;
    var shape = new createShapeLayerWithPath(5);
    shape.name= "yLine";
    shape.effect.addProperty("xAxis");
    var path = shape.content.property("ADBE Vector Shape - Group");
    var axisExpression = "var y0 =effect(\"xAxis\")(\"Start\");\
      var y1 = effect(\"xAxis\")(\"End\");\
      createPath(points =[[0,y0], [0,y1]],\
      inTangents = [], outTangents = [], is_closed = false)";
      path.path.expression = axisExpression;

      for(var i=0;i<numDashes;i++){
      var dash = new createShapeLayerWithPath(3);
      dash.effect.addProperty("Dashes");
      var path = dash.content.property("ADBE Vector Shape - Group");
      var dashPathExpression = "var y0 = thisComp.layer(\""+shape.name+"\").effect(\"xAxis\")(\"Start\");\
      var y1 =thisComp.layer(\""+shape.name+"\").effect(\"xAxis\")(\"End\");\
      var spacingout =thisComp.layer(\""+shape.name+"\").effect(\"xAxis\")(\"Spacingout\");;\
      var factor = 30;\
      var dashLength0 = effect(\"Dashes\")(\"Dash length\");\
      var pos = y0+"+i+"*spacingout;\
      var dashLength = 0;\
      if(pos-y1<-20){dashLength = dashLength0;}\
      else{dashLength = dashLength0*Math.exp(-Math.pow(y1-pos,2)/(2*factor*factor));}\
      createPath(points =[[-dashLength/2,pos], [dashLength/2,pos]],\
      inTangents = [], outTangents = [], is_closed = false)";
      path.path.expression = dashPathExpression;

      var textLayer = comp.layers.addText();
      textLayer.sourceText.expression =
      "var num = thisComp.layer(\""+shape.name+"\").effect(\"xAxis\")(\"Count\")+"
      +(-1*i)+"*thisComp.layer(\""+shape.name+"\").effect(\"xAxis\")(\"Basis\");\
      Math.round(10*num)/10";
      textLayer.name = textLayer.sourceText.value;
      textLayer.transform.anchorPoint.expression="\
      var x = sourceRectAtTime(time,false).width/2 + sourceRectAtTime(time,false).left;\
      var y = sourceRectAtTime(time,false).height/2 + sourceRectAtTime(time,false).top;\
      [x,y]";
      dash.name = textLayer.sourceText.value;

      var positionExpression = "\
      var y0 = thisComp.layer(\""+shape.name+"\").effect(\"xAxis\")(\"Start\");\
      var spacingout = thisComp.layer(\""+shape.name+"\").effect(\"xAxis\")(\"Spacingout\");;\
      var x = thisComp.layer(\""+shape.name+"\").transform.position[0]-45;\
      var y = (thisComp.height/2)+"+i+"*spacingout+y0;\
      [x,y]";
      textLayer.transform.position.expression = positionExpression;

      var opacityExpression = "\
      var end0 =thisComp.layer(\""+shape.name+"\").effect(\"xAxis\")(\"End\");\
      var pos = transform.position[1]-thisComp.height/2;\
      if(pos-end0 <-10){100}\
      else{100*Math.exp(-Math.pow(end0-pos,2)/(2*30*30))}\
      ";
      textLayer.transform.opacity.expression = opacityExpression;
  }
}

 function setPathValue(layer,shape){
   var path0 = layer.content.property("ADBE Vector Shape - Group");
   var path = path0.path;
   path.setValue(shape);
 }

 function createLineWithTwoPoints(type,x0,x1){
   var shapeLayer = new Shape();
   switch (type) {
     case "horizontal":
     shapeLayer.vertices = [[x0,0],[x1,0]];
       break;
     case "vertical":
      shapeLayer.vertices = [[0,x0],[0,x1]];
      break;
     default: alert("Please specify whether your line is\
     horizontal or vertical!");
   }
   var line = app.project.activeItem.layers.addShape();
   var path = line.content.addProperty("ADBE Vector Shape - Group");
   path.path.setValue(shapeLayer);

   addStroke(line,2);
   line.name = "line";

   return line;
}

function slope(){
  var slope = new createLineWithTwoPoints("horizontal",-400,400);
  centerAnchorPoint(slope);
  slope.effect.addProperty("Function Point");

  var positionExpression = "var x = thisLayer.position[0]+960;\n"
  +"var chosenFunction = thisLayer.effect(\"Function Point\")(\"FunctionLayer\");\n"
  +"var fx = new Function(\"x\",\"return \"+chosenFunction.name+\";\");\n"
  +"var xbasis = thisLayer.effect(\"Function Point\")(\"xbasis\");\n"
  +"var ybasis = thisLayer.effect(\"Function Point\")(\"ybasis\");\n"
  +"[x,-ybasis*fx((x-960)/xbasis)+540]";

  var rotationExpression = "var h = 0.00001;\n"
  +"var xposition = thisLayer.position[0];\n"
  +"var chosenFunction = thisLayer.effect(\"Function Point\")(\"FunctionLayer\");\n"
  +"var xbasis = thisLayer.effect(\"Function Point\")(\"xbasis\");\n"
  +"var yabsis = thisLayer.effect(\"Function Point\")(\"ybasis\");\n"
  +"var fx = new Function(\"x\",\"return \"+chosenFunction.name+\";\");\n"
  +"var rot = -radiansToDegrees(Math.atan(((fx(((xposition-960)/xbasis)+h)-fx((xposition-960)/xbasis)))/h));\n"
  +"rot"

  slope.transform.position.expression = positionExpression;
  slope.transform.rotation.expression = rotationExpression;

  this.layer = slope;
}

function deltaxyOfSlope(point,slope){
  var deltax= new createShapeLayerWithPath(5);
  deltax.name = "DeltaX";
  var deltay = new createShapeLayerWithPath(5);
  deltay.name = "DeltaY";
  deltax.effect.addProperty("Function Point");
  deltay.effect.addProperty("Function Point");
  var xpath = deltax.content.property("ADBE Vector Shape - Group");
  var ypath = deltay.content.property("ADBE Vector Shape - Group");

  var xpathExpression = "var someCoordinate = thisComp.layer(\""+slope.layer.name+"\").transform.rotation<0 ? 0: -200;\n"
  +"createPath(points =[[-100,0], [someCoordinate,0]],\n"
  +"inTangents = [], outTangents = [], is_closed = false)";

  var xpositionExpression = "var x = thisComp.layer(\""+point.layer.name+"\").transform.position[0]+100;\n"
  +"var y = thisComp.layer(\""+point.layer.name+"\").transform.position[1];\n"
  +"[x,y]";

  var ypathExpression = "var tanShit =Math.tan(degreesToRadians(thisComp.layer(\""+slope.layer.name+"\").transform.rotation));\n"
  +"var someCoordinate = thisComp.layer(\""+slope.layer.name+"\").transform.rotation<0?tanShit:-tanShit;\n"
  +"var k = thisComp.layer(\""+slope.layer.name+"\").transform.rotation<0?1:-1;\n"
  +"createPath(points =[[k*100,0], [k*100,100*someCoordinate]],\n"
  +"inTangents = [], outTangents = [], is_closed = false)";

  var ypositionExpression = "var x = thisComp.layer(\""+point.layer.name+"\").transform.position[0];\n"
  +"var y = thisComp.layer(\""+point.layer.name+"\").transform.position[1];\n"
  +"[x,y]";

  var colorExpression = "function hexToColor(theHex){\
  theHex = parseInt(theHex,16);\
  var r = theHex >> 16;\
  var g = (theHex & 0x00ff00) >> 8;\
  var b = theHex & 0xff;\
  return [r/255,g/255,b/255,1];\
  }\
  if(thisComp.layer(\""+slope.layer.name+"\").transform.rotation<0){\
  hexToColor(\"2DAA4B\");\
  }else{\
  hexToColor(\"FF1717\");\
  }";
  var someStroke = deltax.content.property("ADBE Vector Graphic - Stroke");

  xpath.path.expression = xpathExpression;
  ypath.path.expression = ypathExpression;

  deltax.transform.position.expression= xpositionExpression;
  deltay.transform.position.expression = ypositionExpression;

  someStroke.property("ADBE Vector Stroke Color").expression = colorExpression;
}


function createParameter(someFunctionName){
   var paramText = currComp.layers.addText();
   paramText.name = "paramText";
   paramText.property("Effects").addProperty("Slider Control");
   var paramTextExpression = "var x = \"(\"+Math.floor(effect(\"Slider Control\")(\"Slider\").value)+\")\";"
   +"x";
    paramText.sourceText.expression = paramTextExpression;
    paramText.transform.scale.setValue([137,156]);
    centerAnchorPoint(paramText);
    positionExpression = "var x = thisComp.layer(\""+someFunctionName+"\").transform.position[0]+120;\n"
    +"var y = thisComp.layer(\""+someFunctionName+"\").transform.position[1];\n[x,y]";
    paramText.transform.position.expression = positionExpression;
}



// var comp = app.project.activeItem;
// var neuronSize = 200;
// var depth = 4;
// var max = 3;
// var verticalSpacing = 300;

// var firstNeuronPosx = ((comp.width - neuronSize*(2*depth-1))/2)+neuronSize/2; 
// var firstNeuronPosy = ((comp.height - (neuronSize*max+(verticalSpacing-neuronSize)*(max-1)))/2)+neuronSize/2;

// $.writeln(firstNeuronPosx);

//@include "src/xto.jsx";

var weightsLocked = false;

function Neuron(ellipSize,name)
{

  this.size = ellipSize;
  var precompDimension = ellipSize+5;
  var comp = app.project.activeItem;
  var name = "neuron 1";

  //===========================================
  //============= NEURON ======================

  var neuron = comp.layers.$add("shape", {
      name: name
  }, {
      
      stroke: {
          color: [1,1,1,1],
          width: 3
      }
      
      fill: {
          color: [1,1,1,1],
          opacity: new Expression(function(){
              comp($compName).layer($layerName).effect("NeuronControl")("Activation")
          }, {$compName: comp.name, $layerName: name})
      }
  });
  neuron.prop("pos").setValue([precompDimension/2,precompDimension/2]);
  neuron.add("ellipse", {value: {size: [ellipSize, ellipSize]}}).moveTo(0);
  //-----------------------------------------------
  
  //===============================================
  //================ TEXT =========================
  var txt = comp.layers.$add("text", {

      name : name
      source: new Expression(function(){
            var N= thisComp.layer("$name").effect("NeuronControl"),
                k= N("Threshold").value * N("Activation").value; 
            
            k.toFixed(k>100?0:k>10?1:2)
      }),

      config: {
            fontSize: (75/200)*ellipSize,
            fillColor: [1,1,1],
            font: "LMRoman10-Regular",
            strokeOverFill: true,
            applyStroke: false,
            applyFill: true
      }
  }, {

      animators: [
          {
              name: "colorAnimator",
              props: {
                  fillColor: new Expression(function(){
                            var k =  Math.floor(thisComp.layer("$name").effect("NeuronControl")("Activation"));
                            (k<0.5)? [1,1,1,1]: [1,1,1,255]/255;
                    }) 
            }
          }
      ]
  });
  
  txt.centerAnchorPoint();
  txt.prop("pos").expression = (new Expression(function(){
      var k = thisComp.layer("$name").effect("NeuronControl")("Activation").value;
      (k == 1)? [112.5, 99.5]: [101.5, 99.5]
  }, {$name: name}))
  //-------------------------------------------------------
  
  //====================================================
  //================== PRECOMP =========================
  var PR = comp.layers.precomp({
      indices: [1,2],
      name: name,
      moveAllAttributes: true,
      width: precompDimension,
      height: precompDimension
  })

  PR.collapseTransformation = PR.shy = true;
  PR.$add("Effect:NeuronControl");
  //----------------------------------------------------

  return PR;
}

function line(m, n)
{
    return comp.$add("shape", {name: "Line"}, {
        pathGroup: {
            path: new Expression(function(){
                createPath(points = [
                    thisComp.layer($M).transform.position - [960,540],
                    thisComp.layer($N).transform.position - [960,540]
            ])
            }, {$M: m.name, $N: n.name})
        },

        stroke: {
            strokeWidth: 2
        }
    })
}

function getMask(n){

  var expr = new Expression(function(){

    var L = thisComp.layer("$name"),
        R = L.sourceRectAtTime(time,true).width/2 * L.transform.scale[0]/100,
        // S: stretch
        S = R/1.81066;
    
    var x = L.position[0]-1060,
        y = L.position[1]-640;

    createPath(
        points = [[-R+x,y],[x,y+R],[x+R, y],[x,y-R]],
        inTangents = [[0,-S],[-S,0],[0,S],[S,0]],
        outTangents = [[0,S],[S,0],[0,-S],[-S,0]], 
        is_closed = true
    )
  
  }, {$name: n});

  return {
    maskMode: '-',
    path: expr
  }
}

function Connec(n,m){

    var k = line(m, n);
    k.centerAnchorPoint().shy = true;

    k.masks([getMask(n), getMask(m)], {locked: true});
    return k;
}

function net(nn){
    
    var comp = app.project.activeItem;
    var NS = 200, HG = 200, VG = 100,
        MX = Math.max.apply(undefined, nn);
    
    var C = 
    {
      netArray: nn,
      neuronSize: NS,
      hGap: HG,
      vGap: VG,
      depth: nn.length,
      maxHeight: MX,
      initX: 0.5 * (comp.width  - (NS + HG) * (nn.length  -1)),
      initY: 0.5 * (comp.height - (NS + VG) * (MX-1))
    }

    var A = [];
    var i, j, k; i = j = k = -1;
    while(++i<nn.length)
    {
      A[i] = [];
      while(++j<nn[i])
      {
        A[i][j] = new Neuron(C.neuronSize, "Neuron {0}{1}".re(i, j));
        if(i == 0) continue;

        while(++k<nn[i-1]) (new Connec(A[i-1][k], A[i][j])).name = "({0}.{1}) ⇔ ({2}.{3})".re(i-1, k, i, j);
        k = -1;
      }
      j = -1;
    }
    i = -1;

    // Adjust position:
    // TODO: Find a way to adjust on creation and not displace the connections
    while(++i<nn.length) for(var j=0; j<nn[i]; j++)
    {
      A[i][j].transform.position.setValue(
          [
            C.initX + (C.neuronSize + C.hGap) * i,
            // Vertically push the first neuron
            C.initY + (C.neuronSize + C.vGap) * (j + ((C.netArray[i] != C.maxHeight)?(C.maxHeight-nn[i])/2:0))
          ]
        );
    }
}

function formCombosGivenCoord(C, netArray)
{    
    var A = []; //Combos
    var L1 = parseInt(C[0][0]), L2 = parseInt(C[1][0]);  
    var R =  L1> L2?true:false; //Reverse fire

    if(Math.abs(L1-L2) != 1) 
            throw Error("Can't form Combinations of 2 non-consecutive layers")    
    
    // Expand
    var i=-1, j=-1, cc;
    while(++i<C.length){
      cc = C[i];
      C[i] = [];
      if(cc.length == 1) while(++j<netArray[cc]) C[i].push(cc + j);
      else C[i].push(cc); // if it has 2 digits
      j=-1
    }
    i=-1;

    // Combine
    cc = C[0];
    while(++i<cc.length){
      while(++j<C[1].length) A.push("{0}{1}".re(R?C[1][j]:C[0][i], R?C[0][i]:C[1][j]))
      j=-1;
    }

    return {
      combinations: A,
      reverseFire: R
    };
}

function select(fireup,reversed,coord){
    
    if(is(reversed, undefined)) reversed =false;


    var C;
    var comp = app.project.activeItem,
        S = comp.sel();
    
    if(fireup && !is(coord, undefined)) C = coord;
    else C = formCombos(S);

    comp.deselect('A');
    
    for(var i=1;i<comp.layers.length+1;i++)
    {
        var comment = comp.layer(i).comment;
        if(reversed){
            var comboChecked = 0;
            if(comment.length == 4){
                for(var j=0;j<combos.length;j++){
                    if(comment != combos[j]){
                        comboChecked++;
                    }
                }
            }
            if(comboChecked == combos.length){
                comp.layer(i).selected = true;
            }
        }
        else
        {
            if(comment.length == 4){
                for(var j=0;j<combos.length;j++){
                   if(comment == combos[j]){
                        comp.layer(i).selected = true;
                    }
                }
            }
        }
    }
}

function formCombos(array){
  
  var combos = [];
  
  while(++i<array.length)
  {
    j = i+1;
    while(++j<array.length)
    {
      var L1 = parseInt(array[i].comment[0]),
          L2 = parseInt(array[j].comment[0]);

      if(L1 == L2+1) combos.push(array[i].comment + array[j].comment)
    }
  }

  return combos;
  
  /*
  for(var i=0;i<array.length;i++){
    for(var j=i+1;j<array.length;j++){
      if(eval(array[i].comment[0]) == (eval(array[j].comment[0])+1)){
        combos[combos.length] = array[i].comment+array[j].comment;
      }
    }
  }
  return combos;
  */
}

function fire(flashTime,firingColor,reverseCheckVar)
{
    if(is(flashTime, undefined)) flashTime = 1.201201201201;

    app.beginUndoGroup("Fire");

    var easeInOffset = new KeyframeEase(0, 75);
    var easeOutOffset = new KeyframeEase(0, 75);
    
    var easeInEnd1 = new KeyframeEase(0, 60);
    var easeOutEnd1 = new KeyframeEase(0, 60);
    
    var easeInEnd2 = new KeyframeEase(0.25, 13);
    var easeOutEnd2 = new KeyframeEase(0.25, 13);
    
    var easeInEnd3 = new KeyframeEase(0, 75);
    var easeOutEnd3 = new KeyframeEase(0, 75);
    
    var comp = app.project.activeItem;
    var S = comp.sel();

    if(S.length == 0) throw Error("Select something to fire")


  
  for(var i=0;selectedLayers.length;i++){

      var layer = selectedLayers[i];

      var INIT_TIME = comp.time,
          MID_TIME  = comp.time + flashTime / 2,
          FINISH_TIME = comp.time + flashTime;

      if(layer.property("Contents").property(1).name != "Group 1"){
        
        // DUPLICATE THE PATH PROP, then USE TRIM PATHS to animate

        var contents = layer.property("Contents");

        // Get expressions
        var PE = contents.prop("path").path.expression;
        var SWE = contents.prop("stroke").strokeWidth.expression;

        // var pathExpression = contents.property("Path 1").property("Path").expression;
        // var strokeExpression = contents.property("Stroke 1").property("Stroke Width").expression;
        
        // var group1 = contents.addProperty("ADBE Vector Group");
        // var vectors1 = group1.property("ADBE Vectors Group");
        // var path1 = vectors1.addProperty("ADBE Vector Shape - Group");
        contents.addProp("group", {name: "FIRE_PATH"}).addProp("path").path.expression = contents.propByName("Path 1");
        
        var T = contents.propByName("FIRE_PATH");
        var TS = T.prop("start"),
            TE = T.prop("end"),
            TO = T.prop("offset")

        // var numKeysEnd = TE.numKeys;
        
        //Trim end
        TE.setValueAtTime(INIT_TIME, 0);
        TE.setTemporalEaseAtKey(TE.numKeys, [easeInEnd1], [easeOutEnd1]);
      
        TE.setValuesAtTimes([
          INIT_TIME,
          MID_TIME,
          FINISH_TIME
        ],[
          [0, easeInEnd1, easeOutEnd1],
          [27, easeInEnd2, easeOutEnd2],
          [0, easeInEnd3, easeOutEnd3]
        ])

        TE.setValueAtTime(MID_TIME, 27);
        TE.setTemporalEaseAtKey(TE.numKeys, [easeInEnd2], [easeOutEnd2]);
        
        TE.setValueAtTime(FINISH_TIME, 0);
        TE.setTemporalEaseAtKey(TE.numKeys, [easeInEnd3], [easeOutEnd3]);
        
        // Trim offset
        TO.setValueAtTime(INIT_TIME, reverseCheckVar?170:0);
        TO.setTemporalEaseAtKey(TO.numKeys, [easeInOffset], [easeOutOffset]);
        
        TO.setValueAtTime(FINISH_TIME, reverseCheckVar?0:170);
        TO.setTemporalEaseAtKey(TO.numKeys, [easeInOffset], [easeOutOffset]);
        
        var S = contents.addProp("stroke"), 
            SW = stroke.prop("width"),
            SC = stroke.prop("color");

        SW.setValue(12);
        SC.setValueAtTime(INIT_TIME,   firingColor);
        SC.setValueAtTime(FINISH_TIME, firingColor);
        
        var g2 = contents.addProp("group");
        
        g2.addProp("path").path.expression = 
        var group2 = contents.addProperty("ADBE Vector Group");
        var vectors2 = group2.property("ADBE Vectors Group");
        
        var path2 = vectors2.addProperty("ADBE Vector Shape - Group");
        path2.property("Path").expression = pathExpression;
        
        var stroke2 = vectors2.addProperty("ADBE Vector Graphic - Stroke");
        
        var stroke2Width = stroke2.property("ADBE Vector Stroke Width");
        stroke2Width.expression = strokeExpression;
        contents.property(1).remove();
        contents.property(1).remove();
      
      }else{
        
        var strokeColor = layer.property("Contents").property("Group 1").property("Contents").property("Stroke 1").property("Color");
       
        strokeColor.setValueAtTime(INIT_TIME, firingColor);
        strokeColor.setValueAtTime(FINISH_TIME, firingColor);
       
        // trimEnd
        var trimEnd = layer.property("Contents").property("Group 1").property("Contents").property("Trim Paths 1").property("End");
        var numKeysEnd = trimEnd.numKeys;
        //Create keyframes
        trimEnd.setValueAtTime(comp.time,0);
        trimEnd.setTemporalEaseAtKey(trimEnd.numKeys, [easeInEnd1], [easeOutEnd1]);

        trimEnd.setValueAtTime(comp.time+flashTime/2,27);
        trimEnd.setTemporalEaseAtKey(trimEnd.numKeys, [easeInEnd2], [easeOutEnd2]);

        trimEnd.setValueAtTime(comp.time+flashTime,0);
        trimEnd.setTemporalEaseAtKey(trimEnd.numKeys, [easeInEnd3], [easeOutEnd3]);

        // Offset
        var trimOffset = layer.property("Contents").property("Group 1").property("Contents").property("Trim Paths 1").property("Offset");
        trimOffset.setValueAtTime(comp.time,reverseCheckVar?170:0);
        trimOffset.setTemporalEaseAtKey(trimOffset.numKeys, [easeInOffset], [easeOutOffset]);

        trimOffset.setValueAtTime(comp.time+flashTime,reverseCheckVar?0:170);
        trimOffset.setTemporalEaseAtKey(trimOffset.numKeys, [easeInOffset], [easeOutOffset]);
      }
  }
  app.endUndoGroup();
}

function lockWeights(bool){
  
  var comp = app.project.activeItem;
  for(var i=1;i<comp.layers.length+1;i++){
    if(comp.layer(i).comment.length > 2){
      comp.layer(i).locked = bool;
    }
  }
}

function modifyNeurons()
{
  var comp = app.project.activeItem;
  var animationTime = prompt("Enter the animation duration: ",0.5);
  animationTime = eval(animationTime);
  var num = prompt("Hidden layer/neuron:", 1);
  app.beginUndoGroup("Modify");
  if(num.length == 2){
    var activation = prompt("Enter the value: ",99);
    activation = eval(activation);
    for(var i=0;i<comp.layers.length;i++){
      if(comp.layer(i+1).comment == num){
        var slider = comp.layer(i+1).property("Effects").property("Slider Control").property("Slider");
        var previousActivationIndex = slider.nearestKeyIndex(comp.time);
        var previousActivation = slider.keyValue(previousActivationIndex);
        slider.setValueAtTime(comp.time,previousActivation);
        slider.setValueAtTime(comp.time+animationTime,activation);
        break;
      }
    }
  }else if(num.length == 1){
    var netArray = comp.netArray;
    var allActivations = [];
    num = eval(num);
    for(var i=0;i<netArray[num];i++){
      var p = prompt("Enter a value for neuron: "+num+""+i);
      allActivations[i] = eval(p);
    }
    for(var i=1;i<comp.layers.length+1;i++){
      if((comp.layer(i).comment.length == 2) && (comp.layer(i).comment[0] == num.toString())){
        neuronNumber = eval(comp.layer(i).comment[1]);
        var slider = comp.layer(i).property("Effects").property("Slider Control").property("Slider");
        var previousActivation = 0;
        if(slider.numKeys > 0){
          var previousActivationIndex = slider.nearestKeyIndex(comp.time);
          previousActivation = slider.keyValue(previousActivationIndex);
        }else{
          previousActivation = slider.valueAtTime(comp.time,false);
        }
        slider.setValueAtTime(comp.time,previousActivation);
        slider.setValueAtTime(comp.time+animationTime,allActivations[neuronNumber]);
      }
    }
  }else{
    alert("Enter a valid neuron/layer number");
  }
  alert("Done!");
  comp.time = comp.time + animationTime;
  app.endUndoGroup();
}

function doFunction(fn){
      var funcString = eval(fn);
      var args = "(";
      for(var i=1;i<arguments.length;i++){
        args += arguments[i]+",";
      }
      args = args.slice(0,-1) + ");\n";
      functionString = fn + args + funcString.toString();
      //alert(functionString);
      var bt = new BridgeTalk;
      bt.target = "aftereffects";
      var message = functionString;
      bt.body = message;
      bt.send();
}

  win=new Window("palette","Neural net",[0,0,240,350],{resizeable:true,});
  input=win.add("edittext",[41,28,206,63] ,"[3,1]",{readonly:0,noecho:0,borderless:0,multiline:0,enterKeySignalsOnChange:0});
  neuralNetStatic=win.add("statictext",[93,10,163,30] ,"neural net:",{multiline:true});
  parameters=win.add("panel",[25,110,200,330]);
  fireReverseCheck=win.add("checkbox",[150,133,200,330],"FRev");
  reverseCheck=win.add("checkbox",[150,213,200,250],"Rev");
  fireWeights = win.add("button",[45,125,140,155],"Fire Weights");
  lockWeightsButton=win.add("button",[45,165,140,195],"Lock Weights");
  selectWeights=win.add("button",[45,205,140,235],"Select Weights");
  fireUp = win.add("button",[45,245,140,275],"FIRE UP!");
  modify = win.add("button",[45,285,140,315],"Modify!");
  reverseCheck.value=0;
  createNet=win.add("button",[70,70,178,99],"Create");
  win.center();
  win.show();

createNet.onClick = function(){

  app.beginUndoGroup("createNet");
  net(eval(input.text));
  app.endUndoGroup();
}
selectWeights.onClick = function(){
  app.beginUndoGroup("Select weights");
  var reverse = reverseCheck.value == 0? false:true;
  select(false,reverse);
  app.endUndoGroup();
}
lockWeightsButton.onClick = function(){
  app.beginUndoGroup("lock weights");
  weightsLocked = !weightsLocked;
  lockWeights(weightsLocked);
  app.endUndoGroup();
}
fireUp.onClick = function(){
  var comp = app.project.activeItem;
  var hexColor = $.colorPicker();
  var r = hexColor >> 16;
  var g = (hexColor & 0x00ff00) >> 8;
  var b = hexColor & 0xff;
  r/=255;g/=255;b/=255;
  var fTime = prompt("Enter the flash time",1.2);
  fTime = parseFloat(fTime);
  var startingPlace = prompt("Enter the starting neuron/layer",0);
  var endingPlace = prompt("Enter the ending neuron/layer",1);
  var formTheCombos = formCombosGivenCoord([startingPlace,endingPlace]);
  select(true,false,formTheCombos[0]);
  doFunction("fire",fTime,"["+r+","+g+","+b+",1]",formTheCombos[1]);
  alert("done!");
  comp.time = comp.time + fTime;
}

fireWeights.onClick = function(){
  
  app.wrapUndo(
    fire,
    $prompt("Flash time", 1.2, parseFloat), $.$colorPicker(1),
    fireReverseCheck.value
  );
  
  /*
  app.beginUndoGroup("Fire weights");
  var hexColor = $.colorPicker();
  var r = hexColor >> 16;
  var g = (hexColor & 0x00ff00) >> 8;
  var b = hexColor & 0xff;
  r/=255;g/=255;b/=255;
  var promptValue = prompt("Enter the flash time",1.2);
  promptValue = parseFloat(promptValue);
  fire(promptValue,[r,g,b,1],fireReverseCheck.value);
  app.endUndoGroup();
  */
}

modify.onClick = function(){
  modifyNeurons();
}