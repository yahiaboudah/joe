
Window

    [PROTO]
    ({
        __name__: "AUDIO",
        playAudio: function(pp, dt)
        // Requires python, and pygame to be installed.
        {   
            File("{0}\\xto_play_audio.pyw".re(Folder.temp.fsName)).$create([
                
                "from pygame import mixer",
                "from time import sleep",
        
                "mixer.init()",
                "mixer.music.load(\"{0}\")".f(pp),
                "mixer.music.play()",
                "sleep({0})".re(dt),
                "mixer.music.stop()"
                    
            ].join("\n")).$execute(200,function(){
                this.remove();
            });
        }
    })

    [PROTO]
    ({
        __name__: "VIDEO",

        addAnimatedSequence : function (imgSeqPath, firstImageIdx)
        {
            var win = this;

            var gif = win.add("image");

            gif.imgSeq = Folder(imgSeqPath).getFiles().sort(function(x,y){
                
                x = parseInt(x.displayName.split('.')[0], 10);
                y = parseInt(y.displayName.split('.')[0], 10);
                
                return x > y
            });
            gif.idx = 0;
            gif.max = gif.imgSeq.length;
            
            //stop
            gif.addEventListener('mouseout', function(){
                
                if(this.delay)
                {
                    app.cancelTimeout(this.delay);
                    this.idx  = firstImageIdx;
                    this.icon = ScriptUI.newImage(this.imgSeq[this.idx]);
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

            gif.icon = ScriptUI.newImage(gif.imgSeq[firstImageIdx]);

            return gif;
        }
    })