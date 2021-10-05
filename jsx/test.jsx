
//@include "$array.jsx"
//@include "$shapelayer.jsx"

Object.prototype.is = function()
{
    var _args = Array.prototype.slice.call(arguments),
    match = this.constructor, i =-1;

    while(++i<_args.length) if(match == _args[i]) return true;

    return false;
}

PropertyGroup.prototype.is = function()
{
    var _args = Array.prototype.slice.call(arguments),
        match = this.matchName.split(" ")[2], i = -1;
    
    while(++i<_args.length) if(match == _args[i]) return true;

    return false;
}
PropertyGroup.prototype.containingComp = function()
{
  var depth = this.propertyDepth, currProp = this;

  while(depth--) currProp = currProp.parentProperty;
  
  return currProp.containingComp;
}
ShapeLayer.prototype.explode = function()
{
    var allProps = [];
    for(var i =1; i<this.content.numProperties+1; i++)
    {
        myProp = this.content.property(i);
        allProps.push(myProp)
    }

    allProps.forEach(function(prop){
        
    })

    return 0;
}

try
{    
    var layer = app.project.activeItem.layer(1);
    var ss = layer.explode();
}
catch(e)
{
    $.writeln(e);
}