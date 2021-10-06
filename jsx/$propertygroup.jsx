/*******************************************************************************
		Name:           $propertygroup
		Desc:           Property group extensions.
		Path:           /jsx/$propertygroup.jsx
		Created:        2109 (YYMM)
		Modified:       2110 (YYMM)
*******************************************************************************/
//@include "$array.jsx"
//@include "^MATCH_NAMES.jsx"
/******************************************************************************/

PropertyGroup.prototype.containingComp = function()
{
  var depth = this.propertyDepth, pp = this;

  while(depth--) pp = pp.parentProperty;
  
  return pp.containingComp;
}
PropertyGroup.prototype.is = function()
{
    var _args = Array.prototype.slice.call(arguments), i = -1;
    
    // matchName processing:
    var match = this.matchName.split(" ")[2];
    
    while(++i<_args.length)
    {
      if(match == args[i]) return true;
    }

    return false;
}
PropertyGroup.prototype.isnt = function()
{
  return !this.is.apply(this, Array.prototype.slice.call(arguments));
}
PropertyGroup.prototype.properties = function()
{
  var props = [], i = -1;
  for(;++i<=this.numProperties;) props.push(this.property(i)); 
  return props;
}
PropertyGroup.prototype.moveFirstVertex = function(index)
{    
    const ERRS = 
    {
      PROP_INVALID = "Property needs to be a shape, path group, or path"
    }

    if(this.isnt("Group", "Path", "PathGroup")) throw Error(ERRS.PROP_INVALID)

    if(this.isnt("Group")) return this.mFirstVertex(index);

    return this.properties().forEach(function(prop){

        if(prop.is("Path")) prop.mFirstVertex(index);
    })
}
PropertyGroup.prototype.mFirstVertex = function(index, t)
{
    const ERRS = 
    {
      INVALID_INDEX: "The index \"{0}\" is invalid".f(index)
    }

    t = t.is(Number)? t: this.containingComp().time;

    var getIndex = Array.prototype[index + "Index"];
    if(getIndex.isnt(Function)) throw Error(ERRS.INVALID_INDEX);

    var path = this.path.value;

    var i = getIndex.call (path.vertices, index),    //index   
        m = Math.floor    (path.vertices.length/2); //midpoint

    var dirRota = (i < m)? "L": "R", 
        numRota = (i < m)?  i : (path.vertices.length - i);

    var shape = new $Shape(
    {
      vertices    : path.vertices   .rotate(dirRota, numRota),
      inTangents  : path.inTangents .rotate(dirRota, numRota),
      outTangents : path.outTangents.rotate(dirRota, numRota),
      isClosed    : path.isClosed
    })

    !this.path.numKeys?
    path.setValue(shape):
    path.setValueAtTime(this.keyTime(this.$nearestKeyIndex("L", t)), shape);
}
PropertyGroup.prototype.$nearestKeyIndex = function(lr, t)
// nearest after -t- or before -t-: (lr: "R" = "RIGHT", "L" = "LEFT"):
{  
  t = t.is(Number)? t: this.containingComp().time;

  if(this.isnt("Path")) throw TypeError("{0} only works for Path".f(callee.name));
  if(!this.numKeys) return 0;
  
  keyIndex = this.nearestKeyIndex(t);
  keyTime  = this.keyTime(keyIndex);

  if(keyIndex == 1) return keyIndex;
  if((keyTime > t) && lr == "R") return keyIndex;
  if((keyTime > t) && lr == "L") return keyIndex-1;
  if((keyTime < t) && lr == "L") return keyIndex;
  if((keyTime < t) && lr == "R") return keyIndex+1;
}