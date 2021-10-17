/***********************************************************************************
		Name:           xto
		Desc:           A small utility framework for Extendscript and AE.
		Created:        2110 (YYMM)
		Modified:       2110 (YYMM)
        
    =================================== XTO ========================================
                        
                                ██╗  ██╗████████╗ ██████╗ 
                                ╚██╗██╔╝╚══██╔══╝██╔═══██╗
                                ╚███╔╝    ██║   ██║   ██║
                                ██╔██╗    ██║   ██║   ██║
                                ██╔╝ ██╗   ██║   ╚██████╔╝
                                ╚═╝  ╚═╝   ╚═╝    ╚═════╝ 
    (                                                                              (
    (((((((((((((((((((((((((((((((((((***********((((((((((((((((((((((((((((((((((
    ((                       ,*(((((((((((((((((((((((((((*                        (
    ((                  ,(((((((*.        ((((         .*((((((/.                  (
    ((              .(((((/.              ((((               ,(((((/               (
    ((            (((((                   ((((                   ,(((((            (
    ((         *(((/                      ((((                       ((((*         (
    ((       ((((,                        ((((                         *(((/       (
    ((     /(((.                          ((((                           ,(((*     (
    ((   ,(((*%%%%%%%%%%%%%%%             ((((             .%%%%%%%%%%%%%%%*(((    (
    ((  *(((%%%%%%%%%%%%%%%%%             ((((             .%%%%%%%%%%%%%%%%%(((*  (
    (( /((/%%%%%%%%%%%%%%%%%%             ((((             .%%%%%%%%%%%%%%%%% (((* (
    ((*((/ %%%%%%%%%%%%%%%%%%             ((((             .%%%%%%%%%%%%%%%%%  (((*(
    (*(((  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%((((%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%   (((/
    ((((,                %%%%%%%%%%%%%%%%%((((%%%%%%%%%%%%%%%%%                 *((/
    *(((                 %%%%%%%%%%%%%%%%%((((%%%%%%%%%%%%%%%%%                  (((
    *((/                 %%%%%%%%%%%%%%%%%%((%%%%%%%%%%%%%%%%%%                  (((
    *(((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((
    *((/                        %%%%%%%%%%%#(%%%%%%%%%%%%                        (((
    *(((          %%%%%%%%%%%%%%%%%%%%%%%%((((%%%%%%%%%%%%%%%%%%%%%%%%%          (((
    ((((,         %%%%%%%%%%%%%%%%%%%%%%%%((((%%%%%%%%%%%%%%%%%%%%%%%%%         *((/
    (/(((         %%%%%%%%%%%%%%%%%,      ((((       %%%%%%%%%%%%%%%%%%         ((((
    ((*(((        %%%%%%%%%%%%%%%%%,      ((((       %%%%%%%%%%%%%%%%%%******  (((*(
    (( *(((%%%%%%%%%%%%%%%%%%%%%%%%,      ((((       %%%%%%%%%%%%%%%%%%%%%%%%.(((* (
    ((  *(((%%%%%%%%%%                    ((((                     %%%%%%%%%%(((*  (
    ((   .((((%%%%%%%%                    ((((                     %%%%%%%%((((    (
    ((     *(((,                          ((((                           *(((*     (
    ((       /(((*                        ((((                         *(((*       (
    ((         *((((                      ((((                      *((((*         (
    ((            (((((,                  ((((                   *((((/            (
    ((               /(((((,              ((((               *(((((*               (
    ((                   /((((((/*        ((((         *(((((((*                   (
    ((                        *((((((((((((((((((((((((((/,                        (
    ((((((((((((((((((((((((((((((((((((***********(((((((((((((((((((((((((((((((((
    
************************************************************************************/
/**********************************************************************************/

