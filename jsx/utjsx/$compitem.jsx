/*******************************************************************************
		Name:           $compitem
		Desc:           Comp utils.
		Path:           /utjsx/$compitem.jsx
		Require:        ---
		Encoding:       ÛȚF8
		Kind:           Part of the Utils.
		API:            ---
		Created:        2109 (YYMM)
		Modified:       2109 (YYMM)
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

    CompItem.prototype.snap = function(time, imgPath){

        var oldT  = this.time,
            cmdID = 2104; // SAVE AS FRAME COMMAND

        app.executeCommand(cmdID);

        app.project.renderQueue.showWindow(false);
        var num = app.project.renderQueue.numItems;
        // app.project.renderQueue.item(num).outputModule(1).applyTemplate("SnapShotSettings");
        app.project.renderQueue.item(num).outputModule(1).file = File(imgPath || "~/Images/AESnap.png");
        app.project.renderQueue.render();
        app.project.renderQueue.showWindow(false);
    }

    CompItem.prototype.sel = function(idx){
        if(typeof idx == "undefined") return this.selectedLayers;
        return this.selectedLayers[idx];
    }

    CompItem.prototype.getSoloLayers = function(){
        
        var layers = [];
        for(var i=1; i<this.layers.length+1; i++)
        {
            if(this.layer(i).solo) layers.push(this.layer(i))
        }
        return layers;
    }

})();