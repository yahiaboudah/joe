//@include "../blocks/widget.jsx"

_DropDownList = function _DropDownList(cfg){
    _Widget.call(this, cfg, "dropdownlist");
}; Object.extends(_DropDownList, _Widget);


/**
 * This function changes the visibility of stack-oriented groups' items.
 * When an item is selected, only the group associated with the item will
 * be visible. Before you run this function, make sure you associate the
 * item like so: item.group = mygroup1;
 * then call this like: stdVisibleOnChange("group") 
 */
_DropDownList.prototype.stdVisibleOnChange = function(g) // g: group var name
{
    const P = "visibility", N = false, Y = true;

    var i = this.selection.index,
        l = this.items,
        n = l.length;

    while(n--) (l[n][g][P] = N);
    l[i][g][P] = Y; 
}