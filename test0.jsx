
//@include "src/xto.jsx"

function fire(flashTime,firingColor,reverseCheckVar)
{
    if(is(flashTime, undefined)) flashTime = 1.201201201201;

    app.beginUndoGroup("Fire");

    var easeInOffset = new KeyframeEase(0, 75);
    var easeOutOffset = new KeyframeEase(0, 75);
    
    var easeInEnd1 = new KeyframeEase(0, 60);
    var easeOutEnd1 = new KeyframeEase(0, 60);
    
    var easeInEnd2 = new KeyframeEase(0.25, 13);
    var easeOutEnd2 = new KeyframeEase(0.25, 13);
    
    var easeInEnd3 = new KeyframeEase(0, 75);
    var easeOutEnd3 = new KeyframeEase(0, 75);
    
    var comp = app.project.activeItem;
    var S = comp.sel();

    if(S.length == 0) throw Error("Select something to fire")


  
  for(var i=0;selectedLayers.length;i++){

      var layer = selectedLayers[i];

      var INIT_TIME = comp.time,
          MID_TIME  = comp.time + flashTime / 2,
          FINISH_TIME = comp.time + flashTime;

      if(layer.property("Contents").property(1).name != "Group 1"){
        
        // DUPLICATE THE PATH PROP, then USE TRIM PATHS to animate

        var contents = layer.property("Contents");

        // Get expressions
        var PE = contents.prop("path").path.expression;
        var SWE = contents.prop("stroke").strokeWidth.expression;

        // var pathExpression = contents.property("Path 1").property("Path").expression;
        // var strokeExpression = contents.property("Stroke 1").property("Stroke Width").expression;
        
        // var group1 = contents.addProperty("ADBE Vector Group");
        // var vectors1 = group1.property("ADBE Vectors Group");
        // var path1 = vectors1.addProperty("ADBE Vector Shape - Group");
        contents.addProp("group", {name: "FIRE_PATH"}).addProp("path").path.expression = contents.propByName("Path 1");
        
        var T = contents.propByName("FIRE_PATH");
        var TS = T.prop("start"),
            TE = T.prop("end"),
            TO = T.prop("offset")

        TE.setValuesAtTimes([
          INIT_TIME,
          MID_TIME,
          FINISH_TIME
        ],[
          [0, new KeyframeEase(0, 60), new KeyframeEase(0, 60)],
          [27, easeInEnd2, easeOutEnd2],
          [0, easeInEnd3, easeOutEnd3]
        ])

        TO.setValuesAtTimes([
            INIT_TIME,
            FINISH_TIME
        ], [
            [0, new KeyframeEase(0, 75)],
            [170, new KeyframeEase(0, 75)]
        ])     
        
        var S = contents.addProp("stroke"), 
            SW = stroke.prop("width"),
            SC = stroke.prop("color");

        SW.setValue(12);
        SC.setValueAtTime(INIT_TIME,   firingColor);
        SC.setValueAtTime(FINISH_TIME, firingColor);
        
        var g2 = contents.addProp("group");
        
        g2.addProp("path").path.expression = 
        var group2 = contents.addProperty("ADBE Vector Group");
        var vectors2 = group2.property("ADBE Vectors Group");
        
        var path2 = vectors2.addProperty("ADBE Vector Shape - Group");
        path2.property("Path").expression = pathExpression;
        
        var stroke2 = vectors2.addProperty("ADBE Vector Graphic - Stroke");
        
        var stroke2Width = stroke2.property("ADBE Vector Stroke Width");
        stroke2Width.expression = strokeExpression;
        contents.property(1).remove();
        contents.property(1).remove();
      
      }else{
        
        var strokeColor = layer.property("Contents").property("Group 1").property("Contents").property("Stroke 1").property("Color");
       
        strokeColor.setValueAtTime(INIT_TIME, firingColor);
        strokeColor.setValueAtTime(FINISH_TIME, firingColor);
       
        // trimEnd
        var trimEnd = layer.property("Contents").property("Group 1").property("Contents").property("Trim Paths 1").property("End");
        var numKeysEnd = trimEnd.numKeys;
        //Create keyframes
        trimEnd.setValueAtTime(comp.time,0);
        trimEnd.setTemporalEaseAtKey(trimEnd.numKeys, [easeInEnd1], [easeOutEnd1]);

        trimEnd.setValueAtTime(comp.time+flashTime/2,27);
        trimEnd.setTemporalEaseAtKey(trimEnd.numKeys, [easeInEnd2], [easeOutEnd2]);

        trimEnd.setValueAtTime(comp.time+flashTime,0);
        trimEnd.setTemporalEaseAtKey(trimEnd.numKeys, [easeInEnd3], [easeOutEnd3]);

        // Offset
        var trimOffset = layer.property("Contents").property("Group 1").property("Contents").property("Trim Paths 1").property("Offset");
        trimOffset.setValueAtTime(comp.time,reverseCheckVar?170:0);
        trimOffset.setTemporalEaseAtKey(trimOffset.numKeys, [easeInOffset], [easeOutOffset]);

        trimOffset.setValueAtTime(comp.time+flashTime,reverseCheckVar?0:170);
        trimOffset.setTemporalEaseAtKey(trimOffset.numKeys, [easeInOffset], [easeOutOffset]);
      }
  }
  app.endUndoGroup();
}
