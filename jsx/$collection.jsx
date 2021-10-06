/*******************************************************************************
		Name:           $itemcollection
		Desc:           ItemCollection extension.
		Path:           /jsx/$itemcollection.jsx
		Created:        2109 (YYMM)
		Modified:       2110 (YYMM)
*******************************************************************************/

function CollectionInterface(){};

Object.extend(CollectionInterface, {

    toArray: function()
    {
        return this.map(function(prop){return prop});
    },

    grab   : function()
    {
        if(cb.isnt(Function)) return this.toArray();

    }
})

CollectionInterface.toArray = function()
{
    return this.map(function(prop){return prop})
}

CollectionInterface.grab = function(cb)
{
    if(cb.isnt(Function)) return this.toArray();

    var items = this, arr = [];

    items.forEach(function(item, idx){
        if(cb.call(items, item, idx)) arr.push(item);
    })

    return arr;
}

(function ExtendItemCollection()
{
    ItemCollection.prototype.toArray = CollectionInterface.toArray;
    ItemCollection.prototype.grab    = CollectionInterface.grab;
})();

(function ExtendLayerCollection()
{
    LayerCollection.prototype.toArray = CollectionInterface.toArray;
    LayerCollection.prototype.grab    = CollectionInterface.grab;
})();