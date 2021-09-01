



File.prototype.getDuration = function(){
    if(!this.exists) return 0;
    k = app.project.importFile(new ImportOptions(this));
    d = k.duration;
    k.remove();
    return d;
}

af = new File("/d/Cache/exp/00020.jpg");
$.writeln(af.getDuration())

$.writeln("thisname.me.jpeg".replace(/.[^.]+$/, ""));

// f = File("/d/media/Memes/r54.mp4");
// $.writeln(f)

// audioPath = "d:\\\\Cache\\sound\\sound.mp3";

// var ff = File(File($.fileName).parent.fsName + "/testaudio.pyw");
//     ff.open("w");
//     ff.write(
//         ["from playsound import playsound",
//         "playsound(r\""+audioPath+"\")"
//         ].join("\n")
//     );
//     ff.close();
//     ff.execute();
//     app.setTimeout(function(){
//         ff.remove()
//     }, soundtracklength)