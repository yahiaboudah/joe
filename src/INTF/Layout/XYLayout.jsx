
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

;eval(CLASS.re("$.global", "XYLayout", "create"))

    [PROTO]
    ({
        __name__: "CONSTRUCTORS",

        create: function(cfg){
            CustomLayout.call(this, cfg.c);
            this.t = this.c.orientation.toLowerCase();
            this.x = cfg.x;
            this.y = cfg.y;
        }
    })

    [PROTO]
    ({
        __name__: "LOGIC",

        tt  : function(v, t)
        {
            return (this.t == t)?v:0;
        },
    
        layout: function()
        {
        const K  = "children",
                PS = "preferredSize";
    
        var top = left = kid = 0,
            i = -1;
    
        for(; ++i <this.c[K].length;)
        {
            kid = this.c[K][i];
            kid.size = k[PS];
            if(typeof kid.layout !== "undefined") kid.layout.layout();
            
            kid.location = [left, top];
            top  += this.tt(kid.size.height, 'column')  + this.y; //top+
            left += this.tt(kid.size.width , 'row')  + this.x; //left+
        }
        
        this.c[PS] = [(left-this.x) + this.tt(kid.size.width , 'column'), 
                        (top -this.y) + this.tt(kid.size.height, 'row')
                        ];
        kid = top = left = null;
        }
    })