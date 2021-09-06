
CompItem.prototype.sel = function(p){
  if(typeof p == "undefined") return this.selectedLayers;
  return this.selectedLayers[p];
}

/**
 * {s}: type.
 * {f}: if another type is found in the selLayers, abort.
 * getSelected("text", false) returns all selected text layers.
 */
app.getSelected = function(s, f)
{

  const ERRS = {
    NO_COMP_FOUND: "NO ACTIVE COMPOSITION",
    NO_SEL_LAYERS_FOUND: "NO SELECTED LAYERS FOUND",
    BAD_INSTANCE_FOUND: "BAD LAYER INSTANCE WAS FOUND"
  },
  TYPE = {
    "*": "*",
    "text": "TextLayer",
    "shape": "ShapeLayer",
  }

  var c = app.project.activeItem,
      i = c.selectedLayers.length,
      s = TYPE[s];

  if(!c instanceof CompItem || !c) throw Error(ERRS.NO_COMP_FOUND);
  if(!i)                           throw Error(ERRS.NO_SEL_LAYERS_FOUND);

  
  //========================================
  if(s == "*") return c.selectedLayers;

  l = i;
  nomatch = 0;
  tmp = [];
  while(l--) 
  {
    if(c.sel(l).constructor.name == s){
      tmp.push(c.sel(l))
    }
    else nomatch++
  }
  //========================================

  if(f && nomatch) throw Error(ERRS.BAD_INSTANCE_FOUND);
  return tmp;
}


app.importOptions = function(cfg){
    opts = new ImportOptions();
    opts.file = cfg.file;
    opts.importAs = cfg.importAs;
}

app.import = function(fp){ 
    return app.project.importFile(app.importOptions({
        file: new File(fp),
        importAs: ImportAsType.FOOTAGE
    }));
}

app.mostRecent = function(dp, typ){

    var fs = Folder(fp).getFiles(typ || "*"),
        re = fs[0],
        i  = -1;
    
    if(!re) return;
    for(;++i<fs.length;) if(fs[i].modified>re.modified) re = fs[i];
    
    return re;
}

app.getFileDlg = function(sugg, helptip, type){
    return (new File(sugg)).openDlg(helptip,type);
}

app.getExpression = function(ftName, typ){
    
    return (function(){

        var m = thisLayer.marker;
        var t = time;
        var i = m.nearestKey(time).index;
    
        if(m.nearestKey(t).time>t){ i--; } //if: |  <>
        i || (i = 1);
    
        var obj = footage(footageName).sourceData;

        obj[i][type];    
    }).body().replace("footageName", ftName).replace("type", typ);
}

app.makeAnimMarkers(animObj){
    
    var anim = "",
        dura = 0,
        coms = [],
        durs = [],
        i = 0;
    
    for(;++i<animObj.length;){
      anim = animObj[i]['Animation'];
      coms.push("Scene " + i);
      dur += (animObj[i-1]["Duration"]) || 0;
      durs.push(dur);

    }
    return [times,comments];
}