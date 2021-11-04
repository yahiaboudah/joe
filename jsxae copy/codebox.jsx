
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

// var codeText = codeLayer("shit.py");
// var outText  = outputLayer(codeText);
