
DropDownList.prototype.makeGroupVisible = function(g) // g: group var name
/**
    * Changes the visibility of stack-oriented groups' items.
    * When an item is selected, only the group associated
    * with the item will be visible. 
    * 
    * ==> Before you run this function, make sure you:
    * 
    * 1) Associate the item like so: item.group = mygroup1;
    * 2) Call this like: stdVisibleOnChange("group")
    */
{
    const P = "visibility", N = false, Y = true;

    var i = this.selection.index,
        l = this.items,
        n = l.length;

    while(n--) (l[n][g][P] = N);
    l[i][g][P] = Y; 
}