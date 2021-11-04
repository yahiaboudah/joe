
function codeLayer(codeStr, syntax)
{
  var sytle = 
  {
    applyFill: true,
    fontSize : 50,
    font: "DejaVuSansMono",
    fillColor: [1,1,1],
    position: [200, 200]
  };

  for(i=-1;++i<syntax.length;)
  {
    var jj = syntax[i];
    var pointsEx = getExpression(getPoints(codeStr, RegExp(syntax.pattern), RegExp(syntax.replacepattern)));
    text.animator(jj.name).addExpressionSelector(pointsEx).getParent(3)
                          .addTextFill(jj.color);
  }

  return text.config(style);
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

// var codeText = codeLayer("shit.py");
// var outText  = outputLayer(codeText);
