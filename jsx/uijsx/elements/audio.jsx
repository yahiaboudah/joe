    //@include "../../utjsx/$path.jsx"
    //@include "../../utjsx/$fstring.jsx"

    File.prototype.$create = function(text, encoding) {

        this.encoding = encoding || "UTF-8";
        return (this.$write(text || "", 'w'), this);
    }
    // Handler
    File.prototype.$execute = function(slp, cb, doClose) {
    
            this.execute();
            if(!!doClose) this.$close();
            $.sleep(slp || 0);
            if(typeof callback == "function") cb.call(this);
    
            return this;
    }


function playAudio(pp){    
    
    File("{0}/ply.pyw".f(Folder.temp.fsName)).$create([
        
        "from playsound import playsound",
        "playsound(r\"{0}\")".f(new Path(pp).py())
    
    ].join("\n")).$execute(100,function(){
        this.remove();
    });

}

try{    
    playAudio("d:/Cache/sound/sound.mp3");
}catch(e){
    $.writeln(e)
}
