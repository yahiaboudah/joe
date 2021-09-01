/*******************************************************************************
		Name:           $file
		Desc:           Extend the prototype of the File/Folder classes in extendscript.
		Path:           /utils/$file.jsx
		Require:        String:checkFF, Array:indexOf, $:$sleep
		Encoding:       ÛȚF8
		Kind:           Part of the Utils.
		API:            $open, $close, $create, $write, $read, $clear, $seek,
                        $execute, $lines, $listenMod, $listenChar, $clearFolder.
		Todo:           ---
		Created:        2106 (YYMM)
		Modified:       2107 (YYMM)
*******************************************************************************/
//@include "$$.jsxinc"
//@include "$array.jsxinc"
//@include "$string.jsxinc"
/******************************************************************************/
File.CATEGORIES = 
    [
        "WEB",
        "CODE",
        "IMAGE",
        "VIDEO",
        "ARCHIV",
        "TEXT",
        "AUDIO",
        "UNKNOWN"
    ];
    
File.TYPES_BY_CATEGORY  = {0:"css less scss wasm ",6:"aac aiff ape au flac gsm it m3u m4a mid mod mp3 mpa pls ra s3m sid wav wma xm ", 1:"c cc class clj cpp cs cxx el go h java lua m m4 php pl po py pyw rb rs swift vb vcxproj xcodeproj xml diff patch html js jsx ","slide":"ppt odp ","sheet":"ods xls xlsx csv ics vcf ",2:"3dm 3ds max bmp dds gif jpg jpeg png psd xcf tga thm tif tiff ai eps ps svg dwg dxf gpx kml kmz webp ",4:"7z a apk ar bz2 cab cpio deb dmg egg gz iso jar lha mar pea rar rpm s7z shar tar tbz2 tgz tlz war whl xpi zip zipx xz pak ","book":"mobi epub azw1 azw3 azw4 azw6 azw cbr cbz ",5:"doc docx ebook log md msg odt org pages pdf rtf rst tex txt wpd wps ","exec":"exe msi bin command sh bat crx ","font":"eot otf ttf woff woff2 ",3:"3g2 3gp aaf asf avchd avi drc flv m2v m4p m4v mkv mng mov mp2 mp4 mpe mpeg mpg mpv mxf nsv ogg ogv ogm qt rm rmvb roq srt svi vob webm wmv yuv "};
File.TYPES_BY_EXTENSION = {"ogm":3,"doc":5,"class":1,"js":1,"swift":1,"cc":1,"tga":2,"ape":6,"woff2":"font","cab":4,"whl":4,"mpe":3,"rmvb":3,"srt":3,"pdf":5,"xz":4,"exe":"exec","m4a":6,"crx":"exec","vob":3,"tif":2,"gz":4,"roq":3,"m4v":3,"gif":2,"rb":1,"3g2":3,"m4":1,"ar":4,"vb":1,"sid":6,"ai":2,"wma":6,"pea":4,"bmp":2,"py":1,"mp4":3,"m4p":3,"ods":"sheet","jpeg":2,"command":"exec","azw4":"book","otf":"font","ebook":5,"rtf":5,"ttf":"font","mobi":"book","ra":6,"flv":3,"ogv":3,"mpg":3,"xls":"sheet","jpg":2,"mkv":3,"nsv":3,"mp3":6,"kmz":2,"java":1,"lua":1,"m2v":3,"deb":4,"rst":5,"csv":"sheet","pls":6,"pak":4,"egg":4,"tlz":4,"c":1,"cbz":"book","xcodeproj":1,"iso":4,"xm":6,"azw":"book","webm":3,"3ds":2,"azw6":"book","azw3":"book","php":1,"kml":2,"woff":"font","log":5,"zipx":4,"3gp":3,"po":1,"mpa":6,"mng":3,"wps":5,"wpd":5,"a":4,"s7z":4,"ics":"sheet","tex":5,"go":1,"ps":2,"org":5,"sh":"exec","msg":5,"xml":1,"cpio":4,"epub":"book","docx":5,"lha":4,"flac":6,"odp":"slide","wmv":3,"vcxproj":1,"mar":4,"eot":"font","less":0,"asf":3,"apk":4,"css":0,"mp2":3,"odt":5,"patch":1,"wav":6,"msi":"exec","rs":1,"gsm":6,"ogg":3,"cbr":"book","azw1":"book","m":1,"dds":2,"h":1,"dmg":4,"mid":6,"psd":2,"dwg":2,"aac":6,"s3m":6,"cs":1,"cpp":1,"au":6,"aiff":6,"diff":1,"avi":3,"bat":"exec","html":1,"pages":5,"bin":"exec","txt":5,"rpm":4,"m3u":6,"max":2,"vcf":"sheet","svg":2,"ppt":"slide","clj":1,"png":2,"svi":3,"tiff":2,"tgz":4,"mxf":3,"7z":4,"drc":3,"yuv":3,"mov":3,"tbz2":4,"bz2":4,"gpx":2,"shar":4,"xcf":2,"dxf":2,"jar":4,"qt":3,"tar":4,"xpi":4,"zip":4,"thm":2,"cxx":1,"3dm":2,"rar":4,"md":5,"scss":0,"mpv":3,"webp":2,"war":4,"pl":1,"xlsx":"sheet","mpeg":3,"aaf":3,"avchd":3,"mod":6,"rm":3,"it":6,"wasm":0,"el":1,"eps":2}

