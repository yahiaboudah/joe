// //@include "../blocks/widget.jsx"

// _Video = function _Video(cfg){
//     _Widget.call(this, cfg, "video");
// }; Object.extends(_Video, _Widget);


var win = new Window("palette");

gifo({
	parent: win,
	imgSeqPath: '/d/media/Memes/exp/'
});

win.show();

function gifo(cfg) {
	
	var gif = cfg.parent.add('image');

	gif.imgSeq = Folder(cfg.imgSeqPath).getFiles().sort(function(x,y){
		
		x = parseInt(x.displayName.split('.')[0]);
		y = parseInt(y.displayName.split('.')[0]);
		
		return x > y
	});
	gif.idx = 0;
	gif.max = gif.imgSeq.length;
	
	//stop
	gif.addEventListener('mouseout', function(){
		
		if(this.delay)
		{
			app.cancelTimeout(this.delay);
			this.idx  = 0;
			this.icon = ScriptUI.newImage(this.imgSeq[0]);
		}
		
	});

	//play
	gif.addEventListener('mouseover',function(){
		
		var e = this;
		var c = callee;

		e.idx = (e.idx + 1) % e.max; //% for reset
		e.icon = ScriptUI.newImage(e.imgSeq[e.idx]);
 
		e.delay = app.setTimeout(function() {
			c.call(e);
		}, 2);
	});

	gif.addEventListener("mousedown", function(){
		alert(this.imgSeq.toSource());
	})

	gif.icon = ScriptUI.newImage(gif.imgSeq[0]);
}