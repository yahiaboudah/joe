
app.importOptions = function(){
    opts = new ImportOptions();
    opts.file = cfg.file;
    opts.importAs = cfg.importAs;
}

app.import = function(fp){ 
    return app.project.importFile(app.importOptions({
        file: new File(fp),
        importAs: ImportAsType.FOOTAGE
    }));
}

app.mostRecent = function(dp, typ){

    var fs = Folder(fp).getFiles(typ || "*"),
        re = fs[0],
        i  = -1;
    
    if(!re) return;
    for(;++i<fs.length;) if(fs[i].modified>re.modified) re = fs[i];
    
    return re;
}

app.getExpression = function(ftName, typ){
    
    return (function(){

        var m = thisLayer.marker;
        var t = time;
        var i = m.nearestKey(time).index;
    
        if(m.nearestKey(t).time>t){ i--; } //if: |  <>
        i || (i = 1);
    
        var obj = footage(footageName).sourceData;

        obj[i][type];    
    }).body().replace("footageName", ftName).replace("type", typ);
}

app.makeAnimMarkers(animObj){
    
    var anim = "",
        dura = 0,
        coms = [],
        durs = [],
        i = 0;
    
    for(;++i<animObj.length;){
      anim = animObj[i]['Animation'];
      coms.push("Scene " + i);
      dur += (animObj[i-1]["Duration"]) || 0;
      durs.push(dur);

    }
    return [times,comments];
}

