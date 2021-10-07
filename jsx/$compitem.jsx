/*******************************************************************************
		Name:           $compitem
		Desc:           Comp utils.
		Path:           /utjsx/$compitem.jsx
		Require:        ---
		Created:        2109 (YYMM)
		Modified:       2110 (YYMM)
*******************************************************************************/

(function CompItemUtils(){

    CompItem.prototype.setResolution = function(newRes)
    {
        var rs = this.resolutionFactor;
        this.resolutionFactor = newRes;
        return rs;
    }

    CompItem.prototype.getResolution = function()
    {
        return this.resolutionFactor;
    }

    CompItem.prototype.sel = function(idx)
    {
        return idx.is(Number)?
               this.selectedLayers[idx]:
               this.selectedLayers;
    }

    CompItem.prototype.snap = function(t, pp)
    // snap(1.5, "~/Desktop/MySnaps/snapit.png") => A screenshot of compo at -1.5s-
    {

        t = t.is(Number)? t: this.time;

        app.executeCommand(AECMD.SAVE_AS_FRAME);

        app.project.renderQueue.showWindow(false);
        var num = app.project.renderQueue.numItems;
        // app.project.renderQueue.item(num).outputModule(1).applyTemplate("SnapShotSettings");
        app.project.renderQueue.item(num).outputModule(1).file = File(pp || "~/Images/AESnap.png");
        app.project.renderQueue.render();
        app.project.renderQueue.showWindow(false);
    }

    CompItem.prototype.getLayersWith = function(prop, val)
    {
        if(val.is(undefined)) val = true;

        return this.layers.grab(function(layer)
        {
            var oldVal = layer[prop]; 

            if(oldVal.is(undefined)) return false;
            if(oldVal.is(String) && val.is(RegExp)) return val.test(oldVal);
            
            return oldVal == val;
        })
    }

    CompItem.prototype.getSoloLayers = function()
    {
        return this.getLayersWith("solo", true);
    }

    CompItem.prototype.numLayersWithName = function(name)
    {
        return this.getLayersWith("name", RegExp("{0} \d+".f(name),"gi")).length;
    }

    CompItem.prototype.setTime = function(t, all)
    {
      if(t.isnt(Number)) return this;
      all  = all.is(undefined)? 1:all;

      //==============/
      this.duration = t;
      //==============/
  
      this.layers.grab().forEach(function(layer){
        
        var isLocked = layer.locked;
        layer.locked = false;
  
        //-----------------------------------------------------------
        layer.outPoint = t;
        if(all && layer.source.is(CompItem)) setTime(t, layer.source);
        //------------------------------------------------------------
  
        layer.locked = isLocked;
      })
      
      return this;
    }

})();