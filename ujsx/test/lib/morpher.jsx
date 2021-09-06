//@include "../utils/utils.jsx";

morphing = {

    CONSTANTS: {
    
        SORTING_DIRECTIONS : {
        topLeft: "TOPLEFT",
        leftRight: "LEFTRIGHT",
        rightLeft : "RIGHTLEFT",
        bottomUp: "BOTTOMUP",
        topDown: "TOPDOWN"    
        },
    
        DUPLICATES_OPTS : {
        closestShapes : "CLOSEST SHAPES",
        random : "RANDOM",
        centerOfMass: "CENTER OF MASS",
        manual : "MANUAL"
        },
    
        LAYERS_SHRINK_OPTS : {
        deleteOpt : "Delete",
        disbaleOpt : "Disable",
        noneOpt : "No"
        },
    
        LAYERS_EXPAND_OPTS : {
        restoreOpt : "Restore",
        keepOpt : "Keep",
        noneOpt : "No"
        },
    
        MORPH_TYPE : {
        EXPANDING: "EXPANDING",
        SHRINKING: "SHRINKING"
        },
    
        FIRST_VERTEX_OPTS : {
        up: "UP",
        left: "LEFT",
        right: "RIGHT",
        down: "DOWN",
        upperLeft: "UPPERLEFT",
        upperRight : "UPPERRIGHT",
        bottomLeft: "BOTTOMLEFT",
        bottomRight: "BOTTOMRIGHT",
        random : "RANDOM",
        closestTo : "CLOSEST TO"
        }
    }
    
};

include([
    "polyfills/",
    "lib/indexGetter.jsx"
]);

function Morpher(config, morphOnCreate){

    config = config || {};
    morphOnCreate = morphOnCreate || false;

    this.preMorphLayer = config.premorphLayer || undefined;
    this.postMorphLayer = config.postMorphLayer || undefined;
    
    this.premorphSortingDirection = config.premorphSortingDirection || morphing.CONSTANTS.SORTING_DIRECTIONS.topLeft;
    this.postMorphSortingDirection = config.postMorphSortingDirection || morphing.CONSTANTS.SORTING_DIRECTIONS.topLeft;
    this.premorphFVertex = config.premorphFVertex || morphing.CONSTANTS.FIRST_VERTEX_OPTS.upperLeft;
    this.postmorphFVertex = config.postmorphFVertex || morphing.CONSTANTS.FIRST_VERTEX_OPTS.upperLeft;
    
    this.duplicates = config.duplicates || morphing.CONSTANTS.DUPLICATES_OPTS.closestShapes;
    
    this.layersShrink = config.layersShrink || morphing.CONSTANTS.LAYERS_SHRINK_OPTS.deleteOpt;
    this.layersExpand = config.layersExpand || morphing.CONSTANTS.LAYERS_EXPAND_OPTS.restoreOpt;
    
    this.morphTime = config.morphTime || 0.5;

    if(morphOnCreate) this.morph();

}

Morpher.prototype.indexGetter = new IndexGetter();


Morpher.prototype.getDiff = function (){
    var premorphNumProps = this.preMorphLayer.property("Contents").numProperties;
    var postmorphNumProps = this.postMorphLayer.property("Contents").numProperties;
    return postmorphNumProps - premorphNumProps;
}

Morpher.prototype.duplicateGroup = function (layer,prop){
    layer.property("Contents").property(prop).duplicate();
}


Morpher.prototype.morph = function(){
  
  var compTime = app.project.activeItem.time;
  // fvertex
  this.preMorphLayer.moveFirstVertex(this.premorphFVertex);
  this.postMorphLayer.moveFirstVertex(this.postmorphFVertex);


  switch (this.duplicates) {
      case this.DUPLICATES_OPTS.closestShapes:

          break;
      case this.DUPLICATES_OPTS.centerOfMass:

          break;
      case this.DUPLICATES_OPTS.random:

          break;
      case this.DUPLICATES_OPTS.manual:
          
          break;    
      default:
          alert("Passed value is not included in the duplicates options list.");
          return;
  }

  diff = this.getDiff();
  
  if(diff > 0){
    // Expand:
    //var eachGets = diff / this.preMorphLayer.property("Contents").numProperties;  
    for(var i=0;i<diff;i++){
      this.duplicateGroup(this.preMorphLayer,1);
    }    

  }else if(diff < 0){
    // Shrink:
    for(var i=0;i<diff;i++){
        this.duplicateGroup(this.postMorphLayer,1);
    }

  }

  // Get distaces from SORTING_DIRECTION:
  premorphDistances = this.getDistances(this.preMorphLayer,this.premorphSortingDirection);
  postmorphDistances = this.getDistances(this.postMorphLayer,this.postMorphSortingDirection);
  // Sort indices based on the distances:
  // Get the list of indicies to start morphing:
  preMorphIndices = this.indexGetter.sortIndices(premorphDistances);
  postMorphIndices = this.indexGetter.sortIndices(postmorphDistances);
  
  // loop through all properties:
  for(var j=1;j<this.preMorphLayer.property("Contents").numProperties+1;j++){

    // Get the right groups:
    var group = this.preMorphLayer.property("Contents").property(preMorphIndices[j-1]);
    var otherGroup = this.postMorphLayer.property("Contents").property(postMorphIndices[j-1]);

    // Get the right path prop index:
    var num = getPathProp(group);
    var otherNum = getPathProp(otherGroup);
   

    // ------------ GET ------------ //
    // PATH:
    var pathProp = group.property("Contents").property(num).path;
    var otherPathProp = otherGroup.property("Contents").property(otherNum).path;
    // POS:
    var thisPos = group.property("Transform").property("Position");
    var otherPos = otherGroup.property("Transform").property("Position");

    // ----------- SET ------------//
    // PATH:
    pathProp.setValueAtTime(compTime,pathProp.value);
    pathProp.setValueAtTime(compTime+s.morphTime,otherPathProp.value);
    // POS:
    thisPos.setValueAtTime(compTime,thisPos.value);
    thisPos.setValueAtTime(compTime+s.morphTime,otherPos.value);
}
}