(function(H, S)
{

    TODO = 
    [
        "Object.getKeyByValue",
        "Object.getKeysByValue",
        "ShapeLayer.prototype.reverseEngineer",
        "ShapeLayer.prototype.clone",
        "Object.getPrototypeOf",
        "$.ser",
        "$.deser"
    ]
    
    YOLO = "youwillneverguessthispassword"; 
    H[S] = S;

    // BY-DEFAULT: load the BASC functions when XTO is included:
    //-----------------------------
    FUNS["BASC"].call($.global);//|
    //-----------------------------

    S.xt({

        version: '1.0.0',

        // [GETTERS]
        functionsOf: function(what)
        {
            if(!(efun = EXTO[what])) return;
            var arr  = [];

            for(var i=0; i< efun.length; i++)
            {
                curr = efun[i];
                curr = (curr[0] == '-')? curr.shift(): curr;
                jcur = [something, efun[i]].join('.');
    
                arr.push(jcurr);
            }

            return arr;
        },
        functions: function()
        {
            var arr = [];
            for(x in EXTO) if(x.in(EXTO))
            {
                Array.prototype.push.apply(arr, S.functionsOf(x));
            }
            return arr;
        },
        // [GETTERS]

        // [LOADERS]
        load: function(what)
        {
            if(what != '*')
            {
                if(!(fun = FUNS[what])) return;
                fun.call($.global);
            }

            for(fun in FUNS) if(fun.in(FUNS))
            {
                FUNS[fun].call($.global);
            }
        },
        unload: function(what)
        {
            var a     = (what == '*');
            var funcs = a? S.functions(): S.functionsOf(what);
            var i     = funcs.length;

            while(--i) eval("delete(" + funcs[i] + ")");

            (!a || (eval(what + "=null;")))
        },
        // [LOADERS]
        code: function(what, where)
        {
            if(!(fun = FUNS[what])) return;

            var callerFile = File(File($.stack).fsName || where);
            
            callerFile.open("a");
            callerFile.write([
                
                "\n\n\n\n",
                "var " + what.split('.').join('') + "= ",
                fun.toString()
    
            ].join(""));
            return callerFile.close();
        },
        update: function(pass, what, fn)
        {
            if(
                   (pass !== YOLO)
                || (!EXTO[what])
                || fn.isnt(Function)
            ) return;
    
            EXTO[what] = fn;
        }
    })

    EXTO = 
    {
        BASC: 
        {
            Object_prototype:
            [
                "is",
                "in",
                "re",
                "xt"
            ]
        },

        $$$$: 
        {
            DATA:
            [
                "log",
                "ser",
                "deser",
                "http"
            ],

            DBUG:
            [
                "inside",
                "scan",
                "inspect",
            ],

            MISC:
            [
                "/colorPicker",
                "/sleep",
                "getClipbaord", "setClipboard", "clearClipboard",
                "cmd", "wget"
            ]
        },

        PRIM:
        {
            String_prototype:
            [
                "inspectFF", "checkFF",
                "startsWith", "padding",
                "replaceSeq", "fstr", "_replace",
                "title", "trim", "pushAt",
                "*"
            ],

            Array:
            [
                "range",
                "oneDimIndexFunc", "twoDimIndexFunc"
            ],

            Array_prototype:
            [
                "forEach", "forEvery",
                "indexOf", "remove", "includes", 
                "rotate", 
                "reduce", "map", 
                "fliter", "select",
    
                "max", "min", "sortedIndices", "math2D", "sum",
    
                "upIndex", "bottomIndex", "leftIndex", "rightIndex",
                "upperLeftIndex", "upperRightIndex", "bottomRightIndex", "bottomLeftIndex",
    
                "+", "-", "*", "/", "^"
            ],

            Function_prototype:
            [
                "bind",
                "body",
                "time",
                "getArgs",
                "params",
                "check"
            ],

            Number_prototype:
            [
                "isOdd", "isEven",
                "floor", "ceiling"
            ],

            Object:
            [
                "keys", "newKeys", "extend", "size",
                "dcKeys", "validate", "validateKeys",
                "modify", "getValue",
                "print", "write", 
                "typeof",
                "create",
                "getPrototypeOf", 
                "newObject", "fromEntries",
                "has", "inspect"
            ]
        },

        DATA:
        {
            File_prototype:
            [
                "-isOpen",
                "/open", "/write", "/read", "/close", "clear",
                "/seek", "create",
                "/execute",
                "lines",
                
                "listenForChange", "listenForChar", "listen",
    
                "getDuration", "getName", "getExtension", "getType"
            ],

            Folder_prototype:
            [
                "clearFolder", "/remove",
                "getFolders", "/getFiles"
            ],

            Socket_prototype:
            [
                ""
            ]
        },

        AFFX:
        {
            $global:
            [
                "MATCH_NAMES",
                "AECMD"
            ],

            app:
            [
                "wrapUndo",
                "doUndo",
            ],

            CompItem_prototype:
            [
                "setResolution", "getResolution",
                "getLayersWith", "numLayersWithName",
                "snap",
                "sel",
                "setTime",
                "workAreaDomain"
            ],

            ItemCollection_prototype:
            [
                "toArray", "grab"
            ],

            LayerCollection_prototype:
            [
                "toArray", "grab"
            ],

            AVLayer_prototype:
            [
                "addProp", "getProp", "removeProp"
            ],

            ShapeLayer_prototype:
            [
                "addProp", "getProp", "removeProp",
                "alpha",
                "area", "areas",
                "distances",
                "moveFirstVertex",
                "grabProps",
    
                "stroke", "fill"
            ],

            PropertyGroup_prototype:
            [
                "is", "isnt",
                "containingComp",
                "properties",
                "moveFirstVertex", "mFirstIndex",
                "$nearestKeyIndex"
            ],

            TextLayer_prototype:
            [
                "style"
            ],
        },

        SCUI:
        {
            Window_prototype:
            [
                "addAnimatedSequence"
            ]
        },

        CSTR:
        {
            Table:
            [            
                "-fNamePatt", "process", "removeAll",
                "prototype.toString",
                "prototype.getMaxRowSizes", "prototype.maxColumnSizes",
                "prototype.format", "prototype.render",
                "prototype.write", "prototype.show"
            ],

            Path:
            [
                "prototype.py",
                "prototype.resolve",
                "prototype.exists", "prototype.mkdir",
                "prototype.toString",
                "prototype[\'/\']"
            ],

            Python:
            [
                "installed",

                "-execStr",
                "-execPath",
                "-extensions",
                
                "prototype.execTime",
                "prototype.functions",
                
                "prototype.makeExec",
                "prototype.viewExec",
                "prototype.editExec",
                "prototype.runExec",
                
                "prototype.install",
                "prototype.repair",
                "prototype.uninstall",
                
                "prototype.call",
                "prototype.contact",
                "prototype.build",               
            ],

            FileInterface:
            [
                "prototype.validate",
                "prototype.make",
                "prototype.set",
                "prototype.get",
                "prototype.modify",
                "prototype.post",
                "prototype.crop" 
            ],

            Logger:
            [
                "prototype.debug",
                "prototype.info",
                "prototype.warning",
                "prototype.error",
                "prototype.critical"
            ]
        },

        WRPR:
        {
            SShape:
            [
                ""
            ],

            TTextLayer:
            [
                ""
            ],

            WWindow:
            [
                ""
            ]
        }
    }

    FUNS = 
    {

        //********************* *******/
        //*********** BASC ***********/

        BASC: (function()
        {    

            delete(Object.prototype.in);
            Object.prototype.in = function(oo)
            {
                switch(oo.constructor)
                {
                    case Object:
                        return oo.hasOwnProperty(this);
                }
            }

            delete(Object.prototype.re);
            Object.prototype.re = function(/*reps*/)
            {
                // get reps, convert to string:
                var fargs = Array.prototype.slice.call(arguments);
                for(var g = -1; ++g<fargs.length;) fargs[g] = fargs[g].toString();
            
                var ff = 
                {
                    pat: function(k)
                    // the pattern to look for:
                    {
                        return RegExp("\\{" + k + "\\}", "gi");
                    },
            
                    str: function(ss, argsArr)
                    {
                        var i = -1;
            
                        while(++i <argsArr.length) ss = ss.replace(this.pat(i), argsArr[i]);
                        return ss;
                    },
            
                    obj: function(oo, argsArr)
                    {
                        var newo = {Array: [], Object: {}}[oo.constructor.name],
                            k;
                        
                        for(x in oo) if(oo.hasOwnProperty(x))
                        {
                            k = oo[x];
                            switch (k.constructor)
                            {   
                                case String:
                                    newo[x] = ff.str(k, argsArr);
                                    break;
            
                                case Object:
                                case Array:
                                    newo[x] = ff.obj(k, argsArr);
                                    break;
            
                                default: 
                                    newo[x] = k;
                                    break;
                            }
                        }
            
                        return newo;
                    }
                }
            
                switch (this.constructor)
                {
                    case String:
                        return ff.str(this, fargs);
            
                    case Object:
                    case Array:
                        return ff.obj(this, fargs);
            
                    default: return this;
                }
            }
            
            delete(Object.prototype.xt);
            Object.prototype.xt = function(oo)
            {
                for(x in oo) if(oo.hasOwnProperty(x)) this[x] = oo[x];
            }
            
            delete(Object.prototype.is);
            Object.prototype.is = function()
            {
                var _args = Array.prototype.slice.call(arguments), i = -1;
                var what = this.constructor;
            
                while(++i<_args.length) if(what == _args[i]) return true;
            
                return false;
            }
            
        }),

        //**************************** */
        //*************************** */

        //---------- $$$$ -------------
        $$$$$DATA: (function(){

            $.xt({
                
                clipboardLibFile: false,
                clipboardLib : 0,

                ser: function(type)
                {
                    if(typeof type == "undefined") type = "JSON";
                    if(type != "JSON") return;
                },

                deser: function(type)
                {
                    if(typeof type == "undefined") type = "JSON";
                    if(type != "JSON") return;
                },

                http: function(type, link, body){

                },

                wget: function(file, link)
                {   // get images from the web with cmd utility: [WGET]    
                    var folder = Folder(File(file).path).fsName.replace(/\\/gi, "/");
                    file = file.replace(/\\/gi, "/");
            
                    system.callSystem("cd {0} & wget -O {1} {2}".re(
                            folder,
                            file,
                            link
                    ));
                },

                getClipboard: function(){
                    
                    var path = Folder.userData + "/xto$clipboard.dll";
                    if(!$.clipboardLibFile)
                    {
                        var ff = File(path);
                        (ff.encoding = "UTF-8", ff.open('w'), ff.write($.clipboardLib), ff.close()); 
                        $.clipboardLibFile = true;
                        $.clipBoardLib = 0;
                    }

                    return (new ExternalObject("lib:" + path)).getClipboard();
                },

                setClipboard: function(){

                    var path = Folder.userData + "/xto$clipboard.dll";
                    if(!$.clipboardLibFile)
                    {
                        var ff = File(path);
                        (ff.encoding = "UTF-8", ff.open('w'), ff.write($.clipboardLib), ff.close()); 
                        $.clipboardLibFile = true;
                        $.clipBoardLib = 0;
                    }

                    return (new ExternalObject("lib:" + path)).setClipboard();
                }
            })
        }),

        $$$$$DEBG: (function(){

            $.xt({

                inside: function(ff)
                {
                    return ($.stack.split("\n")[0] == "[{0}]".re(ff.split("/").pop()));
                },

                sleep: function(ms, msg){
                    
                    if(ms.is(undefined)) return;
                
                    if(msg.is(String)) $.writeln("{0}: Sleeping for {1}..".re(msg, ms))
                    $.sleep(ms);
                },

                log: function(msg)
                {
                    var fn = $.fileName.split("/").pop();
                    var fr = File("{0}/{1}.log".re(Folder(File($.fileName).parent).fsName, fn));
                    return (fr.encoding = "UTF-8", fr.open('a'), fr.write("\n{0}".re(msg)), fr.close())
                },

                inspect: function(){

                },

                scan: function(){

                }
            })

        }),

        $$$$$MISC: (function(){
            
            $.xt({

                colorPicker  : function(rgba)
                {
                    var hx = $.colorPicker();
                    return  rgba?
                            [/*r*/hx >> 16, /*g*/(hx & 0x00ff00) >> 8,/*b*/ hx & 0xff, /*a*/255] /= 255:
                            hx;
                },

                cmd: function(myCommand, sp)
                {
                    var oo = system.callSystem((sp?"cmd /c \"{0}\"":"{0}").f(myCommand));
                    if(typeof sleep == "number") $.sleep(sleep);
                    return oo;
                },
                //===========================================================================
            })
        }),
        //-----------------------------

        //----------- AFFX ------------

        AFFX$$global: (function(){
            
            // AECMD:
            AECMD = 
            {
                SAVE_AS_FRAME: 2104
            };

            // MATCH NAMES:
            MN = 
            {
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
        }),

        AFFX$app: (function(){
            
            app.xt(
            {
                wrapUndo : function(fn, thisArg)
                {
                    var _args = Array.prototype.slice.call(arguments, 2);
                    return function()
                    {
                        app.beginUndoGroup(fn.name);
                        fn.apply(thisArg, _args);
                        app.endUndoGroup();
                    }
                },
              
                doUndo   : function(func, thisArg, sTime)
                {
                    // execute function:
                    app.wrapUndo(
                        func,
                        thisArg || {},
                        Array.prototype.slice.call(arguments, 3)
                    )();
                  
                    // undo with an offset time:
                    app.setTimeout(function(){
                        app.executeCommand(app.findMenuCommandId("Undo " + func.name));
                    }, sTime || 0);
              
                },
            })
        }),
        
        AFFX$CompItem_prototype: (function()
        {
            CompItem.prototype.setResolution = function(newRes)
            {
                var rs = this.resolutionFactor;
                this.resolutionFactor = newRes;
                return rs;
            }
        
            CompItem.prototype.getResolution = function()
            {
                return this.resolutionFactor;
            }
        
            CompItem.prototype.sel = function()
            {
                LAYER_TYPES = [ShapeLayer, Textlayer, LightLayer, CameraLayer, AVLayer];
        
                var args = Object.toArray(arguments);
        
                var ss = this.selectedLayers;
                var os = [];
        
                args.forEach(function(arg)
                {
                    if(arg.is(Number)) os.push(ss[arg]); //if (2) ==> comp.layer(2)
        
                    if(LAYER_TYPES.includes(arg)) // if(ShapeLayer) ==> comp shape layers!
                    {
                        Array.prototype.push.apply(os, ss.grab(function(layer){
                            return layer.constructor == arg;
                        }));
                    }
                })
        
                return os.length == 1?
                       os[0]:
                       os;
            }
        
            CompItem.prototype.snap = function(t, pp)
            // snap(1.5, "~/Desktop/MySnaps/snapit.png") => A screenshot of compo at -1.5s-
            {
        
                t = t.is(Number)? t: this.time;
        
                app.executeCommand(AECMD.SAVE_AS_FRAME);
        
                app.project.renderQueue.showWindow(false);
                var num = app.project.renderQueue.numItems;
                // app.project.renderQueue.item(num).outputModule(1).applyTemplate("SnapShotSettings");
                app.project.renderQueue.item(num).outputModule(1).file = File(pp || "~/Images/AESnap.png");
                app.project.renderQueue.render();
                app.project.renderQueue.showWindow(false);
            }
        
            CompItem.prototype.getLayersWith = function(prop, val)
            {
                if(val.is(undefined)) val = true;
        
                return this.layers.grab(function(layer)
                {
                    var oldVal = layer[prop]; 
        
                    if(oldVal.is(undefined)) return false;
                    if(oldVal.is(String) && val.is(RegExp)) return val.test(oldVal);
                    
                    return oldVal == val;
                })
            }
            
            CompItem.prototype.numLayersWithName = function(name)
            {
                return this.getLayersWith("name", RegExp("{0} \d+".re(name),"gi")).length;
            }
        
            CompItem.prototype.setTime = function(t, all)
            {
              if(t.isnt(Number)) return this;
              all  = all.is(undefined)? 1:all;
        
              //==============/
              this.duration = t;
              //==============/
          
              this.layers.grab().forEach(function(layer){
                
                var isLocked = layer.locked;
                layer.locked = false;
          
                //-----------------------------------------------------------
                layer.outPoint = t;
                if(all && layer.source.is(CompItem)) setTime(t, layer.source);
                //------------------------------------------------------------
          
                layer.locked = isLocked;
              })
              
              return this;
            },
        
            CompItem.prototype.workAreaDomain = function(){
            
                return {
                    
                    start: this.workAreaStart,
                    end  : this.workAreaStart + this.workAreaDuration 
                }
            }
        }),
        
        AFFX$ItemCollection_prototype: (function()
        // [REQURES COLLECTION INTERFACE]
        {
            ("function" != typeof CollectionInterface) || (function()
            {
                ItemCollection.prototype.xt(
                {
                    toArray: CollectionInterface.toArray,
                    grab   : CollectionInterface.grab
                })
            })();
        }),

        AFFX$LayerCollection_prototype: (function()
        // [REQUIRES COLLECTION INTERFACE]
        {    
            ("function" != typeof CollectionInterface) || (function()
            {
                LayerCollection.prototype.xt(
                {
                    toArray: CollectionInterface.toArray,
                    grab   : CollectionInterface.grab
                })
            })();
        }),

        AFFX$AVLayer_prototype: (function(){
            
            AVLayer.prototype.xt(
            {
                addProp : function(propPath)
                {            
                    var props    = propPath.split("/"),
                        lastProp = props[props.length-1].split(':'),
                        layer    = this;
            
                    props[props.length-1] = lastProp[0];
                    var name = lastProp[1];
            
                    currProp = layer;
                    for(i in props) if(props.has(i))
                    {
                        currProp = currProp.has(props[i])?
                                currProp.property(props[i]):
                                currProp.addProperty(props[i]);
                    }
            
                    if(!!name) currProp.name = name;
                    return currProp;
                },
            
                getProp : function(propPath)
                {    
                    var props = propPath.split("/");
                    var layer = this;
            
                    currProp = layer;
                    for(i in props) if(props.has(i))
                    {
                        currProp = currProp.has(props[i])?
                                currProp.property(props[i]):
                                0;
                        
                        if(!currProp) return undefined;
                    }
            
                    return currProp;
                },
            
                removeProp : function(propPath)
                {
                    return this.getProp(propPath).remove();
                }
            })

            ShapeLayer.prototype.getProp = AVLayer.prototype.getProp;
            ShapeLayer.prototype.removeProp = AVLayer.prototype.removeProp;
            ShapeLayer.prototype.addProp = AVLayer.prototype.addProp;
        }),

        AFFX$ShapeLayer_prototype: (function(){

            ShapeLayer.prototype.xt({

                area : function(t){

                    c = this.containingComp;
                    t = t || c.time;
                
                    sr = this.sourceRectAtTime(t, false); //sourceRect
                    sc = this.transform.scale.value; //scale
                    
                    return Math.mult.apply(null,
                        ([sr.width, sr.height] ^ (sc/100))
                    );
                },

                alpha : function(t){
                
                    c = this.containingComp;
                    t = t || c.time;
            
                    var sr = this.sourceRectAtTime(t, false),
                    sc = this.transform.scale;
            
                    var wh = (sc/100) * ([sr.width, sr.height] /2)
            
                    p = [
                        c.toWorld(this, [sr.left, 0])[0], 
                        c.toWorld(this, [0, sr.top])[1]
                    ] + wh;
                    
                    this.addProp("Effects/Color Control:cc").property("Color").expression = (function()
                    {
                        thisLayer.sampleImage($p,$wh)
                    }).body({$p: p, $wh:wh});
                    
                    var rgba = this.getProp("Effects/cc").property("Color").value;
                    this.removeProp("Effects/cc");
                    return rgba[3];
                },

                areas : function(roundit){
                    
                    var areas     = [],
                        isEnabled = [],
                        contents  = this.property("Contents"),
                        numProps  = contents.numProperties,
                        i         = 0;
                
                    while(++i < numProps+1)
                    {
                        isEnabled.push(contents.property(i).enabled);
                        contents.property(i).enabled = false;
                    }   
                    
                    i = 0;
                    while (++i< numProps+1)
                    {
                        if(i == 1)
                        {
                            contents.property(i).enabled = true;
                            currArea = this.area() * this.alpha();
                            areas.push(roundit?Math.round(currArea):currArea);
                            continue;
                        }
            
                        contents.property(i-1).enabled = false;
                        contents.property(i+0).enabled = true;
            
                        currArea = this.area() * this.alpha();
                        areas.push(roundit?Math.round(currArea): currArea);
                    }   i = 0;
                
                    while(++i < numProps+1)
                    {
                        contents.property(i).enabled = isEnabled[i-1];
                    }
                
                    return areas;
                },

                moveFirstVertex : function(idx){
                
                    var i = 0,
                        c = this.property("Contents"),
                        n = c.numProperties + 1;
                
                    for(;++i<n;) c.property(i).moveFirstVertex(idx);
                },

                distances : function(origin)
                {
                
                    prop = function(c, n, pp)
                    {
                        return c.property(n)
                                .property("Transform")
                                .property(pp).value;
                    }
                    num = function(v){
                        return new Number(v);
                    }
                
                    funcs = {
                
                        topleft: function(pos){
                            return Math.sqrt(
                                            (num(pos[0] - src.left) ^ 2) 
                                          + (num(pos[1] - src.top ) ^ 2)
                                   );
                        },
                        left: function(pos){
                            return pos[0] - src.left;
                        },
                        right: function(pos){
                            return wd - (pos[0] - src.left);
                        },
                        top: function(pos){
                            return pos[1] - src.top;
                        },
                        bottom: function(pos){
                            return ht - (pos[1] - src.top);
                        },
                        custom: function(pos){
                            // TODO: Figure out the position coordinates of the
                            // elements relative to the comp coordinate system.
                            
                            // Then simply subtract the distances to figure which
                            // ones are closer than others.
                        }
                    }
                
                    var positions  = [],
                        origin     = origin || "topleft";
                        contents   = this.property("Contents"),
                        numProps   = contents.numProperties;
                        
                    var src = this.sourceRectAtTime(this.containingComp.time, 0);
                        wd  = src.width;
                        ht  = src.height;
                
                    for(i=0;++i<numProps+1;) positions.push(prop(contents,i, "Position"))
                
                    return positions.map(funcs[origin]);    
                },

                grabProps : function()
                // layer.grabProps("Group", "Shape"); => Group 1, Rectangle 1
                {
            
                    var _TYPES = 
                    [
                        "Group",
                        "Shape",
                        "Graphic",
                        "Filter"
                    ];
                
                    var types = Array.prototype.slice.call(arguments);
                
                    types.forEach(function(type, idx){
                        if(!_TYPES.includes(type)) this.remove(idx);
                    })
                
                    var allProps = [];
                
                    for(var i = 1; i<this.content.numProperties+1; i++)
                    {
                        prop = this.content.property(i);
                        mn = prop.matchName.split('-')[0].trim().split(" ").pop();
                        if(types.includes(mn)) allProps.push(prop);
                    }
                
                    return allProps;
                }
            });
        }),

        AFFX$TextLayer_prototype: (function(){

            TextLayer.prototype.xt({

                style: function()
                {

                }
            });
        }),

        AFFX$PropertyGroup_prototype: (function(){

            PropertyGroup.prototype.xt({
                
                containingComp : function()
                {
                  var depth = this.propertyDepth, pp = this;
                
                  while(depth--) pp = pp.parentProperty;
                  
                  return pp.containingComp;
                },

                is : function()
                {
                    var _args = Array.prototype.slice.call(arguments), i = -1;
                    
                    // matchName processing:
                    var match = this.matchName.split(" ")[2];
                    
                    while(++i<_args.length)
                    {
                      if(match == args[i]) return true;
                    }
                
                    return false;
                },

                isnt : function()
                {
                  return !this.is.apply(this, Array.prototype.slice.call(arguments));
                },

                properties : function()
                {
                  var props = [], i = -1;
                  for(;++i<=this.numProperties;) props.push(this.property(i)); 
                  return props;
                },

                moveFirstVertex : function(index)
                {    
                    const ERRS = 
                    {
                      PROP_INVALID = "Property needs to be a shape, path group, or path"
                    }
                
                    if(this.isnt("Group", "Path", "PathGroup")) throw Error(ERRS.PROP_INVALID)
                
                    if(this.isnt("Group")) return this.mFirstVertex(index);
                
                    return this.properties().forEach(function(prop){
                
                        if(prop.is("Path")) prop.mFirstVertex(index);
                    })
                },

                mFirstVertex : function(index, t)
                {
                    const ERRS = 
                    {
                      INVALID_INDEX: "The index \"{0}\" is invalid".f(index)
                    }
                
                    t = t.is(Number)? t: this.containingComp().time;
                
                    var getIndex = Array.prototype[index + "Index"];
                    if(getIndex.isnt(Function)) throw Error(ERRS.INVALID_INDEX);
                
                    var path = this.path.value;
                
                    var i = getIndex.call (path.vertices, index),    //index   
                        m = Math.floor    (path.vertices.length/2); //midpoint
                
                    var dirRota = (i < m)? "L": "R", 
                        numRota = (i < m)?  i : (path.vertices.length - i);
                
                    var shape = new $Shape(
                    {
                      vertices    : path.vertices   .rotate(dirRota, numRota),
                      inTangents  : path.inTangents .rotate(dirRota, numRota),
                      outTangents : path.outTangents.rotate(dirRota, numRota),
                      isClosed    : path.isClosed
                    })
                
                    !this.path.numKeys?
                    path.setValue(shape):
                    path.setValueAtTime(this.keyTime(this.$nearestKeyIndex("L", t)), shape);
                },

                $nearestKeyIndex : function(lr, t)
                // nearest after -t- or before -t-: (lr: "R" = "RIGHT", "L" = "LEFT"):
                {  
                  t = t.is(Number)? t: this.containingComp().time;
                
                  if(this.isnt("Path")) throw TypeError("{0} only works for Path".f(callee.name));
                  if(!this.numKeys) return 0;
                  
                  keyIndex = this.nearestKeyIndex(t);
                  keyTime  = this.keyTime(keyIndex);
                
                  if(keyIndex == 1) return keyIndex;
                  if((keyTime > t) && lr == "R") return keyIndex;
                  if((keyTime > t) && lr == "L") return keyIndex-1;
                  if((keyTime < t) && lr == "L") return keyIndex;
                  if((keyTime < t) && lr == "R") return keyIndex+1;
                }
            })
        }),
        //------ END AFFX ----------------------
        

        //------- PRIM ---------------

        PRIM$Object: (function(){

            Object.xt({

                keys: (function () {
                    'use strict';
                    var hasOwnProperty = Object.prototype.hasOwnProperty,
                        hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
                        dontEnums = [
                            'toString',
                            'toLocaleString',
                            'valueOf',
                            'hasOwnProperty',
                            'isPrototypeOf',
                            'propertyIsEnumerable',
                            'constructor'
                        ],
                        dontEnumsLength = dontEnums.length;
                
                    return function (obj) {
                        if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
                            throw new TypeError('Object.keys called on non-object');
                        }
                
                        var result = [], prop, i;
                
                        for (prop in obj) {
                            if (hasOwnProperty.call(obj, prop)) {
                                result.push(prop);
                            }
                        }
                
                        if (hasDontEnumBug) {
                            for (i = 0; i < dontEnumsLength; i++) {
                                if (hasOwnProperty.call(obj, dontEnums[i])) {
                                    result.push(dontEnums[i]);
                                }
                            }
                        }
                        return result;
                    };
                }()),

                newKeys: function(obj, keys, values){
                    for(var i=0,len = keys.length; i< len; i++) obj[keys[i]] = values[i];
                    return obj;
                },

                size: function(o){
                    var s = 0;
                    for (ky in o) if (o.hasOwnProperty(ky)) s++;
                    return s;
                },

                dcKeys: function cKeys(a, b){

                    if(typeof a != 'object' || typeof b != 'object') throw TypeError("bad arguments");
                
                    if(Object.size(a) != Object.size(b)) return false;
                
                    for (x in a){
                        if(!a.hasOwnProperty(x)) continue;
                        if(!b.hasOwnProperty(x)) return false; // also check for type?
                        if(typeof a[x] == 'object')
                        {
                            if(typeof b[x] != 'object') return false;
                            if (!cKeys(a[x], b[x])) return false;
                        }
                    }
                    return true;
                },

                validate:  function(o, a)
                {
                    function type(v){
                
                        if(arguments.length != 1) throw Error("pass 1 variable");
                        if(v === undefined)       return 'undefined';
                        if(v === null)            return 'undefined';
                        if(typeof v == 'xml')     return 'xml';
                        return v.constructor.name.toLowerCase();
                    }
                
                    if(type(o) != type(a))     return false; 
                    if(type(o) == 'object')    return Object.dcKeys(o, a);
                    if(type(o) == 'array')     return !(a<b || b<a);
                
                    return (o == a);
                },

                validateKeys: function(obj)
                {
                    var args = Array.prototype.slice.call(arguments,1);
                    for(var i=0, len = args.length; i< len; i++)
                    {
                        if(typeof Object.getValue(obj, args[i]) == "undefined") return false;
                    }
                    return true;
                },

                modify: function(oo, pp, v)
                {
                    var ks = pp.split("/"),
                        seq= "oo",
                        i  = 0,
                        len= ks.length;
                
                    for(; i<len; i++) seq += "[\"" + ks[i] + "\"]";
                    
                    eval(seq + "="  + JSON.stringifyy(v) + ";");
                },

                getValue: function(oo, pp)
                {
                    var ks = pp.split("/"),
                    seq= "oo",
                    i  = 0,
                    len= ks.length,
                    myVal;
                
                    for(; i<len; i++) seq += "[\"" + ks[i] + "\"]";
                
                    eval("myVal = " + seq + ";");
                    return myVal;
                },

                info: function()
                {
                
                    var o = {
                        prop: "properties",
                        func: "methods",
                        errMsg: "Can inspect properties or methods only! (prop/func)"
                    }
                
                    if (chk = Arguments.paramCheck(arguments, true)) throw Error(chk.errMsg);
                    if (["prop", "func"].indexOf(info) < 0)          throw Error(o.errMsg);
                    if (typeof obj == "undefined")                   throw Error("An undefined value was passed");
                    if (typeof exec == "undefined")   exec   = false;
                    if (typeof objSrc == "undefined") objSrc = false;
                    if (typeof cr == "undefined")     cr     = false; 
                    if (typeof info == "undefined")   info   = "prop";
                
                
                    info = o[info];
                    var props = obj.reflect[info];
                        str   = "";
                
                
                    if (info == o.prop) {
                            props.forEach(function(prop) {
                                    val = objSrc ? thiss[prop].toSource() : thiss[prop];
                                    str += prop + " : " + uneval(val) + "\n";
                            })
                    }
                
                    if (info === o.func) {
                            props.forEach(function(prop) {
                                    val = "";
                                    if (exec) {
                                            prop = prop.toString();
                                            if (!prop.startsWith("set")) {
                                                    eval("try {val = thiss." + prop + "();}" +
                                                            "catch(e) { val = e; }");
                                            }
                                    }
                                    str += (prop + " : " + (val));
                            })
                    }
                
                
                    if (cf) new File($.fileName.replace(/\.[a-zA-Z]+/, ".info.txt")).$create(str);
                    return str;
                },

                print: function(obj, lvl, writeit)
                {
                    if(typeof obj == "undefined") return "undefined";
                    if(typeof lvl  == "undefined") lvl = Math.pow(2, 10);
                    if(typeof noprint == "undefined") writeit = false;
                
                    var str = "",
                        hdr = "",
                        max = 50;
                    
                    function frame(str, size){
                
                        var size    = typeof size == "undefined"?50:size;
                        var block   = String.fromCharCode(9632); // the block character: ■
                        var entry   = ((size+2) / 2) - (str.length / 2);
                        return      ( 
                                    block.repeat(size+2)+
                                    "\n"+
                                    block.repeat(3)+" ".repeat(entry) + str + " ".repeat(size-entry-str.length-4) +block.repeat(3-str.length%2)+ 
                                    "\n"+
                                    block.repeat(size+2)+
                                    "\n"
                                    );
                    }
                
                    hdr = "["+obj.constructor.name+"]: w/len: " + Object.size(obj);
                    str    = (frame(hdr, max) + Object.stringify(obj, lvl));
                
                
                    if (writeit) $.writeln(str);
                    return str;
                },

                write: function(obj, fName, appnd) {

                    var defaultWPath = Folder.desktop.fsName + "\\";
                
                    if(typeof obj   == "undefined") throw Error("Type of obj is undefined");
                    if(typeof appnd == "undefined") appnd = true;
                    if(typeof fName == "undefined") fName = defaultWPath;
                
                
                    var sName = $.stack.split("\n")[0].slice(1, -1),
                        fName = (fName + sName).replace(/\.jsx/, ".md"),
                        ff    = new File(fName),
                        wr    = Object.print(obj, true, false);
                
                    
                    if (ff.exists && apnd) ff.$write(wr, 'a');
                    else ff.$create(wr);
                    return ff.fsName;
                },

                typeof: function(v){
        
                    if(arguments.length != 1) throw Error("pass 1 variable");
                    if(v === undefined)       return 'undefined';
                    if(v === null)            return 'undefined';
                    if(typeof v == 'xml')     return 'xml';
                    return v.constructor.name.toLowerCase();
                },

                create: function (proto)
                {
                    function F() {}
                    F.prototype = proto;
                
                    return new F();
                },

                newObject: function()
                {    
                    var oo   = {};
                    var args = Array.prototype.slice.call(arguments);
                
                    for(var i =0; i< args.length; i++)
                    {
                        arg = args[i];
                        if(arg.constructor !== Array) continue;
                
                        oo[arg[0]] = arg[1];
                    }
                
                    return oo;
                },

                fromEntries: function(arr)
                {
                    var oo = {};
                    arr.forEach(function(e){
                        oo[e] = "";
                    })
                
                    return oo;
                },

                inspect: function()
                {
                    var props = Object.fromEntries(this.reflect.properties);
                    var funcs = Object.fromEntries(this.reflect.methods);
                
                    for(x in props) if(props.has(x)) props[x] = this[x];
                    for(y in funcs) if(funcs.has(y)) funcs[y] = app.doUndo(this[y]);
                
                    return [props, funcs];
                },

                rm : function(mo)
                {
                    eval([
                        
                        mo + "= undefined",
                        "delete( " + mo + ")"
                
                    ].join(";"))
                }

            })

        }),

        PRIM$Array_prototype: (function()
        {
            Array.range = function(l){
        
                var arr = [], i = -1;
        
                while(++i<l) arr[i] = (i+1);
                return arr;
            }     
            Array.prototype.forEach = function(callback, thisArg) {

                if (this == null) throw new TypeError('Array.prototype.forEach called on null or undefined');
                if (typeof callback !== "function") throw new TypeError(callback + ' is not a function');
        
        
                var T, k,
                    O = Object(this);
                    len = O.length >>> 0;
                if (arguments.length > 1) T = thisArg;
                k = 0;
                
                while (k < len){
        
                        var kValue;
                        if (k in O)
                        {
                            kValue = O[k];
                            callback.call(T, [kValue, k, O].concat(Object.toArray(arguments)));
                        }
                        k++;
                }
        
        
                return this;
            }
            Array.prototype.indexOf = function(el, fromIdx) {
        
                "use strict";
                if (this == null) throw new TypeError('"this" is null or not defined');
        
        
                var k,
                    o = Object(this);
                    len = o.length >>> 0,
                    n = fromIdx | 0;
        
        
                if (len === 0) return -1;
                if (n >= len) return -1;
        
                k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
                for (; k < len; k++) {
                        if (k in o && o[k] === el) return k;
                }
        
        
                return -1;
            }
            Array.prototype.remove = function(k, all) {
        
                if(typeof all != "boolean") all = false;
        
        
                var i   = -1,
                    len = this.length;
                
                while (++i < len) 
                {
                    if(this[i] != k) continue;
                    
                    this.splice(i, 1);
                    if(!all) break;    
                    len--;
                }
                return this;
            }
            Array.prototype.includes = function(k) {
                return this.indexOf(k) > -1;
            }
            Array.prototype.rotate = function(d, i){
                
                a = this; // eval("["+String(this)+"]");
                
                switch (d) 
                {
                    case "l": while(i--)    a.push(a.shift())
                    case "r": while(i-->-1) a.unshift(a.pop())
                }
        
                return arr;
            }
            Array.prototype.reduce = function(cb) {
                
                'use strict';
                if (this == null)             throw TypeError('Reduce called on null or undefined');
                if (typeof cb !== 'function') throw TypeError(cb + ' is not a function');
                var t = Object(this), len = t.length >>> 0, k = 0, value;
                
                if(arguments.length == 2) 
                {
                value = arguments[1];
                } 
                else 
                {
                while (k < len && !(k in t)) k++; 
                if (k >= len) throw TypeError('Reduce of empty array with no initial value');
                value = t[k++];
                }
        
                for (; k < len; k++) 
                {
                if (k in t) value = cb(value, t[k], k, t);
                }
                
                return value;
            }
            Array.prototype.map = function(cb) {
        
                if (this == null) throw TypeError('Map array is null or not defined');
            
                var T,
                    A,
                    k,
                    O   = Object(this),
                    len = O.length >>> 0;
            
                if (typeof cb !== 'function') throw TypeError(cb + ' is not a function');
                if (arguments.length > 1) T = arguments[1];
                A = new Array(len);
                k = -1;
            
                while (++k < len) {
        
                var kValue, mappedValue;
            
                if (k in O) 
                {
                    kValue = O[k];
                    mappedValue = cb.call(T, kValue, k, O);
                    A[k] = mappedValue;
                }
                }
                
                return A;
            }
            Array.prototype.forEvery = function(cb)
            {
                var a = this;
                for(var i=0; i<a.length; i++)
                {
                    if(cb.call(null, a[i], i) == false) return false;
                }
                return true;
            }
            Array.prototype.filter = Array.prototype.select = function(func, thiss)
            {
                if(this.is(null)) throw new TypeError();
        
                var obj = Object(this),
                    len = obj.length >>> 0;
                
                if(func.isnt(Function)) throw new TypeError();
        
                var arr = [], i = -1;
        
                while(++i < len) if(i in obj)
                {
                    if(func.call(thiss, t[i], i, obj)) res.push(t[i]); 
                }
        
                return arr;
            }
        
            /**
             * 
             * Max & Min & some wrapped Math functions:
             * 
             */
        
            Array.prototype.max = function(prop)
            {
                if(!prop) return Math.max.apply(null, this);
                
                a = eval(this.toSource());
                k = a.length;
                while(k--) a[k] = a[k][prop];
                
                return Math.max.apply(null, a)
            }
            Array.prototype.min = function(prop)
            {
                if(!prop) return Math.min.apply(null, this);
                
                a = eval(this.toSource());
                k = a.length;
                while(k--) a[k] = a[k][prop];
                
                return Math.min.apply(null, a)
            }
            Array.prototype.sortedIndices = function(){
                var a = this;
                return Array.range(a.length).sort(function(x,y){
                    return a[x-1] > a[y-1];
                })
            }
            Array.prototype.math2D = function(type, xory)
            {
                return Math[type].apply(null, this.map(function(x){
                    return x[xory]
                }))
            }
            Array.prototype.sum = function()
            {
                return Math.sum.apply(null, this);
            }
        
            /**
             * 
             * 2D indcies:
             * 
             */
            Array.oneDimIndexFunc = function(maxormin, HorV)
            {
                return function()
                {
                    return this.indexOf(this.math2D(mm, hv));
                }.body({
                    mm: maxormin,
                    hv: HorV
                })
            }
            Array.prototype.upIndex     =  Function(Array.oneDimIndexFunc("max", 1));
            Array.prototype.bottomIndex =  Function(Array.oneDimIndexFunc("min", 1));
            Array.prototype.leftIndex   =  Function(Array.oneDimIndexFunc("min", 0));
            Array.prototype.rightIndex  =  Function(Array.oneDimIndexFunc("max", 0));
            /**
             * 
             */
        
            
            /**
             *
             *  
             */
            Array.twoDimIndexFunc = function(ytype, xtype){
                
                return (function(){
        
                    var a = this;
                    var o = {
                        x: a.math2D(xtype, 0),
                        y: a.math2D(ytype, 1)
                    }
                    
                    var m = a.map(function(v){
                        return Math.sqrt(Math.pow( v[0] - o.x,2) + Math.pow(v[1] - o.y,2));
                    }).min();
            
                    return a.indexOf(m);    
                }).body({
                    xtype: xtype,
                    ytype: ytype,
                })
            }
        
            Array.prototype.upperLeftIndex   = Function(Array.twoDimIndexFunc("min", "min"));
            Array.prototype.upperRightIndex  = Function(Array.twoDimIndexFunc("min", "max"));
            Array.prototype.bottomRightIndex = Function(Array.twoDimIndexFunc("max", "max"));
            Array.prototype.bottomLeftIndex  = Function(Array.twoDimIndexFunc("max", "min"));

            /**
             * Vector operations/ Array operations:
             * 
             * 
             */
            // Addition:
            Array.prototype["+"] = function(v)
            {
                if(!v.is(Array)) return;
        
                var i = this.length,
                    j = v.length,
                    r = this.concat(v.slice(i));
                
                if(i > j) i = j;
                while( i-- )
                {
                    r[i] += (v[i]);
                }
                
                return r;
            }
        
            // Subtract
            Array.prototype["-"] = function(v)
            {
                var sign = "-";
        
                if(!v.is(Array)) return;
        
                var i = this.length,
                    j = v.length,
                    r = this.concat(v.slice(i));
                
                if(i > j) i = j;
                while( i-- )
                {
                    r[i] -= (v[i]);
                }
                
                return r;
            } 
        
            // Component-wise multiplication:
            Array.prototype["^"] = function dotMultiply(v) // Hadmard product
            {
                if(!v.is(Array)) return;
        
                var i = this.length,
                    j = v.length,
                    r = this.concat(v.slice(i));
                
                if(i > j) i = j;
                while( i-- )
                {
                    r[i] *= (v[i]);
                }
                
                return r;
            } 
        
            // Scalar multiplication:
            Array.prototype['*'] = function(/*operand*/k)
            {
                if(!k.is(Number)) return;
                
                var i = this.length,
                    r = this.concat();
                
                while( i-- ) r[i] *= k;
                return r;
            }
            
            // Dividing operation:
            Array.prototype['/'] = function(/*operand*/k, /*reversed*/rev)
            {
                return (k.is(Number) && !rev)?
                    this * (1/k):
                    undefined; 
            }
            /**
             * 
             * 
             * 
             */
        }),

        PRIM$Function_prototype: (function(){
            
            Function.prototype.xt({
                
                bind : function(thisArg) 
                {
                    var method = this;
                    var args = Array.prototype.slice.call(arguments, 1);
                
                    return function bound() {
                        var _args = args.concat(Array.prototype.slice.call(arguments));
                        if (!(this instanceof bound))
                            return method.apply(thisArg, _args);
                
                        var __args = [];
                        for (var i = 0, len = _args.length; i < len; i++)
                            __args.push('_args[' + i + ']');
                
                        return eval('new method(' + __args.join(',') + ')');
                    };
                },
                
                body : function(repConfig)
                {   
                    return this.toString()
                        .replace(/^[^{]*\{[\s]*/,"    ")
                        .replace(/\s*\}[^}]*$/,"")._replace(repConfig || {});
                },
                
                timeme : function(thisArg, args)
                {
                    $.hiresTimer;
                    this.apply(thisArg, args);
                    return ($.hiresTimer / 1000000);	
                },

                getArgs : function(){

                },

                params: function(){

                },

                check : function(){

                },

            })
        }),

        PRIM$String_prototype: (function()
        {
            String.prototype.xt({

                inspectFF : function() {

                    var inspection = {},
                        parts = this.split('/'),
                        lastPart = parts.pop(),
                        numParts = parts.length,
                        fStr0 = this[0],
                        fStr1 = this[1];
                
                    inspection.folderDepth = numParts;
                    inspection.drive = (fStr1 == ':') ? fStr0 : null;
                    inspection.isFile = false;
                    inspection.isFolder = false;
                    inspection.extension = "";
                
                    /**
                     * if last part contains a dot: file
                     * if not: check numParts: if 0: invalid path string
                     * if numParts > 0: folder
                     */
                
                    if (lastPart.indexOf('.') > -1) 
                            Object.newKeys(inspection,["valid", "isFile", "isFolder","extension"],
                                                      [true,true,false,lastPart.split('.').pop()]);
                
                    else Object.newKeys(inspection, ["valid", "isFolder"], [!!numParts, !!numParts]);
                
                
                    return inspection;
                },
    
                startsWith : function(search, rawPos)
                {
                
                    var pos = rawPos > 0 ? rawPos | 0 : 0;
                    
                    return this.substring(pos, pos + search.length) === search;
                },
                
                padding : function()
                {    
                    (pad = /^\s*/).exec(this);
                    return pad.lastIndex;
                },
                
                checkFF : function() {
                
                    var ff = Folder(this);
                
                    if (!ff.exists) return 0;
                    return (ff.constructor == File)? 1: -1;
                },
                
                replaceSeq : function(specialChar/*, str1, str2..*/) {
                
                    startIdx = 1;
                    if (typeof specialChar == "undefined"){
                        specialChar = '@';
                        startIdx    =  0;  
                    }
                
                    var thiss = this, 
                        args  = Array.prototype.slice.call(arguments, startIdx),
                        patt  = new RegExp(specialChar),    
                        i     = 0;
                    
                    while (thiss.search(patt) != -1) thiss = thiss.replace(patt, args[i++] || specialChar);
                
                
                    return thiss;
                },
                
                title : function() {
                    return this[0].toUpperCase() + this.slice(1);
                },
                
                trim : function(){
                    return this.replace(/^\s*/,"").replace(/\s*$/,"");
                },
                
                _replace : function(repCfg){
                    
                    var str = this;
                    for(x in repCfg) if(repCfg.hasOwnProperty(x))
                    {
                        str = str.split(x).join(repCfg[x])
                    }
                    return str;
                },
                
                "*" : function(op, joinChar)
                {
                    if(!$.global.str)
                    {
                        $.global.str = function(s){return new String(s)};
                    }
                
                    var strr = this, fstr = [fstr];
                    if(isNaN(op = Math.floor(op))) return strr;
                    
                    while(op--) fstr.push(strr);
                    return fstr.join(joinChar || ""); 
                },
                
                pushAt : function(atIndex, pushChar, delet, numDelete) {
                    
                    delet     = delet.is(undefined)? 1: delet;
                    numDelete = delet.is(undefined)? 1: numDelete;
                    
                    first = this.substring(0, atIndex);
                    last  = this.substring(delet? (atIndex+numDelete): atIndex);
                
                    return first + pushChar + last;
                },
                
                fstr : function()
                {
                    arra = Array.prototype.slice.call(arguments);
                    s    = this.toString();
                    patt = /&/g;
                    
                    while(!!patt.exec(s))
                    {
                      li = patt.lastIndex -1;
                      no = s[li+1];
                      if(isNaN(no)) continue;
                      s = s.pushAt(li, arra[no-1], 1, 2);
                    }
                
                    return s;
                }
            })
        }),

        PRIM$Number_prototype: (function(){

        }),
        //-------- END PRIM -------------


        //----------- DATA-------------
        DATA$File_prototype: (function(){

            File.prototype.xt({

                isOpen : false,
            
                $open : function(mode)
                {
                    var cases = ["r", "w", "a", "e"];

                    this.isOpen = this.open(
                        (cases.indexOf(mode) == -1)?
                        (File(this.fsName).exists? 'e': 'w'):
                        mode
                    );

                    return this;
                },
                
                $close = function()
                {
                    this.isOpen = false;
                    return (this.close(), this);
                },
                
                $write : function(txt, mode)
                {
                    return this.isOpen?
                           (this.write(txt, mode), this.$close(), this):
                           (this.$open(mode).write(txt), this.$close(), this);
                },
                
                $read : function()
                {
                    if(!this.exists) throw Error("Can't read a non-existent file!");
                        
                    var d = this.$open("r").read();
                    this.$close();
                    return d;
                },
                
                clear : function(txt)
                {
                    return (this.$write(txt || ""), this);
                },
                
                $seek : function(pos)
                {
                    return !this.isOpen?
                           (this.$open('r').seek(pos), this):
                           (this.seek(pos), this);
                },
                
                create : function(text, encoding)
                {
        
                        this.encoding = encoding || "UTF-8";
                        return (this.$write((text || ""), 'w'), this);
                },
                
                execute = function(slp, cb, doClose)
                {
                        this.execute();
                        if(!!doClose) this.$close();
                        $.sleep(slp || 0);
                        if(typeof callback == "function") cb.call(this);
        
                        return this;
                },
                
                lines : function()
                {
                        var lines = [];
                        this.$open("r");
        
                        while (!this.eof) lines.push(this.readln());
        
                        return (this.$close(), lines);
                },
                
                listenForChange : function(debug, wait, maxiter)
                {
                        var iter = -1, maxiter = maxiter || 100;
        
                        while (++iter < maxiter) {
                                if (this.modified > lmod) break;
                                $.$sleep(
                                        !wait? 180: wait == "exp"? Math.round(2, iter+6):
                                        wait,
                                        debug,
                                        iter
                                );
                        }
        
                },
                
                listenForChar : function(charac, pos, wait, maxiter, debug)
                {
        
                        var iter = -1, maxiter = maxiter || 100;
                        while (++iter < maxiter) {
        
                                if (this.$open('r').$seek(pos).readch() == charac) break;
                                else $.$sleep(wait, debug, iter);
                        }
                        
                        this.$close();
                },
                
                listen : function(delay, debug, patience, cleanup)
                {
        
                        patience = patience || 60000;
                        var ttdelay = 0;
        
                        while(1)
                        {       
                                if(this.exists)
                                {
                                        (!cleanup) || (this.remove());
                                        break;
                                }
                                if(ttdelay > patience) break;
                                $.$sleep(delay, debug, "File not found yet");
                                ttdelay += delay;
                        }
                },
                
                getDuration : function()
                {
                        if(!this.exists) return 0;
                        if(!["video", "audio"].includes(this.getType())) return 0;
                        
                        k = app.project.importFile(new ImportOptions(this));
                        d = k.duration;
                        
                        k.remove(); k = null;
                        return d;
                },
                
                getName : function()
                {
                        return this.name.replace(/.[^.]+$/, "");
                },
                
                getExtension : function()
                {
                        return this.name.replace(/^.*\./, "");
                },
                
                getType : function()
                {
                        xt = this.name.replace(/^.*\./,"").toLowerCase();
                        tp = File.TYPES_BY_EXTENSION[xt] || 7;
                        nm = File.CATEGORIES[tp].toLowerCase();
        
                        return nm;
                }
            })
        }),

        DATA$Folder_prototype: (function()
        {
            Folder.prototype.xt({
                
                clearFolder : function(extensionName)
                {
                    if(this.constructor !== Folder) return;
                    if (this.fsName.checkFF() != -1) throw Error("dirPath is not a folder path");
                    var isAll = (typeof extensionName == "undefined")? true: false;
    
                    var ffs = this.getFiles();
    
                    ffs.forEach(function(f) {
                            var ext = f.fsName.split('.');
                            ext = ext[ext.length-1];
                            if (f.constructor == File && (isAll || (ext == extensionName)) ) f.remove();
                    })
    
                    return 0;
                },
                
                remove : function()
                {
                        if(this.constructor !== Folder) return;
                        return (this.$clearFolder(), this.remove(), 0);
                },
                
                getFolders : function()
                {
                        if(this.constructor !== Folder) return;
                        var al = [];
                        this.getFiles().forEach(function(f){ if(f.constructor == Folder) al.push(f)})
                        return al; 
                },
                
                $getFiles : function()
                {        
                        if(this.constructor !== Folder) return;
                        
                        var al = [];
                        this.getFiles().forEach(function(f){ if(f.constructor == File) al.push(f)})
                        return al; 
                }
            })
        }),

        DATA$Socket_prototype: (function(){

            Socket.prototype.xt({


            })
        }),
        //--------- END DATA-----------


        //--------- SCUI ----------------
        SCUI$Window_prototype: (function(){

            Window.prototype.xt({
                
                addAnimatedSequence : function (imgSeqPath, firstImageIdx)
                {
                    var win = this;
        
                    var gif = win.add("image");
        
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
        
                    gif.icon = ScriptUI.newImage(gif.imgSeq[firstImageIdx]);
        
                    return gif;
                }
            })
        }),

        SCUI$XYLayout: (function(){
            
            $.global.CustomLayout = function CustomLayout(c){
                this.c = c; // c: container
            }
            
            /*
            * Usage: 
            =================================
            container.layout = new XYLayout({
                c: container,
                x: 50,
                y: 50
            });
            =================================
            */
            
            $.global.XYLayout = function XYLayout(cfg){
                CustomLayout.call(this, cfg.c);
                this.t = this.c.orientation.toLowerCase();
                this.x = cfg.x;
                this.y = cfg.y;
            }
            
            XYLayout.prototype.xt(
            {
                tt  : function(v, t)
                {
                    return (this.t == t)?v:0;
                },
            
                layout: function()
                {
                const K  = "children",
                      PS = "preferredSize";
            
                var top = left = kid = 0,
                    i = -1;
            
                for(; ++i <this.c[K].length;)
                {
                    kid = this.c[K][i];
                    kid.size = k[PS];
                    if(typeof kid.layout !== "undefined") kid.layout.layout();
                    
                    kid.location = [left, top];
                    top  += this.tt(kid.size.height, 'column')  + this.y; //top+
                    left += this.tt(kid.size.width , 'row')  + this.x; //left+
                }
                
                this.c[PS] = [(left-this.x) + this.tt(kid.size.width , 'column'), 
                              (top -this.y) + this.tt(kid.size.height, 'row')
                             ];
                kid = top = left = null;
                }
            })
        }),
        //-------- END SCUI----------------

        //-------- CSTR -----------------
        CSTR$Table: (function(){
                        
            //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ TABLE ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
            $.global.Table = function Table(table, margin, VD, HD)
            {
                this.VD     = VD || "▓"; //Vertical Divider
                this.HD     = HD || "■"; //Horizont Divider
                
                this.table  = table || [];
                this.ftable = [];       // formatted table
                this.margin = margin || 5;
            
                this.maxColSizes = this.maxColumnSizes();
                this.maxRowSizes = this.getMaxRowSizes();
                $.log(this.maxColSizes);
                $.log(this.maxRowSizes);
            }
            //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
            //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
            //                                                                                 ■■■
            Table.prototype.xt( 
            {
                toString: function(){
                    return this.render();
                },
        
                // -------------------- Max Column Sizes -----------------------------
                //--------------------------------------------------------------------
                maxColumnSizes : function(){
            
                    var tb = this.table,
                        cs = [];
                
                    JL = "\n";
                
                    for(var c=0; c< tb[0].length; c++)
                    {
                        max = 0;
                        for(var r=0; r< tb.length; r++)
                        {   
                            !tb[r][c]? tb[r][c] = "":0;
                            /**************************/
                            curr = (tb[r][c].split(JL)).max("length");
                            /**************************/
                            if(curr > max) max = curr;
                        }
                        cs.push(max);
                    }
                    return cs;
                },
        
                // -------------------- Max Row Sizes -----------------------------
                //--------------------------------------------------------------------
                getMaxRowSizes : function(){
            
                    var tb = this.table,
                        rs = [];
                
                    JL = "\n";
                
                    for(var r=0; r< tb.length; r++)
                    {
                        max = 0;
                        for(var c=0; c< tb[0].length; c++)
                        {
                            /**************************/
                            curr = tb[r][c].split(JL).length;
                            /**************************/
                            if(curr > max) max = curr;
                        }
                        rs.push(max);
                    }
                    return rs;
                },
        
                // -------------------- Format --------------------------------------
                //--------------------------------------------------------------------
                format : function(){
        
                    // change the contents of each block:
                    // justify = center
                
                    var tb = this.table,
                        mg = this.margin,
                        cs = this.maxColSizes,
                        rs = this.maxRowSizes,
                        r  = -1,
                        c  = -1;
                    
                    while(++r<tb.length) 
                    {
                        rSize = rs[r];
                
                        while(++c<tb[0].length)
                        {
                        bKids = tb[r][c].split("\n");
                        cSize = cs[c];
                
                        for(k=0; k<rSize;k++) // loop through internal row lines:
                        {
                            bKid = bKids[k];
                            
                            if(!bKid) {
                                bKids[k] = (strr(" ") * (cSize + 2*mg)) + this.VD;
                                continue;
                            }
                
                            lPad = strr(" ") * Math.floor(((cSize - bKid.length)/2) + mg);
                            rPad = strr(" ") * Math.ceil (((cSize - bKid.length)/2) + mg);
                    
                            bKids[k] = lPad + bKid + rPad + this.VD; // block = "   block    |"
                        }
                
                        tb[r][c] = bKids.join("\n");
                        }
                        c = -1; // reset column count for new row
                        block = bKids = cSize = fblock = null; // cleanup
                    }
                    this.ftable = tb;
                },
        
                // -------------------- Render ---------------------------------------
                //--------------------------------------------------------------------
                render : function(offset){
        
                    this.format(); // should be non-optional:
                
                    var tb  = this.ftable,
                        JL  = "\n",
                        rs  = this.maxRowSizes,
                        cs  = this.maxColSizes,
                        of  = typeof offset == "undefined"?" ":(strr(" ") * offset),
                        mg  = this.margin,
                        rw  = cs.sum() + (2 * mg * cs.length) + cs.length;
                        fs  = of + strr(this.HD) * (rw+1) + JL;
        
                    for(var r=0; r< tb.length; r++)
                    {
                        rr = "";
                        for(var k=0; k< rs[r]; k++) // go through each line of each row:
                        {
                            rr += of + this.VD + tb[r][0].split(JL)[k];
                            for(var c=1; c< cs.length; c++) // go through each column:
                            {
                                rr += tb[r][c].split(JL)[k]; // running split (csize) times not efficient.
                            }   rr += JL;
                        }
                        fs += rr + of +(strr(this.HD) * (rw+1)) + "\n";
                    }
                    return fs;
                },
        
                // ------------------------- WRITE -------------------------------------
                // ---------------------------------------------------------------------
                write : function(removePrev ,pad, path){
            
                    if(removePrev) Table.removeAll(path);
                    path = path || Folder(File($.fileName).path).fsName;
                    pad  = pad || 8;
                    patt = Table.fNamePatt;
                    txtf = Folder(path).getFiles("*.txt");
                    num  = 1;
                    
                    len  = txtf.length;
                    while(len--) if(!!(txtf[len].displayName.match(patt))) num++;
                
                    var name = ("table [{0}x{1}]({2})").re(this.maxRowSizes.length, this.maxColSizes.length, num);
                
                    return File(
                    
                        "{0}\\{1}.txt".re(path, name)
                    
                    ).$write(this.render(pad)).fsName;
                },
                
                // ----------------------------- SHOW ----------------------------
                show : function(){
                    $.writeln(this.render())
                },
            });
            //                                                                            ■■■■■■■
            //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

            Table.xt({

                fNamePatt : /^(table)\s+\[\d+(x)\d+\]\(\d+\)/g,
                
                removeAll : function(path)
                {
                    fs = Folder(path || File($.fileName).path).getFiles("*.txt");
                    i  = fs.length;
                    $.writeln(i);
                    while(i--) if(fs[i].displayName.match(Table.fNamePatt)) fs[i].remove();
                },

                process : function(arr, sign)
                {
                    fArr = [];
                    sign = (sign || ",");
                    behN = 35;
                    
                    for(i=0; i<arr.length; i++)
                    {
                        tmp = [];
                        row = arr[i];
                        spt = row.split(sign);
                        for(k = 0; k<spt.length; k++)
                        {
                            tmp.push(spt[k]
                                    .replace(/^\s*|\s*$/g, "")
                                    .replace(RegExp("(.{"+behN+"})", "g"), "$1\n"));
                        }
                        fArr.push(tmp);
                    }
                    return fArr;
                }
            })
        }),

        CSTR$Path: (function(){

            $.global.Path = function Path()
            {
                this.ps = [];
                
                var ag = Array.prototype.slice.call(arguments),
                    ln = ag.length,
                    id = -1;
                
                while(++id<ln) this.ps = this.ps.concat(ag[id].split("/"));
            }
            
            Path.prototype.xt({
                
                py : function(){
                    var e1, e2, rt, bd;
                    e1 = this.ps.shift();
                    e2 = this.ps.shift();
                    rt = [e1, e2].join("\\\\");
                
                    return [rt, bd].join("\\")
                },
                
                resolve : function(s/*slash*/){ // 0 => /, 1=> \\
                    return this.ps.join(!s? "/": "\\");
                },
                
                exists : function(){
                    return Folder(this.resolve()).exists;
                },
                
                mkdir : function(){
                    if(this.exists()) return false;
                    return Folder(this.resolve()).create();
                },
                
                toString : function(){
                    return this.resolve();
                },
                
                "/" : function(op){
                
                    return new Path([
                        this.toString(),
                        op
                    ].join('/'));
                }
            })
            
        }),

        CSTR$FileInterface: (function()
        {
            
            $.global.FileInterface = function FileInterface()
            {
                this.extension = cfg.extension;
                this.path      = cfg.filePath;
                this.fileName  = File(this.path).name;
                this.structure = cfg.structure;
                this.signal    = "{0}/executed.tmp".re(this.path)
            }

            FileInterface.prototype.validate = function(intfObj)
            {
                return Object.validateKeys(
                    intfObj,
                    "info",
                    "contacts",
                    "active_req",
                    "info/reqs_made",
                    "info/reqs_exec",
                    "info/past_reqs",
                    "active_req/road",
                    "active_req/trac",
                    "active_req/seed",
                    "active_req/crop"
                );
            }
            
            FileInterface.prototype.make = function()
            {
                return File(I.intfPath).$create(jj.ser(I.intf0, 1));
            }
            
            FileInterface.prototype.set = function()
            {
                if(!this.validateIntf(intfObj)) throw Error("Invalid PyInterface Obj");
            
                return File(this.intfPath).$write(jj.ser(intfObj, 1), 'w');
            }
            
            FileInterface.prototype.get = function()
            {
                return jj.deser(File(this.intfPath).$read());
            }
            
            FileInterface.prototype.modify = function(keysP, newV)
            {
                var intf = this.get();
            
                Object.modify(
                    intf,
                    keysP,
                    typeof newV == "function"?
                    newV.call(null, Object.getValue(intf, keysP)):
                    newV
                );
                
                this.set(intf);
            }
            
            FileInterface.prototype.post = function(request)
            {
                if(!Object.validateKeys(request, "path", "func", "args")) throw Error("Request structure invalid");
            
                this.modify("active_req", request);
                return PY;
            }
            
            FileInterface.prototype.crop = function(clean)
            {
                if(typeof clean == "undefined") clean = true;
            
                var intf    = this.get(),
                    output  = intf.active_req.crop; //crop
            
                intf.active_req = this.intf0.active_req;
                if(clean) this.set(intf);
                
                return output;
            }
        }),

        CSTR$Python: (function(){

            $.global.Python = function Python(){};

            Python.xt({
                
                installed: function()
                {
                    return sys.cmd("python --version").split(" ")[0] == "Python";
                },

                functions: function(p)
                {
                    var m   = File(p).$read().match(/(([\n]+def)|^def)\s+.+\(.*\)/g),
                    fs  = [], nameArgs, name, args, aaa;
        
                    for(var i=0, len=m.length; i< len;i++)
                    {
                        nameArgs = m[i].replace(/[\n]+/g, "").replace(/def[\s]+/g, "").split("(");
                        name     = nameArgs[0].replace(/\s*$/,"");
                        args     = nameArgs[1].slice(0,-1).split(",");
                        
                        aaa      = { "default": [], "non_default": []};
        
                        if(args[0]) for(var k=0, klen = args.length; k< klen; k++)
                        {
                            arg = args[k].split("=");
                            aaa[(arg.length-1)?"_default":"non_default"].push(arg[0]);
                        }
                        fs.push({"name": name, "args": aaa});
                    }
                    return fs;
                },

                makeExec: function()
                {
                    return File(this.execPath).$create(this.execStr);
                },        
                
                runExec: function()
                {
                    var sf = File(I.sgnlPath);
                    if(sf.exists) sf.remove();
                    
                    I.modIntf("info/reqs_made", function(v){ return v+1});
                    File(this.execPath).$execute();
                    sf.$listen(this.pyExTime, false, undefined, true/*remove signal file once it appears*/);
                    
                    return I;
                },
                
                viewExec   : function(editor)
                {
                    sys.cmd("{1} {0}".re(File(this.execPath).fsName), editor || "notepad");
                },

                editExec   : function(fs)
                {
                    if(fs.constructor == File) fs = fs.$read();
                    this.execStr = fs;
                },

                //========================================

                execStr: "def pyjsx_run():\n    import json, sys, os\n    inst_path  = '"+self.instPath+"/'\n    intf_path   =  (inst_path + 'PyIntf.pyintf')\n    exec_signal =  (inst_path + 'executed.tmp')\n    def strr(ss):\n        if(ss in ['true', 'false']): return ss.title()\n        if(type(ss) is str):         return '\"' + ss + '\"'\n        return str(ss)\n    with open(intf_path, 'r') as f:\n        c= f.read()\n    if not c: return 'Python Error: interface corrupt'\n    intff = json.loads(c)\n    AR    = intff['active_req']\n    path  = AR   ['road']\n    func  = AR   ['trac']\n    name  = '.'.join(path.split('/')[-1].split('.')[0:-1])\n    args  = ','.join(strr(e) for e in AR['seed'])\n    sys.path.append(os.path.dirname(path))\n    try:\n        exec('import ' + name + ' as s')\n        result = eval('s.' + func + '(' + args + ')')\n    except Exception as e:\n        result = 'Python Error: ' + str(e).replace('\'', '\\\'')\n    intff['active_req']['crop'] = result\n    intff['info']['reqs_exec'] = intff['info']['reqs_exec'] + 1\n    with open(intf_path, 'w', encoding='utf8') as f:\n        f.write(json.dumps(intff, indent =4))\n    with open(exec_signal, 'w') as execf:\n        execf.write('')\n    return 0\npyjsx_run()",

                execPath   : "{0}/exec.pyw".re(self.instPath),
                execTime   : 180,
                extensions : ["py", "pyw"]

            })
        }),

        CSTR$Logger: (function(){

            $.global.Logger = function Logger(){};

            (function (self){

                I         = {};
                I.levels  = 
                {
                    NONSET: 0,
                    DEBUG: 10,
                    INFO: 20,
                    WARNING: 30,
                    ERROR: 40,
                    CRITICAL: 50
                };
                
                I.dttypes = 
                {
                    FULL     : "toString",
                    TIME     : "toTimeString",
                    TIMEONLY : "toLocaleTimeString",
                    WEEKDAY  : "toLocaleString"
                }
                
                I.mkFile  = function(path, str)
                {
                    return File(path).$write(str);
                }
                
                I.writeMsg = function(str, mode)
                {
                    File(self.path).$write(str, mode || "a");
                }
            
                I.getMsg = function(msg, lvl, noww)
                {
                    return "{0}:{1}:{2}\n".f(noww, lvl, msg);
                }
            
                I.now    = function()
                {
                    return new Date(Date.now())[I.dttypes[self.dttype]]();
                }
            
                I.getScriptName = function(){
                    return $.stack.split("\n")[0].replace(/\[|\]/g, "");
                }
            
                I.getScriptPath = function(){
                    return File($.stack).fsName;
                }
            
                self.config = function(cfg)
                {
                    if(cfg.isnt(Object)) cfg = {};
            
                    if(cfg.name.isnt(String))     cfg.name    = I.getScriptName();
                    if(cfg.path.isnt("Path"))     cfg.path    = I.getScriptPath();
                    if(cfg.level.isnt(Number))    cfg.level   = 0;
                    if(cfg.dttype.isnt(String))   cfg.dttptye = "TIME";
                    if(cfg.format.isnt(String))   cfg.format  = "*time:*level:*message";  
                    if(cfg.enabled.isnt(Boolean)) cfg.enabeld = true;
                }
            
                self.make = function(){ I.mkFile(self.path, ""); }
            
                for (k in I.levels) if(k != "NONSET"){
                    
                    self[k.toLowerCase()] = Function("msg", (function(){
            
                        if(this.enabled && (this.level <= I.levels[$lvl]))
                        {
                            I.writeMsg(I.getMsg($lvl, msg, I.now()) , "a");
                        }
                    }).replace("$lvl", k));
                }
            
            }($.global.Logger));

        }),

        CSTR$Xester: (function(){
   
            $.global.Xester = function Xester(){}

            Xester.T =  "✔️";
            Xester.F =  "❌";
            
            Xester.test =  function(H, tests)
            {
                for(t in tests) if(tests.hasOwnProperty(t))
                {
                    $.writeln("{0} {1}".re(tests[t].call(H)? Xester.T: Xester.F, t));
                }
            }
        }),

        //------ END CSTR --------------

        //------- WRPR -----------------
        WRPR$SShape: (function(){
            
            $.global.SShape = function SShape(cfg)
            {
                var shape = new Shape();
            
                shape.inTangents  = cfg.inTangents;
                shape.outTangents = cfg.outTangents;
                shape.vertices    = cfg.vertices;
                shape.closed      = cfg.closed;
            
                return shape;
            };
        }),

        WRPR$TTextLayer: (function(){

        }),

        WRPR$WWindow: (function()
        //[REQUIRES Window.prototype, Array.prototype, Function.prototype]
        {
            $.global.WWindow = function WWindow(cfg)
            {
                // $.log("win Cfg: " + cfg.toSource())
                var ww = new Window(cfg.type || "palette", cfg.title || "untitled");
        
                if(typeof cfg.banner != "undefined")
                {
                    switch(cfg.banner.type)
                    {
                        case "ANIMATED":
                            Window.prototype.addAnimatedSequence.call(ww, cfg.banner.folder, cfg.banner.idx);
                            break;
                        default: break;
                    }
                };
        
                cfg.children.forEach(function(child){
        
                    switch(child.type)
                    {
                        case "edittext":
                            
                            b = ww.add("edittext", undefined, child.text, {
                                multiline : child.multiline  || false,
                                borderless: child.borderless || false,
                                name: child.name
                            });
                            b.preferredSize = child.size;
                            break;
        
                        case "button":
                            b = ww.add("button", undefined, child.text);
                            b.onClick = child.onClick.bind(b);
                            break;
        
                        default:
                            break;
                    }
                });
        
                return ww;
            }

        })
    }
})($.global, {toString: function(){return "xto"}});
