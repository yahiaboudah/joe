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
        var arr = [], i =0, tts = this;
        while(++i < tts.length) arr.push(tts[i])
        return arr;
    },

    grab   : function(cb) // cb()
    {
        var items = this.toArray();
        
        return cb.is(Function)?
               items.select(cb):
               items;
    }
});

// $.global.CollectionInterface = function CollectionInterface(){};
// $.global.CollectionInterface.xt({

//     toArray: function()
//     {
//         var arr = [], i =0, tts = this;
//         while(++i < tts.length) arr.push(tts[i])
//         return arr;
//     },

//     grab   : function(cb) // cb()
//     {
//         var items = this.toArray();
        
//         return cb.is(Function)?
//                items.select(cb):
//                items;
//     }

// })

(function ExtendItemCollection()
{
    Object.extend(ItemCollection.prototype, 
    {
        toArray: CollectionInterface.toArray,
        grab   : CollectionInterface.grab
    })

})();

(function ExtendLayerCollection()
{
    Object.extend(LayerCollection.prototype,
    {
        toArray: CollectionInterface.toArray,
        grab   : CollectionInterface.grab
    })

})();