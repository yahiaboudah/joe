/***********************************************************************************
		Name:           xto
		Desc:           A helper framework for Extendscript and AE.
		Created:        2110 (YYMM)
		Modified:       2111 (YYMM)
        
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

    var TODO = 
    [
        "Object.getKeyByValue",
        "Object.getKeysByValue",
        "ShapeLayer.prototype.reverseEngineer",
        "ShapeLayer.prototype.clone",
        "Object.getPrototypeOf",
    ]
    
    var YOLO = "youwillneverguessthispassword";
    var FUNS = {};
    var BASC = (function(){
        /*
        delete(Object.rm);
        Object.rm = function(mo)
        {
            eval([
                
                mo + "= undefined",
                "delete( " + mo + ")"
        
            ].join(";"))
        } */            

        delete(Object.prototype.in);
        Object.prototype.in = function(oo)
        {
            switch(oo.constructor)
            {
                case Object:
                    return oo.hasOwnProperty(this);
                
                case Array:
                    for(var i=0; i<oo.length; i++)
                    {
                        if(oo[i] == this) return true;
                    }
                    return false;
                
                default:
                    return false;
            }
        }

        delete(Object.prototype.re);
        Object.prototype.re = function(/*replacements*/)
        {
            // get args array:
            var fargs = Array.prototype.slice.call(arguments);
            if(!fargs) return this;

            //toString() the args
            for(a in fargs) if(fargs.hasOwnProperty(a)){
                if(fargs[a] === undefined){
                    fargs[a] = "undefined";
                    continue;    
                }
                fargs[a] = fargs[a].toString();
            }
            
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

            return this;
        }
        
        delete(Object.prototype.is);
        Object.prototype.is = function()
        {
            var O = this, T;

            var A = Array.prototype.slice.call(arguments),
                T = (O === undefined || O === null)?
                    undefined: 
                    this.constructor; //type

            var i = -1;
            while(++i<A.length) if(T == A[i]) return true;
        
            return false;
        }

        //=============================
        delete(Object.prototype.se);
        Object.prototype.se = function()
        {
            var that = this;

            var indent        = 0,
                defaultIndent = 8;

            var space = function(n){
                var s = "";
                while(n--) s+= " ";
                return s;
            }
            
            function _se(k, dt)
            {
                if(!!dt) indent = dt;
                var str = "",
                    kC  = k.constructor.name;

                switch(kC)
                {
                    case "Object":
                    case "Array":
                    
                        str += 
                            {
                                Array:  space(indent) + "[\n",
                                Object: space(indent) + "{\n"    
                            }[kC];

                        var v,
                            C,
                            LINK    = " : ";
                            vindent = indent;

                        for(x in k) if(k.hasOwnProperty(x))
                        {
                            v = k[x];
                            C = v.constructor.name;
                            LINK += "[" + C + "] ";

                            if( C == "Object"
                            ||  C == "Array")
                            {
                                vindent += defaultIndent;
                                LINK += "\n";
                            }
                            
                            str += (
                                    space(indent) 
                                    + x
                                    + LINK
                                    + _se(v, vindent)
                                    + "\n"
                                    );

                            LINK = " : ";
                            vindent = indent;
                        }

                        str += 
                            {
                                Array :  space(indent) + "]",
                                Object:  space(indent) + "}"
                            }[kC];

                        indent -= defaultIndent;
                        if(indent < 0) indent = 0;
                        break;

                    default:
                        str = k.toString();
                        break;
                }
                
                return str;
            }

            return (
                  "-----------------------"
                + "\n"
                + _se(that)
                + "\n"
                + "======================="
            )
        }

        //=====================================
        //-------------------------------------
        //------------- EXTRA -----------------

        $.global.is = function(what)
        {
            var A = Array.prototype.slice.apply(arguments, 1);
            return Object.prototype.is.apply(what, A);
        }

        Object.prototype.slice = function(n)
        {
            return Array.prototype.slice.call(this, n);
        }
    });

    var EXTO =
    {
        MATH:
        {
            MATH:
            {
                PRFX: "$.global.Math.",
                DEPS:[],
                FUNS:[
                    "degreesToRadians",
                    "radiansToDegrees",
                    "mult"
                ]
            },

            COMPLEX:
            {
                PRFX: "$.global.",
                DEPS: [],
                FUNS:[
                    "Complex"
                ]
            },

            MATRIX:
            {
                PRFX: "$.global.",
                DEPS:[],
                FUNS:[
                    "Matrix"
                ]
            },

            BEZIER:
            {
                PRFX:"$.global.", 
                DEPS:[],
                FUNS:[
                    "Bezier"
                ]
            }
        },

        $$$$:
        {
            Data:
            {
                PRFX: "$.",
                DEPS: [],
                FUNS: 
                [
                    "log",
                    "ser",
                    "deser",
                    "http"
                ]
            },

            Dbug:
            {
                PRFX: "$.",
                DEPS: [],
                FUNS: [
                    "inside",
                    "scan",
                    "inspect",
                ]
            },

            Misc:
            {
                PRFX: "$.",
                DEPS: [],
                FUNS: [
                    "$colorPicker",
                    "$sleep",
                    "getClipbaord", "setClipboard", "clearClipboard",
                    "cmd", "wget"
                ]
            }
        },

        PRIM:
        {
            String:
            {
                PRFX: "String.prototype.",
                DEPS: [],
                FUNS: [
                    "inspectFF", "checkFF",
                    "startsWith", "padding",
                    "replaceSeq", "fstr", "_replace",
                    "title", "trim", "pushAt",
                    "*"
                ]
            },

            Array:
            {
                PRFX: "Array.prototype.",
                DEPS: [],
                FUNS: 
                [
                    "range",
                    "oneDimIndexFunc", "twoDimIndexFunc",
                    
                    "forEach", "forEvery",
                    "indexOf", "remove", "includes", 
                    "rotate", 
                    "reduce", "map", 
                    "fliter", "select",
        
                    "max", "min", "sortedIndices", "math2D", "sum",
        
                    "upIndex", "bottomIndex", "leftIndex", "rightIndex",
                    "upperLeftIndex", "upperRightIndex", "bottomRightIndex", "bottomLeftIndex",
        
                    "+", "-", "*", "/", "^"
                ]
            },

            Function:
            {
                PRFX: "Function.prototype.",
                DEPS: [],
                FUNS: 
                [
                    "bind",
                    "body",
                    "time",
                    "getArgs",
                    "params",
                    "check"
                ]
            },

            Number:
            {
                PRFX: "Number.prototype.",
                DEPS: [],
                FUNS: [
                    "isOdd", "isEven",
                    "floor", "ceiling"
                ]
            },

            Object:
            {
                PRFX: "Object.",
                DEPS: [],
                FUNS: [
                    "keys", "newKeys", "extend", "size",
                    "getValue", "getPrototypeOf", "has", "inspect", "type", //inspect
                    "print", "write", //show

                    "dcKeys", "validate", "validateKeys", // validate
                    
                    "modify", //modify
                    
                    "create","newObject", "fromEntries", // create
                ]
            }
        },

        DATA:
        {
            File:
            {
                PRFX: "File.prototype.",
                DEPS: [],
                FUNS: [
                    //basic operations:
                    "isOpen", "$open", "$write", "$read", "$close", "clear",
                    "$seek", "create", "$execute",
                    
                    //listeners
                    "listenForChange", "listenForChar", "listen",
        
                    //getters:
                    "getLines",
                    "getDuration", "getName", "getExtension", "getType"
                ]
            },

            Folder:
            {
                PRFX: "Folder.prototype.",
                DEPS: [],
                FUNS : 
                [
                    //clear
                    "clearFolder", "$remove",
                    //getters
                    "getFolders", "$getFiles"
                ]
            },

            Socket:
            {
                DEPS: [],
                FUNS: [
                    //wow such empty!
                ]
            }
        },

        AFFX:
        {
            Global:
            {
                PRFX: "$.global.",
                DEPS: [],
                FUNS: [
                    "_MN",
                    "AECMD",
                    "EXPRESSIONS_LIB"
                ]
            },

            App:
            {
                PRFX: "$.global.",
                DEPS: [],
                FUNS: [
                    "getSpecifier",
                    "makeAnimMarkers",
                    "wrapUndo",
                    "doUndo",
                ]
            },

            CompItem:
            {
                PRFX: "CompItem.prototype.",
                DEPS: [],
                FUNS: 
                [   //droppers
                    "drop", "importAndDrop",

                    //setters:
                    "setTime", "setResolution",

                    //getters
                    "snap", "sel", "getLayersWith", "getResolution", "workAreaDomain",
                    "getAOV", "getProjectedZ", "getViewMatrix", "getZoom",
                    "getActiveAOV", "getActiveProjectedZ", "getActiveViewMatrix",
                ]
            },

            Camera:
            {
                PRFX: "Camera.prototype.",
                DEPS: [],
                FUNS: [
                    "getAOV", "getWorldMatrix", "getLocalMatrix",
                    "getProjectedZ", "getViewMatrix"
                ]
            },

            ItemCollection:
            {
                PRFX: "ItemCollection.prototype.",
                DEPS: [],
                FUNS: [
                    "toArray", "grab"
                ]
            },

            LayerCollection:
            {
                PRFX: "LayerCollection.prototype.",
                DEPS: [],
                FUNS: 
                [
                    "toArray", "grab",

                    "$add", 
                    "axis", "dynamicLine", "point", "code", "plot" 
                ]
            },

            AVLayer:
            {
                PRFX: "AVLayer.prototype.",
                DEPS: [],
                FUNS: [
                    "clone", "transformIt", "getType", 
                    "getMatrixOf", "getLocalMatrix", "getWorldMatrix", "getLookAt", "getModalMatrix", "getModalViewProjection", 
                    "toComp", "toWorld",
                    "addProp", "getProp", "removeProp"
                ]
            },

            ShapeLayer:
            {
                PRFX: "ShapeLayer.prototype.",
                DEPS: [],
                FUNS: 
                [
                    //BASIC: 
                    "clone", "transformIt", "getType", 
                    "getMatrixOf", "getLocalMatrix", "getWorldMatrix", "getLookAt", "getModalMatrix", "getModalViewProjection", 
                    "toComp", "toWorld",

                    "addProp", "getProp", "removeProp",
                    "alpha",
                    "area", "areas",
                    "distances",
                    "moveFirstVertex",
                    "grabProps",
        
                    "stroke", "fill"
                ]
            },

            TextLayer:
            {
                PRFX: "TextLayer.prototype.",
                DEPS: [],
                FUNS: 
                [
                    //BASIC: 
                    "clone", "transformIt", "getType", 
                    "getMatrixOf", "getLocalMatrix", "getWorldMatrix", "getLookAt", "getModalMatrix", "getModalViewProjection", 
                    "toComp", "toWorld",

                    "addProp", "getProp", "removeProp",

                    "cofig",
                    "animator",
                    "fromJSONAndMarkersOf"
                ]
            },

            PropertyGroup:
            {
                PRFX: "PropertyGroup.prototype.",
                DEPS: [],
                FUNS: [
                    "is", "isnt",
                    "containingComp",
                    "properties",
                    "moveFirstVertex", "mFirstIndex",
                    "$nearestKeyIndex",

                    //TextPropertyGroup:
                    "addTextFill", "addExpressionSelector",

                    "getParent", "copyPropertiesTo"
                ]
            },
        },

        SCUI:
        {
            Window:
            {
                PRFX: "Window.prototype.",
                DEPS: [],
                FUNS: 
                [
                    "addAnimatedSequence",
                    "playAudio"
                ]
            },

            DropDownList: 
            {
                PRFX: "DropDownList.prototype.",
                DEPS: [],
                FUNS: [
                    "makeGroupVisible"
                ]
            },

            XYLayout:
            {
                PRFX: "$.global.",
                DEPS: [],
                FUNS: [
                    "CustomLayout",
                    "XYLayout"
                ]
            }
        },

        CSTR:
        {
            Table:
            {
                PRFX: "$.global.",
                DEPS: ["MATH$COMPLEX", "MATH$MATH"],
                FUNS: [
                    "Table"
                ],
                INFO: {
                    FUNS:
                    [           
                        "Table.fNamePatt", "Table.process", "Table.removeAll",
                        "toString",
                        "getMaxRowSizes", "maxColumnSizes",
                        "format", "render",
                        "write", "show"
                    ] 
                }
            },

            Path:
            {
                PRFX: "$.global.",
                DEPS: [],
                FUNS: [
                    "Path"
                ]
            },

            Python:
            {
                PRFX: "$.global.",
                DEPS: [
                    "$$$$$Misc",
                    "DATA$File",
                    "DATA$Folder"
                ],
                FUNS: [
                    "Python"               
                ],
                INFO: {
                    FUNS: [
                    
                    "Python.installed",

                    "Python.execStr",
                    "Python.execPath",
                    "Python.extensions",
                    
                    "Python.prototype.execTime",
                    "Python.prototype.functions",
                    
                    "Python.prototype.makeExec",
                    "Python.prototype.viewExec",
                    "Python.prototype.editExec",
                    "Python.prototype.runExec",
                    
                    "Python.prototype.install",
                    "Python.prototype.repair",
                    "Python.prototype.uninstall",
                    
                    "Python.prototype.call",
                    "Python.prototype.contact",
                    "Python.prototype.build",
                    ]
                }
            },

            FileInterface:
            {
                PRFX: "FileInterface.prototype.",
                DEPS: [],
                FUNS: 
                [
                    "validate",
                    "make", "set", "get", "modify",
                    "post", "crop" 
                ]
            },

            Logger:
            {
                PRFX: "$.global.",
                DEPS: [],
                FUNS: 
                [
                    "Logger"
                ]
            },

            Xester:
            {
                PRFX: "$.global.",
                DEPS: [],
                FUNS: [
                    "Xester"
                ]
            }
        },

        WRPR:
        {
            SShape:
            {
                PRFX: "$.global.",
                DEPS: [],
                FUNS: [
                    "SShape"
                ]
            },

            WWindow:
            {
                PRFX: "$.global.",
                DEPS: [],
                FUNS: [
                    "WWindow"
                ]
            }
        }
    }

    H[S] = S;
    // BY-DEFAULT: load BASC [is, in, re, xt, se]
    //---------------------
    BASC.call($.global);//|
    //---------------------

    S.LOADED = 
    {
        asModule: [],
        asDepend: {}
    }

    // [LOADERS]:
    S.xt({

        load: function(what)
        {
            S.LOADED.asModule.push(what);
        
            // Deal with DEP:
            // First preprocess the name:
            var pWhat = what.split('$'), eWhat = EXTO, k =-1;

            for(;++k<pWhat.length;) eWhat = eWhat[pWhat[k]];

            var deps = eWhat? eWhat.DEPS:{}, i=-1;
            for(;++i<deps.length;)
            {
                n = deps[i];
                //NO FUNS[n]? continue:
                if(!(f = FUNS[n])) continue;
                
                //LOADED? add parent to LOADED.asDepend[n], continue:
                if(n.in(S.LOADED.asDepend))
                {
                    S.LOADED.asDepend[n].push(what);
                    continue;
                }
                //NOT LOADED? add to S.LOADED.asDepend ({dep: [parent]}):
                S.LOADED.asDepend[n] = [what];
                f.call($.global);
            }
    
            FUNS[what.toUpperCase()].call($.global);
        },

        unload: function(what)
        {
            S.LOADED[
                what.in(S.LOADED.asModule)?"asModule":
                what.in(S.LOADED.asDepend)?"asDepend": ($.err = "wtf?")
            ].remove(what);
    
            //===============
            //=== UNLOAD ====
            var arr = TREE[what].FUNS, i=-1;
            for(;++i<arr.length;)
            {
                eval([
                    "delete(" + arr[i] + ")",
                    arr[i] + "= undefined;"
                ].join(";"))
            }
            //================
    
            // UNLOAD DEPS:
            var parentArr = [];
            for(var k in S.LOADED.asDepend) if(k.in(S.LOADED.asDepend))
            {
                parentArr = S.LOADED.asDepend[k];
                if(what.in(parentArr))
                {
                    parentArr = parentArr.remove(what);
                    S.LOADED.asDepend[k] = parentArr;
                    if(!parentArr.length) S.unload(k);
                }
            }
        }
    })

    // [INFO]
    S.xt({

        version: '1.0.2',
        
        getTODO: function()
        {
            return TODO;
        },

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
        }
    })

    //[DEBUG/EXAMINE]
    S.xt({
        
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
    
            FUNS[what] = fn;
        }
    })

    FUNS =
    {

        /*
            ██████╗  █████╗ ███████╗██╗ ██████╗
            ██╔══██╗██╔══██╗██╔════╝██║██╔════╝
            ██████╔╝███████║███████╗██║██║     
            ██╔══██╗██╔══██║╚════██║██║██║     
            ██████╔╝██║  ██║███████║██║╚██████╗
            ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝ ╚═════╝
        
            ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
            ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
        */

        /*
            ╔╦╗╔═╗╔╦╗╦ ╦
            ║║║╠═╣ ║ ╠═╣
            ╩ ╩╩ ╩ ╩ ╩ ╩
        */

        MATH$MATH: (function()
        {
            Math.xt({
                
                degToRad : function(D)
                {
                    return D * Math.PI / 180;
                },
            
                radToDeg : function(R)
                {
                    return R * 180 / Math.PI;
                },

                mult : function()
                {    
                    var A = arguments.slice(); 
                    var i = A.length, k = 1;
                    while(i--) k *= A[i];
                
                    return k;
                }
            })
        }),

        MATH$COMPLEX : (function(){

            $.global.Complex = function Complex(re, im)
            {
                this.x = +re;
                this.y = +im;
            }

            Complex.prototype.xt({

                toString: function()
                {
                    return "{0}{2}{1}{3}".re(
                        this.x,
                        this.y?this.y:'',
                        this.y>0?'+':this.y==0?'':'-',
                        this.y?this.y:'i'
                        );
                },

                valueOf: function()
                {
                    return !this.y?
                            this.x:
                            NaN;
                },

                magnitude: function()
                {
                    var x = this.x, y = this.y;
                    return Math.sqrt(x*x + y*y);
                },

                invert: function()
                {
                    var x = this.x, y = this.y;

                    if(!this) return NaN;
                    return (this)*(1/(x*x + y*y));
                },

                argumentRad: function()
                {
                    if(!this) return NaN;
                    return Math.atan2(this.y, this.x);
                },

                argumentDeg: function()
                {
                    return (180/Math.PI) * this.argumentRad();
                },

                def: function(z)
                {
                    return  z instanceof Complex?
                            z:
                            {x: +(z||0), y:0}
                },

                '+': function(z)
                {
                    var xy = this.def(z);

                    return new Complex(
                        this.x + xy.x,
                        this.y + xy.y
                    )
                },

                '-': function(z)
                {
                    if(!z) return new Complex(-this.x, -this.y);
                    return rev?
                            z + (-this):
                            (this + (-z));
                },

                '*': function(z)
                {
                    var xy = this.def(z);
                    
                    return new Complex(
                        this.x * xy.x - this.y * xy.y,
                        this.x * xy.y + this.y * xy.x
                    )
                },

                '/': function(z, rev)
                {
                    if(z instanceof Complex) return this*(z.invert());

                    return rev?
                            z * this.inv():
                            this * (1/z);
                },

                '==': function(z)
                {
                    var xy = this.def(z);
                    
                    return this.x == xy.x
                        && this.y == xy.y; 
                },

                '~': function()
                {
                    return new Complex(this.x, -this.y);
                },

                '^': function(n, rev)
                {
                    if(rev) return NaN;

                    if(n !== ~~n) return NaN;
                    if(n  == 0)   return Complex.UNITY;
                    if(n  <  0)   return 1/(this ^ (-n));
                    
                    var r = +this;
                    while(--n) r *= this;
                    
                    return r;
                },

                '<<': function(aDeg, rev)
                { // RIGHT TO LEFT ROTATION around [0, 0]
                    if(rev) return NaN;
                    if(!aDeg) return +this;

                    var a = aDeg * (Math.PI / 180);
                    var z = new Complex(Math.cos(a), Math.sin(a));

                    return this * z;
                },

                '>>': function(aDeg, rev)
                { // LEFT TO RIGHT ROTATION around [0, 0]
                    if(rev) return NaN;
                    return this << (-aDeg);
                }
            })
            
            Complex.xt({

                ZERO : new Complex(0, 0),
                UNITY: new Complex(1, 0),
                I    : new Complex(0, 1)
            })
        }),

        MATH$MATRIX: (function(){

            $.global.M = function M(A){
                
                this.numRows = A.length;
                this.numCols = A[0].length; 
            };

            // [OPERATOR OVERLOADING]
            M.prototype.xt({

                '*': function(K)
                {
                    var MX = this;

                    switch(K.constructor)
                    {
                        case Number:
                            MX.forEach(function(e){
                                return K * e;
                            })
                            break;
                        
                        case M:
                            // return result of Matrix
                            // multiplication
                            break;
                    }
                },

                '+': function()
                {

                }
            })

            // [ITERATORS]
            M.xt({

                forEach: function(cb)
                {

                }
            })

            // [PROPERTIES]
            M.xt({
                
                identity : function(dim)
                {
                    if(!(dim && dim.is(Number))) dim = 4;
                    
                    var mat = [], i = j = -1;
                    while(++i < dim)
                    {
                        mat[i] = [];
                        while(++j < dim) mat[i][j] = (i==j)?1:0;
                    }
                    
                    return new M(mat);
                }
            })
        }),
    
        MATH$BEZIER: (function(){
            
            $.global.Bezier = function Bezier(coords)
            {
                this.points = Array.clone(coords);
                this.degree = this.points.length -1;

                this.start = coords[0];
                this.end   = coords[coords.length-1];
                this.controls = (coords.shift(), coords.pop(), coords);
            }

            // [VALUE AT T]
            Bezier.prototype.xt({

                pointsWithStep: function(step, method)
                {
                    var P = [], p;
                    var t = 0, tn = 1;

                    if(!(step && step.is(Number))) step = 0.1; 
                    step = Math.abs(step <= 1?step:(1/step));

                    for(;t <= tn; t += step)
                    {
                        p = this["{0}_pointAt".re(method || 'M')](t);
                        P.push(p);
                    }

                    return P;
                },

                // w/ DeCastaljau's algorithm:
                DC_pointAt: function DC(t, p)
                {
                    if(!(p && p.is(Array))) p = this.points;

                    var len = p.length;
                    if(len == 1) return p[0];

                    var pp = [], i = -1;
                    while(++i<len-1)
                    {
                        pp[i] = (1-t) * p[i] + t * p[i+1];
                    }

                    DC(t, pp);
                },

                // w/ Bernstein polynomials:
                BR_pointAt: function(t)
                {
                    var P = this.points;

                    var sum = 0, i = -1;
                    while(++i<=n) sum += (Bezier.Bernstein(i, n, t) * P[i]);

                    return sum;
                },

                // w/ Matrix operations:
                M_pointAt: function(t)
                {
                    // QUADRATIC BEZIER CURVE EXAMPLE:

                    var T = M([
                        [1, t, t^2]
                    ]);

                    var M = M([
                        [1 ,  0, 0],
                        [-2,  2, 0],
                        [1 , -2, 1]
                    ]);

                    var P = M(this.points);

                    return T * M * P;
                },
            })

            // [UTILITIES: BERNSTEIN, BINOMIAL COEFF..]
            Bezier.xt({

                mapToDistance: function(A, offset)
                {
                    if(!offset) offset = [0, 0];

                    var A = A;
                    for(x in A) if(x.in(A))
                    {
                        A[x] = Math.sqrt(
                                Math.pow(A[x][0] - offset[0], 2)
                              + Math.pow(A[x][1] - offset[1], 2)
                        );
                    }

                    return A;
                },

                // Binomial Coefficients:
                BC: function(n, i)
                {

                },

                Bernstein: function(i, n, t)
                {
                    return Bezier.BC(n, i) * ((1-t)^(n-i)) * (t^i);
                }
            })

            // [CRUVE SPLITTING]
            Bezier.prototype.xt({

                DC_split: function(t)
                {
                    var L = R = [];

                    var DC = function DC(z, p)
                    {
                        var len = p.length,
                            one = (len === 1);

                        L.push(p[0]);
                        R.push(one?p[0]:p[len-1]);
                        if(one) return;

                        var pp = [], i = -1;
                        while(++i<len-1)
                        {
                            pp[i] = (1-t) * p[i] + t * p[i+1];
                        }

                        DC(z, pp);
                    }

                    DC(t, this.points);
                    return [L, R];
                },

                M_split: function()
                {

                }
            })

            // [DEGREE ELEVATION]
            Bezier.prototype.xt({

                elevate: function()
                {
                    var P = this.points,
                        D = this.degree;

                    var Q = [P[0]];

                    var i = 0, s;
                    while(++i<=D)
                    {
                        s = (i/(D+1));
                        Q[i] = s*P[i-1] + (1-s)*P[i];
                    }

                    Q.push(P[D]);
                    return new Bezier(Q);
                },

                elevateN: function(n)
                {
                    var B = this;
                    while(n--) B = B.elevate();

                    return B;
                }
            })

            // [DERIVATIVE]
            Bezier.prototype.xt({

                // return a Bezier of order (D-1)
                derivative: function()
                {
                    var P = this.points,
                        D = this.degree;

                    var i = -1, PP = [];
                    while(++i<=(D-1))
                    {
                        PP.push(D*(P[i+1]-P[i]));
                    }

                    return new Bezier(PP);
                },

                // return derivative value
                deriv: function(t)
                {
                    return this.derivative().M_pointAt(t);
                }
            })

            // [CURVE ALIGNMENT]
            Bezier.prototype.xt({

                // A = R*T*P:
                alignAlongX: function()
                {
                    var P = this.points, Q;

                    // 1) Translate by -P0
                    var T = P[0] * -1;
                    for(p in P) if(p.in(P)) P[p] = P[p] + T;
                    
                    // 2) Rotate by θ (find θ first): x,y of last point
                    var x = P[P.length-1][0],
                        y = P[P.length-1][1];

                    var R = M([
                        [1/Math.sqrt(1+(y/x)*(y/x)), y/Math.sqrt(x*x+y*y)],
                        [-y/Math.sqrt(x*x+y*y), 1/Math.sqrt(1+(y/x)*(y/x))]
                    ]);
                    
                    Q = R * M(P);

                    return aligned = new Bezier(Q);
                }
            })

            // [BOUNDING BOXES]
            Bezier.prototype.xt({

                getXs: function()
                {
                    var P = this.points, Q;
                    for(x in P) if(x.in(P)) Q.push(P[x][0])

                    return Q;
                },

                getYs: function()
                {
                    var P = this.points, Q;
                    for(x in P) if(x.in(P)) Q.push(P[x][1])

                    return Q;
                },

                BBox: function(tightness)
                {
                    switch(tightness)
                    {
                        case 0: // do min/max of Bezier-polygon
                            break;
                        
                        case 1: 
                            // find roots of (x'(t) = 0) and (y'(t) = 0)
                            break;
                        case 2:
                            /*
                                1) Align the curve
                                2) Find roots of x'(t) = 0, y'(t) = 0
                                3) De-align the BBox back using -T and inv(R[θ])
                            */
                            break;
                    }
                    //return bounding box:
                    return [B0, B1]
                },

            })

            // [ARC LENGTH FUNCTION]
            Bezier.prototype.xt({

                // using curve FLattening 
                FL_length: function(n)
                {
                    var B = this;
                    
                    var i = -1, L = [];
                    while(++i<n)
                    {
                        L.push(B.M_pointAt((i+1)/n) 
                             - B.M_pointAt(i/n));
                    }

                    return Math.sum.apply(
                        null, 
                        Bezier.mapToDistance(L, [0,0])
                    );
                }
            })

            // [CURVATURE]
            Bezier.prototype.xt({


            })
        
        }),

        /*
            ╔╦╗╔═╗╦  ╦  ╔═╗╦═╗
             ║║║ ║║  ║  ╠═╣╠╦╝
            ═╩╝╚═╝╩═╝╩═╝╩ ╩╩╚═
        */

        $$$$$DATA: (function(){

            $.json = (function()
            {
                var JJ = {};
            
                "use strict";
            
                var rx_one = /^[\],:{}\s]*$/;
                var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
                var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
                var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
                var rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
                var rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
            
                function f(n)
                {
                    return "{0}{1}".re(
                        (n < 10)? '0': '',
                        n
                    )
                }
            
                function quote(string)
                {
                    rx_escapable.lastIndex = 0;
                    var isRxEsc = rx_escapable.test(string);
                    if(!isRxEsc) return "\"{0}\"".re(string);

                    return "\"{0}\"".re(string.replace(rx_escapable, function(a){
                        
                        var c = meta[a];
                        return c.is(String)
                               ? c
                               : "\\u" + ("0000" + a.charCodeAt(0).toString(16)) .slice(-4);
                    }));
                }
            
                function str(key, holder) 
                {        
                    var i;
                    var k;          
                    var v;          
                    var length;
                    var mind = gap;
                    var partial;
                    var value = holder[key];
            
                    if(value.is(Object) && value.toJSON.is(Function))
                    {
                        value = value.toJSON(key);
                    }

                    if(rep.is(Function)) value = rep.call(holder, key, value);
            
                    switch(typeof value)
                    {
                        case "string":
                            return quote(value);
                        
                        case "boolean":
                        case "number":
                            if(!isFinite(value)) return "null";
                        case "null":
                            return String(value);

                        case "object":
                            
                            if(!value) return "null";
                            gap += indent;
                            partial = [];

                            if(value.is(Array))
                            {
                                length = value.length, i = -1;
                                for(;++i<length;) partial[i] = str(i, value) || "null";
            
                                v = !partial.length? "[]"
                                    : gap ?
                                        "[\n{0}]".re(
                                            gap
                                            + partial.join(",\n" + gap) + "\n"
                                            + mind
                                        )
                                        : "[{0}]".re(partial.join(','));
                                gap = mind;
                                return v;
                            }
            
                            if(rep.is(Object))
                            {
                                length = rep.length, i = -1;
                                for (;++i<length;)
                                {
                                    if(rep[i].isnt(String)) continue;
                                    k = rep[i], v = str(k, value);
                                    if(!v) continue;
                                    partial.push("{0}:{1}{2}".re(quote(k), gap?" ":"", v));
                                }
                            } 
                            
                            else for(k in value) if(k.in(value))
                            {
                                v = str(k, value);
                                if(!v) continue;
                                partial.push("{0}:{1}{2}".re(quote(k), gap?" ":"", v));
                            }
            
                            v = !partial.length? "{}" : gap
                                ? "{\n{0}{1}\n{2}}".re(gap, partial.join(",\n" + gap), mind)
                                : "{{0}}".re(partial.join(","));
                            gap = mind;
                            return v;
                        }
                }
            
                // Date.prototype.toJSON = function ()
                // {
                //     return isFinite(this.valueOf())?
                //         (
                //             "{0}-{1}-{2}T{3}:{4}:{5}Z".re(
                //                 this.getUTCFullYear(),
                //                 this.getUTCMonth(),
                //                 this.getUTCDate(),
                //                 this.getUTCHours(),
                //                 this.getUTCMinutes(),
                //                 this.getUTCSeconds()
                //             )
                //         ) : null;
                // }
                
                // [Boolean.prototype, Number.prototype, String.prototype].xt({
                //     toJSON: function(){return this.valueOf()}
                // })

                var gap;
                var indent;
                var meta = 
                {    
                    "\b": "\\b",
                    "\t": "\\t",
                    "\n": "\\n",
                    "\f": "\\f",
                    "\r": "\\r",
                    "\"": "\\\"",
                    "\\": "\\\\"
                };
            
                var rep;
            
                JJ.stringify = function(value, replacer, space)
                {
            
                    rep = replacer;
                    var repCond = (replacer && typeof replace !== "function" &&(
                        typeof replacer !== "object" || typeof replacer.length !== "number"
                    ));
                    if(repCond) throw new Error("JJ.stringify");
            
                    var i      = -1,
                        gap    = "";
                        indent = "";
            
                    switch (typeof space)
                    {
                        case "string": indent = space; break;
                        case "number": for(;++i <space;) indent += " "; break;
                    }
            
                    return str("", {"": value});
                }
            
                JJ.parse = function (text, reviver)
                {
                    var j;
                    function walk(holder, key)
                    {
                        var k;
                        var v;
                        var value = holder[key];
                        if(value.is(Object)) for(k in value) if(k.in(value))
                        {
                            v = walk(value, k);
                            if(v.isnt(undefined)) value[k] = v;
                            else delete value[k];
                        }
                        return reviver.call(holder, key, value);
                    }
            
                    text = String(text);
                    rx_dangerous.lastIndex = 0;
                    
                    if (rx_dangerous.test(text))
                    {
                        text = text.replace(rx_dangerous, function (a) {
                            return (
                                "\\u"
                                + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                            );
                        });
                    }
            
                    if(
                        rx_one.test(
                            text
                                .replace(rx_two, "@")
                                .replace(rx_three, "]")
                                .replace(rx_four, "")
                        )
                    ){
                        j = eval("(" + text + ")");
                        return (typeof reviver === "function")
                            ? walk({"": j}, "")
                            : j;
                    }
            
                    throw new SyntaxError("JJ.parse");
                }
            
                return JJ;
            })();

            $.xt({
                
                clipboardLibFile: false,
                clipboardLib : 0,

                ser: function(data)
                {
                    return $.json.stringify(data);
                },

                deser: function(data)
                {
                    return $.json.parse(data);
                },

                http: function(config)
                {
                    function makeRequest($method, $url)
                    {
                        var request = 
                        [
                            "{0} {1} HTTP/1.0".re($method, $url.path),
                            "Connection: close",
                            "Host: {0}".re($url.host)
                        
                        ].join("\r\n"), header;
                
                        // PÄYLOAD:
                        config.payload || (config.payload = {});
                        if(typeof config.payload === "object")
                        {
                            config.payload = $.ser(config.payload);
                            config.headers = config.headers || {};
                
                            config.headers["Content-Type"]   = "application/json";
                            config.headers["Content-Length"] = config.payload.length;
                        }
                
                        // ADD [HEADER] INFO:
                        for(h in config.headers) request += "\r\n{0}: {1}".f(h, config.headers[h]);
                        return request;
                    }
                
                
                    var socket       = new Socket(),
                        URL_PATTERN  = (/^(.*):\/\/([A-Za-z0-9\-\.]+):?([0-9]+)?(.*)$/),
                        HTTP_PATTERN = (/^HTTP\/([\d\.?]+) (\d+) (.*)\r/),
                        HTTP_REGEX   = (/(.*): (.*)\r/g);
                
                    var url    = URL_PATTERN.exec(config.url),
                        method = config.method || 'GET';
                
                    //----------------------------------------------------------
                    if(!url)			 throw Error("UNABLE to parse URL"); //|
                    if(url[1] != "http") throw Error("ONLY scheme is HTTP"); //|
                    //----------------------------------------------------------
                
                    url =
                    {
                        scheme: 
                        url[1],
                        host  : url[2],
                        port  : url[3] || (url[1] == "https" ? 443 : 80),
                        path  : url[4]
                    }
                
                    var linkStr = "{0}:{1}".f(url.host, url.port),
                        isOpen  = socket.open(linkStr, "binary");
                    
                    //-------------------------------------------------------------
                    if(!isOpen) throw Error("Can't connect to {0}".f(linkStr)); //|
                    //-------------------------------------------------------------
                
                    
                    // WRITE THE [REQUEST]:
                    var req = makeRequest(method, url);
                
                    socket.write("{0}\r\n\r\n".f(req));
                    if(config.payload) socket.write(config.payload);
                
                
                    // [RESPONSE] HANDLING:
                    var payload, http = {};
                    for(var data = socket.read(); !socket.eof;)
                    {
                        data += socket.read();
                    }
                
                    var response = data.indexOf("\r\n\r\n");
                
                    //--------------------------------------------------------------------------
                    if(response == -1) throw Error("No HTTP payload found in the response.");//|
                    //--------------------------------------------------------------------------
                
                    response = data.substr(0, response);
                    payload  = data.substr(response + 4); // after response..
                
                    var http = HTTP_PATTERN.exec(response), header;
                    
                    //-----------------------------------------------------------------
                    if(!http) throw Error("No HTTP payload found in the response!");//|
                    //-----------------------------------------------------------------
                
                    http = 
                    {
                        ver           : Number(http[1]),
                        status        : Number(http[2]),
                        statusMessage : http[3],
                        headers       : {}
                    }
                
                    while(header = HTTP_REGEX.exec(response))
                    {
                        http.headers[header[1]] = header[2];
                    }
                
                    var contenttype = (http.headers["Content-Type"] || http.headers["content-type"] || '').split(";");
                    var charset     = config.charset || (contenttype[1] ? /charset=(.*)/.exec(contenttype[1])[1] : null);
                
                    if(charset) payload = payload.toString(charset);
                    contenttype = contenttype[0];
                
                    if(config.forcejson || contenttype == "application/json")
                    {
                        http.payload = $.deser(payload);
                    }
                
                    else http.payload = payload;
                    
                    return http;
                },

                wget: function(fp, link)
                {   // get images from the web with cmd utility: [WGET]

                    system.callSystem("cd {0} & wget -O {1} {2}".re(
                            
                            Folder(File(fp).path).fsName.replace(/\\/gi, '/'),
                            fp.replace(/\\/gi, '/'),
                            link
                    ));
                },

                chkClipboard: function(p)
                {
                    if(!$.clipboardLibFile)
                    {
                        var ff = File(p);
                        (ff.encoding = "UTF-8", ff.open('w'), ff.write($.clipboardLib), ff.close()); 
                        $.clipboardLibFile = true;
                        $.clipBoardLib = 0;
                    }
                },

                getClipboard: function(){
                    
                    var path = Folder.userData + "/xto$clipboard.dll";
                    
                    $.chkClipboard(path);
                    return (new ExternalObject("lib:" + path)).getClipboard();
                },

                setClipboard: function(){

                    var path = Folder.userData + "/xto$clipboard.dll";

                    $.chkClipboard(path);
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

                caller: function(){
                    
                    var stack = $.stack.split('\n'),
                        len   = stack.length;
                    
                    if(len == 4) return null;
                    return stack[len - 4] .split('(')[0];
                },

                $sleep: function(ms, msg){
                    
                    if(!ms) return;
                    if(msg && msg.is(String)){
                        $.writeln("{0}: Sleeping for {1}..".re(msg, ms));
                    }

                    $.sleep(ms);
                },

                log: function(msg)
                {
                    var fn = $.fileName.split('/').pop(),
                        fr = File("{0}/{1}.log".re(
                                Folder(File($.fileName).parent).fsName,
                                fn)
                             );
                    
                    return (
                        fr.encoding = "UTF-8", fr.open('a'), 
                        fr.write("\n{0}".re(msg || '')), 
                        fr.close()
                    );
                },

                inspect: function(k, detail)
                {
                    var io = 
                    {
                        type : typeof k,
                        cns  : k.constructor.name,
                        strr : k.toString(),
                        PPS  : k.reflect.properties,
                        FUNS : k.reflect.methods
                    }
                
                    if(io.cns == "Object")
                    {
                        var keys = [];
                        for(x in k) if(k.hasOwnProperty(x))
                        {
                            keys.push(x);
                            io.PPS.remove(x, function(z){return z.toString()});
                        }
                        io["keys"] = keys;
                    }
                
                    if(!detail)
                    {
                        io.PPS  = io.PPS.join(",");
                        io.FUNS = io.FUNS.join(",");
                        return io;
                    }

                    var ppo = {}, foo = {};
                    for(var i=-1; ++i<io.PPS.length;)  ppo[io.PPS[i]]  = obj[io.PPS[i]];
                    for(var i=-1; ++i<io.FUNS.length;) ffo[io.FUNS[i]] = obj[io.FUNS[i]].apply(obj, []);

                    return 
                    (
                        io.PPS  = ppo,
                        io.FUNS = ffo,
                        io
                    );
                
                },

                scan: function()
                {
                    return $.summary();
                }
            })

        }),

        $$$$$MISC: (function(){
            
            $.xt({

                frame: function(strr, chrc, entr)
                {
                    strr = (strr || "undefined").toString();
                    strr += strr.length%2? ' ':'';
                    entr = (entr && entr.is(Number))?entr:20;
                    chrc = (chrc || '■'); 
            
                    if(!String.prototype['*']) String.prototype.xt({
                        
                        '*': function(op, joinChar)
                        {
                            $.global.str = function(s){return new String(s)};

                            var ss = this, ts = [ss];
                            if(isNaN(op = Math.floor(op))) return ss;

                            while(op--) ts.push(ss);
                            return ts.join(joinChar);
                        },

                        isEmoji: function()
                        {
                            return this.length == 2;
                        }
                    })
            
                    var B   = str(chrc),
                        S   = str(" ");
                    
                    var EMOJ_WIDTH = B.isEmoji()? 1.8: 1;
                    var tsize = (entr * 2) + (((strr.length + 4) /chrc.length));
                    tsize /= EMOJ_WIDTH;
            
                    //####################################################
                    //#
                    var framo   = "{0}\n{1}\n{0}".re(
            
                        B * tsize,   // ■■■■■■
                        
                        "{0}{1}{0}".re( // ■       HELLO        ■
            
                            B * 2, // ■
                            "{0}{1}{0}".f((S * entr), strr) //      STR        
                        )
                    );
                    //#
                    //#####################################################
            
                    delete(String.prototype['*']);
                    delete(String.prototype.isEmoji);
                    return framo;
                },

                hexToRgb : function(hx)
                {
                    return [/*r*/(hx >> 16), /*g*/((hx & 0x00ff00) >> 8),/*b*/ (hx & 0xff), /*a*/(255)] / 255;
                },

                rgbToHex : function(rgb)
                {
                    var abc = 
                    {
                        a: (rgb[0] * 255).toString(16),
                        b: (rgb[1] * 255).toString(16),
                        c: (rgb[2] * 255).toString(16)
                    
                    }, hx;

                    for(x in abc) if(x.in(abc))
                    {
                        if(abc[x].length != 2) abc[x] = '0' + abc[x];
                    }
                    
                    for(x in abc) if(x.in(abc)) /**/ hx += abc[x]; /**/
            
                    return hx;
                },

                $colorPicker  : function(rgba)
                {
                    var hx = $.colorPicker();
                    return  rgba? $.hexToRgb(hx): hx;
                },

                cmd: function(myCommand, sp, sleep)
                {
                    var oo = system.callSystem((sp?"cmd /c \"{0}\"":"{0}").re(myCommand));
                    if(sleep && sleep.is(Number)) $.sleep(sleep);
                    return oo;
                },
                //===========================================================================
            })
        }),

        /*
            ╔═╗╦═╗╦╔╦╗╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
            ╠═╝╠╦╝║║║║ ║ ║ ║ ║╚╗╔╝║╣ ╚═╗
            ╩  ╩╚═╩╩ ╩ ╩ ╩ ╩ ╩ ╚╝ ╚═╝╚═╝
        */

        PRIM$OBJECT: (function(){

            Object.xt({

                adapt: function(ob, oo)
                {
                    for(x in oo) if(x.in(oo) && x.in(ob) && !!(k = ob[x]))
                    {
                        oo[x] = k;   
                    }
                
                    return oo;
                },

                values: function(oo)
                {
                    var arr = [];
                    for(x in oo) if(x.in(oo)) arr.push(oo[x]);

                    return arr;
                },

                keys: function(oo)
                {
                    var arr = [];
                    for(x in oo) if(x.in(oo)) arr.push(x);

                    return arr;
                },

                size: function(oo){
                    
                    var k = 0;
                    for (x in oo) if (x.in(oo)) k++;
                    return k;
                },

                dcKeys: function cKeys(a, b){

                    if(!(
                        
                        a && b &&
                        a.is(Object) && b.is(Object) &&
                        Object.size(a) == Object.size(b)

                    ))  return false;

                    for(x in a) if(x.in(a)){
                        
                        if(!x.in(b)) return false;
                        
                        if(a[x].is(Object))
                        {
                            if(!(
                                
                                b[x].is(Object) &&
                                Object.dcKeys(a[x], b[x])
                            
                            )) return false;
                        }
                    }

                    return true;
                },

                validate:  function(oo, bo)
                {   // I don't like this function
                    var type = function(v)
                    {
                        if(v.in([undefined, null])) return 'undefined';
                        if(typeof v == 'xml')       return 'xml';
                        return v.constructor.name.toLowerCase();
                    }
                
                    if(type(oo) != type(bo))  return false; 
                    if(type(oo) == 'object')  return Object.dcKeys(oo, bo);
                    if(type(oo) == 'array')   return !(oo<bo || oo<bo);
                
                    return (oo == bo);
                },

                validateKeys: function(oo, keys)
                {
                    for(k in keys) if(k.in(keys))
                    {
                        if(!Object.getValue(oo, k)) return false;
                    }

                    return true;
                },

                modify: function(oo, pp, v)
                {
                    var ks  = pp.split('/'),
                        seq = "oo";
                        
                    var i = -1, len = ks.length;
                    while(++i<len) seq += "[\"{0}\"]".re(ks[i]);;

                    eval("{0}={1};".re(seq, v.toString()));

                    return oo;
                },

                getValue: function(oo, pp)
                {
                    var ks  = pp.split('/'),
                        seq = "oo",
                        val;
                        
                    var i = -1, len = ks.length;
                    while(++i<len) seq += "[\"{0}\"]".re(ks[i]);;
                
                    eval("val={0};".re(seq));
                    return val;
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

                create: function(proto)
                {
                    function F(){}
                    F.prototype = proto;
                
                    return new F();
                },

                objectFromArray: function(arr)
                {    
                    var oo = {};
                    for(a in arr) if(a.in(arr) && a.is(Array)) oo[a[0]] = a[1];

                    return oo;
                },

                fromEntries: function(arr)
                {
                    var oo = {};
                    for(x in arr) if(x.in(arr)) oo[x] = '';

                    return oo;
                },

                inspect: function(oo)
                {
                    var ps = Object.fromEntries(oo.reflect.properties),
                        fs = Object.fromEntries(oo.reflect.methods);
                
                    for(x in ps) if(x.in(ps)) ps[x] = oo[x];
                    for(y in fs) if(y.in(fs)) fs[y] = "[\"\"] => {0}".re(oo[y].call(undefined, []));
                
                    return {
                        pp: ps,
                        ff: fs
                    };
                },

                rm : function(oo)
                {
                    eval([
                        "{0} = undefined",
                        "delete({0})"
                    ].join(";").re(oo))
                }

            })
        }),

        PRIM$ARRAY: (function()
        {
            Array.xt({

                range: function(n)
                {
                    var arr = [], i = -1;
        
                    while(++i<n) arr[i] = (i+1);
                    return arr;
                },

                clone: function(arr)
                {
                    return eval("[{0}]".re(String(arr)));
                }
            })

            // [Array Functions]
            Array.prototype.xt({

                forEach: function(cb, thisArg)
                {
                    if(!cb.is(Function)) throw TypeError("CB not a function");

                    var O = Object(this);
                    for(x in O) if(x.in(O)){

                        cb.apply(
                            thisArg || {}, 
                            [O[x], x, O].concat(arguments.slice())
                        )
                    }
            
                    return this;
                },

                indexOf: function(e, fromIdx) {
            
                    var k,
                        O = Object(this);
                        len = O.length >>> 0,
                        n = fromIdx | 0;
            
                    if(!len || len <= n) return -1;

                    k = Math.max(n >= 0 ? n : (len - Math.abs(n)),
                        0
                    )-1;

                    while(++k<len) if(k in o && o[k] === e) return k;

                    return -1;
                },

                includes: function(k)
                {
                    return this.indexOf(k) > -1;
                },

                remove: function(e, all)
                {
                    var k,
                        O = Object(this);
                        len = O.length >>> 0;
                    
                    k = -1;
                    while(++k<len) if(this[k] == e)
                    {
                        this.splice(i, 1);
                        if(!all) break;
                        len--; k--;
                    }

                    return this;
                },

                rotate: function(dir, k){
                    
                    var a = Array.clone(this);
                    switch(dir){
                        case "l": while(k--)    a.push(a.shift());
                        case "r": while(k-->-1) a.unshift(a.pop());
                    }
            
                    return a;
                },

                reduce: function(cb)
                {    
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
                },

                map: function(cb, thisArg)
                {
                    if(!cb.is(Function)) throw TypeError("CB not a function");

                    var k,O = Object(this),

                    A = new Array(O.length >>> 0);
                    for(k in O) if(k.in(O))
                    {
                        A[k] = cb.call(thisArg, O[k], k, O);
                    }
                    
                    return A;
                },

                forEvery: function(cb, thisArg)
                {
                    if(!cb.is(Function)) throw TypeError("CB not a function");

                    var k,O = Object(this);

                    for(k in O) if(k.in(O))
                    {
                        if(cb.call(thisArg, O[k], k, O) == false) return false;
                    }
                    
                    return true;
                },

                filter: function(cb, thisArg)
                {     
                    var k,O = Object(this), A;
                    
                    if(!cb.is(Function)) throw new TypeError("CB not a function");
            
                    for(k in O) if(k.in(O))
                    {
                        if(cb.call(thisArg, O[k], k, O)) A.push(O[k]);
                    }

                    return A;
                },

                select: function(cb, thisArg)
                {
                    return Array.prototype.filter.apply(this, [cb, thisArg]);
                },

                sortedIndices: function()
                {
                    var a = this;
                    return Array.range(a.length).sort(function(x,y){
                        return a[x-1] > a[y-1];
                    })
                }
            })

            // [MATH Related Functions]
            Array.prototype.xt({

                math2: function(type, xory)
                {
                    return Math[type].apply(null, this.map(function(x){
                        return x[xory]
                    }))
                },

                mapToDistance: function(offset)
                {
                    if(!offset) offset = [0, 0];

                    return this.map(function(v){
                        return Math.sqrt(
                            Math.pow(v[0] - offset[0], 2)
                          + Math.pow(v[1] - offset[1], 2)
                        )
                    })  
                },

                getIndex: function(type)
                {
                    var A = Object(this);
                    if(!type) return A[0];

                    if(type.is(Number))  return A.indexOf(type);
                    if(!type.is(String)) return A[0];

                    type = type.replace(/[^0-9a-zA-Z]/gi, "").toLowerCase();
                    
                    var minx = A.indexOf(A.math2('min',0)),
                        miny = A.indexOf(A.math2('min',1)),
                        maxx = A.indexOf(A.math2('max',0)),
                        maxy = A.indexOf(A.math2('max',1)),
                        m;

                    switch(type)
                    {
                        case "up"   : return maxy;
                        case "down" : return miny;
                        case "left" : return minx;
                        case "right": return maxx;
                        
                        case "upperLeft":                            
                            m = A.mapToDistance([minx,miny]);
                            return m.indexOf(Math.min.apply(null, m));

                        case "bottomLeft":
                            m = A.mapToDistance([minx,maxy]);
                            return m.indexOf(Math.min.apply(null, m));

                        case "upperRight":
                            m = A.mapToDistance([maxx,miny]);
                            return m.indexOf(Math.min.apply(null, m));

                        case "bottomRight":
                            m = A.mapToDistance([maxx,maxy]);
                            return m.indexOf(Math.min.apply(null, m));

                        default:
                            return A[0];
                    }
                }
            });

            // [Operator Overloading]:
            Array.prototype.xt({

                '+': function(v)
                {
                    var A = Object(this);
                    if(!(v && v.is(Array))) return A;
                    
                    var aLen = A.length,
                        vLen = v.length;
                    
                    var R = A.concat(v.slice(aLen));
                    if(aLen > vLen) aLen = vLen;

                    while(aLen--) R[aLen] += v[aLen];

                    return R;
                },

                '-': function(v)
                {
                    var A = Object(this);
                    if(!(v && v.is(Array))) return A;

                    for(x in v) if(x.in(v)) v[x] = -v[x];
                    return Array.prototype['+'].call(A, v);
                },

                '*': function(v)
                {
                    var A = Object(this);
                    var aLen = A.length >>> 0,
                        vLen = v.length >>> 0;
                    var R;
                    if(!v) return A;
                    
                    if(v.is(Number))
                    {
                        R = A.concat();
                        while(aLen--) R[aLen] *= v;
                        return R;
                    }

                    if(v.is(Array))
                    {
                        R = A.concat(v.slice(aLen));
                        if(aLen > vLen) aLen = vLen;

                        while(aLen--) R[aLen] *= v[aLen];

                        return R;
                    }

                    return A;
                },

                '/': function(v, rev)
                {
                    var A = Object(this);
                    if(!(v && v.is(Number)) || rev) return A;

                    return A * (1/v);
                }
            })
        }),

        PRIM$FUNCTION: (function(){
            
            // [BIND BODY TIME]
            Function.prototype.xt({
                
                bind: function(T/*thisArg*/) 
                {
                    var F = this;
                    var A = arguments.slice(1);
                
                    return function B()
                    {
                        var a = A.concat(arguments.slice());
                        var aLen = a.length, 
                            i    = -1;
                        
                        if(!this instanceof B) return F.apply(T, a);
                
                        var _a = [];
                        while(++i<aLen) _a.push('a[{0}]'.re(i));

                        return eval('new F({0})'.re(_a.join(',')));
                    }
                },
                
                body: function(repConfig)
                {   
                    var _replace = function(S, cfg)
                    {
                        var S = S;
                        for(x in cfg) if(x.in(cfg))
                        {
                            S = S.split(x).join(cfg[x])
                        }
                        return S;
                    }

                    return _replace(this.toString()
                               .replace(/^[^{]*\{[\s]*/,"    ")
                               .replace(/\s*\}[^}]*$/,""), repConfig);
                },
                
                time: function(thisArg, args, n)
                {
                    const MICS = 1000000;
                    var F = this;

                    var tt = 0, k  = n || 1;
                    while(k--)
                    {
                        $.hiresTimer;
                        F.apply(thisArg, args);
                        tt += $.hiresTimer;
                    }
                
                    return ((tt/n)/MICS);
                },
            })

            // [PARSING, CHECKING ARGS]
            Function.prototype.xt({
                
                getArgs: function(nocom)        /*
                * Get a function args 
                (eg. this.getArgs(Arguments.getArgs) => ["nocom"])
                */
                {  
                    if(!nocom) nocom = true;
                    return this.toString().split(/\)\/*/)[0]
                                    .replace(/^[^(]*[(]/, '')  
                                    .replace(/\s+/g, '')
                                    .replace(nocom?/\/\*([\s\S]*?)\*\//g:'','')
                                    .split(',');    
                },

                params: function()
                /** 
                * Extract parameter names and types.
                */
                {
                    var P = this.getArgs(), pLen = P.length;
                    var k = 0;
    
                    while(++k<pLen)
                    {
                        var p = P[k],
                            s = p.split("*/"),
                            z = s[0], o = s[1];
                        
                        P[k] = z.slice(0, 2) == "/*"?
                               "{0}:{1}".re(z.slice(2), o):
                               "Any:{0}".re(z);
                    }

                    return P;
                },

                check: function(/*Object*/ args, /*Boolean*/ opt, /*Boolean*/ lmt)
                { 
                    const BAD_ARG = "BadArg in {0}\nArg {1} is [{2}] and not [{3}]";
                    var S = $.stack.split("\n");

                    if(!(opt && opt.is(Boolean))) opt = false;
                    if(!(lmt && lmt.is(Boolean))) lmt = true;
    
                    var FName   = S[S.length - 3].split("(")[0],
                        FParams = this.params();
                    
                    if((g = args.length) != (p = FParams.length))
                    {
                        if(g>p && lmt)  throw Error("Extra Args were supplied in {0}.".re(FName));
                        if(g<p && !opt) throw Error("Missing args in {0}".re(FName)); 
                    }

                    for(i in args) if(i.in(args)) 
                    {
                            var _S  = FParams[i].split(':'),
                                PType = _S[0].toLowerCase(),
                                PName = _S[1];
                            
                            var AValue = args[i],
                                AType  = (!!AValue?AValue.constructor.name.toLowerCase():
                                         undefined);
    
                            if(
                                !AType ||
                                (PType).in(["any", AType])
                            ) continue;

                            throw Error(
                                BAD_ARG.re(
                                    FName,
                                    "[{1}:{0}]".re(PName, i),
                                    AType, PType
                            ));
                    }
                },

            })
        }),

        PRIM$STRING: (function()
        {
            // [FILE PATH RELATED OPERATIONS]
            String.prototype.xt({
                
                inspectPath: function()
                {
                    var S = this, 
                        P = S.split('/'), 
                        I, L;

                    I =
                    {
                        depth : P.length,
                        drive : S[1] == ':'?S[0]:undefined,
                        file  : 0,
                        folder: 0,
                    }
                    
                    if('.'.in(L = P.pop()))
                    {
                        I.valid = I.file = 1;
                        I.extens = L.split('.').pop();
                    }
                    else I.valid = I.folder = 1

                    return inspection;
                }
            })

            // [REPLACERS]
            String.prototype.xt({

                replaceSeq : function(C/*, str1, str2..*/)
                {
                    var startIdx = 1;
                    if(!C) C = '@'; startIdx = 0;

                    var S = this; // String
                    var A  = arguments.slice(startIdx), // Args
                        P  = new RegExp(C); // Pattern
                    
                    var i = 0;
                    while(S.search(P) != -1) S = S.replace(P, A[i++] || C);
                
                    return S;
                },
            
                _replace : function(R)
                {    
                    var S = this;
                    for(x in R) if(x.in(R)) S = S.split(x).join(R[x])

                    return S;
                },

                fstr : function() // "replace &1 with &2".fstr("me", "this")
                {
                    var S = this,
                        A = arguments.slice(),
                        P = /&/g;
                    
                    var li, no;
                    while(!!P.exec(S))
                    {
                      li = P.lastIndex -1;
                      no = S[li+1];
                      
                      if(isNaN(no)) continue;
                      S = S.pushAt(li, A[no-1], 1, 2);
                    }
                
                    return S;
                }
            })

            // [INFO / CHECKERS]
            String.prototype.xt({

                startsWith : function(S, P)
                {
                    P = P > 0 ? (P | 0) : 0;
                    return this.substring(P, P + S.length) === S;
                },
                
                padding : function()
                {
                    (pad = /^\s*/).exec(this);
                    return pad.lastIndex;
                }
            })

            // [SETTERS/ MODIFIERS]
            String.prototype.xt({
                
                title : function()
                {
                    var S = this;
                    return S.toUpperCase() + S.slice(1);
                },
                
                trim : function()
                {
                    return this.replace(/^\s*|\s*$/,'');
                },
                
                pushAt : function(atIndex, pushChar, Delete, numDelete)
                {
                    if(!Delete)    Delete = 1;
                    if(!numDelete) numDelete = 1;

                    var S = this, F,L; //String/First/Last

                    F = S.substring(0, atIndex);
                    L = S.substring(Delete? (atIndex + numDelete): atIndex);

                    return F + pushChar + L;
                }
            })

            // [OPERATOR OVERLOADING]:
            String.prototype.xt({
                
                '*' : function(op, joinChar)
                {
                    if(!$.global.str)
                    {
                        $.global.str = function(s){return new String(s)};
                    }
                
                    var S = this, FS = [S]; // String & FinalString
                    if(isNaN(op = Math.floor(op))) return S;
                    
                    while(op--) FS.push(S);
                    return FS.join(joinChar || "");
                }

            })
        }),

        PRIM$NUMBER: (function(){
            
            $.global.num = function(n){return new Number(n)}

            // [OPERATOR OVERLOADING]
            Number.prototype.xt({

                '^': function(v)
                {
                    var N = this;
                    return Math.pow(N, v);
                }
            })

            // [Range Functions]
            Number.prototype.xt({

                inRange: function(range, x, y)
                {   
                    // x,y if <= or < (strict or not)
                    var N = this;
                    x = x? (N >= range[0]): N > range[0];
                    y = y? (N <= range[1]): N < range[1];

                    return x && y;
                }
            })
        }),

        /*
            ╔╦╗╔═╗╔╦╗╔═╗
             ║║╠═╣ ║ ╠═╣
            ═╩╝╩ ╩ ╩ ╩ ╩
        */

        DATA$FILE: (function(){

            // [CATEGORIES AND TYPES]
            File.xt({

                CATEGORIES:[

                    "WEB",
                    "CODE",
                    "IMAGE",
                    "VIDEO",
                    "ARCHIV",
                    "TEXT",
                    "AUDIO",
                    "UNKNOWN"
                ],
    
                TYPES_BY_CATEGORY  : {0:"css less scss wasm ",6:"aac aiff ape au flac gsm it m3u m4a mid mod mp3 mpa pls ra s3m sid wav wma xm ", 1:"c cc class clj cpp cs cxx el go h java lua m m4 php pl po py pyw rb rs swift vb vcxproj xcodeproj xml diff patch html js jsx ","slide":"ppt odp ","sheet":"ods xls xlsx csv ics vcf ",2:"3dm 3ds max bmp dds gif jpg jpeg png psd xcf tga thm tif tiff ai eps ps svg dwg dxf gpx kml kmz webp ",4:"7z a apk ar bz2 cab cpio deb dmg egg gz iso jar lha mar pea rar rpm s7z shar tar tbz2 tgz tlz war whl xpi zip zipx xz pak ","book":"mobi epub azw1 azw3 azw4 azw6 azw cbr cbz ",5:"doc docx ebook log md msg odt org pages pdf rtf rst tex txt wpd wps ","exec":"exe msi bin command sh bat crx ","font":"eot otf ttf woff woff2 ",3:"3g2 3gp aaf asf avchd avi drc flv m2v m4p m4v mkv mng mov mp2 mp4 mpe mpeg mpg mpv mxf nsv ogg ogv ogm qt rm rmvb roq srt svi vob webm wmv yuv "},
                TYPES_BY_EXTENSION : {"ogm":3,"doc":5,"class":1,"js":1,"swift":1,"cc":1,"tga":2,"ape":6,"woff2":"font","cab":4,"whl":4,"mpe":3,"rmvb":3,"srt":3,"pdf":5,"xz":4,"exe":"exec","m4a":6,"crx":"exec","vob":3,"tif":2,"gz":4,"roq":3,"m4v":3,"gif":2,"rb":1,"3g2":3,"m4":1,"ar":4,"vb":1,"sid":6,"ai":2,"wma":6,"pea":4,"bmp":2,"py":1,"mp4":3,"m4p":3,"ods":"sheet","jpeg":2,"command":"exec","azw4":"book","otf":"font","ebook":5,"rtf":5,"ttf":"font","mobi":"book","ra":6,"flv":3,"ogv":3,"mpg":3,"xls":"sheet","jpg":2,"mkv":3,"nsv":3,"mp3":6,"kmz":2,"java":1,"lua":1,"m2v":3,"deb":4,"rst":5,"csv":"sheet","pls":6,"pak":4,"egg":4,"tlz":4,"c":1,"cbz":"book","xcodeproj":1,"iso":4,"xm":6,"azw":"book","webm":3,"3ds":2,"azw6":"book","azw3":"book","php":1,"kml":2,"woff":"font","log":5,"zipx":4,"3gp":3,"po":1,"mpa":6,"mng":3,"wps":5,"wpd":5,"a":4,"s7z":4,"ics":"sheet","tex":5,"go":1,"ps":2,"org":5,"sh":"exec","msg":5,"xml":1,"cpio":4,"epub":"book","docx":5,"lha":4,"flac":6,"odp":"slide","wmv":3,"vcxproj":1,"mar":4,"eot":"font","less":0,"asf":3,"apk":4,"css":0,"mp2":3,"odt":5,"patch":1,"wav":6,"msi":"exec","rs":1,"gsm":6,"ogg":3,"cbr":"book","azw1":"book","m":1,"dds":2,"h":1,"dmg":4,"mid":6,"psd":2,"dwg":2,"aac":6,"s3m":6,"cs":1,"cpp":1,"au":6,"aiff":6,"diff":1,"avi":3,"bat":"exec","html":1,"pages":5,"bin":"exec","txt":5,"rpm":4,"m3u":6,"max":2,"vcf":"sheet","svg":2,"ppt":"slide","clj":1,"png":2,"svi":3,"tiff":2,"tgz":4,"mxf":3,"7z":4,"drc":3,"yuv":3,"mov":3,"tbz2":4,"bz2":4,"gpx":2,"shar":4,"xcf":2,"dxf":2,"jar":4,"qt":3,"tar":4,"xpi":4,"zip":4,"thm":2,"cxx":1,"3dm":2,"rar":4,"md":5,"scss":0,"mpv":3,"webp":2,"war":4,"pl":1,"xlsx":"sheet","mpeg":3,"aaf":3,"avchd":3,"mod":6,"rm":3,"it":6,"wasm":0,"el":1,"eps":2}
            })

            // [BASIC FILE OPERATIONS]
            File.prototype.xt({
                
                isOpen : false,
            
                $open : function(mode)
                {
                    var cases = ['r', 'a', 'w', 'e'];

                    this.isOpen = this.open(
                        (cases.indexOf(mode) == -1)?
                        (File(this.fsName).exists? 'e': 'w'):
                        mode
                    )

                    return this;
                },
                
                $close : function()
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
                
                $execute : function(sleep, cb, doClose)
                {
                    if(is(doClose, undefined)) doClose = 0;

                    this.execute();

                    if(doClose) this.$close();
                    if(!!sleep) $.sleep(sleep);
                    if(cb && cb.is(Function)) cb.call(this);
        
                    return this;
                },
                
                lines : function()
                {
                    var L = [], F = this;
                    F.$open("r");

                    while(!F.eof) L.push(F.readln());
    
                    return (F.$close(), L);
                },
            })

            // [LISTEN/ WAIT OPERATIONS]
            File.prototype.xt({
                
                listenForModif : function(debug, wait, maxiter)
                {
                    if(!(is(maxiter, Number))) maxiter = 100;
                    if(!(is(wait, Number))) wait = 180;
                    if(!(is(debug, Boolean))) debug = false;
                    
                    var i = -1, lmod = this.modified;
                    while(++i<maxiter)
                    {
                        if(this.modified > lmod) break;
                        $.sleep(wait == 'exp'? ~~ Math.pow(2, (i+6)): wait)
                        if(debug) $.writeln(
                            "File not modified, sleeping for {0}..".re(wait)
                        );
                    }
                },
                
                listenForChar : function(chrc, pos, wait, maxiter, debug)
                {
                    if(!(is(maxiter, Number))) maxiter = 100;
                    
                    var i = -1;
                    while(++i<maxiter)
                    {
                        if(this.$open('r').$seek(pos).readch() == chrc) break;
                        else
                        {
                            $.sleep(wait == 'exp'? ~~ Math.pow(2, (i+6)): wait);
                            if(debug) $.writeln(
                                "Character not found, sleeping for {0}..".re(wait)
                            );
                        }
                    }
                    
                    this.$close();
                },
                
                listen : function(wait, debug, patience, cleanup)
                {
                    if(!(is(patience, Number))) patience = 60000;
    
                    var ttdelay = 0;
                    while(1)
                    {
                        if(this.exists) return (cleanup?this.remove():this);
                        if(ttdelay > patience) return;

                        $.sleep(wait == 'exp'? ~~ Math.pow(2, (i+6)): wait);
                        if(debug) $.writeln(
                            "File not found, sleeping for {0}..".re(wait)
                        );
                        ttdelay += delay;
                    }
                }
            })

            // [INFO/GETTERS]
            File.prototype.xt({
                
                getDuration : function()
                {
                    var F = this,
                        K, D;

                    if(!this.exists) return 0;
                    if(this.getType().in(["video", "audio"])) return 0;

                    K = app.project.importFile(new ImportOptions(F));
                    D = K.duration;
                    
                    K.remove(); K = null;
                    return D;
                },
                
                getName : function()
                {
                    return this.name.replace(/.[^.]+$/, "");
                },
                
                getExtension : function(toLower)
                {
                    var E = this.name.replace(/^.*\./, ""); 
                    return toLower?
                           E.toLowerCase():
                           E;
                },

                withExtension : function(extens, noReplace)
                // File("mylife.txt").withExtension("eps") ==> File: mylife.eps;
                {
                    return File(
                        noReplace? "{0}.{1}".re(this.fsName, extens):
                        "{0}.{1}".re(this.getName(), extens)
                    );
                },
                
                getType : function()
                {
                    return File.CATEGORIES
                    [ 
                        File.TYPES_BY_EXTENSION[this.getExtension(1)] || 7
                    
                    ].toLowerCase();
                }
            })

            // [AE RELATED OPERATIONS]
            File.prototype.xt({

                importAE: function(customName)
                {
                    if(app.appName != "After Effects") return;
                    // Item:
                    var I = app.project.importFile(new ImportOptions(this));
                    if(is(customName, String)) I.name = customName;

                    return I;
                }
            })

        }),

        DATA$FOLDER: (function()
        {

            // [REMOVERS/ CLEANERS]
            Folder.prototype.xt({
                                
                clearFolder : function(extens)
                {
                    var FD  = this,
                        ALL = is(extens, undefined)?1:0;

                    var FFS = FD.getFiles(), E, F;
                    for(x in FFS) if(x.in(FFS))
                    {
                        F = FFS[x];
                        E = F.fsName.split('.');
                        E = E[E.length-1];

                        if(F.is(File) && (A || E == extens)) F.remvoe();
                    }

                    return FD;
                }
            })

            Folder.prototype.xt({

                getF: function(what)
                {
                    var cfg = 
                    {
                        olders: Folder,
                        iles:   File
                    }

                    var FD = this,
                        A  = [];

                    var FFS = FD.getFiles(), F;
                    for(x in FFS) if(x.in(FFS))
                    {
                        F = FFS[x];
                        
                        if(F.is(cfg[what])) A.push(F);
                    }

                    return A; 
                },

                getMostRecent: function()
                {
                    var FD  = this,
                        FFS = FD.getFiles(), F, MR = -99999;
                    
                    for(x in FFS) if(x.in(FFS))
                    {
                        F = FFS[x];
                        if(F.modified > (FFS[x+1] || -9999))
                        {
                            MR = F.modified;
                        }
                    }
                }
            })
        }),

        DATA$SOCKET: (function(){

            Socket.prototype.xt({


            })
        }),

        /*
          ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
         ▓▓                          ▓▓
         ▓▓ █████╗ ██████╗ ██████╗   ▓▓
         ▓▓ ██╔══██╗██╔══██╗██╔══██╗ ▓▓
         ▓▓ ███████║██████╔╝██████╔╝ ▓▓
         ▓▓ ██╔══██║██╔═══╝ ██╔═══╝  ▓▓
         ▓▓ ██║  ██║██║     ██║      ▓▓
         ▓▓ ╚═╝  ╚═╝╚═╝     ╚═╝      ▓▓         
         ▓▓                          ▓▓
          ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
        */
        
        /*
            ┌─┐┬┌─┌─┐┬  ┌─┐┌┬┐┌─┐┌┐┌
            └─┐├┴┐├┤ │  ├┤  │ │ ││││
            └─┘┴ ┴└─┘┴─┘└─┘ ┴ └─┘┘└┘
        */

        AFFX$BridgeTalk: (function(){
            
            BridgeTalk.xt({
                
                formatFunction: function(target, func, args)
                {
                    new BridgeTalk.xt({
                        target: target,
                        body: "{0}({1});\n{2}"
                              .re(func.name, args.join(','), func.toString())
                    }).send();
                }
            })
        }),

        AFFX$App: (function(){


            // [AECMD NUMBERS]
            app.xt({
                AECMD: 
                {
                    SAVE_AS_FRAME: 2104
                }
            })

            // [MATCH NAMES FUNCTION: app.MN("Masks") => ..]
            app.xt({

                MN: function(P)
                {
                    const TOP_LEVEL = 
                    {
                        Marker: "ADBE Marker"    ,
                        Time_Remap: "ADBE Time Remapping",
                        Motion_Trackers: "ADBE MTrackers",
                        Masks: "ADBE Mask Parade",
                        Effects: "ADBE Effect Parade",
                        Essential_Properties: "ADBE Layer Overrides" 
                    },
                
                    TRANSFORM = 
                    {
                        Transform: "ADBE Transform Group",
                        Anchor_Point: "ADBE Anchor Point",
                        Position: "ADBE Position",
                        X_Position: "ADBE Position_0",
                        Y_Position: "ADBE Position_1",
                        Z_Position: "ADBE Position_2",
                        Scale: "ADBE Scale",
                        Orientation: "ADBE Orientation",
                        X_Rotation: "ADBE Rotate X",
                        Y_Rotation: "ADBE Rotate Y",
                        Z_Rotation: "ADBE Rotate Z",
                        Opacity: "ADBE Opacity"
                    },
                
                    AUDIO = 
                    {
                        Audio: "ADBE Audio Group",
                        Audio_Levels: "ADBE Audio Levels"
                    },
                
                    THREED = 
                    {
                        Geometry_Options: ["ADBE Plane Options Group", "ADBE Extrsn Options Group"],
                        Curvature: "ADBE Plane Curvature",
                        Segments: "ADBE Plane Subdivision",
                        Bevel_Depth: "ADBE Bevel Depth",
                        Hole_Bevel_Depth: "ADBE Hole Bevel Depth",
                        Extrusion_Depth: "ADBE Extrsn Depth"
                    },
                
                    THREEDMATERIALS = 
                    {
                        Material_Options: "ADBE Material Options Group",
                        Light_Transmission: "ADBE Light Transmission",
                        Ambient: "ADBE Ambient Coefficient",
                        Diffuse: "ADBE Diffuse Coefficient",
                        Specular_Intensity: "ADBE Specular Coefficient",
                        Specular_Shininess: "ADBE Shininess Coefficient",
                        Metal : "ADBE Metal Coefficient",
                        Reflection_Intensity: "ADBE Reflection Coefficient",
                        Reflection_Sharpness: "ADBE Glossiness Coefficient",
                        Reflection_Rolloff: ["ADBE Fresnel Coefficient", "ADBE Transp Rolloff"],
                        Transparency: "ADBE Transparency Coefficient",
                        Index_Of_Refraction: "ADBE Index of Refraction"
                    },
                
                    CAMERA =
                    {
                        Camera_Options: "ADBE Camera Options Group",
                        Zoom: "ADBE Camera Options Group",
                        Depth_Of_Field: "ADBE Camera Depth of Field",
                        Focus_Distance: "ADBE Camera Focus Distance",
                        Aperture: "ADBE Camera Aperture",
                        Blur_Level: "ADBE Camera Blur Level"
                    },
                
                    CAMERAIRIS = 
                    {
                        Iris_Shape: "ADBE Iris Shape",
                        Iris_Rotation: "ADBE Iris Rotation",
                        Iris_Roundness: "ADBE Iris Roundness",
                        Iris_Aspect_Ration: "ADBE Iris Aspect Ratio",
                        Iris_Diffraction_Fringe: "ADBE Iris Diffraction Fringe",
                        Hightlight_Gain: "ADBE Iris Highlight Gain",
                        Heighlight_Threshold: "ADBE Iris Highlight Threshold",
                        Highlight_Saturation: "ADBE Iris Hightlight Saturation"
                    },
                
                    LIGHT = 
                    {
                        Light_Options: "ADBE Light Options Group",
                        Intensity: "ADBE Light Intensity",
                        Color: "ADBE Light Color",
                        Cone_Angle: "ADBE Light Cone Angle",
                        Cone_Feather: "ADBE Light Cone Feather 2",
                        Falloff: "ADBE Light Falloff Type",
                        Radius: "ADBE Light Falloff Start",
                        Falloff_Distance: "ADBE Light Falloff Distance",
                        Shadow_Darkness: "ADBE Light Shadow Darkness",
                        Shadow_Diffusion: "ADBE Light Shadow Diffustion"
                    },
                
                    TEXT = 
                    {
                        Text: "ADBE Text Properties",
                        Source_Text: "ADBE Text Document",
                        Path_Options: "ADBE Text Path Options",
                        Reverse_Path: "ADBE Text Reverse Path",
                        Perpendicular_To_Path: "ADBE Text Perpendicular To Path",
                        Force_Alignment: "ADBE Text Force Align Path",
                        First_Margin: "ADBE Text First Margin",
                        Last_Margin: "ADBE Text Last Margin",
                        More_Options: "ADBE Text More Options",
                        Grouping_Alignment: "ADBE Text Anchor Point Align",
                        Animators: "ADBE Text Animators"
                
                        // ANIMATORS:
                
                        ,Animator: "ADBE Text Animator",
                        Selectors: "ADBE Text Selectors",
                        Range_Selector: "ADBE Text Selector",
                        Start: ["ADBE Text Percent Start", "ADBE Text Index Start"],
                        End: ["ADBE Text Percent End", "ADBE Text Index End"],
                        Offset: ["ADBE Text Percent Offset", "ADBE Text Index Offset"],
                        Advanced: "ADBE Text Range Advanced",
                        Mode: "ADBE Text Selector Mode",
                        Amount: "ADBE Text Selector Max Amount",
                        Smoothness: "ADBE Text Selector Smoothness",
                        Ease_High: "ADBE Text Levels Max Ease",
                        Ease_Low: "ADBE Text Levels Min Ease",
                        Random_Seed: "ADBE Text Random Seed",
                        Properties: "ADBE Text Animator Properties",
                        Anchor_Point: "ADBE Text Anchor Point 3D",
                        Position: "ADBE Text Position 3D",
                        Scale: "ADBE Text Scale 3D",
                        Skew: "ADBE Text Skew",
                        Skew_Axis: "ADBE Text Skew Axis",
                        X_Rotation: "ADBE Text Rotation X",
                        Y_Rotation: "ADBE Text Rotation Y",
                        Z_Rotation: "ADBE Text Rotation",
                        Opacity: "ADBE Text Opacity",
                        Fill_Opacity: "ADBE Text Fill Opacity",
                        Stroke_Opacity: "ADBE Text Stroke Opacity",
                        Fill_Hue: "ADBE Text Fill Hue",
                        Stroke_Hue: "ADBE Text Stroke Hue",
                        Fill_Saturation: "ADBE Text Fill Saturation",
                        Stroke_Saturation: "ADBE Text Stroke Saturation",
                        Fill_Brightness: "ADBE Text Fill Brightness",
                        Stroke_Brightness: "ADBE Text Stroke Brightness",
                        Stroke_Width: "ADBE Text Stroke Width",
                        Line_Anchor: "ADBE Text Line Anchor",
                        Tracking_Type: "ADBE Text Track Type",
                        Tracking_Amount: "ADBE Text Tracking Amount",
                        Character_Value: "ADBE Text Character Replace",
                        Character_Offset: "ADBE Text Character Offset",
                        Line_Spacing: "ADBE Text Line Spacing",
                        Blue: "ADBE Text Blur"
                
                
                        //THREE D:
                        ,Front_Color: "ADBE 3DText Front RGB",
                        Front_Hue: "ADBE 3DText Front Hue",
                        Front_Saturation: "ADBE 3DText Front Sat",
                        Front_Brightness: "ADBE 3DText Front Bright",
                        Front_Opacity: "ADBE 3DText Front Opacity",
                        Front_Ambient: "ADBE 3DText Front Ambient",
                        Front_Diffuse: "ADBE 3DText Front Diffuse",
                        Front_Specular_Intensity: "ADBE 3DText Front Specular",
                        Front_Specular_Shininess: "ADBE 3DText Front Shininess",
                        Front_Metal: "ADBE 3DText Front Metal",
                        Front_Reflection_Intensity: "ADBE 3DText Front Reflection",
                        Front_Reflection_Sharpness: "ADBE 3DText Front Gloss",
                        Front_Reflection_Rolloff: "ADBE 3DText Front Fresnel",
                        Front_Transparency: "ADBE 3DText Front Xparency",
                        Front_Transparency_Rolloff: "ADBE 3DText Front XparRoll",
                        Front_Index_Of_Refraction: "ADBE 3DText Front IOR",
                        Bevel_Color: "ADBE 3DText Bevel RGB",
                        Bevel_Hue: "ADBE 3DText Bevel Hue",
                        Bevel_Saturation: "ADBE 3DText Bevel Sat",
                        Bevel_Brightness: "ADBE 3DText Bevel Bright",
                        Bevel_Opacity: "ADBE 3DText Bevel Opacity",
                        Bevel_Ambient: "ADBE 3DText Bevel Ambient",
                        Bevel_Diffuse: "ADBE 3DText Bevel Diffuse",
                        Bevel_Specular_Intensity: "ADBE 3DText Bevel Specular",
                        Bevel_Specular_Shininess: "ADBE 3DText Bevel Shininess",
                        Bevel_Metal: "ADBE 3DText Bevel Metal",
                        Bevel_Reflection_Intensity: "ADBE 3DText Bevel Reflection",
                        Bevel_Reflection_Sharpness: "ADBE 3DText Bevel Gloss",
                        Bevel_Reflection_Rolloff: "ADBE 3DText Bevel Fresnel",
                        Bevel_Transparency: "ADBE 3DText Bevel Xparency",
                        Bevel_Transparency_Rolloff: "ADBE 3DText Bevel XparRoll",
                        Bevel_Index_Of_Refraction: "ADBE 3DText Bevel IOR",
                        
                        Side_Color: "ADBE 3DText Side RGB",
                        Side_Hue: "ADBE 3DText Side Hue",
                        Side_Saturation: "ADBE 3DText Side Sat",
                        Side_Brightness: "ADBE 3DText Side Bright",
                        Side_Opacity: "ADBE 3DText Side Opacity",
                        Side_Ambient: "ADBE 3DText Side Ambient",
                        Side_Diffuse: "ADBE 3DText Side Diffuse",
                        Side_Specular_Intensity: "ADBE 3DText Side Specular",
                        Side_Specular_Shininess: "ADBE 3DText Side Shininess",
                        Side_Metal: "ADBE 3DText Side Metal",
                        Side_Reflection_Intensity: "ADBE 3DText Side Reflection",
                        Side_Reflection_Sharpness: "ADBE 3DText Side Gloss",
                        Side_Reflection_Rolloff: "ADBE 3DText Side Fresnel",
                        Side_Transparency: "ADBE 3DText Side Xparency",
                        Side_Transparency_Rolloff: "ADBE 3DText Side XparRoll",
                        Side_Index_Of_Refraction: "ADBE 3DText Side IOR",
                
                        Back_Color: "ADBE 3DText Back RGB",
                        Back_Hue: "ADBE 3DText Back Hue",
                        Back_Saturation: "ADBE 3DText Back Sat",
                        Back_Brightness: "ADBE 3DText Back Bright",
                        Back_Opacity: "ADBE 3DText Back Opacity",
                        Back_Ambient: "ADBE 3DText Back Ambient",
                        Back_Diffuse: "ADBE 3DText Back Diffuse",
                        Back_Specular_Intensity: "ADBE 3DText Back Specular",
                        Back_Specular_Shininess: "ADBE 3DText Back Shininess",
                        Back_Metal: "ADBE 3DText Back Metal",
                        Back_Reflection_Intensity: "ADBE 3DText Back Reflection",
                        Back_Reflection_Sharpness: "ADBE 3DText Back Gloss",
                        Back_Reflection_Rolloff: "ADBE 3DText Back Fresnel",
                        Back_Transparency: "ADBE 3DText Back Xparency",
                        Back_Transparency_Rolloff: "ADBE 3DText Back XparRoll",
                        Back_Index_Of_Refraction: "ADBE 3DText Back IOR",
                
                        Bevel_Depth: "ADBE 3DText Bevel Depth",
                        Extrustion_Depth: "ADBE 3DText Extrude Depth"
                    },
                
                    SHAPE =
                    {
                
                        Shape_Layer: "ADBE Vector Layer",
                        Contents: "ADBE Root Vectors Group"
                        
                        //GROUP
                        ,Group: "ADBE Vector Group",
                        Blend_Mode: "ADBE Vector Blend Mode",
                        Contents: "ADBE Vectors Group",
                        Transform: "ADBE Vector Transform Group",
                        Material_Options: "ADBE Vector Materials Group"
                        
                        // RECT
                        ,Rectangle: "ADBE Vector Shape - Rect",
                        Shape_Direction: "ADBE Vector Shape Direction",
                        Size: "ADBE Vector Rect Size",
                        Position: "ADBE Vector Rect Position",
                        Roundness: "ADBE Vector Rect Roundness"
                
                        //ELLIPSE
                        ,Ellipseà: "ADBE Vector Shape - Ellipse",
                        EllipseàShape_Direction: "ADBE Vector Shape Direction",
                        EllipseàSize: "ADBE Vector Size",
                        EllipseàPosition: "ADBE Vector Position"
                
                        //POLYSTAR
                        ,Polystar: "ADBE Vector Shape - Star",
                        PolystaràShape_Direction: "ADBE Vector Shape Direction",
                        PolystaràType: "ADBE Vector Star Type",
                        PolystaràPoints: "ADBE Vector Star Points",
                        PolystaràPosition: "ADBE Vector Star Position",
                        PolystaràRotation: "ADBE Vector Star Rotation",
                        PolystaràInner_Radius: "ADBE Vector Star Inner Radius",
                        PolystaràOuter_Radius: "ADBE Vector Star Outer Radius",
                        PolystaràInner_Roundness: "ADBE Vector Star Inner Roundness",
                        PolystaràOuter_Roundness: "ADBE Vector Star Outer Radius"
                
                        //PATH
                        ,Path: "ADBE Vector Shape",
                        PathGroup: "ADBE Vector Shape - Group",
                        PathàShape_Direction: "ADBE Vector Shape Direction"
                
                        //FILL
                        ,Fill: "ADBE Vector Graphic - Fill",
                        FillàBlendMode: "ADBE Vector Blend Mode",
                        FillàComposite: "ADBE Vector Composite Order",
                        FillàFillRule: "ADBE Vector Fill Rule",
                        FillàColor: "ADBE Vector Fill Color",
                        FillàOpacity: "ADBE Vector Fill Opacity"
                
                        // STROKE
                        ,Stroke: "ADBE Vector Graphic - Stroke",
                        StrokeàBlend_Mode: "ADBE Vector Blend Mode",
                        StrokeàComposite: "ADBE Vector Composite Order",
                        StrokeàColor: "ADBE Vector Stroke Color",
                        StrokeàOpacity: "ADBE Vector Stroke Opacity",
                        StrokeàStroke_Width: "ADBE Vector Stroke Width",
                        StrokeàLine_Cap: "ADBE Vector Stroke Line Cap",
                        StrokeàLine_Join: "ADBE Vector Stroke Line Join",
                        StrokeàMiter_Limit: "ADBE Vector Stroke Miter Limit"
                
                        // STROKE DASHES
                        ,Dashes: "ADBE Vector Stroke Dashes",
                        DashesàDash: "ADBE Vector Stroke Dash 1",
                        DashesàGap: "ADBE Vector Stroke Gap 1",
                        DashesàDash_2: "ADBE Vector Stroke Dash 2",
                        DashesàGap_2: "ADBE Vector Stroke Gap 2",
                        DashesàDash_3: "ADBE Vector Stroke Dash 3",
                        DashesàGap_3: "ADBE Vector Stroke Gap 3",
                        DashesàOffset: "ADBE Vector Stroke Offset"
                
                        //STROKE TAPER
                        ,Taper: "ADBE Vector Stroke Taper",
                        TaperàStart_Width: "ADBE Vector Taper Start Width",
                        TaperàLength_Units: "ADBE Vector Taper Length Units",
                        TaperàEnd_Width: "ADBE Vector Taper End Width",
                        TaperàEnd_Ease: "ADBE Vector Taper End Ease",
                        TaperàEnd_Length: "ADBE Vector Taper End Length",
                        TaperàStart_Length: "ADBE Vector Taper Start Length",
                        TaperàStart_Ease: "ADBE Vector Taper Start Ease"
                
                        //STROKE WAVE
                        ,Wave: "ADBE Vector Stroke Wave",
                        Amount: "ADBE Vector Taper Wave Amount",
                        Units: "ADBE Vector Taper Wave Units",
                        Phase: "ADBE Vector Taper Wave Phase",
                        WaveLength: "ADBE Vector Taper Wavelength"
                
                        //GRADIENT FILL
                        ,Gradient_Fill: "ADBE Vector Graphic - G-Fill",
                        Blend_Mode: "ADBE Vector Blend Mode",
                        Composite: "ADBE Vector Composite Order",
                        Fill_Rule: "ADBE Vector Composite Order",
                        Type: "ADBE Vector Grad Type",
                        Start_Point: "ADBE Vector Grad Start Pt",
                        End_Point: "ADBE Vector Grad End Pt",
                        Highlight_Length: "ADBE Vector Grad HiLite Length",
                        Highlight_Angle: "ADBE Vector Grad HiLite Angle",
                        Colors: "ADBE Vector Grad Colors",
                        Opacity: "ADBE Vector Fill Opacity"
                
                        //GRADIENT STROKE:
                        ,Gradient_Stroke: "ADBE Vector Graphic - G-Stroke",
                        Blend_Mode: "ADBE Vector Blend Mode",
                        Composite: "ADBE Vector Composite Order",
                        Stroke_Rule: "ADBE Vector Composite Order",
                        Type: "ADBE Vector Grad Type",
                        Start_Point: "ADBE Vector Grad Start Pt",
                        End_Point: "ADBE Vector Grad End Pt",
                        Highlight_Length: "ADBE Vector Grad HiLite Length",
                        Highlight_Angle: "ADBE Vector Grad HiLite Angle",
                        Colors: "ADBE Vector Grad Colors",
                        Opacity: "ADBE Vector Stroke Opacity",
                        Stroke_Width: "ADBE Vector Stroke Width",
                        Line_Cap: "ADBE Vector Stroke Line Cap",
                        Line_Join: "ADBE Vector Stroke Line Join",
                        Miter_Limit: "ADBE Vector Stroke Miter Limit",
                        Dashes: "ADBE Vector Stroke Dashes"
                
                        //MERGE PATHS:
                        ,Merge_Paths: "ADBE Vector Filter - Merge",
                        Mode: "ADBE Vector Merge Type"
                
                        //OFFSET PATHS:
                        ,Offset_Paths: "ADBE Vector Filter - Offset",
                        Amount: "ADBE Vector Offset Amount",
                        Line_Join: "ADBE Vector Offset Line Join",
                        Miter_Limit: "ADBE Vector Offset Miter Limit",
                        Copies: "ADBE Vector Offset Copies",
                        Copy_Offset: "ADBE Vector Offset Copy Offset"
                
                        //PUCKER & BLOAT:
                        ,Pucker$Bloat: "ADBE Vector Filter - PB",
                        Amount: "ADBE Vector PuckerBloat Amount"
                
                        //REPEATER
                        ,Repeater: "ADBE Vector Filter - Repeater",
                        Copies: "ADBE Vector Repeater Copies",
                        Offset: "ADBE Vector Repeater Offset",
                        Composite: "ADBE Vector Repeater Order",
                        Transform: "ADBE Vector Repeater Transform"
                
                        //ROUND CORNERS
                        ,Round_Corners: "ADBE Vector Filter - RC",
                        Radius: "ADBE Vector RoundCorner Radius"
                
                        //TRIM PATHS
                        ,Trim_Paths: "ADBE Vector Filter - Trim",
                        Start: "ADBE Vector Trim Start",
                        End: "ADBE Vector Trim End",
                        Offset: "ADBE Vector Trim End",
                        Trim_Multiple_Shapes: "ADBE Vector Trim Type"
                
                        //TWIST
                        ,Twist: "ADBE Vector Filter - Twist",
                        Angle: "ADBE Vector Twist Angle",
                        Center: "ADBE Vector Twist Center"
                
                        //WIGGLE PATHS
                        ,WigglePaths: "ADBE Vector Filter - Roughen",
                        Size: "ADBE Vector Roughen Size",
                        Detail: "ADBE Vector Roughen Detail",
                        Points: "ADBE Vector Roughen Points",
                        Wiggles$$Second: "ADBE Vector Temporal Freq",
                        Correlation: "ADBE Vector Correlation",
                        Temporal_Phase: "ADBE Vector Temporal Phase",
                        Spatial_Phase: "ADBE Vector Spatial Phase",
                        Random_Seed: "ADBE Vector Random Seed"
                
                        //WIGGLE TRANSFORM
                        ,Wiggle_Transform: "ADBE Vector Filter - Wiggler",
                        Wiggles$$Second: "ADBE Vector Xform Temporal Freq",
                        Correlation: "ADBE Vector Correlation",
                        TemporalPhase: "ADBE Vector Temporal Phase",
                        Spatial_Phase: "ADBE Vector Spatial Phase",
                        Random_Seed: "ADBE Vector Random Seed",
                        Transform: "ADBE Vector Wiggler Transform",
                
                        //ZIG ZAG
                        Zig_Zag: "	ADBE Vector Filter - Zigzag",
                        Size: "ADBE Vector Zigzag Size",
                        Ridges_per_segment: "ADBE Vector Zigzag Detail",
                        Points: "ADBE Vector Zigzag Points"
                
                    }

                    var A = [TOP_LEVEL, TRANSFORM, AUDIO, THREED, THREEDMATERIALS, CAMERA, CAMERAIRIS, LIGHT, TEXT, SHAPE];
                    
                    var C; // CURRENT
                    for(x in A) if(x.in(A))
                    {
                        C = A[x];
                        for(k in C) if(x.in(C) && x == P) return C[k]
                    }

                    return "ADBE";
                },

                EXPRESSIONS_LIB :
                {
                    SampleImage: function(layerArg, valArg){
            
                        return (function(){
                        
                            var targetLayer = thisComp.layer("$layerName");
                            var compDimens  = [thisComp.width, thisComp.height]; 
                            
                            255 * targetLayer.sampleImage(
                
                                compDimens/2, //samplePoint
                                compDimens,   //sampleRadius
                                true, 
                                time
                            
                            )[$RGBValue].toFixed();
                        
                        }).body()._replace({
                            $layerName: layerArg.name,
                            $RGBValue: valArg
                        });
                    }
                }
            })

            // [DOERS/ WRAPUNDO/ DOUNDO]
            app.xt(
            {
                makeAnimMarkers : function(animObj)
                /**
                 * Convert this: 
                 * [
                  {
                      animation: "move it up",
                      duration : 2
                  },
                  {
                      animation : "move it down",
                      duration  : 3
                  }
                  ]
                  
                  to this:
                  {
                    "move it up": 2,
                    "move it down": 3
                  }
              
                 */
                {  
                  var oo = {}, i =0;
                  oo[animObj[i]["animation"]] = 0;
                  for(;++i<animObj.length;)oo[animObj[i]["animation"]] = animObj[i-1]["duration"]; 
              
                  return oo;
                },

                wrapUndo : function(F, T)
                {
                    var A = arguments.slice(2);

                    return function()
                    {
                        app.beginUndoGroup(F.name);
                        F.apply(T, A);
                        app.endUndoGroup();
                    }
                },
              
                doUndo   : function(F, T, offset)
                {
                    // execute F:
                    app.wrapUndo(F, T || {}, arguments.slice(3))();
                  
                    // undo with an offset time:
                    app.setTimeout(function(){
                        app.executeCommand(
                            app.findMenuCommandId("Undo {0}".re(F.name))
                        );
                    }, offset || 0);
              
                },
            })
        }),

        AFFX$Project: (function(){

            $.global.proj = app.project;

            // [GETTERS]
            app.project.xt({

                ItemTypes: [FolderItem, FootageItem, CompItem],

                itemsArr: function()
                {
                    var P = this, A = [];
                    for(x in P) if(x.in(P)) A.push(P.item(x))

                    return A;
                },

                getItemsWith: function(PP, cb)
                {
                    var P = this, A = [];
                    for(x in P) if(x.in(P))
                    {
                        if(cb.call(P, P[x][PP])) A.push(P[x]);
                    }

                    return A;
                },
            })

            app.project.xt({

                $import: function(FP)
                {
                    var P = this;
                    return P.importFile(new ImportOptions(FP));
                },

                $addComp: function(cfg)
                {
                    var numComps = this.getItemsWith("constructor", function(C){
                        return C == CompItem;
                    }).length;
                    
                    var cfg = Object.adapt(cfg, 
                    {
                        name: "comp {0}".re(numComps + 1),
                        width: 1920,
                        height: 1080,
                        someBool: 1,
                        length: 10,
                        frameRate: 24
                    });

                    var comp = this.items.addComp.apply(this.items, Object.values(cfg));
                    comp.bgColor = cfg.bgColor || [21,21,21];
                    return comp;
                },

                removeLastRender: function()
                {
                    var P = this;
                    return P.renderQueue.item(P.renderQueue.numItems).remove();
                }

            })
        }),
        
        AFFX$CompItem: (function()
        {
            var I;
            if(!(is(I = app.project.activeItem, CompItem))) $.global.comp = I;

            // [PROPERTIES]
            CompItem.xt({
                FILM_SIZE: 36,
                FOCAL_LENGTH: 50
            })

            // [GETTERS/SETTERS]
            CompItem.prototype.xt({

                setResolution : function(newRes)
                {
                    var rs = this.resolutionFactor;
                    this.resolutionFactor = newRes;
                    return rs;
                },
            
                getResolution : function()
                {
                    return this.resolutionFactor;
                },
            
                sel : function()
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
                },
            
                snap : function(t, pp)
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
                },
            
                getLayersWith : function(prop, val)
                {
                    if(val.is(undefined)) val = true;
            
                    return this.layers.grab(function(layer)
                    {
                        var oldVal = layer[prop]; 
            
                        if(oldVal.is(undefined)) return false;
                        if(oldVal.is(String) && val.is(RegExp)) return val.test(oldVal);
                        
                        return oldVal == val;
                    })
                },

                setTime : function(t, all)
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
            
                workAreaDomain : function(){
                
                    return {
                        
                        start: this.workAreaStart,
                        end  : this.workAreaStart + this.workAreaDuration 
                    }
                },

            })

            // [DROP/ DROP AND IMPORT]
            // REQUIRES (PROJECT, File.prototype.importAE)
            CompItem.prototype.xt({

                drop : function(P/*roject*/, i/*temIndex*/)
                {
                    if(!(is(P, Project))) P = app.project;
                    return this.layers.add(P.items[i + 1])
                },

                importAndDrop : function(FP, force, inv, i)
                {
                    var F = File(FP),
                        I = app.project.getItemsWith("name",function(name){
                            return name == F.name;
                        });

                    // layer:
                    var L = this.layers.add(

                        (I.length && !force)?
                        I[0]:
                        F.importAE()
                    );
                    app.project.lastItem().selected = false;
                    
                    if(i) L.moveAfter(i);
                    if(inv)
                    {
                        L.inPoint  = inv[0]; 
                        L.outPoint = inv[1];
                    }

                    return L;
                }
            })

            // [MATRIX RELATED OPERATIONS]
            CompItem.prototype.xt({
                
                getAOV : function()
                {
                    var aspect           = this.width / this.height,
                        filmSizeVertical = CompItem.FILM_SIZE / aspect;
                    
                    return Math.getAOV(filmSizeVertical, CompItem.FOCAL_LENGTH);
                },

                getActiveAOV : function()
                {
                    var cam = this.activeCamera;
                    
                    return (cam && cam.enabled)?
                        cam.getAOV():
                        this.getAOV();
                },

                getProjectedZ : function(w)
                {
                    var zoom = this.getZoom();
                    return (z -(z/w))
                },

                getActiveProjectedZ : function(w)
                {
                    var cam = this.activeCamera;
                    
                    return (cam && cam.enabled)?
                        cam.getProjectedZ():
                        this.getProjectedZ();
                },

                getViewMatrix : function()
                {
                    return Matrix.identity().translate(    
                        this.width /2,
                        this.height/2,
                        this.getZoom()
                    );
                },

                getZoom : function()
                {
                    return this.width * CompItem.FOCAL_LENGTH / CompItem.FILM_SIZE;
                },

                getProjectionMatrix : function()
                {
                    return Matrix.perspective(
                        
                        this.getAOV(), //angle of view
                        this.width / this.height, //aspect
                        0.1, //near
                        10000 //far
                    );
                },
            
                getActiveViewMatrix : function()
                {
                    var cam = this.activeCamera;
                    
                    return (cam && cam.enabled)?
                        cam.getViewMatrix():
                        this.getViewMatrix();
                }

            })

        }),

        /*
            ╦╔╦╗╔═╗╔╦╗
            ║ ║ ║╣ ║║║
            ╩ ╩ ╚═╝╩ ╩
        */

        AFFX$Camera : (function(){

            // [MATRIX RELATED OPERATIONS]
            CameraLayer.prototype.xt({
                
                getAOV : function()
                {
                    var filmSize    = this.containingComp.height;
                        focalLength = this.getProp("Camera Options/Zoom").value;
    
                    return MathEx.getAOV(filmSize, focalLength);
                },

                getWorldMatrix : function()
                {
                    return LayerEx.getWorldMatrix(camera = this);
                },
    
                getLocalMatrix : function()
                {
                    var camera = this;
                    var lookAtMatrix = LayerEx.getLookAt(camera);
                    var localMatrix  = Matrix.multiplyArrayOfMatrices([
    
                        LayerEx.getRotationMatrix(camera),
                        LayerEx.getOrientationMatrix(camera),
                        Matrix.invert(lookAtMatrix),
                        LayerEx.getPositionMatrix(camera),
                    ]);
            
                    return localMatrix;
                },
    
                getProjectedZ : function(w)
                {
                    var z = this.getProp("Camera Options/Zoom").value;
                    return (z - (z / w));
                },
    
                getViewMatrix : function()
                {
                    var viewMatrix;
    
                    return viewMatrix = Matrix.multiplyArrayOfMatrices([
                        
                        this.getLocalMatrix(camera),
                        this.getWorldMatrix(camera),
                    ]);
                }
            })
        }),

        AFFX$ItemCollection: (function()
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

        AFFX$LayerCollection: (function()
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

            LayerCollection.prototype.xt({

                $add : function(what, args, cfg)
                {
                    var T = this, F, V, L;
                
                    var Configs = 
                    {
                        SHAPE: {},
                        TEXT: {text: "text"},
                        TEXTBOX: {width: 250, height: 250},
                        SOLID: 
                        {
                            color: [21,21,21],
                            name: "solid",
                            width: this.containingComp.width,
                            height: this.containingComp.height,
                            pixelAspect: this.containingComp.aspectRatio,
                            duration: this.containingComp.duration,
                        },

                        CAMERA: {name: "cam", centerPoint: [960, 540]},
                        LIGHT: {name: "light", centerPoint: [960, 540]},
                        NULL: {duration: this.containingComp.duration}
                    }

                    if(F = that["add{0}".re(what.title())])
                    {
                        V = Object.values(Object.adapt(Configs[what.toUpperCase()], args));
                        L = F.apply(T, V);
                    }

                    if(!cfg) return L;

                    switch(what)
                    {
                        case "Shape":
                            if(cfg.path == true)
                            {
                                L.content.addProperty(app.MN("PathGroup"));
                            }
                            break;

                        case "Text":
                            if(is(cfg.fixSource, Function))
                            {
                                var src = L.Text.sourceText;
                                src.setValue(
                                    cfg.fixSource(src.value.toString())
                                );
                            }
                            break;
                        
                        default: 
                            if(is(cfg.name, String))
                            {
                                L.name = T[0].containingComp.newName(cfg.name);
                            }
                            break;
                    }

                    return L;
                },


                axis: function(numDashes, text)
                {
                    var C = this[0].containingComp,
                        S = this.$add("Shape");

                    var axisName = "";
                    S.name = axisName;

                    var axisProp = S.addProp("Effects/Axis");
                    
                    // Just add Group 1
                    var G = S.addProp("Contents/ADBE Vector Group");
                    G.name = "line";
                    
                    // add a path prop:
                    S.addProp("Contents/{0}/Contents/ADBE Vector Shape - Group".re(G.name));
                    S.getProp("Contents/{0}/Contents/Path 1/Path".re(G.name)).expression = function()
                    {
                        var start = effect("Axis")("Start");
                        var end   = effect("Axis")("End");
                        createPath(points = [[start, 0], [end, 0]],
                                   inTangents = [], outTangents = [],
                                   is_closed = false) 
                    }.body();

                    // add a stroke prop:
                    var STROKE = S.addProp("Contents/{0}/Contents/ADBE Vector Graphic - Stroke".re(G.name))
                    STROKE.getProp("ADBE Vector Stroke Width").setValue(4);

                    // Now create the other dashes:
                    var i = -1;
                    while(++i<numDashes)
                    {
                        // Dash
                        var D = S.addProp("Contents/ADBE Vector Group");
                        D.name = "dash {0}".re(i);
                        S.addProp("Contents/{0}/Contents/ADBE Vector Shape - Group".re(D.name));
                        S.addProp("Contents/{0}/Contents/ADBE Vector Graphic - Stroke".re(D.name));

                        S.getProp("Contents/{0}/Contents/Path 1/Path").expression = function()
                        {
                            var FX = thisComp.layer("$SName").effect("Axis");
                            var start = FX("Start");
                            var space = FX("Space");
                            var end   = FX("End");
                            var dLength = FX("Axis")("Dash Length");
                            
                            var factor= 30;
                            var pos   = start + $i * space;
                            var dLen  = 0;

                            if(pos-end < -20) dLen = dashLen;
                            else
                            {
                                dLen = dLength * Math.exp(-Math.pow(end-pos, 2)/(2*factor*factor));
                            }

                            createPath(points = [[pos, -dLen/2], [pos, dLen/2]],
                                        inTangents = [], outTangents = [], is_closed =false);

                        }.body({
                            $SName: S.name,
                            $i: i
                        });
                        S.getProp("Contents/{0}/Contents/Stroke 1/Stroke Width").setValue(4);
                        }

                        var endValue = ((100*numDashes)-100)/2;
                        S.getProp("Effects/Axis/Start").setValue(-endValue);
                        S.getProp("Effects/Axis/End")  .setValue(endValue);

                        if(!text) return;

                        i = -1;
                        while(++i<numDahses)
                        {
                            var TL = this.$add("text", {shy: true});

                            // [EDIT TEXT LAYER PROPERTY EXPRESSIONS]

                            // [SOURCE TEXT EXPRESSION]
                            TL.sourceText.expression = function()
                            {
                                var FX = thisComp.layer("$SName").effect("Axis");
                                var num = FX("Count") + $i * FX("Basis");

                                (Math.round(10*num)/10)
                            }.body({$i:i})
                            TL.name = TL.sourceText.value;
                        
                            //[ANCHOR POINT EXPRESSION]
                            TL.transform.anchorPoint.expression = function()
                            {
                                var S = sourceRectAtTime(time, false);
                                [S.width/2 + S.left, S.height/2 + S.top];
                            }.body();
                        
                            // [TEXT POSITION EXPRESSION]
                            TL.transform.position.expression = function()
                            {
                                var LA = thisComp.layer("$SName");
                                var FX = LA.effect("Axis");
                                var SP = FX("Space");

                                var x = (thisComp.width/2) + $i * SP + FX("Start") + LA.transform.position[0] -960;
                                var y = LA.transform.position[1] + 55;

                                [x, u]

                            }.body({$SName: S.name, $i:i})

                            // [OPACITY EXPRESSION]
                            TL.transform.opacity.expression = function()
                            {
                                var FX = thisComp.layer("$SName").effect("Axis");
                                var PS = transform.position[0] - thisComp.width/2;

                                if(PS - FX("End") < -10) 100
                                else
                                {
                                    100 * Math.exp(-Math.pow(FX("End")-PS, 1)/(2*30*30))
                                }
                            }
                        }
                },

                dynamicLine: function(x0 ,y0 ,x1 ,y1)
                {
                    var c = this[0].containingComp;
                    
                    var shape   = new makeShapeWithPath(c, 2 ,true);
                    var path    = shape.content.property(MATCH_NAMES.PATH);
                    var argName = Arguments.getArgs(callee);
                    var args    = arguments;
                    var expr    = ""; 
                  
                    var i = -1;
                    while(++i<args.length)
                    {
                      A = arguments[i];
                      N = argName[i];
                  
                      if(A.is(Array)) // if it's layers you want to connect:
                      {
                        arrRepCfg = 
                        {
                          $argName: n,
                          $argLayer: a[0].name,
                          $argType: a[1]
                        }
                  
                        expr += (function(){
                          
                          var $argName     = thisComp.layer("$argLayer").transform.position[$argType] - ($argType? 540 : 960);
                          var anch$argName = thisComp.layer("$argLayer").transform.anchorPoint[$argType];
                  
                        }).body()._replace(arrRepCfg)
                        
                      }
                      else //if it's points you want to connect:
                      {
                        expr += (function(){
                  
                          var $argName      = $argValue;
                          var anch$argName  = 0;
                  
                        }).body()._replace({$argName  : n, $argValue : a });
                  
                      }
                    }
                  
                    // now make the path with createPath() with all the shit you made previously
                    expr += (function(){
                        
                      createPath(
                      points      = [[x0-anchx0,y0-anchy0],[x1-anchx1,y1-anchy1]],
                      inTangents  = [], 
                      outTangents = [], 
                      is_closed   = true)
                    
                    }).body();
                    
                    // set the expression value, and zero the anchor point:
                    path.path.expression = expr;
                    shape.transform.anchorPoint.setValue(defVals.anchorPoint);
                    
                    // frick layer off:
                    return layer;
                },

                point: function(c, radius)
                {
                  radius = radius.is(Number)?radius:8;

                  var stretch = radius / (kconst = 1.81066);
                  const POINT_SHAPE = 
                  {
                    vertices    : [[-radius,0],[0,radius],[radius,0],[0,-radius]],
                    inTangents  : [[0,-stretch],[-stretch,0],[0,stretch],[stretch,0]],
                    outTangents : [[0,stretch],[stretch,0],[0,-stretch],[-stretch,0]],
                    closed      : true
                  };
                
                  return c.layers.$add("shape", {name: c.newName(callee.name)},{
                    groups:[
                      {
                        name: "point",
                        path: new $Shape(POINT_SHAPE)
                      }
                    ],
                    fill: {
                      color: [1,1,1,1]
                    }
                  })
                },

                code: function(codeStr, syntax)
                {
                    var style =
                    {
                      applyFill: true,
                      fontSize : 50,
                      font: "DejaVuSansMono",
                      fillColor: [1,1,1],
                      position: [200, 200]
                    };
                  
                    for(i=-1;++i<syntax.length;)
                    {
                      var jj = syntax[i];
                      var pointsEx = getExpression(getPoints(codeStr, RegExp(syntax.pattern), RegExp(syntax.replacepattern)));
                      text.animator(jj.name).addExpressionSelector(pointsEx).getParent(3)
                                            .addTextFill(jj.color);
                    }
                  
                    return text.config(style);                  
                },
                
                plot: function(
                    /*str*/func/*="x"*/
                    ,/*bool*/optimized/*=true*/
                    ,/*float*/xbasis/*=100*/
                    ,/*float*/ybasis/*=100*/
                    ,/*float*/start/*=-10*/
                    ,/*float*/end/*=10*/
                    ,/*int*/step/*20*/
                    ,/*float*/strokeWidth/*10*/
                    ,/*arr*/colorValue/*white*/
                  )
                {
                
                    step = optimized?80:step;
                    
                    var shapeLayer = this.$add("shape"),
                        path = shapeLayer.content.addProperty(MATCH_NAMES.PATH);
                    
                    var ln = Math.floor((((end-start)*xbasis)/step)+2),
                        k  = (100/step) * 3,
                        h  = 0.0000000001,
                        ax = 10000;
                    
                    var vertices    = [],
                    
                        inTangents  = [],
                        outTangents = [],
                        efunc       = new Function("x","return " + func + ";");
                    
                    
                    var x,y,xh,fh,f,y0;
                    
                    
                    vertMaker: for(var i =-1;++i<ln;)
                    {
                        x = ((step * i) + start * xbasis);
                        y = (-ybasis) * Math.round(ax*efunc(((step * i) + start* xbasis)/xbasis))/ax;
                        
                        if(!optimized) vertices.push([x,y]); continue vertMaker;
                        
                        xh = x + h * xbasis;
                        fh = (ybasis/k) * efunc((x/xbasis)+h);
                        f =  (ybasis/k) * efunc((x/xbasis));
                        y0 = 100*(fh-f)/(xh-x);
                    
                        vertices.push([x,y])
                        inTangents.push([-100/k,y0]);
                        outTangents.push([100/k,-y0]);
                    }
                    
                    path.path.setValue(new $Shape({
                    
                        vertices   : vertices,
                        inTangents : inTangents,
                        outTangents: outTangents,
                        closed: false
                    
                    }).shape());
                    
                    shapeLayer.addStroke(strokeWidth);
                    shapeLayer.name = func;

                    return shapeLayer;
                },
                
            })
        }),

        AFFX$Layer: (function(){

            var C,L;
            if(is(C = app.project.activeItem, CompItem)
            && !is(L = C.selectedLayers[0], undefined))
            {
                $.global.layr = L; 
            }

            var LayerExt = 
            {

                clone: function(cloneName)
                {
                    var c = this.containingComp,
                        n = cloneName || c.newName(this.name);
                    
                    switch (this.getType())
                    {    
                        case "shape":
                            c.layers.$add("shape", {name: n},{
                                // PROPS GO HERE:
                                // GROUPS/FILL..etc
                            })
                            break;
                    
                        case "text":
                            c.layers.$add("text", {name: n}, {
                                // OLD TEXT LAYER PROPS GO HERE:
                                // SOURCE TEXT, FILL COLOR, STROKE..etc
                            })
                            break;
                        default:
                            break;
                    }
                },
                
                transformIt: function(PROP, value, t, groupChecked)
                {
                    /**
                     * Change opacity, position and scale of a layer or of multiple
                     * groups pertaining to a layer easily.
                     */
                
                    var layer = this;
                
                    if(typeof groupChecked == "undefined") groupChecked = false;
                    var scaleFactorValue = opacityFactorValue = dist = value;
                
                    var dirs = 
                    {
                      scale: 
                      {
                        up   :  scaleFactorValue,
                        down : -scaleFactorValue
                      },
                
                      opacity: 
                      {
                        up   :  opacityFactorValue,
                        down : -opacityFactorValue
                      },
                
                      position:
                      {
                        up        : [0,-dist],
                        down      : [0,dist],
                        upleft    : [-dist,-dist],
                        downleft  : [-dist,dist],
                        upright   : [dist,-dist],
                        downright : [dist,dist],
                        left      : [-dist,0],
                        right     : [dist,0]
                      }
                    };
                    
                    app.beginUndoGroup(callee.name)
                
                    if(groupChecked)
                    {
                      layer.properties().forEach(function(prop){
                        
                        if(!prop.selected) return;
                
                        prop.setValueOf("Transform/{0}".re(PROP), function(position){
                          position.value += dirs[PROP][dir];
                        }, t).setTemporalEaseAtKey("numKeys", [easeIn], [easeOut]);
                      })
                      return;
                    }
                
                    layer.setValueOf("Transform/{0}".re(PROP), function(position){
                      position += dirs[PROP][dir];
                    }, t).setTemporalEaseAtKey("numKeys", [easeIn], [easeOut])
                
                
                    app.endUndoGroup();
                },
                
                getType: function()
                {
                    var cns = this.constructor.name;

                    switch (cns)
                    {
                        case "ShapeLayer":
                        case "TextLayer":
                        case "CameraLayer":
                        case "LightLayer": return cns;

                        case "AVLayer":
                            if(this.source.constructor.name == "CompItem") return "Comp";
                            if(this.nullLayer) return "Null";
                            if(this.source.mainSource.constructor.name == "SolidSource") return "Solid";
                            if(this.hasAudio && !this.hasVideo) return "Audio";
                            if(this.hasVideo) return "Video";
                    }
                },

                getMatrixOf: function(what)
                {
                    var value = this.getProp("Transform/{0}".re(what)).value;

                    switch(what) 
                    {    
                        case "Anchor Point":
                            return Matrix.identity()
                            
                            .translate(value[0], value[1], -value[2]);
                        
                        case "Orientation":
                            return Matrix.identity()
                            
                            .rotateZ(Math.degreesToRadians(value[2]))
                            .rotateY(Math.degreesToRadians(-value[1]))
                            .rotateX(Math.degreesToRadians(-value[0]));
                        
                        case "Position":
                            return Matrix.getIdentity()
                            
                            .translate(value[0], value[1], -value[2]);
                        
                        case "Rotation":
                            return Matrix.getIdentity()
                    
                            .rotateZ(Math.degreesToRadians(this.getProp("Transform/Z Rotation").value))
                            .rotateY(Math.degreesToRadians(-this.getProp("Transform/Y Rotation").value))
                            .rotateX(Math.degreesToRadians(-this.getProp("Transform/X Rotation").value))
                        
                        case "Scale":
                            return Matrix.identity()
        
                            .scale(value[0] /100, value[1] /100, value[2] /100)
                        
                        default: return Matrix.identity();
                    }
                },

                getLocalMatrix: function()
                {   
                    return Matrix.multiplyArrayOfMatrices([

                        this.getMatrixOf("Scale"), // scale
                        this.getMatrixOf("Rotation"), // rotation
                        this.getMatrixOf("Orientation"), // orientation
                        this.getMatrixOf("Position"), // position
                    ]);
                },

                getWorldMatrix: function()
                {
                    var worldMatrix = Matrix.identity(),
                        layer       = this;

                    while (parent = layer.parent)
                    {
                        worldMatrix = Matrix.multiplyArrayOfMatrices([
                            
                            worldMatrix,
                            Matrix.invert(parent.getMatrixOf("Anchor Point")),
                            parent.getLocalMatrix(),
                        ]);
                        layer = parent;
                    }
            
                    return worldMatrix;
                },

                getLookAt: function()
                {
                    var anchorPoint = this.getProp("Transform/Anchor Point").value; anchorPoint[2] *= -1;
                    var position    = this.getProp("Transform/Position").value; position[2] *= -1;
            
                    return Matrix.lookAt(
                        position,
                        anchorPoint,
                        [0, 1, 0]
                    );
                },

                getModalMatrix: function(offset)
                {
                    return Matrix.multiplyArrayOfMatrices([
                        
                        Matrix.identity().translate(offset), //offset vector
                        this.getLocalMatrix(),
                        this.getWorldMatrix()
                    ]);
                },

                getModelViewProjection: function(modelMatrix)
                {
                    var comp = this.containingComp;
                    // Model-View-Projection
                    return Matrix.multiplyArrayOfMatrices([
                        
                        modelMatrix, // model matrix
                        comp.getViewMatrix().invert(), // view matrix
                        comp.getProjectionMatrix() // projection matrix
                    ]);
                },
                
                toComp: function(offset)
                {
                    var x,y,z;

                    var offset = !offset? [0,0,0]:
                                 ((anch = this.getProp("Transform/Anchor Point").value, anch[2] *= -1, offset-=anch), 
                                 offset);

                    var modelMatrix = this.getModalMatrix(offset);
            
                    if(!layer.threeDLayer) return (result = Matrix.getTranslate(modelMatrix), result.pop(), result)

                    var mvp = this.getModelViewProjection(modelMatrix);
                    var ndc = Matrix.getTranslate(mvp) / (w = mvp[15]);

                    return [
                        x = (ndc[0] + 1) * (this.containingComp.width  / 2),
                        y = (ndc[1] + 1) * (this.containingComp.height / 2),
                        z = comp.getActiveProjectedZ(w)
                    ];
                },

                toWorld: function(offset)
                {
                    // preprocess offset:
                    var offset = !offset? [0,0,0]:
                                 ((anch = this.getProp("Transform/Anchor Point").value, anch[2] *= -1, offset-=anch), 
                                 offset);

                    // translate modelMatrix:
                    var result = Matrix.getTranslate(
                        this.getModalMatrix(offset)
                    );
            
                    // if not 3d, pop z:
                    return (!layer.threeDLayer? result.pop(): result[2] *= -1, result);
                }
            }

            ShapeLayer.prototype.xt(LayerExt);
            CameraLayer.prototype.xt(LayerExt);
            TextLayer.prototype.xt(LayerExt);
            AVLayer.prototype.xt(LayerExt);
            LightLayer.prototype.xt(LayerExt);
        }),

        AFFX$AVLayer: (function(){
            
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

        AFFX$ShapeLayer: (function(){


            // [SETTERS/ MODIFIERS]
            ShapeLayer.prototype.xt({
                
                moveFirstVertex : function(idx){
                
                    var i = 0,
                        c = this.property("Contents"),
                        n = c.numProperties + 1;
                
                    while(++i<n) c.property(i).moveFirstVertex(idx);
                }
            })

            // [INFO / GETTERS]
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

            // PROPS:
            ShapeLayer.xt({
                PROPS : 
                {
                    stroke    : ["composite", "color", "strokeWidth", "lineCap", "lineJoin", "miterLimit"],
                    fill      : ["composite", "fillRule", "color"],
                    transform : ["anchorPoint", "position", "scale", "skew", "skewAxis", "rotation", "opacity"],
                    rect      : ["shapeDirection", "size", "position", "roundness"],
                    ellipse   : ["shapeDirection", "size", "position"],
                    star      : ["shapeDirection, type", "points", "position", "rotation", 
                                "innerRadius", "outerRadius", "innerRoundness", "outerRoundness"]    
                }
            })
        }),

        AFFX$TextLayer: (function(){

            TextLayer.prototype.xt({

                config: function(cfg)
                {
                    var prop = textLayer.property("Source Text");
                    var doc = textProp.value;
                    doc.applyFill = cfg.applyFill;
                    doc.fontSize = cfg.fontSize;
                    doc.font = cfg.font;
                    doc.fillColor = cfg.fill;
                    prop.setValue(doc);

                    return this;
                },

                animator: function(name)
                {
                    var am = this.Text.Animators.addProperty("ADBE Text Animator");
                    am.name = name || "animator"; 
                    return am;
                },

                fromJSONAndMarkersOf: function(layerName, jsonDataName, dataPointName)
                {/**Expression to apply to a text layer source:
                 * 
                 * Example JSON:
                 * 
                 * [
                 * {
                 *    "animation": "move ball up"
                 * },
                 * {
                 *    "animation": "move ball down" 
                 * }
                 * ]
                 * 
                 * On timeline:
                 * 
                 * (text = "move ball up")
                 * |  <>    <>
                 * (text = "move ball up")
                 *  <>  |  <>
                 * (text = "move ball down")
                 * <>   <>   |
                 */
            
                this.sourceText.expression =  (function(){
            
                    var m = thisComp.layer($layerName).marker;
                    var t = time;
                    var i = m.nearestKey(time).index;
                
                    if(m.nearestKey(t).time>t){ i--; } //if: |  <>
                    i || (i = 1);
                
                    var obj = footage($footageName).sourceData;
            
                    obj[i][$dataPointName];
                    
                }).body({
                    $layerName: layerName,
                    $footageName: jsonDataName,
                    $dataName : dataPointName
                });
                },
            })
        }),

        AFFX$PropertyGroup: (function(){

            // [INFO/GETTERS]
            PropertyGroup.prototype.xt({
                
                containingComp : function()
                {
                  var DEPTH = this.propertyDepth, P = this;
                
                  while(DEPTH--) P = P.parentProperty;
                  
                  return P.containingComp;
                },

                is : function()
                {
                    var P = this,
                        A = arguments.slice();

                    var match = P.matchName.split(' ')[2];
                    
                    var i = -1;
                    while(++i<A.length) if(match == A[i]) return true;
                
                    return false;
                },

                isnt : function()
                {
                  return !this.is.apply(this, arguments.slice());
                },

                properties : function()
                {
                  var P = [];

                  var i = -1;
                  while(++i <this.numproperties) P.push(this.property(i));

                  return P;
                }
            })

            // [SETTERS/ MODIFIERS]
            PropertyGroup.prototype.xt({

                moveFirstVertex : function(index)
                {    
                    const ERRS = 
                    {
                      PROP_INVALID : "Property needs to be a shape, path group, or path"
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
                
                  if(this.isnt("Path")) throw TypeError("{0} only works for Path".re(callee.name));
                  if(!this.numKeys) return 0;
                  
                  keyIndex = this.nearestKeyIndex(t);
                  keyTime  = this.keyTime(keyIndex);
                
                  if(keyIndex == 1) return keyIndex;
                  if((keyTime > t) && lr == "R") return keyIndex;
                  if((keyTime > t) && lr == "L") return keyIndex-1;
                  if((keyTime < t) && lr == "L") return keyIndex;
                  if((keyTime < t) && lr == "R") return keyIndex+1;
                },
                // TEXT RELATED: [ANIMATORS]:
                // Find a way to verify that the property is a text Animator.
                addTextFill: function(color)
                {
                    const ANIM_PROPS = "ADBE Text Animator Properties",
                          FILL_PROP  = "ADBE Text Fill Color";
                    
                    if(this.property(ANIM_PROPS).is(undefined)) return this;

                    var pp = this.property(ANIM_PROPS).addProperty(FILL_PROP);
                    pp.color = color;

                    return pp;
                },

                addExpressionSelector: function(name, basedOn, expressionStr)
                {
                    const EXPR_SELECTOR = "ADBE Text Expressible Selector";
                    if(sel = this.property("Selectors").is(undefined)) return this;

                    sel = sel.addProperty(EXPR_SELECTOR);
                    sel.name = name; // find the count of a given name
                    sel.property("Based On").setValue(basedOn);
                    sel.property("Amount").expression = expressionStr;

                    return sel;
                },

                getParent: function(level)
                {
                    var p = this;
                    while(level--) p = p.parent;
                    return p;
                },

                copyPropertiesTo: function(target)
                {
                    var origin = this;
                    var copyProp = function()
                    {
                        this.target[this.origin].setValue(this.origin[this.origin].value);
                    }
                
                    origin.properties().forEach(function(_prop){

                        if(!(_prop.enabled && target.canAddProperty(_prop.matchName))) return;
                        
                        var prop = target.addProperty(_prop.matchName);
                
                        //------------------------------------------------
                        switch (_prop.matchName) 
                        {
                            case MN("merge"):
                                prop["mode"].setValue(_prop["mode"].value);
                                return;
                
                            case MN("blendMode"):
                                prop.setValue(_prop.value);
                                return;
                
                            case MN("shapeGroup"):
                                prop.property(MATCH_NAMES.shape)
                                    .setValue(_prop.property(MATCH_NAMES.shape).value);
                                return;
                
                            case MN("group"):
                            case MN("pathGroup"):
                            case MN("path"):
                                copyProperties(_prop, prop);
                                return;
                        }
                
                        //------------------------------------------------
                        
                        var __propsList = PROPS[Object.getKeyByValue(MATCH_NAMES, _prop.matchName)];
                        if(!__propsList) return;
                
                        __propsList.forEach(copyProp, {origin: _prop, target:prop})
                    })
                }
            })
        }),
        
        /*
            ╔═╗╔═╗╦═╗╦╔═╗╔╦╗╦ ╦╦
            ╚═╗║  ╠╦╝║╠═╝ ║ ║ ║║
            ╚═╝╚═╝╩╚═╩╩   ╩ ╚═╝╩
        */
        
        SCUI$Window: (function(){

            Window.prototype.xt({
                
                playAudio: function(pp, dt)
                // Requires python, and pygame to be installed.
                {   
                    File("{0}\\xto_play_audio.pyw".re(Folder.temp.fsName)).$create([
                        
                        "from pygame import mixer",
                        "from time import sleep",
                
                        "mixer.init()",
                        "mixer.music.load(\"{0}\")".f(pp),
                        "mixer.music.play()",
                        "sleep({0})".re(dt),
                        "mixer.music.stop()"
                            
                    ].join("\n")).$execute(200,function(){
                        this.remove();
                    });
                },

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

        SCUI$DropDownList: (function(){
            
            DropDownList.prototype.makeGroupVisible = function(g) // g: group var name
            /**
             * Changes the visibility of stack-oriented groups' items.
             * When an item is selected, only the group associated
             * with the item will be visible. 
             * 
             * ==> Before you run this function, make sure you:
             * 
             * 1) Associate the item like so: item.group = mygroup1;
             * 2) Call this like: stdVisibleOnChange("group")
             */
            {
                const P = "visibility", N = false, Y = true;
            
                var i = this.selection.index,
                    l = this.items,
                    n = l.length;
            
                while(n--) (l[n][g][P] = N);
                l[i][g][P] = Y; 
            }
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

        /*
            ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓

            ███████╗██╗  ██╗████████╗██████╗  █████╗ 
            ██╔════╝╚██╗██╔╝╚══██╔══╝██╔══██╗██╔══██╗
            █████╗   ╚███╔╝    ██║   ██████╔╝███████║
            ██╔══╝   ██╔██╗    ██║   ██╔══██╗██╔══██║
            ███████╗██╔╝ ██╗   ██║   ██║  ██║██║  ██║
            ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝
            
            ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
        */

        /*
            ╔═╗╔═╗╔╗╔╔═╗╔╦╗╦═╗╦ ╦╔═╗╔╦╗╔═╗╦═╗╔═╗
            ║  ║ ║║║║╚═╗ ║ ╠╦╝║ ║║   ║ ║ ║╠╦╝╚═╗
            ╚═╝╚═╝╝╚╝╚═╝ ╩ ╩╚═╚═╝╚═╝ ╩ ╚═╝╩╚═╚═╝
        */

        CSTR$Table: (function(){

            $.global.Table = function Table(T, M, V, H)
            {
                this.xt(Object.adapt({
                    
                    table: T,
                    margin: M,
                    VD: V,
                    HD: H
                },{
                    
                    VD: "▓",
                    HD: "■",

                    table: [],
                    ftable: [],
                    margin: 5,

                    maxColSizes: this.maxColSizes(),
                    maxRowSizes: this.maxRowSizes()
                }))
            }

            // [UTILS/PREPROCESSING]
            Table.xt({

                // File name regex pattern table [4x6](2)
                fRegex : new RegExp([
                    
                    "^(table)", // starts w/ table
                    "\s+",      // space (1-)
                    "\[\d+(x)\d+\]", // [(d)x(d)] (d): table dimens
                    "\(\d+\)" // ((d)) (d): table number
                
                ].join(''), 'g'),

                removeAll : function(FP)
                {
                    var FS = Folder(FP || File($.fileName).path).getFiles("*.txt");

                    for(f in FS) if(f.in(FS))
                    {
                        if(f.getName().match(Table.fRegx)) f.remove();
                    }
                },

                process : function(A, sign)
                {
                    var T = [];
                    S = (sign || ",");
                    
                    var jumpAtChar = 35, 
                    temp = [], 
                    row, els;

                    for(a in A) if(a.in(A))
                    {
                        tmp = [];
                        row = A[a];
                        els = row.split(S);

                        for(e in els) if(e.in(els))
                        {
                            tmp.push(e.trim().replace(
                                RegExp("(.{{0}})".re(jumpAtChar), 'g'), "$1\n"
                            ))
                        }

                        T.push(tmp);
                    }

                    return A;
                }
            })

            // [INFO/GETTERS]
            Table.prototype.xt({
                
                toString: function(){
                    return this.render();
                },
                
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
            })

            // [FORMATTER/RENDERER]
            Table.prototype.xt( 
            {
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
            });

            // [OUTPUT/DISPLAYERS]
            Table.prototype.xt({

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
                
                show : function(){
                    $.writeln(this.render())
                },
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
                
                '/' : function(op){
                
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
                // do Object.adapt
                this.intf0     = cfg.intf0;
                this.extension = cfg.extension;
                this.path      = cfg.filePath;
                this.fileName  = File(this.path).name;
                this.structure = cfg.structure;
                this.signal    = "{0}/executed.tmp".re(this.path)
            }

            // [INFO/GETTERS/VALIDATORS]
            FileInterface.prototype.xt({
                
                validate : function(intf)
                {
                    return Object.validateKeys(
                        intf,
                        ["info",
                        "contacts",
                        "active_req",
                        "info/reqs_made",
                        "info/reqs_exec",
                        "info/past_reqs",
                        "active_req/road",
                        "active_req/trac",
                        "active_req/seed",
                        "active_req/crop"]
                    );
                },

                get : function()
                {
                    return $.deser(File(this.path).$read());
                },

                crop : function(clean)
                {
                    if(is(clean, undefined)) clean = true;

                    var I = this.get(),         
                        C = I.active_req.crop;

                    if(clean) this.set((I.active_req = '', I));
                    return C;
                }
            })

            // [SETTERS/MODIFIERS]
            FileInterface.prototype.xt({
                
                make : function()
                {
                    return File(this.path).$create($.ser(this.intf0, 1));
                },
                
                set : function(IT)
                {
                    var I = this;
                    if(!I.validate(IT)) throw Error("Can't set invalid IT");
                
                    return File(I.path).$write($.ser(IT, 1), 'w');
                },
                
                modify : function(keyPath, v)
                {
                    var IT = this.get();
                    
                    this.set(
                        Object.modify(
                            IT,
                            keyPath,
                            v.is(Function)?
                            v.call(IT, Object.getValue(IT, keyPath)):v
                        )
                    );

                    return this;
                },
                
                post : function(R/*equest*/)
                {
                    var RValid = Object.validateKeys(R, ["path", "func", "args"]);

                    if(!RValid) throw Error("Can't post an invalid request");

                    this.modify("active_req", R);
                }
            })
        }),

        CSTR$PYTHON: (function(){

            $.global.Python = function Python(INTF){

                // pass new FileInterface()
                this.INTERFACE = INTF;
            };

            Python.instPath = "C:/Users/me/Desktop/PYJSX";
            
            // [BASIC ATTRIBUTES]
            Python.xt({
                
                execFunc : "def pyjsx_run():\n    import json, sys, os\n    inst_path  = '"+Python.instPath+"/'\n    intf_path   =  (inst_path + 'PyIntf.pyintf')\n    exec_signal =  (inst_path + 'executed.tmp')\n    def strr(ss):\n        if(ss in ['true', 'false']): return ss.title()\n        if(type(ss) is str):         return '\"' + ss + '\"'\n        return str(ss)\n    with open(intf_path, 'r') as f:\n        c= f.read()\n    if not c: return 'Python Error: interface corrupt'\n    intff = json.loads(c)\n    AR    = intff['active_req']\n    path  = AR   ['road']\n    func  = AR   ['trac']\n    name  = '.'.join(path.split('/')[-1].split('.')[0:-1])\n    args  = ','.join(strr(e) for e in AR['seed'])\n    sys.path.append(os.path.dirname(path))\n    try:\n        exec('import ' + name + ' as s')\n        result = eval('s.' + func + '(' + args + ')')\n    except Exception as e:\n        result = 'Python Error: ' + str(e).replace('\\\'', '\\\\\\\'')\n    intff['active_req']['crop'] = result\n    intff['info']['reqs_exec'] = intff['info']['reqs_exec'] + 1\n    with open(intf_path, 'w', encoding='utf8') as f:\n        f.write(json.dumps(intff, indent =4))\n    with open(exec_signal, 'w') as execf:\n        execf.write('')\n    return 0\npyjsx_run()",
                execPath : "{0}/exec.pyw".re(Python.instPath),
                
                execTime   : 180,
                extensions : ["py", "pyw"]
            })

            // [SETUP/TOOLS]
            Python.xt({
                
                installed: function()
                {
                    return $.cmd("python --version").split(' ')[0] == "Python";
                },

                makeExec: function()
                {
                    return File(Python.execPath).create(Python.execStr);
                },        
                
                runExec: function()
                {
                    var I  = this.INTERFACE,
                        SF = I.signalFile;

                    if(SF.exists) SF.remove();

                    I.modify("info/reqs_made", function(v){return v+1});
                    
                    File(Python.execPath).$execute();
                    File.prototype.listen.apply(SF, Object.values({
                        
                        wait: Python.execTime,
                        debug: false,
                        patience: undefined,
                        cleanup: true,
                    }));
                    
                    return I;
                },
                
                viewExec   : function(editor)
                {
                    $.cmd("{1} {0}".re(File(this.execPath).fsName, (editor || "notepad")));
                    return 0;
                },

                editExec   : function(fs)
                {
                    this.execFunc = fs.is(File)?
                                    fs.$read():
                                    fs;
                },

                //========================================
            })

            // [LEXER/PARSER/GETTER]
            Python.xt({
                
                DEF_DEF_PATTERN: new RegExp("([\n]+def)|^def)\s+", 'g'),
                DEF_NAME_PATT: new RegExp(".+", 'g'),
                DEF_ARGS_PATT: new RegExp("\(.*\)"),

                functions: function(FP)
                {
                    var P = new RegExp(
                          DEF_DEF_PATTERN.source
                        + DEF_NAME_PATT.source
                        + DEF_ARGS_PATT.source
                    );

                    var M = File(FP).$read().match(P);
                    var FS = [];
                    //Name, Args, Z: Def Obj {def: [], nonDef:[]}
                    var N, A, Z; 

                    for(m in M) if(m.in(M))
                    {
                        m = m.replace(DEF_DEF_PATTERN, '').split('(');
                        
                        N = m[0];
                        A = m[1].slice(0, -1).split(',');
                        Z = { _default: [], non_default: []};
                        for(a in A) if(a.in(A))
                        {
                            a = a.split('=');
                            Z[(a.length-1)?"_default":"non_default"].push(a[0]);
                        }
                        FS.push({name: N, args: Z});
                    }
                    
                    return FS;
                }
            })

            // [PYFILE/FILEINTERFACE HANDLING]
            Python.xt({

                install: function()
                {
                    if(!Python.installed()) throw Error("Python not installed");
                    
                    var IP = Python.instPath;
                    var FD = Folder(IP);
                    if(FD.exists) FD.remove();
                    
                    (
                        FD.create(),
                        this.INTERFACE.make(IP),
                        Python.makeExec()
                    );

                    return 1;
                },

                repair: function()
                {
        
                    var IP = Python.instPath,
                        I  = this.INTERFACE;

                    if(!Folder(IP).exists) throw Error("Pyjsx not found");

                    var FF = File(I.path);
                        FF = FF.exsits && I.validate($.deser(FF.$read())); 
                        
                    var XF = File(Python.execPath);
                        XF = XF.exists && (Python.execStr == XF.$read());

                    if(!FF) I.make();
                    if(!XF) Python.makeExec();
                },

                call: function(script, about, talk)
                {    
                    this.INTERFACE.post({
            
                        path: script,
                        func: about,
                        args: talk
                    
                    })

                    return Python.runExec().get(false);
                },

                contact: function(FF)
                {
                    var I  = this.INTERFACE, N;

                    if(!FF.exists) throw Error("Contact file does not exist");
                    
                    I.modify("metadata/contacts/{0}".re(N = FF.getName()),
                    {
                        name : N,
                        path : FF.fsName,
                        funcs: Python.functions(FF.fsName)
                    });

                    return N;
                },

                build: function(C) // Contact
                {
                    if(!is(C, File, String)) throw Error("Can't build contact");
                    if(C.is(File)) C = Python.contact(C);
            
                    var PO = {FS: []},
                        I  = this.INTERFACE,
                        IT = I.get(),
                        CO = IT.contacts[C],
                        COValid = Object.validateKeys(CO, ["path", "funcs"]); 

                    if(!COValid) throw Error("Contact invalid");

                    var COFuncs  = CO.funcs;
                    for(f in COFuncs) if(f.in(COFuncs))
                    {
                        PO[f.name] = Function((function(){

                            var A  = arguments.slice(),
                                NA = args.length;

                            var ERR = function(T/*ype*/)
                            {
                                var oo = {extra: "most", missing : "least"};
                                var nn = {extra: $numNotDef + $numDef, missing: $numNotDef};

                                return Error("PY:{0}() takes at {1} {2} args but {3} were given".re(
                                    
                                    $FName,
                                    oo[T],
                                    nn[T],
                                    NA
                                ));
                            }

                            if(NA < $numNotDef)            throw ERR("missing");
                            if(NA > $numNotDef + $numDef ) throw ERR("extra");

                            return Python.call($COPath, $FName, A);

                        }).body({$COPath: CO.path, $FName: f.name,
                                 $numNotDef: COFuncs.non_default.length,
                                 $numDef   : COFuncs._default.length}));

                        PO.functions.push(f.name);
                    }

                    return PO;
                },

                uninstall : function()
                {
                    if((FD = Folder(Python.instPath)).exists) FD.$remove();
                }
            })
        }),

        CSTR$Logger: (function(){

            $.global.Logger = function Logger(){};

            Logger.xt({

                LEVELS: 
                {
                    NONSET: 0,
                    DEBUG: 10,
                    INFO: 20,
                    WARNING: 30,
                    ERROR: 40,
                    CRITICAL: 50
                },

                DATES: 
                {
                    FULL     : "toString",
                    TIME     : "toTimeString",
                    TIMEONLY : "toLocaleTimeString",
                    WEEKDAY  : "toLocaleString"
                },
            
                getScriptName: function()
                {
                    return $.stack.split("\n")[0].replace(/\[|\]/g, "");
                },
            
                getScriptPath: function(){
                    return File($.stack).fsName;
                }
            
            })

            Logger.prototype.xt({

                formatMsg: function(oo)
                {
                    return this.format._replace({
                        
                        $time: oo.time,
                        $message: oo.message,
                        $level: oo.level
                    });
                },

                now: function()
                {
                    return new Date(Date.now())[Logger.DATES[this.DateType]]();
                },

                config: function(cfg)
                {
                    return this.xt(Object.adapt(cfg,{

                        name: Logger.getScriptName(),
                        path: Logger.getScriptPath(),
                        level: 0,
                        DateType: "TIME",
                        format: "XTO_LOGGER: $time:$level:$message",
                        enabled: true
                    }));
                },
            })

            var LS = Logger.LEVELS;
            for(L in LS) if(L.in(LS) && L != "NONSET")
            {
                Logger.prototype[L.toLowerCase()] = Function('MSG', (function(){

                    var LG = this;
                    if(LG.enabled && (LG.level <= Logger.LEVELS[$L]))
                    {
                        MSG = this.formatMsg({
                            level: $L,
                            message: MSG,
                            time: LG.now()
                        });

                        File(LG.path).$write(MSG, 'a');
                        return this;
                    }
                }).body({$L:L}))
            }
        }),

        CSTR$Xester: (function(){

            $.global.Xester = function Xester(){}

            // [EMJOIS]
            Xester.xt({

                T: "✔️",
                F: "❌"
            })

            // [TESTING]
            Xester.xt({
                
                test: function(H, tests)
                {
                    for(t in tests) if(t.in(tests))
                    {
                        $.writeln("{0} {1}".re(tests[t].call(H)? Xester.T: Xester.F, t));
                    }
                }
            })
        }),

        /*
            ╦ ╦╦═╗╔═╗╔═╗╔═╗╔═╗╦═╗╔═╗
            ║║║╠╦╝╠═╣╠═╝╠═╝║╣ ╠╦╝╚═╗
            ╚╩╝╩╚═╩ ╩╩  ╩  ╚═╝╩╚═╚═╝
        */
        
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