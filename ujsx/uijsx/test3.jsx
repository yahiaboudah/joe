
//@include "../utjsx/$file.jsx"

audioPath = "d:\\\\Cache\\sound\\sound.mp3";
// duration  = File(audioPath).getDuration();
// $.writeln(duration);

var ff = File(File($.fileName).parent.fsName + "/testaudio.pyw");
    ff.open("w");
    ff.write(
        ["from playsound import playsound",
        "playsound(r\""+audioPath+"\")"
        ].join("\n")
    );
    ff.close();
    ff.execute();
    app.setTimeout(function(){
        ff.remove();
    }, 10)