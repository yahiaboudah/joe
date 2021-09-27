//@include "../../utjsx/$file.jsx"
//@include "../../utjsx/$path.jsx"
//@include "../../utjsx/$fstring.jsx"

function playAudio(pp){    
    
    File("{0}/ply.pyw".f(Folder.temp.fsName)).$create([
        
        "from playsound import playsound",
        "playsound(r\"{0}\")".f(new Path(pp).py())
    
    ].join("\n")).$execute(100,function(){
        this.remove();
    });

}

playAudio("d:/Cache/sound/sound.mp3");
