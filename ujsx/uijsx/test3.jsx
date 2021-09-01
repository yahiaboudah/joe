

// File.CATEGORIES = [
//     "WEB",
//     "CODE",
//     "IMAGE",
//     "VIDEO",
//     "ARCHIV",
//     "TEXT",
//     "AUDIO",
//     "UNKNOWN"
// ]

// File.TYPES_BY_CATEGORY  = {0:"css less scss wasm ",6:"aac aiff ape au flac gsm it m3u m4a mid mod mp3 mpa pls ra s3m sid wav wma xm ", 1:"c cc class clj cpp cs cxx el go h java lua m m4 php pl po py pyw rb rs swift vb vcxproj xcodeproj xml diff patch html js jsx ","slide":"ppt odp ","sheet":"ods xls xlsx csv ics vcf ",2:"3dm 3ds max bmp dds gif jpg jpeg png psd xcf tga thm tif tiff ai eps ps svg dwg dxf gpx kml kmz webp ",4:"7z a apk ar bz2 cab cpio deb dmg egg gz iso jar lha mar pea rar rpm s7z shar tar tbz2 tgz tlz war whl xpi zip zipx xz pak ","book":"mobi epub azw1 azw3 azw4 azw6 azw cbr cbz ",5:"doc docx ebook log md msg odt org pages pdf rtf rst tex txt wpd wps ","exec":"exe msi bin command sh bat crx ","font":"eot otf ttf woff woff2 ",3:"3g2 3gp aaf asf avchd avi drc flv m2v m4p m4v mkv mng mov mp2 mp4 mpe mpeg mpg mpv mxf nsv ogg ogv ogm qt rm rmvb roq srt svi vob webm wmv yuv "};
// File.TYPES_BY_EXTENSION = {"ogm":3,"doc":5,"class":1,"js":1,"swift":1,"cc":1,"tga":2,"ape":6,"woff2":"font","cab":4,"whl":4,"mpe":3,"rmvb":3,"srt":3,"pdf":5,"xz":4,"exe":"exec","m4a":6,"crx":"exec","vob":3,"tif":2,"gz":4,"roq":3,"m4v":3,"gif":2,"rb":1,"3g2":3,"m4":1,"ar":4,"vb":1,"sid":6,"ai":2,"wma":6,"pea":4,"bmp":2,"py":1,"mp4":3,"m4p":3,"ods":"sheet","jpeg":2,"command":"exec","azw4":"book","otf":"font","ebook":5,"rtf":5,"ttf":"font","mobi":"book","ra":6,"flv":3,"ogv":3,"mpg":3,"xls":"sheet","jpg":2,"mkv":3,"nsv":3,"mp3":6,"kmz":2,"java":1,"lua":1,"m2v":3,"deb":4,"rst":5,"csv":"sheet","pls":6,"pak":4,"egg":4,"tlz":4,"c":1,"cbz":"book","xcodeproj":1,"iso":4,"xm":6,"azw":"book","webm":3,"3ds":2,"azw6":"book","azw3":"book","php":1,"kml":2,"woff":"font","log":5,"zipx":4,"3gp":3,"po":1,"mpa":6,"mng":3,"wps":5,"wpd":5,"a":4,"s7z":4,"ics":"sheet","tex":5,"go":1,"ps":2,"org":5,"sh":"exec","msg":5,"xml":1,"cpio":4,"epub":"book","docx":5,"lha":4,"flac":6,"odp":"slide","wmv":3,"vcxproj":1,"mar":4,"eot":"font","less":0,"asf":3,"apk":4,"css":0,"mp2":3,"odt":5,"patch":1,"wav":6,"msi":"exec","rs":1,"gsm":6,"ogg":3,"cbr":"book","azw1":"book","m":1,"dds":2,"h":1,"dmg":4,"mid":6,"psd":2,"dwg":2,"aac":6,"s3m":6,"cs":1,"cpp":1,"au":6,"aiff":6,"diff":1,"avi":3,"bat":"exec","html":1,"pages":5,"bin":"exec","txt":5,"rpm":4,"m3u":6,"max":2,"vcf":"sheet","svg":2,"ppt":"slide","clj":1,"png":2,"svi":3,"tiff":2,"tgz":4,"mxf":3,"7z":4,"drc":3,"yuv":3,"mov":3,"tbz2":4,"bz2":4,"gpx":2,"shar":4,"xcf":2,"dxf":2,"jar":4,"qt":3,"tar":4,"xpi":4,"zip":4,"thm":2,"cxx":1,"3dm":2,"rar":4,"md":5,"scss":0,"mpv":3,"webp":2,"war":4,"pl":1,"xlsx":"sheet","mpeg":3,"aaf":3,"avchd":3,"mod":6,"rm":3,"it":6,"wasm":0,"el":1,"eps":2}

// File.prototype.getType = function(){

//     xt = this.name.replace(/^.*\./,"").toLowerCase();
//     tp = File.TYPES_BY_EXTENSION[xt] || 7;
//     nm = File.CATEGORIES[tp].toLowerCase();

//     return nm;
// }

// af = new File("D:/Cache/sound/sound.itss");
// $.writeln(af.getType())

File.prototype.getDuration = function(){
    if(!this.exists) return 0;
    k = app.project.importFile(new ImportOptions(this));
    d = k.duration;
    k.remove();
    return d;
}

// af = new File("/d/Cache/exp/00020.jpg");
// $.writeln(af.getDuration())

// $.writeln("thisname.me.jpeg".replace(/.[^.]+$/, ""));

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