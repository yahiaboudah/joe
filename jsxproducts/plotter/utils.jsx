
MATCH_NAMES = {
  
    ELLIPSE: "ADBE Vector Shape - Ellipse",
    ELLIPSE_SIZE: "ADBE Vector Ellipse Size",
  
    FILL: "ADBE Vector Graphic - Fill",
    FILL_COLOR: "ADBE Vector Fill Color",
    FILL_OPACITY: "ADBE Vector Fill Opacity",
    
    STROKE: "ADBE Vector Graphic - Stroke",
    STROKE_COLOR: "ADBE Vector Stroke Color",
    STROKE_WIDTH: "ADBE Vector Stroke Width",
  
    TEXT_ANIMATOR: "ADBE Text Animator",
    TEXT_ANIMATOR_PROPS: "ADBE Text Animator Properties",
    TEXT_FILL_COLOR: "ADBE Text Fill Color",
  
    GROUP: "ADBE Vector Group",
    VECTORS_GROUP:"ADBE Vectors Group",
    PATH: "ADBE Vector Shape - Group",
  
    TRIM: "ADBE Vector Filter - Trim",
    TRIM_START: "ADBE Vector Trim Start",
    TRIM_END: "ADBE Vector Trim End",
    TRIM_OFFSET: "ADBE Vector Trim Offset",
}

Object.extend  = function(oo, newstuff){ for(k in newstuff) if(newstuff.hasOwnProperty(k)) oo[k] = newstuff[k]; }

function $Shape(cfg){ Object.extend(this, cfg)}

$Shape.prototype.shape = function(){
    
    var shape = new Shape();

    shape.inTangents  = this.inTangents;
    shape.outTangents = this.outTangents;
    shape.vertices    = this.vertices;
    shape.closed      = this.closed;

    return shape;
}

String.prototype._replace = function(repCfg){
    
    var str = this;
    for(x in repCfg) if(repCfg.hasOwnProperty(x))
    {
        str = str.split(x).join(repCfg[x])
    }
    return str;
}

Function.prototype.body = function(){
    return this.toString()
    .replace(/^[^{]*\{[\s]*/,"    ")
    .replace(/\s*\}[^}]*$/,"")._replace(repConfig || {});
}

ShapeLayer.prototype.addStroke = function(swv, scv, expr){

    var layer = this;
    
    if(typeof layer == "undefined") throw Error("Select a shape!");
    if(typeof swv   == "undefined") swv  = 10;
    if(typeof scv   == "undefined") scv  = [70,120,210,1]
    if(typeof expr  == "undefined") expr = false;

    var s  = layer.content.addProperty(MATCH_NAMES.STROKE),
        sw = s.property(MATCH_NAMES.STROKE_WIDTH);
        sc = s.property(MATCH_NAMES.STROKE_COLOR);
    
    if(!expr) return (sw.setValue(swv), sc.setValue(scv), layer)
    
    layer.addProp("Effects/Slider Control:StrokeWidthControl");
    sw.expression = (function(){
      
      fkt = effect("StrokeWidthControl")("Slider").value; 
      fkt || $strokeVal;

    }).body({$strokeVal: 6})

    return 1;
  
}

AVLayer.prototype.addProp = function(propPath){
        
    var props = propPath.split("/");
    var lastProp  = props[props.length-1].split(':');
    var layer = this;

    props[props.length-1] = lastProp[0];
    var name = lastProp[1]; 

    currProp = layer;
    for(i in props) if(props.hasOwnProperty(i))
    {
        currProp = currProp.hasOwnProperty(props[i])?
                   currProp.property(props[i]):
                   currProp.addProperty(props[i]);
    }

    if(!!name) currProp.name = name;
    return currProp;
}

AVLayer.prototype.getProp = function(propPath){
    
    var props = propPath.split("/");
    var layer = this;

    currProp = layer;
    for(i in props) if(props.hasOwnProperty(i))
    {
        currProp = currProp.hasOwnProperty(props[i])?
                   currProp.property(props[i]):0;
        
        if(!currProp) return undefined;
    }

    return currProp;
}

Window.prototype.addAnimatedSequence = function(imgSeqPath, firstImageIdx)
{
    var gif = this.add('image');

    gif.imgSeq = Folder(imgSeqPath).getFiles().sort(function(x,y){
        
        x = parseInt(x.displayName.split('.')[0], 10);
        y = parseInt(y.displayName.split('.')[0], 10);
        
        return x > y
    });
    gif.idx = 0;
    gif.max = gif.imgSeq.length;
    
    //stop
    gif.addEventListener('mouseout', function(){
        
        if(this.delay)
        {
            app.cancelTimeout(this.delay);
            this.idx  = firstImageIdx;
            this.icon = ScriptUI.newImage(this.imgSeq[this.idx]);
        }
        
    });

    //play
    gif.addEventListener('mouseover',function(){
        
        var e = this;
        var c = callee;

        e.idx = (e.idx + 1) % e.max; //% for reset
        e.icon = ScriptUI.newImage(e.imgSeq[e.idx]);
    
        e.delay = app.setTimeout(function() {
            c.call(e);
        }, 2);
    });

    // gif.addEventListener("mousedown", function(){
    // 	alert(this.imgSeq.toSource());
    // })

    gif.icon = ScriptUI.newImage(gif.imgSeq[firstImageIdx]);

    return gif;
}