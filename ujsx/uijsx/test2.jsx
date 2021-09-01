

Image.prototype.refresh = function(){
    var sz = this.size;
    this.size = [sz[0] + 1, sz[1] + 1];
    this.size = sz;
}

var win = new Window("palette");

gg = gifo({
	parent: win,
	imgSeqPath: '/d/cache/exp/'
});

gg.onDraw = function(){

    if( !this.image ) return;
    var WH = this.size,
    wh = this.image.size,
    k = Math.min(WH[0]/wh[0], WH[1]/wh[1]),xy;
    
    wh = [k*wh[0],k*wh[1]];
    xy = [ (WH[0]-wh[0])/2, (WH[1]-wh[1])/2 ];
    
    this.graphics.drawImage(this.image,xy[0],xy[1],wh[0],wh[1]);
    WH = wh = xy = null;
}

function playAudio(audioPath){
    var ff = new File("testaudio.py");
    ff.open("w");
    ff.write(
        ["from playsound import playsound",
        "playsound("+audioPath+")"]
    );
    ff.close();
    ff.execute();
    // ff.remove();
}

bb = win.add("button", undefined, "play");

bb.addEventListener("mousedown",function(){
    playAudio("d:\\\\Cache\\\\exp\\\\sound\\\\sound.mp3");
})

bb.onClick = function(){

    gg.idx++;
    gg.icon = ScriptUI.newImage(gg.imgSeq[gg.idx]);
    if(gg.idx == gg.max-1)
    {
        if(win.timer){
            app.cancelTimeout(win.timer);
            gg.idx = 0;
            gg.icon = ScriptUI.newImage(gg.imgSeq[0]);
        }
    }
    else{
        win.timer = app.setTimeout(function(){
            bb.onClick();
        });    
    }
}

function gifo(cfg){
    var gif = cfg.parent.add('image');

	gif.imgSeq = Folder(cfg.imgSeqPath).getFiles().sort(function(x,y){
		
		x = parseInt(x.displayName.split('.')[0], 10);
		y = parseInt(y.displayName.split('.')[0], 10);
		
		return x > y
	});
	gif.idx = 0;
	gif.max = gif.imgSeq.length;

    gif.icon = ScriptUI.newImage(gif.imgSeq[gif.idx])

    // e.idx = (e.idx + 1) % e.max; //% for reset
    // e.icon = ScriptUI.newImage(e.imgSeq[e.idx]);

    gif.size = [1280/4,720/4]

    return gif;

}

win.show();