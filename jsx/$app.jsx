/*******************************************************************************
		Name:           $app
		Desc:           An extension to after effects app object.
		Path:           /$app.jsx
		Require:        ---
		Encoding:       ÛȚF8
		Kind:           Part of the Utils.
		API:            $app
		Todo:           ---
		Created:        2109 (YYMM)
		Modified:       2109 (YYMM)
*******************************************************************************/
//@include "$fstring.jsx"
//@include "$itemcollection.jsx"
Object.extend  = function(oo, newstuff){ for(k in newstuff) if(newstuff.hasOwnProperty(k)) oo[k] = newstuff[k]; }
CompItem.prototype.sel = function(p){ return (p === parseInt(p))?this.selectedLayers[p]:this.selectedLayers; }
Array.prototype.forEvery = function(cb){
  var arr = this, len = arr.length;
  while(len--) if(cb.call(null, arr[len], len) == false) return false;
  return true;
}
//****************************************************************************/

Object.extend(app, {
  
  // [INFO]:
  isComp      : function(cc)
  {
    return (c && c instanceof CompItem);
  },

  // [SETTER]
  setTime : function(t,c, all)
  {
    all  = typeof all == "undefined"?1:all;
    comp = c || app.project.activeItem;
    n    = comp.layers.length + 1;
  
    //==============/
    comp.duration = t;
    //==============/
    while(--n)
    {
      layer        = cmp.layer(n);
      isLocked     = layer.locked;
      layer.locked = false; //unlock
  
      //=============================================================/
      layer.outPoint = t;
      if(all && layer.source instanceof CompItem) callee(t, layer.source, all);
      //=============================================================/
  
      lyr.locked = isLocked; //relock
    }
  
    //cleanup:
    all = comp = n = layer = isLocked = null;
    return c;
  },

  // [INFO]
    /**
   * {s}: type.
   * {f}: if another type is found in the selLayers, abort.
   * getSelected("text", false) returns all selected text layers.
   */
  getSelected : function(type, except)
  {

    const ERRS = {
      NO_COMP_FOUND       : "NO ACTIVE COMPOSITION",
      NO_SEL_LAYERS_FOUND : "NO SELECTED LAYERS FOUND",
      BAD_INSTANCE_FOUND  : "{0} LAYERS DON'T MATCH THE GIVEN TYPE {1}"
    },
    
    TYPE = {
      "*"     : "*",
      "text"  : TextLayer,
      "shape" : ShapeLayer,
    }

    var comp = app.project.activeItem,
        selc = comp.sel(),
        leng = selc.length,
        n    = leng,
        type = TYPE[s];

    if(!app.isComp(comp)) throw Error(ERRS.NO_COMP_FOUND);
    if(!leng)             throw Error(ERRS.NO_SEL_LAYERS_FOUND);

    
    //========================================
    if(type == '*') return selc;

    while(n--) if(selc[n].constructor != type) selc.splice(n, 1);
    //========================================

    // return:
    if(except && (leng != selc.length))
    {
      throw Error(ERRS.BAD_INSTANCE_FOUND.f((leng - selc.length), type))
    }
    return selc;
  },

  importOptions : function(cfg){
    return Object.extend(new ImportOptions(), cfg);
  },

  import: function(cfg){
    var validateImportConfig = function()
    {

    }
    if(!validateImportConfig(cfg)) return;
    return app.project.importFile(app.importOptions(cfg))
  },

  $import : function(fp){ 
    return app.project.importFile(app.importOptions({
        file    : new File(fp),
        importAs: ImportAsType.FOOTAGE
    }));
  },

  drop : function(idx, c)
  {
    c = c || app.project.activeItem;

    c.layers.add(
      app.project.item(idx)
    );
  },

  pitem : function(dd){
    return app.project.item(dd);
  },

  pitemByName: function(itemName)
  {
    return app.project.items.grab(function(item){
      item.name == itemName; 
    });
  },

  importAndDrop : function(comp, fp){

    var fName = File(fp).name,
    
    comp  = comp || app.project.activeItem;
    
    var isItem = app.project.items.forEvery(function(t){
      t.name != fName;
    })
  
    var layer = comp.layers.add(
      isItem? app.pitem(fName):app.$import(fp)
    );
    app.pitem(app.project.items.length).selected = false;
    return layer;
  },

  mostRecent : function(dp, typ){

    var fs = Folder(fp).getFiles(typ || "*"),
        re = fs[0],
        i  = -1;
    
    if(!re) return;
    for(;++i<fs.length;) if(fs[i].modified>re.modified) re = fs[i];
    
    return re;
  },

  getFileDlg : function(sugg, helptip, type){
    return (new File(sugg)).openDlg(helptip,type);
  },
  
  getExpression : function(ftName, type){
    
    return (function(){

        var m = thisLayer.marker;
        var t = time;
        var i = m.nearestKey(time).index;
    
        if(m.nearestKey(t).time>t){ i--; } //if: |  <>
        i || (i = 1);
    
        var obj = footage($footageName).sourceData;

        obj[i][type];    
    
    }).body()._replace({

      $footageName: ftName,
      $type : type    
    
    });
  },

  numObjName    : function(comp, typ){

    var comp = comp || app.project.activeItem,
        i    = 0,
        n    = 0,
        name,
        
    
    for(;++i<comp.layers.length+1;)
    {
      name = comp.layer(i).name;
      if(RegExp("{0} \d+".f(typ),"gi").test(name)) n++;
    }
  
    return n; 
  },

  numObjComment : function(c, t){ //comp, type

    var c = c || app.project.activeItem,
        i = 0,
        n = 0,
        len = c.layers.length+1;
    
    for(;++i<len;) if(eval(c.layer(i).comment) == t) n++;
  
    return n; 
  },

  makeAnimMarkers : function(animObj){
    
    var anim = "",
        dura = 0,
        coms = [],
        durs = [],
        i = 0;
    
    for(;++i<animObj.length;){
      anim = animObj[i]['Animation'];
      coms.push("Scene {0}: {1}".f(i, anim));
      
      dura += (animObj[i-1]["Duration"]) || 0;
      durs.push(dur);
    }
    return [durs, coms];
  },

  knob: function(name, comp){
    
    comp = comp || app.project.activeItem;
    objN = callee.name;
    name = name || objN + ": " + app.numObj(comp,objN);
    
    path = "D:/icons/img/sova.png";
    dVal = // default values: 
    {
      "Scale": [10, 10]
    }
    // import/drop/ set defaultValues:
    layer = app.importAndDrop(knobPath ,comp);
    for(v in dVal) layer.setProp(v, dVal[v])
    
    
    // Add slider controls, link to layer props:
    layer.addProp("Effects/Slider Control");
    
    layer.setProp("rotation:expr", (function(){
  
      comp("$compName").layer("$layerName").effect("Slider Control")("Slider");
  
    }).body()._replace({
      $compName: comp.name,
      $layerName: layer.name
    }))
    
    return layer;
  },

  findItemByName : function(namo){
  
    var length     = app.project.items.length+1;
    var i          = 0, tmp, idc = [];
    
    for(;++i<length;)
    {
      tmp = app.project.item(i).name;
      if(tmp == namo) idc.push(i);
    }
  
    return idc;
  },

  wrapUndo : function(fn, thisArg){
    app.beginUndoGroup(fn.name);
    fn.call(thisArg);
    app.endUndoGroup();
  },

  colorPicker : function(){ return $.colorPicker()},
  hexPicker   : function(){ return $.colorPicker()},
  rgbaPicker  : function(){
  
    var hx = app.hexPicker();
    return [
      hx >> 16,
      (hx & 0x00ff00) >> 8,
      hx & 0xff,
      255
    ] /= 255;
  
  }
})