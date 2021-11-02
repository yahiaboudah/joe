
//@include "latex.js"

(function LatexLib(host, self){

  //@include "$string.jsx"
  //@incldue "$sys.jsx"
  host[self] = self;

  I = 
  {
    sourceURL  : "http://latex.codecogs.com/png.latex?\\dpi{300}%20\\huge%20",
    savePath   : "C:/wget/x.png",
  }
  Afterfx     = 
  {
    specifier: "aftereffects",
    
    comp     : app.project.activeItem,
    setComp  : function(c){
      if(!(c && c instanceof CompItem)) return;
      this.comp = c;
    },
    
    SHAPES_FROM_VECTOR_LAYER_CMD_ID: 3973,
    
    dropAndFixVector: function()
    {
      // drop the vector shape:
      //=====================================================

      vec = app.importAndDrop(I.saveFile.replace(/.[^.]+$/, ".eps"), this.comp);
      app.executeCommand(Afterfx.SHAPES_FROM_VECTOR_LAYER_CMD_ID);
      layer = comp.layer(1); 
      layer.name = eqStr;
      layer.transform.scale.setValue([250,250]);
      vec.remove();

      // fix the equation (remove background...etc):
      //=====================================================

      var c = layer.property("Contents"),
      ni = c.numProperties+1,
      i  = 0;

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
    }
  }

  Illustrator = 
  {
    presetName: "uuuu",
    specifier: "illustrator-19.032",
    traceit: function()
    {
      return (function trace(){
        
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

      }).body({
        
        $filePath: "{0}/{1}".f(I.savePath),
        $presetName: Illustrator.presetName
      }) + "trace();";
    }
  }

  self.get = function(eqStr, enableTracing)
  {

    var NO_TRACING = !(BridgeTalk.isRunning(Illustrator.specifier) && enableTracing);
    var EQ_LINK    = "{0}{1}".f(I.sourceURL, eqStr.replace(/\s{1,1}/g, "%20"));

    sys.wget(I.saveFile, EQ_LINK);

    BridgeTalk.bringToFront(Afterfx.specifier);

    if(NO_TRACING) return app.importAndDrop(I.saveFile, Afterfx.comp); 
    
    BT = new BridgeTalk;
    BT.target   = Illustrator.specifier;
    BT.body     = Illustrator.traceit();
    BT.onResult = Afterfx.dropAndFixVector;
    BT.send();
  }

})(LatexScript, {toString: function(){return "LatexLib"}})

if($.stack.split("\n")[0] == "[" + $.fileName.split("/").pop() + "]")
{
  LatexScript.getWindow().show();
}