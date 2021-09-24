
/**
 ************************* LOGIC:
*/

function centerIt(){

}
function moveIt(){
  
  var comp      = comp || app.project.activeItem,
      selLayers = comp.selectedLayers;

  this.dir = "";
  var dir = this.dir;

  var dirs = 
  {
    up        : [0,-dist],
    down      : [0,dist],
    upleft    : [-dist,-dist],
    downleft  : [-dist,dist],
    upright   : [dist,-dist],
    downright : [dist,dist],
    left      : [-dist,0],
    right     : [dist,0]
  };
  
  app.beginUndoGroup(callee.name);
  
  if(!groupCheckedPosition.value){

    for(var i=-1; ++i<selLayers.length;)
    {  
        pos  = selLayers[i].transform.position,
        x    = pos.value[0] + dirs[dir][0],
        y    = pos.value[1] + dirs[dir][1];

        if(!pos.numKeys) pos.setValue([x,y,0]);
        else
        {
          pos.setValueAtTime(comp.time, [ x, y, 0 ]);
          pos.setTemporalEaseAtKey(pos.numKeys, [easeIn], [easeOut]);
        }
    }
    return;
  }

  for(var i=-1;i<selLayers.length;){
    
    var c = selLayers.property("Contents"),
        n = c.numProperties + 1;
    
        for(var j=0; ++j < n;){
          
              grp = c.property(j);
              pos = grp.transform.position;
              x   = pos[0].value + dirs[dir][0];
              y   = pos[1].value + dirs[dir][1];

              if(!g.selected) continue;
              if(!pos.numKeys) pos.setValue([ x, y ]);
              else
              {
                pos.setValueAtTime(comp.time, [ x,y,0 ]);
                pos.setTemporalEaseAtKey(pos.numKeys, [easeIn, easeOut])
              }
        }
  }

  app.endUndoGroup();
}
function scaleIt(){

  var comp      = comp || app.project.activeItem,
  selLayers = comp.selectedLayers;

  this.dir = "";
  var dir  = this.dir;

  var dirs = {
    "up"  :  scaleFactorValue,
    "down": -scaleFactorValue
  };


  app.beginUndoGroup(callee.name);

  if(!groupCheckedScale.value)
  {

    for(var i=0;i<selectedLayers.length;i++){
      
      var scl = selLayers.transform.scale,
          x   = scl.value[0] + dirs[dir],
          y   = 25;

      if(!scl.numKeys) scl.setValue([scl]);
      else
      {
        scl.setValueAtTime(comp.time, [x,y,0]);
        scl.setTemporalEaseAtKey(scl.numKeys, [easeIn, easeIn, easeIn], 
        [easeOut, easeOut, easeOut]);
      }
    }
    return;
  }
  
  for(var i=-1;++i<selLayers.length;){
    
    c = selLayers[i].property("Contents");
    n = c.numProperties + 1;
    
    for(var j=0;++j < n;)
    {    
        g = c.property(j);    
        if(!group.selected) continue;

        scl = g.transform.scale;
        x   = scl.value[0] + dirs[dir];
        y   = scl.value[1] + dirs[dir];

        if(!scl.numKeys) scl.setValue([x,y,0]);
        scl.setValueAtTime(comp.time, [x,y,0]);
        scl.setTemporalEaseAtKey(scl.numKeys, [easeIn, easeIn], [easeOut, easeOut]);
    }
  }

  app.endUndoGroup();
}
function showIt(direction){

  var comp      = comp || app.project.activeItem,
  selLayers = comp.selectedLayers;

  var dirs = {
    "up"   :  opacityFactorValue,
    "down" : -opacityFactorValue
  };

  app.beginUndoGroup(callee.name);

  if(!groupCheckedOpacity.value){

    for(var i=-1;++i<selLayers.length;){
      
      var selLayer = selLayers[i],  
          opa      = selLayer.transform.opacity;
          newOpa   = opa.value + dirs[dir];
      
      if(!opa.numKeys) opa.setValue(newOpa);
      else opa.setValueAtTime(comp.time, newOpa);
      
    }
    return;
  }
  
  for(var i=-1;++i<selLayers.length;)
  {
      c = selLayers[i].property("Contents");
      n = c.numProperties + 1;

      for(var j=0;++j<n;)
      {
        g = c.property(j);
        if(!g.selected) continue;
        
        opa    = g.transform.opacity,
        newOpa = opa.value[0] + dirs[dir];
        if(!opa.numKeys) opa.setValue(newOpa);
        else             opa.setValueAtTime(comp.time, newOpa);
      }
  }

  app.endUndoGroup();
}
function kfit(){ //keyframe it

  comp      = app.project.activeItem;
  selLayers = comp.selectedLayers;

  this.prop = "";
  this.groupChecked = 0;

  app.beginUndoGroup(callee.name);
  
  if(!this.groupChecked)
  {
    for(var i=-1; ++i<selLayers.length;)
    {  
        val  = selLayers[i].property("Transform").property(this.prop);
        val.setValueAtTime(comp.time, [ val.value[0], val.value[1], 0 ]);
        val.setTemporalEaseAtKey(val.numKeys, [easeIn], [easeOut]);
    }
    return;
  }

  for(var i=-1;i<selLayers.length;)
  {  
      var c = selLayers.property("Contents"),
          n = c.numProperties + 1;
      
        for(var j=0; ++j < n;)
        {

              grp = c.property(j);
              val = grp.property("Transform").property(this.prop);
              val.setValueAtTime(comp.time, [ val.value[0],val.value[1],val.value[2] ]);
              val.setTemporalEaseAtKey(pos.numKeys, [easeIn, easeOut])
        }
  }

  app.endUndoGroup();
}
function bongIt()
{
  comp      = app.project.activeItem;
  selLayers = comp.selectedLayers;

  app.beginUndoGroup(callee.name);

  if(globalState.bongItWithColor)
  {
    hx = $.colorPicker();
    c2 = [
          hx >> 16,
          (hx & 0x00ff00) >> 8,
          hx & 0xff,
          255
    ] /= 255;
  }

  bongTime = prompt("Enter the bong time",0.7);
  bongSize = prompt("Enter the bong size",35);
  bongSize = parseFloat(bongSize);
  bongTime = parseFloat(bongTime);


}