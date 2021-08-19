
function MyLayout( c, x, y ) {
    this.c = c;
    this.x = x;
    this.y = y;
}


MyLayout.prototype.layout = function()
{

    const K  = "children",
          PS = "preferredSize";

    var t = l = w = k = 0;

    for(i = -1; ++i < this.c[K].length;)
    {
        k = this.c[K][i];
        if(typeof k.layout !== "undefined") K.layout.layout();
        k.size = k[PS];
        
        k.location = [l, t];
        t += k.size.height + this.y;
        l += this.x;
    }

    this.c[PS] = [l + k.size.width - this.x, t-this.y];
    t = l = w = k = null;
};

// Create window using resource spec
win = new Window( "dialog" );

buttons = win.add("group");
buttons.orientation = 'column';
buttons.alignment = 'right';

okBtn = buttons.add("button", undefined, 'OK', {name: "ok"})
cancelBtn = buttons.add("button", undefined, 'Cancel', {name: "cancel"});
buttons.add("button", undefined ,"wow")

buttons.layout = new MyLayout(buttons, 50, 50);

win.center();
win.show();