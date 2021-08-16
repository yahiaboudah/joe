

// win = new Window("palette");
// image = win.add("image", undefined, "D:/media/Memes/exp/1.jpg");
// image2 = win.add("image", undefined, "D:/media/Memes/exp/24.jpg");
// image2.hide();
// image.addEventListener("click", (function(){
//     image2.show();
//     image.hide();
// }))
// win.show();

function playvideo(winObj, pp){
    
    seq = Folder(pp).getFiles("*.jpg");
    $.writeln(seq.length);
    $.writeln(seq[0].toSource())
    for(var i=0, len = seq.length; i<len; i++){
        curr = winObj.add("image", undefined, seq[i]);
        winObj.layout.layout(true);
        winObj.remove(curr);
        winObj.layout.layout(true);
    }
}

var w = new Window ("palette", "Video Player");
var play = w.add ("iconbutton", undefined, File ("/d/ICONS/img/edit.png"));

play.onClick  = function(){
    seq = Folder("d:/ICONS/img").getFiles();
    for(var i=0, len = seq.length; i<2; i++){
        curr = w.add("image", undefined, seq[i]);
        w.layout.layout(true);
        // $.sleep(500);
        // w.remove(curr);
        // w.layout.layout(true);
    }
}

w.show();

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