
String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
}

latex = {

  aiSpec: "illustrator-19.032",
  sourceLink: "http://latex.codecogs.com/png.latex?\\dpi{300}%20\\huge%20",
  fp: "d:/icons/img/sova.png",
  pres: "uuuu",
  
  editEquationIllustrator: (function(){
  
    editEquation();

    function editEquation(){

        var filePath     = $filePath;
        var importedFile = File(filePath);
        open(importedFile);

        var doc = app.activeDocument,
            img = doc.selection[0];
            img.hasSelectedArtwork = true;
        
        img = img.trace();
        img.tracing.tracingOptions.loadFromPreset($presetName);
        img.tracing.expandTracing();

        var expFile = new File(filePath.replace(/.[^.]+$/, ".eps"));
        doc.saveAs(expFile, new EPSSaveOptions());
        return expFile.fsName;
    }
    
  }).body().replace("$filePath", fp).replace("$presetName", pres)

}


function getEquationButtonClicked(){

  if(!BridgeTalk.isRunning(aiSpec)) return "Illustrator not running";
  
  var eqStr0 = equationString.text,
      eqStr  = eqStr0.replaceAll(" ","%20");
  
  var url = [latex.sourceLink, eqStr].join(""),
      cmd = ["cd ", "C:\\wget", " & wget -O x.png ", url].join("");
  
  sys.cmd("cmd /c \"" + cmd + "\"");
  
  var file      = File("C:\\wget\\x.png"),
      bt        = new BridgeTalk;
      bt.target = latex.aiSpec;
      bt.body   = latex.editEquationIllustrator;


  bt.onResult = function(pp)
  {

    BridgeTalk.bringToFront("aftereffects");
    comp  = app.project.activeItem;
    vec   = app.importAndDrop(pp.body, comp);

    app.executeCommand(3973); // Create Shapes From Vector Layeer
    layer = comp.layer(1);
    layer.name = eqStr0;
    layer.transform.scale.setValue([250,250]);
    vec.remove();

    // fix the equation:
    //=====================================================

    var c = layer.property("Contents"),
        ni= c.numProperties+1,
        i = 0;

    for(; ++i<ni ;)
    {
      var g = c.property(i).property("Contents"),
          c = g.property("Fill 1").property("Color"),
          nj= g.numProperties+1,
          j = 0;

      c.setValue([1,1,1,1]);

      for(; ++j<nj ;)
      { 
        gg = g.property(j);
        
        if(gg.name.indexOf("Merge Paths") == -1) continue;
        if(gg.property("Mode").value != 4)       continue;
        
        var foundPath = false;
        var k = j;
        
        while(!foundPath && --k>0){
          
          gk = g.property(k);
          if(gk.name.indexOf("Path") == -1) continue;
          
          gk.remove();
          gg.remove();
          foundPath = true;
        }
      }
  }
  //=========================================================
 }   
  bt.send(); // finally send
}

w = new _Window({
  type: "palette",
  title: "Get Equation!",
  resizeable: true,
  children:[
    new _TextBox({
      text: "x"
    }),
    new _Button({
      text: "GET IT!",
      onClick: getEquationButtonClicked
    })
  ]
})

w.show();
