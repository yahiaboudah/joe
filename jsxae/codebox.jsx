//@include "json2.js";

// get the file:
function getCode(pp){
  return File(pp).$read();
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
    $p1: [[0, points.length], points, i, 0]
  })

  // var expr = "var i = textIndex-1;\n"
  // +"if(\n";
  // for(var i=0;i<points.length;i++){
  //   expr += "("+points[i][0]+" <= i && i <= "+points[i][1]+") ||\n";
  // }
  // expr += "0){100}else{0}";
  // return expr;
}

function addAnimatorProp(
  txtAnimator,
  animatorName,
  animExpression,
  highLightingColor
  )
  {

  txtAnimator.name = animatorName;

  // Modify the amount expression:
  var expressionSelector = txtAnimator.property("Selectors").addProperty("ADBE Text Expressible Selector");// Add an expression selector
  expressionSelector.name ="Rangooo";

  expressionSelector.property("Based On").setValue(1); // set to chars
  expressionSelector.property("Amount").expression = animExpression; // get expression
  
  // Add the appropriate fill color:
  var cSel = txtAnimator.property("ADBE Text Animator Properties").addProperty("ADBE Text Fill Color");
  cSel.setValue(highLightingColor);
}

function getSyntaxJSON(){
  return _m.deser(File("syntax.json").$read());
}

function getPoints( txt, patt, blank){
    
  var pts = [],
      tmp = "";
    
  while((match = patt.exec(txt)) != null)
  {
    fi = match.index;
    li = patt.lastIndex;

    tmp = txt.substring(fi,li).replace(blank,"");
    pts.push([fi+1, fi+tmp.length]);
  }
  
  return pts;
}

function testPoints(text,p){
  
  var str = "",
      i   = -1,
      allStr = "";
  
  for(;++i<p.length;){
    str = text.substring(p[i][0],p[i][1]);
    allStr.push(str);
  }

  return allStr.join("\n");
}

app.newLayerName = function(n, c)
{
  c  = c || app.project.activeItem;
  ln = c.layers.length+1;
  t  = i = 0;
  
  for(;++i< ln;) if(c.layer(i).name == n) t++;

  return [n, " #", t].join("");
}

sys.cmd = function(cmdStr)
{
  r = system.callSystem(cmdStr);
  return r;
}

function codeLayer(fp){

  if(File(fp).exists) codeStr = File(fp).$read();
  else codeStr = fp;

  var comp = app.project.activeItem,
      text = comp.layers.addText(codeStr);
      text.name = app.newLayerName(callee.name);
      jsonObj = _m.deser(File("syntax.json").$read());;

      src = text.Text.sourceText.value.toString().replace(/^/gm," ");
      text.Text.sourceText.setValue(src);


  for(i=-1;++i<jsonObj.length;)
  {
    
    var txtAnim = text.property("ADBE Text Properties").property(4).addProperty("ADBE Text Animator");
        jj      = jsonObj[i];

    addAnimatorProp(
      txtAnim, //text animator
      jj.name, //name
      getExpression(getPoints(codeStr, RegExp(jj.pattern), RegExp(jj.replacepattern))), //expression
      jj.color // color
    )
  }
  
  
  return text.config({
    applyFill: true,
    fontSize : 50,
    font: "DejaVuSansMono",
    fillColor: [1,1,1],
    position: [200, 200]
  });

}


function output(c){
  var pp = File(Folder.temp.fsName + "/tmp.py").$create(c).fsName,
      rs = sys.cmd("python {0}".f(pp));
  return rs;
}

function bigbox(c){

  var c = c || app.project.activeItem;

  var defVals = {
    size: [924, 924],
    roundness: 45,
    color: [1,1,1,1]
  }

  var box = c.layers.addShape(),
      con = box.property("Contents"), //contents
      fil = con.addProperty("ADBE Vector Graphic - Fill").property("Color"); //fill
      rec = con.addProperty("ADBE Vector Shape - Rect"), // rectangle
      siz = rec.property("Size"), //size
      rnd = rec.property("ADBE Vector Rect Roundness"), //roundness

  siz.setValue(defVals.size);
  rnd.setValue(defVals.roundness);
  fil.setValue(defVals.color);
  
  return box;
}

function outputBox(myCode){

  var c   = app.project.activeItem,
      out = output(myCode),
      txt = c.layers.addText(out),
      box = bigbox(c);

  c.layers.$add("text", {
    
  })
      
  src = box.sourceRectAtTime(0,false);
  box.transform.position.setValue([1350,540]);
  
  return txt.config({
    parent: box,
    size: 45,
    font: "DejaVuSansMono",
    color: [0,0,0],
    position: [ src.left+50,src.top+55 ],
  });
}

function modifyText(textLayer, fontSize, font, fill, fontStyle){
  
  return textLayer.config({
    applyFill: true,
    fontSize : fontSize,
    fontStyle: fontStyle,
    font: font,
    fillColor: fill
  });

}

var codeText = codeLayer("shit.py");
var outText  = outputLayer(codeText);
