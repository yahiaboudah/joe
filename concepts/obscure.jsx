
// parent the transform property of the new snap to origLayer:
function parentSnap(snap, origLayer,  startTime){

    num = snap.transform.numProperties+1;
  
    for(var i=0;  ++i<num;)
    {
      if(!snap.transform.property(i).canSetExpression) continue;
      
      initVal   = origLayer.transform.property(i).valueAtTime(startTime,true);
      propName  = snap.transform.property(i).name;
      expConfig =
      {
        $origName : origLayer.name,
        $propName : propName,
        $initValx : initVal[0] || initVal,
        $initValy : initVal[1] || initVal
      }
  
      if(propName == "Scale")
      {
        scaleExpr = (function(){
          
          arr = thisProperty.value;
          krr = thisComp.layer("$origName").transform("$propName");
          [arr[0] * (krr[0]/$initValx), arr[1] * (krr[1]/$initValy)]
        
        }).body()._replace(expConfig);
  
        snap.transform.scale.expression = scaleExpr;
        continue;
      }
  
  
      if(initVal instanceof Array)
      {
        propExpr = (function(){
  
          arr = thisProperty.value;
          krr = thisComp.layer("$origName").transform("$propName");
          [arr[0] + krr[0] - $initValx, arr[1] + krr[1] - $initValy]
        
        }).body()._replace(expConfig);
  
      }
      
      else
      {
        propExpr = (function(){
  
          val = thisProperty.value;
          kal = thisComp.layer("$origName").transform("$propName");
          val + kal - $initValx;
  
        }).body()._replace(expConfig)
      
      }
      snap.transform.property(i).expression = propExpr;
    }
  }