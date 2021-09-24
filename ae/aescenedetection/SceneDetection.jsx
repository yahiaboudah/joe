/*******************************************************************************
		Name:           scenedetector
		Desc:           A scene detector.
        API :           getSplitTimes, detectScenes, setThreshold, setComp,
                        splitScenes
		Created:        2109 (YYMM)
		Modified:       2109 (YYMM)
*******************************************************************************/
/******************************************************************************/

(function SceneDetection(host, self){
    
    //@include "utils.jsx"
    host[self] = self;

    I = {};

    I.comp = app.project.activeItem;
    I.THRESHOLD = 102;

    I.isNotComp = function(c){
        return !(c && c instanceof CompItem);
    }

    I.getExpression = function(layerArg, valArg){
        
        return (function(){
        
            var targetLayer = thisComp.layer("$layerName");
            var compDimens  = [thisComp.width, thisComp.height]; 
            
            255 * targetLayer.sampleImage(

                compDimens/2, //samplePoint
                compDimens,   //sampleRadius
                true, 
                time
            
            )[$RGBValue].toFixed();
        
        }).body()._replace({
            $layerName: layerArg.name,
            $RGBValue: valArg
        });
    }

    I.addRgbNull = function(layer){
        
        var comp      = layer.containingComp;
        var rgbLayer  = comp.layers.addNull();
        
        for(c in ca = ['r', 'g', 'b'])
        {
            rgbLayer.addProp("Effects/Slider Control:{0}Slider".f(ca[c])).property("Slider").expression = I.getExpression(layer, c);    
        }

        return rgbLayer;
    }

    I.isLuma = function (OLDVAL, NEWVAL, THRESHOLD)
    {
        return (OLDVAL / NEWVAL * 100 > THRESHOLD || OLDVAL / NEWVAL * 100 > THRESHOLD)
    }

    I.getLuma = function(){
        var rgbLayer = this;
        return Math.sum.apply(null,
            [
                rgbLayer.getProp("Effects/rSlider/Slider").value,
                rgbLayer.getProp("Effects/gSlider/Slider").value,
                rgbLayer.getProp("Effects/bSlider/Slider").value
    
            ]) / 3;
    }

    self.setComp = function(c){
        if(I.isNotComp(c)) return;
        I.comp = c;
    }

    self.setThreshold = function(nt){
        if(nt !== parseFloat(nt)) return;
        I.THRESHOLD = nt;
    }

    self.getSplitTimes = function(layer)
    {
    
        var comp        = layer.containingComp,
            rgbLayer    = I.addRgbNull(layer);
    
        var sTimes = []; //splitTimes
        var oldLuma = I.getLuma.call(rgbLayer), newLuma;
    
        for(;comp.time < comp.duration
            ;comp.time += comp.frameDuration)
        {
            
            newLuma = I.getLuma.call(rgbLayer);
            if(I.isLuma(oldLuma, newLuma, I.THRESHOLD)) sTimes.push(comp.time)
            oldLuma = newLuma;
        }
    
        rgbLayer.remove();
        comp.time = 0;
        return (sTimes.shift(), sTimes);
    }

    self.splitScenes = function DetectScenes(layer, splitTimes, removOg)
    {
        var dupLayer, i = 0;
        dupLayer = layer.duplicate();
        dupLayer.outPoint = splitTimes[0];
    
        for(; ++i <splitTimes.length;) 
        {
            dupLayer = layer.duplicate();
            dupLayer.inPoint  = splitTimes[i-1];
            dupLayer.outPoint = splitTimes[i];
        }
    
        if(removeOg) layer.remove();
    }

    self.detectScenes = function(){

        if(I.isNotComp(I.comp))       throw Error("Select A Comp!");
        if(I.comp.sel().length != 1)  throw Error("Select A Single Layer To Analyse!");
        
        app.wrapUndo( /**/ self.splitScenes /**/, // splitScenes function 
            null, // no context
            I.comp.sel(0), //layer
            self.getSplitTimes(myLayer), // split times
            false //remove original layer
        )();
    }

    self.unload = function()
    {
        //delete lib:
        delete(host[self]);
        // delete utils:
        delete(String.prototype.f);
        delete(Function.prototype.timeit);
        delete(Function.prototype.body);
        delete(String.prototype._replace);
        delete(AVLayer.prototype.addProp);
        delete(AVLayer.prototype.getProp);
        delete(CompItem.prototype.sel);
        delete(Math.sum);
        delete(app.wrapUndo);
    }
}($.global, {toString: function(){return "SceneDetection"}}));