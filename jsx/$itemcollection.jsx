/*******************************************************************************
		Name:           $itemcollection
		Desc:           ItemCollection extension.
		Path:           /jsx/$itemcollection.jsx
		Created:        2109 (YYMM)
		Modified:       2110 (YYMM)
*******************************************************************************/

(function ItemCollectionExtens(){

    ItemCollection.prototype.toArray = function(){

        var arr = [], i =0;
        
        while(++i<= this.length) arr.push(this[i]);

        return arr;
    }

    ItemCollection.prototype.grab = function(cb)
    {
        if(cb.isnt(Function)) return this.toArray();

        var items = this, arr = [];
        
        items.forEach(function(item, idx){
            if(cb.call(items, item, idx)) arr.push(item);
        })

        return arr;
    }

})