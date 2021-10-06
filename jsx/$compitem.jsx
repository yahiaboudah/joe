/*******************************************************************************
		Name:           $compitem
		Desc:           Comp utils.
		Path:           /utjsx/$compitem.jsx
		Require:        ---
		Created:        2109 (YYMM)
		Modified:       2110 (YYMM)
*******************************************************************************/

(function CompItemUtils(){

    CompItem.prototype.setResolution = function(newRes){
        var rs = this.resolutionFactor;
        this.resolutionFactor = newRes;
        return rs;
    }

    CompItem.prototype.getResolution = function(){
        return this.resolutionFactor;
    }

    CompItem.prototype.sel = function(idx){
        if(typeof idx == "undefined") return this.selectedLayers;
        return this.selectedLayers[idx];
    }

    CompItem.prototype.snap = function(time, imgPath){

        time  = this.time || time;
        
        var snapCmdID = 2104; // SAVE AS FRAME COMMAND

        app.executeCommand(snapCmdID);

        app.project.renderQueue.showWindow(false);
        var num = app.project.renderQueue.numItems;
        // app.project.renderQueue.item(num).outputModule(1).applyTemplate("SnapShotSettings");
        app.project.renderQueue.item(num).outputModule(1).file = File(imgPath || "~/Images/AESnap.png");
        app.project.renderQueue.render();
        app.project.renderQueue.showWindow(false);
    }

    CompItem.prototype.getLayersWith = function(prop, val){

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
        return this.getLayersWith("solo");
    }

    CompItem.prototype.numObjName  = function(myName)
    {
        return this.getLayersWith("name", RegExp("{0} \d+".f(myName),"gi")).length;
    }

})();