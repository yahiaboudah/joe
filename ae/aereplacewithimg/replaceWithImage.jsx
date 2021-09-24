// The work area is the time interval

Array.prototype.min = function(prop)
{
    if(!prop) return Math.min.apply(null, this);
    
    a = eval(this.toSource());
    k = a.length;
    while(k--) a[k] = a[k][prop];
    
    return Math.min.apply(null, a)
}

String.prototype._replace(oo)
{
  var ss = this;
  for(var k in oo) ss = ss.split(k).join(oo[k]);
  return ss;
}


COMMANDS = {
  SAVE_AS_FRAME: 2104
}

saveFolder = Folder(app.project.file.path);
numFiles   = saveFolder.getFiles(function(x){
  return (/staticImage \#\d+/g).test(x);
}).length;

imgPath    = new Path(saveFolder, "staticImage #{0}".f(numFiles));

function getSoloLayers(c)
{
  var c = c || app.project.activeItem,
  
  var layers   = [],
      i        = 0,
      ln       = c.layers.length+1;
  
  for(;++i<ln;)
  {
    if(!c.layer(i).solo) continue;
    layers.push(comp.layer(i));
  }

  return layers;
}

function workAreaDomain(c){

  var c = c || app.project.activeItem;

  return {
    start : c.workAreaStart,
    end   : c.workAreaStart + c.workAreaDuration
  }

}

function splitLayers(layers,timeInterval,compDuration){

  app.beginUndoGroup(callee.name);

  if(timeInterval.start == 0)
  {
    if(timeInterval.end != compDuration)
    {
      for(i=-1;++i<layers.length;)
      {
          layers[i].inPoint  = timeInterval.end;
          layers[i].outPoint = compDuration;
      }
    }
    else for(i=-1;++i<layers.length;) layers[i].enabled =false;
    
    app.endUndoGroup();
    return;
  }
  
  
  
  else if(timeInterval.end == compDuration)
  {
    for(i=-1;++i<layers.length;) layers[i].outPoint = timeInterval.start;
    
    app.endUndoGroup();
    return;
  }
  
  for(var i=0;i<layers.length;i++)
  {
    leftLayer = layers[i].duplicate();
    leftLayer.outPoint = timeInterval.start;
    layers[i].inPoint  = timeInterval.end;
  }

}

function setResolutionToFull(c)
{
  c  = c || app.project.activeItem;
  rs = c.resolutionFactor;
  c.resolutionFactor = [1,1];
  return rs;
}

function snap(c, t){
  
  c = c || app.project.activeItem;
  c.time = t;

  app.executeCommand(COMMANDS.SAVE_AS_FRAME);

  app.project.renderQueue.showWindow(false);
  num = app.project.renderQueue.numItems;
  app.project.renderQueue.item(num).outputModule(1).applyTemplate("SnapShotSettings");
  app.project.renderQueue.item(num).outputModule(1).file = File(imgPath);
  app.project.renderQueue.render();
  app.project.renderQueue.showWindow(false);
}

function dropSnapshot(interval, idx){
  
  app.beginUndoGroup(callee.name);
  var c    = app.project.activeItem;
  var snap = app.importAndDrop(File(imgPath));  
  
  snap.inPoint  = interval.start;
  snap.outPoint = interval.end;

  if(!(c.layers.length-1)) snap.moveAfter(c.layer(idx+1));
  
  app.endUndoGroup();
  return snap;
}

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

function unSoloAll(c){

  c = c || app.project.activeItem;

  for(var i=0;++i<c.layers.length;) c.layer(i).solo = true;
}

function main(c){

  if(!c || !(c instanceof CompItem)) throw TypeError("Select A Composition!");
  var soloLayers = getSoloLayers(c);
  if(!soloLayers) throw Error("No solo layers found!");
  var inv = workAreaDomain(),
      res = setResolutionToFull(c);

  snap(c, inv.start);
  theSnap = dropSnapshot(inv, soloLayers.min("index"));
  if(soloLayers.length == 1) parentSnap(theSnap, soloLayers[0], inv.start);
  
  splitLayers(soloLayers, inv, c.duration);
  c.resolutionFactor = res;
  app.project.renderQueue.item(app.project.renderQueue.numItems).remove();
  unSoloAll(c);
  return 0;
}
