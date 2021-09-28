
ItemCollection.prototype.grab = function(cb)
{
    cb = cb || (function(){ return true})
    var items = this;
    var arr = [];

    for(var i=1; i< items.length+1; i++)
    {
        if(!cb(items[i], i)) continue;
        arr.push(items[i]); 
    }
    return arr;
};