
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