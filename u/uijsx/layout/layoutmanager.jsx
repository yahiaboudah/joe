
// function CustomLayout( container ) {
//     this.initSelf();
// }

// CustomLayout.prototype.initSelf = function(){
//     this.container = container;
// }

// CustomLayout.prototype.layout = function() {

//     var con = this.container,
//         chd = con.children;
    
//     var top = 0;
//     var left = 0;
    
//     var width;
    
//     var dy = 30;
//     var dx = 5;
    
    
//     for ( i = 0; i < chd.length; i++ ) {
        
//         var ch = chd[i];
//         if (typeof ch.layout != "undefined") ch.layout.layout();

//         ch.size = ch.preferredSize;
//         ch.location  = [left,top]; // [0,0] for i=0

//         width = left + ch.size.width;

//         top  += ch.size.height + dy;
//         left += dx;
//     }
//     con.preferredSize = [ width , top - dy];
// };

// win = new Window("palette");

// bs = win.add("group", undefined, "buttons", {name: "buttons"});
// b1 = bs.add("button", undefined, "pussy");
// b2 = bs.add("button", undefined, "ass");

// bs.layout = new CustomLayout(bs);
// win.center();
// win.show();

Object.prototype.ext = function(o){
    for(x in o) this[x] = o[x];
    return this;
}


w = new Window("palette");

pp = w.add("panel", undefined, "exp");
pp.orientation = "stack";
g1 = pp.add("group"); 
g1.add("statictext", undefined, "Option 1");
g2 = pp.add("group");
g2.orientation = "column";
b = g2.add("button", undefined, "say");
et = g2.add("edittext", undefined, "input text here");
dd = w.add("dropdownlist");

g1.addEventListener("mousedown", function(){
    alert("Boring option 1");
}, true);

b.onClick = function()
{
    alert(et.text);
}

dd.onChange = function(){

    var dx = this.selection.index,
        ts = this.items,
        ln = ts.length;

    while(ln--) (dx == ln)? (ts[ln].g.visible = 1): (ts[ln].g.visible = 0);
}


dd.add("item", "Option 1").ext({g: g1}); 
dd.add("item", "Option 2").ext({g: g2});

dd.selection = 0;

w.show();