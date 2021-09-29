

// Dimension.prototype.toArray = function()
// {
//     var dim = this;
//     dim = eval([dim[0], dim[1]].toSource());
//     return dim;
// }

// Image.prototype.onDraw = function()
// {
//     if( !this.image ) return;

//     var WH = this.size;
//     var wh = this.image.size;
    
//     k = Math.min(WH[0]/wh[0], WH[1]/wh[1]); 
    
//     // xy = [ (WH[0]-wh[0])/2, (WH[1]-wh[1])/2 ];
    

//     this.image.size = k * this.image.size.toArray();

//     // $.writeln(k);
//     $.writeln(this.size);

//     this.graphics.drawImage(
//         this.image,
//         0,
//         0,
//         this.image.size[0]/1,
//         this.image.size[1]/1);
// }


Image.prototype.refresh = function()
{
    sizeVal   = [this.size[0], this.size[1]];
    this.size = sizeVal + 1;
    this.size = sizeVal - 1;
}

Image.prototype.onDraw = function()
{

    this.image.size = this.size = this.properties.cc;

    this.graphics.drawImage(
        this.image,
        0,0,
        this.size[0], this.size[1]
    )

    this.window.onResize();
}

var w = new Window ("palette", "Bouquet",undefined,{resizeable:true});
var p = w.add("panel", undefined, "Controls");
var bb = p.add("button", undefined, "icnrease");
var bd = p.add("button", undefined, "decrease");

var flowers = w.add ("image", undefined, File ("/d/icons/img/sova.png"), {
    cc: [64,64]
});

w.onResizing = w.onResize = function () {this.layout.resize(); this.layout.layout(true)}


bb.onClick = function(){
    flowers.properties.cc = [flowers.properties.cc[0] + 20, flowers.properties.cc[1] + 20];
    flowers.refresh();
}

bd.onClick = function(){
    flowers.properties.cc = [flowers.properties.cc[0] - 20, flowers.properties.cc[1] - 20];
    if(flowers.properties.cc[0] <= 0) flowers.properties.cc = [28, 28];
    flowers.refresh();
}

// flowers.resize([64, 64]);
w.show();