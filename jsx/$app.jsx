/*******************************************************************************
		Name:           $app
		Desc:           An extension to after effects app object.
		Path:           /$app.jsx
		Require:        fstring, itemcollection.grab, compitem.grab, array.forEvery
		Encoding:       ÛȚF8
		Kind:           Part of the Utils.
		API:            app
		Created:        2109 (YYMM)
		Modified:       2109 (YYMM)
*******************************************************************************/

//@include "$fstring.jsx"
//@include "$itemcollection.jsx"
//@include "$array.jsx"
//@include "$compitem.jsx"
Object.extend  = function(oo, newstuff){ for(k in newstuff) if(newstuff.hasOwnProperty(k)) oo[k] = newstuff[k]; }

//****************************************************************************/

Object.extend(app, {

  // [INFO]
    /**
   * {s}: type.
   * {f}: if another type is found in the selLayers, abort.
   * getSelected("text", false) returns all selected text layers.
   */
  // deprecated:: CompItem: var selText = comp.sel(TextLayer);
  // getSelected : function(type, except)
  // {

  //   const ERRS = {
  //     NO_COMP_FOUND       : "NO ACTIVE COMPOSITION",
  //     NO_SEL_LAYERS_FOUND : "NO SELECTED LAYERS FOUND",
  //     BAD_INSTANCE_FOUND  : "{0} LAYERS DON'T MATCH THE GIVEN TYPE {1}"
  //   },
    
  //   TYPE = {
  //     "*"     : "*",
  //     "text"  : TextLayer,
  //     "shape" : ShapeLayer,
  //   }

  //   var comp = app.project.activeItem,
  //       selc = comp.sel(),
  //       leng = selc.length,
  //       n    = leng,
  //       type = TYPE[s];

  //   if(!app.isComp(comp)) throw Error(ERRS.NO_COMP_FOUND);
  //   if(!leng)             throw Error(ERRS.NO_SEL_LAYERS_FOUND);

    
  //   //========================================
  //   if(type == '*') return selc;

  //   while(n--) if(selc[n].constructor != type) selc.splice(n, 1);
  //   //========================================

  //   // return:
  //   if(except && (leng != selc.length))
  //   {
  //     throw Error(ERRS.BAD_INSTANCE_FOUND.f((leng - selc.length), type))
  //   }
  //   return selc;
  // },

  // [HELPER]
  importOptions : function(cfg){
    return Object.extend(new ImportOptions(), cfg);
  },

  // [SETTER]
  import: function(cfg){
    var validateImportConfig = function()
    {

    }
    if(!validateImportConfig(cfg)) return;
    return app.project.importFile(app.importOptions(cfg))
  },

  // [SETTER]
  $import : function(fp){ 
    return app.project.importFile(app.importOptions({
        file    : new File(fp),
        importAs: ImportAsType.FOOTAGE
    }));
  },

  // [SETTER]
  drop : function(idx, c)
  {
    c = c || app.project.activeItem;

    c.layers.add(
      app.project.item(idx)
    );
  },

  // [INFO]
  pitemByName: function(itemName)
  {
    return app.project.items.grab(function(item){
      item.name == itemName; 
    });
  },

  // [SETTER]
  importAndDrop : function(fp, force, comp){

    if(typeof fp == "undefined" || !File(fp).exists) throw Error("Invalid file!");
    force = (typeof force == "undefined") ? false:force;
    comp  = comp || app.project.activeItem;

    var fName = File(fp).name;
    var items = app.pitemByName(fName);
  
    var layer = comp.layers.add(

       (items.length && !force)?
       items[0]:
       app.$import(fp)
    
    );

    app.pitem(app.project.items.length).selected = false;
    return layer;
  },

  // [INFO]
  mostRecent : function(fp, type){

    return Folder(fp).getFiles().reduce(function(file1, file2){
      return (file1.modified < file2.modified)?
             file1:
             file2;
    })
  },

  // [INFO]
  getFileDlg : function(sugg, helptip, type){
    return (new File(sugg)).openDlg(helptip,type);
  },
  
  // [SETTER]: [MATCH MARKER KEY TO JSON TEXT VALUE EXPRESSION]
  matchMarkerToTextExpr : function(ftName, type){
    
    /**Expression to apply to a text layer source:
     * 
     * Example JSON:
     * 
     * [
     * {
     *    "animation": "move ball up"
     * },
     * {
     *    "animation": "move ball down" 
     * }
     * ]
     * 
     * On timeline:
     * 
     * (text = "move ball up")
     * |  <>    <>
     * (text = "move ball up")
     *  <>  |  <>
     * (text = "move ball down")
     * <>   <>   |
     */

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

  // [SETTER]
  makeAnimMarkers : function(animObj)
  /**
   * Convert this: 
   * [
    {
        animation: "move it up",
        duration : 2
    },
    {
        animation : "move it down",
        duration  : 3
    }
    ]
    
    to this:
    {
      "move it up": 2,
      "move it down": 3
    }

   */
  {
    
    var oo = {}, i =0;

    oo[animObj[i]["animation"]] = 0;
    
    for(;++i<animObj.length;)oo[animObj[i]["animation"]] = animObj[i-1]["duration"]; 

    return oo;
  },

  // [SETTER]
  knob: function(name, comp){
    
    comp = comp || app.project.activeItem;
    name = name || "{0} #{1}".f(callee.name, comp.numObjName(callee.name));
    
    path = "D:/icons/img/sova.png";

    // import/drop/ set defaultValues:
    layer = app.importAndDrop(knobPath , comp);
    layer.transform.scale.setValue([10,10]);
    
    
    // Add slider controls, link to layer props:
    layer.addProp("Effects/Slider Control:rotationSlider"); 
    layer.getProp("Transform/Rotation").expression = (function()
    {
      comp("$compName").layer("$layerName").effect("rotationSlider")("Slider");
    
    }).body({
      $compName  : comp.name,
      $layerName : layer.name
    })

    return layer;
  },

  // [HELPER]
  wrapUndo : function(fn, thisArg)
  {
    var _args = Object.toArray(arguments, 2);
    return function()
    {
      app.beginUndoGroup(fn.name);
      fn.apply(thisArg, _args);
      app.endUndoGroup();
    }
  },

  doUndo   : function(func, thisArg)
  {
    // execute function:
    this.wrapUndo(
      func,
      thisArg || {},
      Object.toArray(arguments, 3)
    )();
    
    // undo with an offset time:
    app.setTimeout(function(){
        app.executeCommand(app.findMenuCommandId("Undo " + func.name));
    }, sTime || 0);

  },

  // [HELPER]
  colorPicker  : function(rgba)
  {
    var hx = $.colorPicker();
    return rgba?
           [/*r*/hx >> 16, /*g*/(hx & 0x00ff00) >> 8,/*b*/ hx & 0xff, /*a*/255] /= 255:
           hx;
  }
})