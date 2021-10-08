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

    CompItem.prototype.sel = function()
    {
        LAYER_TYPES = [ShapeLayer, Textlayer, LightLayer, CameraLayer, AVLayer];

        var args = Object.toArray(arguments);

        var ss = this.selectedLayers;
        var os = [];

        args.forEach(function(arg)
        {
            if(arg.is(Number)) os.push(ss[arg]); //if (2) ==> comp.layer(2)

            if(LAYER_TYPES.includes(arg)) // if(ShapeLayer) ==> comp shape layers!
            {
                Array.prototype.push.apply(os, ss.grab(function(layer){
                    return layer.constructor == arg;
                }));
            }
        })

        return os.length == 1?
               os[0]:
               os;
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