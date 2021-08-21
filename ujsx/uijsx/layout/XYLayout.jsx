//@include "CustomLayout.jsx"

/*
* Usage: 
=================================
container.layout = new XYLayout({
    c: container,
    x: 50,
    y: 50
});
=================================
*/

function XYLayout(cfg){
    CustomLayout.call(this, cfg.c);
    this.t = this.c.orientation[0].toLowerCase();
    this.x = cfg.x;
    this.y = cfg.y;
}

XYLayout.prototype =
{
    tt  : function(v, t)
    {
        return (this.t == t)?v:0;
    },
    layout: function()
    {
    const K  = "children",
          PS = "preferredSize";

    var t = l = w = k = 0;

    for(i = -1; ++i < this.c[K].length;)
    {
        k = this.c[K][i];
        k.size = k[PS];
        if(typeof k.layout !== "undefined") k.layout.layout();
        
        k.location = [l, t];
        t += this.tt(k.size.height, 'c') + this.y;
        l += this.tt(k.size.width, 'r')  + this.x;
    }
    
    this.c[PS] = [(l-this.x) + this.tt(k.size.width, 'c'), 
                  (t-this.y) + this.tt(k.size.height, 'r')
                 ];
    t = l = w = k = null;
    }
}
