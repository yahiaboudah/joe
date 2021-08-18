
function CustomLayout( container ) {
    this.initSelf();
}

CustomLayout.prototype.initSelf = function(){
    this.container = container;
}

CustomLayout.prototype.layout = function() {

    var con = this.container,
        chd = con.children;
    
    var top = 0;
    var left = 0;
    
    var width;
    
    var dy = 30;
    var dx = 5;
    
    
    for ( i = 0; i < chd.length; i++ ) {
        
        var ch = chd[i];
        if (typeof ch.layout != "undefined") ch.layout.layout();

        ch.size = ch.preferredSize;
        ch.location  = [left,top]; // [0,0] for i=0

        width = left + ch.size.width;

        top  += ch.size.height + dy;
        left += dx;
    }
    con.preferredSize = [ width , top - dy];
};

win = new Window("palette");

bs = win.add("group", undefined, "buttons", {name: "buttons"});
b1 = bs.add("button", undefined, "pussy");
b2 = bs.add("button", undefined, "ass");

bs.layout = new CustomLayout(bs);
win.center();
win.show();