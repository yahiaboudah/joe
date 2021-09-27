
//@include "c:/oi/joe/jsx/utjsx/$fstring.jsx"
//@include "c:/oi/joe/jsx/utjsx/$file.jsx"

function playAudio(pp, dt){    

    File("{0}\\ply.pyw".f(Folder.desktop.fsName)).$create([
        
        "from pygame import mixer",
        "from time import sleep",

        "mixer.init()",
        "mixer.music.load(\"{0}\")".f(pp),
        "mixer.music.play()",
        "sleep({0})".f(dt),
        "mixer.music.stop()"
            
    ].join("\n")).$execute(200,function(){
        this.remove();
    });

}

playAudio("d:/media/sound.mp3", 2);