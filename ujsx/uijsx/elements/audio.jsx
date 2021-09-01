//@include "../../utjsx/$file.jsx"

pp = "d:\\\\Cache\\sound\\sound.mp3";

function playAudio(audioPath){    
    
    File(Folder.temp + "/ply.pyw").$create([
        
        "from playsound import playsound",
        "playsound(r\""+audioPath+"\")"
    
    ].join("\n")).$execute(100,1,function(){
        this.remove();
    });
}

playAudio(pp);