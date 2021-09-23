//@include "../../utjsx/$file.jsx"
//@include "../../utjsx/$path.jsx"

function playAudio(pp){    
    
    File(Folder.temp.fsName + "/ply.pyw").$create([
        
        "from playsound import playsound",
        "playsound(r\"" + new Path(pp).py() + "\")"
    
    ].join("\n")).$execute(100,function(){
        this.remove();
    });

}

playAudio("d:/Cache/sound/sound.mp3");
