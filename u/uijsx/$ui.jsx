

// win = new Window("palette");
// image = win.add("image", undefined, "D:/media/Memes/exp/1.jpg");
// image2 = win.add("image", undefined, "D:/media/Memes/exp/24.jpg");
// image2.hide();
// image.addEventListener("click", (function(){
//     image2.show();
//     image.hide();
// }))
// win.show();

// Image.prototype.refresh = function(){
//     var wh = this.size;
//     this.size = [1+wh[0],1+wh[1]];
//     this.size = [wh[0],wh[1]];
//     wh = null;
// }
// var w = new Window ("palette", "Video Player");
// var play = w.add ("iconbutton", undefined, File ("/d/ICONS/img/edit.png"));
// var myImage  = w.add("image", undefined,File ("d:/media/Memes/exp/1.jpg") , {counter: 1})

// myImage.onDraw = function()
// {
//     this.properties.counter++;
//     this.graphics.drawImage(ScriptUI.newImage("d:/media/Memes/exp/"+this.properties.counter+".jpg"),0, 0);
// };

// play.onClick = function(){
//     myImage.refresh();
// }


// counter = 0;
// seq = Folder("d:/media/Memes/exp").getFiles();

// play.onClick  = function(){
    
//     pp = seq[counter].fsName;
//     if(counter == seq.length-1)
//     {
//         counter = 0;
//         return;
//     }
//     img.image = pp;
//     counter++;
//     // this.notify("onClick");
// }

// w.show();

// icon = flowers["icon"];
// for(y in icon)
// {
//     $.writeln(y + ": " + uneval(icon[y]));
// }

// Image.prototype.onDraw = function()
// {
    
//     if( !this.image ) return;
    
//     var WH = this.size,
//     wh = this.image.size,
    
    
//     k = Math.min(WH[0]/wh[0], WH[1]/wh[1]),
//     xy;
//     wh = [k*wh[0],k*wh[1]];
//     xy = [ (WH[0]-wh[0])/2, (WH[1]-wh[1])/2 ];
    
    
//     this.graphics.drawImage(this.image,xy[0],xy[1],wh[0],wh[1]);
//     WH = wh = xy = null;
// }
// var w = new Window ("dialog", "Bouquet");
// var flowers = w.add ("image", undefined, File ("/d/media/Memes/exp/5.jpg"));
// flowers.size = [250,250];
// w.show ();

// =============================

// var w = new Window( "palette", "Alert Box Builder");

// p = w.add("panel", undefined, "my panel")
// b = p.add("iconbutton", undefined, "d:/ICONS/img/edit.png");
// b2= p.add("iconbutton", undefined, "d:/icons/img/ae composition.png");


// ScriptUI.events.createEvent( "MouseEvent" );

// w.addEventListener("mousedown", function(){
//     alert("Window was clicked!");
// })

// p.addEventListener("mousedown", function(){
//     alert("panel clicked!");
// })

// b.addEventListener("mousedown", function(){
//     alert("button was clicked!");
// })

// b2.addEventListener("mousedown", function(){
//     alert("comp button was clicked!");
// })

// w.show();

// ======================================
clearOutput();
w = new Window("palette");

b = w.add("iconbutton", undefined, "d:/icons/img/edit.png")

p = w.add("panel", undefined, "myPanel")
p.orientation = "stack";

img = p.add("image", undefined, "d:/media/memes/exp/1.jpg", {name: "curr"});

b.onClick = function(){
    fs = Folder("d:/media/memes/exp/").getFiles();
    i  = 1;
    while(i < fs.length){
        // p.remove("curr");
        // p.add("image", undefined, fs[i++], {name: "curr"});
        // p.layout.layout(true);
        app.setTimeout(function(i){
            p.remove("curr");
            p.add("image", undefined, fs[i++], {name: "curr"});
            p.layout.layout(true);
        }, 10);
        g=0;
        while(g < 1000) g++;
    }
}

w.show();

