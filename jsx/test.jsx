
Object.toArray = function(oo, num){
    return Array.prototype.slice.call(oo, num);
}


var oo = {
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

  doUndo   : function(func, sTime, thisArg)
  {

  }
}