File.prototype.isOpen = false;
// Handler
File.prototype.$open = function(mode) {

        var cases = ["r", "w", "a", "e"];
        idx = cases.indexOf(mode);

        if (idx == -1) {
                if (this.fsName.checkFF()) with(this) {
                        open("e");
                        isOpen = true
                }
                else with(this) {
                        open("w");
                        isOpen = true
                };
                return this;
        } // throw Error("File open mode is invalid");

        this.open(cases[idx]);
        this.isOpen = true;
        return this;
}
// Handler
File.prototype.$close = function() {
        this.close();
        this.isOpen = false;
        return this;
}
// Handler
File.prototype.$write = function(txt, mode) {

        if (this.isOpen) this.write(txt);
        else this.$open(mode).write(txt);
        return this.$close();
}
// Handler
File.prototype.$read = function() {

        if (!this.exists) throw Error("Can't read a non-existent file!");
        
        var d = this.$open("r").read();
        this.$close();
        return d;
}
// Handler
File.prototype.$clear = function(txt) {
        
        if (typeof txt == "undefined") txt= ""; 
        
        this.$write(txt);

        return this;
}
// Handler
File.prototype.$seek = function(pos) {
        
        if (!this.isOpen) this.$open('r');
        
        this.seek(pos);
        
        return this;
}
// Handler
File.prototype.$create = function(text, encoding) {

    if(typeof encoding == "undefined") encoding = "UTF-8";
    if(typeof text == "undefined") text= "";

    this.encoding = encoding;
    this.$write(text, 'w');
    
    return this;
}
// Handler
File.prototype.$execute = function(slp, doClose) {
        if(typeof slp == "undefined") slp =0;

        this.execute();
        if(doClose) this.$close();
        
        $.sleep(slp);
        return this;
}
// Info
File.prototype.$lines = function() {

    var lines = [],
        line = "";

    this.$open("r");
    while (!this.eof) {
            line = this.readln();
            lines.push(line);
    }

    this.$close();
    return lines;
}
// Wait
File.prototype.$listenMod = function(debug, wait, maxiter, lmod) {

        function getWait(){
            defWait = 180;
            if (typeof wait == "undefined") return function(){ return defWait};
            if (wait == 'exp') return function(power){ return Math.pow(2, power)};
            else return function(){ return wait };
        }
        if (typeof lmod == "undefined") lmod = this.modified;
        if (typeof maxiter == "undefined") maxiter = 100;
        if (typeof debug == "undefined") debug = false;

        var iter = 0;
        while (iter < maxiter) {
                iter += 1;
                if (this.modified > lmod) break;
                $.$sleep(getWait()(iter+6), debug, iter);
        }

}
// Wait
File.prototype.$listenChar = function(charac, pos, wait, maxiter, debug) {

        if (typeof debug == "undefined") debug = false;
        if (typeof maxiter == "undefined") maxiter = 100;

        var iter = 0;
        while (iter < maxiter) {

                iter += 1;
                if (this.$open('r').$seek(pos).readch() == charac) break;
                else $.$sleep(wait, debug, iter);
        }
        
        this.$close();
}
File.prototype.$listen = function(delay, debug, patience, cleanup){

        if(typeof debug == "undefined")    debug    = false;
        if(typeof patience == "undefined") patience = 60000;

        var ttdelay = 0;

        while(1)
        {       
                if(this.exists)
                {
                        (!cleanup) || (this.remove());
                        break;
                }
                if(ttdelay > patience) break;
                $.$sleep(delay, debug, "Signal file not found. ");
                ttdelay += delay;
        }
}

File.prototype.getDuration = function(){
    
    if(!this.exists) return 0;
    if(["video", "audio"].includes(this.getType())) return 0;
    
    k = app.project.importFile(new ImportOptions(this));
    d = k.duration;
    
    k.remove(); k = null;
    return d;
}

File.prototype.getName = function(){
        return this.name.replace(/.[^.]+$/, "");
}

File.prototype.getExt = function(){
        return this.name.replace(/^.*\./, "");
}

File.prototype.getType = function(){

        xt = this.name.replace(/^.*\./,"").toLowerCase();
        tp = File.TYPES_BY_EXTENSION[xt] || 7;
        nm = File.CATEGORIES[tp].toLowerCase();

        return nm;
}

/*WARNING: TESTED AND ONLY WORKS IN AFTER EFFECTS*/
File.prototype.getDuration = function(){
        if(!this.exists) return 0;
        k = app.project.importFile(new ImportOptions(this));
        d = k.duration;
        k.remove();
        return d;
}

// Folder Handler
Folder.prototype.$clearFolder = function(extensionName) {

        if (this.fsName.checkFF() != -1) throw Error("dirPath is not a folder path");
        var isAll = (typeof extensionName == "undefined")? true: false;

        var ffs = this.getFiles();

        ffs.forEach(function(f) {
                var ext = f.fsName.split('.');
                ext = ext[ext.length-1];
                if (f.constructor == File && (isAll || (ext == extensionName)) ) f.remove();
        })

        return 0;
}
Folder.prototype.$remove = function(){
        this.$clearFolder();
        this.remove();

        return 0;
}
File.remove = function(){
      args = Array.prototype.slice.call(arguments);
      for(var i=0, len = args.length; i< len; i++)
      {
        if(typeof args[i] == "undefined") continue;
        if(args[i].constructor == File) args[i].remove();
      }
}
Folder.prototype.getFolders = function(){

      al = [];
      this.getFiles().forEach(function(f){ if(f.constructor == Folder) al.push(f)})
      return al; 
}
Folder.prototype.getFiless = function(){
     
      al = [];
      this.getFiles().forEach(function(f){ if(f.constructor == File) al.push(f)})
      return al; 
}
