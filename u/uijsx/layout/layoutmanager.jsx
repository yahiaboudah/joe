
function CustomLayout(c){
    this.c = c;
}

function NormalLayout(cfg){
    CustomLayout.call(this, cfg.c);
    this.t = this.c.orientation[0].toLowerCase();
    this.x = cfg.x;
    this.y = cfg.y;
}

NormalLayout.prototype =
{
    type  : function(v, t)
    {
        return (this.t == t)?v:0;
    },
    layout: function()
    {
    const K  = "children",
          PS = "preferredSize";

    var t = l = w = k = 0,
        a = (this.type == 'row')?1:0;

    for(i = -1; ++i < this.c[K].length;)
    {
        k = this.c[K][i];
        k.size = k[PS];
        if(typeof k.layout !== "undefined") k.layout.layout();
        
        k.location = [l, t];
        t += this.type(k.size.height, 'c') + this.y;
        l += this.type(k.size.width, 'r')  + this.x;
    }
    
    this.c[PS] = [(l-this.x) + this.type(k.size.width, 'r'), 
                  (t-this.y) + this.type(k.size.height, 'c')
                 ];
    t = l = w = k = null;
    }
}

function ColumnLayout(cfg) { NormalLayout.call(this, cfg); }

function RowLayout(cfg){ NormalLayout.call(this,cfg); }

RowLayout.prototype = 
{
    layout: function()
    {
    const K  = "children",
          PS = "preferredSize";

    var t = l = w = k = 0,
        a = (this.type == 'row')?1:0;

    for(i = -1; ++i < this.c[K].length;)
    {
        k = this.c[K][i];
        k.size = k[PS];
        if(typeof k.layout !== "undefined") k.layout.layout();
        
        k.location = [l, t];
        t += ((this.t == "c")?(k.size.height):0) + this.y;
        l += ((this.t == "r")?(k.size.width):0) + this.x;
    }
    
    this.c[PS] = [(l-this.x), (t-this.y) + (k.size.height)];
    t = l = w = k = null;
    }
}

ColumnLayout.prototype = 
{    
    /* k: child, K: "children", t: top
       l: left,  w: width, c: container*/
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
        t += (k.size.height) +   this.y;
        l += /*(k.size.width)+*/ this.x;
    }

    this.c[PS] = [(l-this.x) + (k.size.width), (t-this.y)];
    t = l = w = k = null;
    }
}

// Create window using resource spec
win = new Window( "dialog" );

buttons = win.add("group");
buttons.orientation = 'row';
// buttons.alignment = 'right';

okBtn = buttons.add("button", undefined, 'OK', {name: "ok"})
cancelBtn = buttons.add("button", undefined, 'Cancel', {name: "cancel"});
buttons.add("button", undefined ,"wow")

buttons.layout = new RowLayout({
    c: buttons,
    x: 10,
    y: 100
});

win.center();
win.show();