/***********************************************************************************
		Name:           xto
		Desc:           A helper framework for Extendscript and AE.
		Created:        2110 (YYMM)
		Modified:       2112 (YYMM)
        
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
    //TODO :fix some garbage
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
            var T = this;

            switch(oo.constructor)
            {
                case Object:
                    return oo.hasOwnProperty(T);
                
                case Array:
                    /*
                       if T is a number, treat it as the index
                       if T is a string, treat it as an element
                    */
                    
                    if(!isNaN(T) && T == parseInt(T) && !!oo[T]) return true;

                    if(T.constructor == String)
                    {
                        var i = -1, len = oo.length;
                        while(++i<len) if(oo[i] == T) return true;
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
        
                str: function(ss, A)
                {
                    var i = -1;
                    while(++i <A.length)
                    {
                        ss = ss.replace(ff.pat(i), A[i]);
                    }
                    return ss;
                },
        
                obj: function(oo, A)
                {
                    var newo = {Array: [], Object: {}}[oo.constructor.name],
                        k;
                    
                    for(x in oo) if(oo.hasOwnProperty(x))
                    {
                        k = oo[x];
                        x = ff.str(x, A);
                        switch (k.constructor)
                        {   
                            case String:
                                newo[x] = ff.str(k, A);
                                break;
        
                            case Object:
                            case Array:
                                newo[x] = ff.obj(k, A);
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
            var T = this;

            if(T.constructor == Array)
            {
                var i = -1;
                while(++i < T.length) for(x in oo) if(oo.hasOwnProperty(x))
                {
                    T[i][x] = oo[x];
                }
            }

            else for(x in oo) if(oo.hasOwnProperty(x)) this[x] = oo[x];

            return this;
        }
        
        delete(Object.prototype.is);
        Object.prototype.is = function()
        {
            var O = this, T;

            var A = Array.prototype.slice.call(arguments),
                T = (O == "undefined")? undefined: O.constructor; //type

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
                if(k === undefined || k === null) return "undefined";
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
                            x,
                            C,
                            LINK    = " : ";
                            vindent = indent;

                        for(x in k) if(k.hasOwnProperty(x))
                        {
                            v = k[x];
                            C = ((v === undefined || v === null)? undefined:v.constructor.name);
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
                        str += k.toString();
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
        
        Object.prototype._toSource = function()
        {
            var T = this;
            
            switch(T.constructor)
            {
                case String: return "\"{0}\"".re(T);
                case Array:
                    var i =-1;
                    while(++i<T.length) T[i] = T[i]._toSource()
                    return "[{0}]".re(T.join(','));

                case Object:
                    var kvpairs = []
                    for(k in T) if(k.in(T)) kvpairs.push("\"{0}\":{1}".re(k.toString(), T[k]._toSource()));
                    return "{{0}}".re(kvpairs.join(','));
                
                case Number:
                case Boolean: 
                    return T;

                case Date:
                    var struct = "FullYear-Month-Date-Hours-Minutes-Seconds", i = -1, ff = struct.split('-'), ss =[];
                    while(++i<ff.length) ss.push(Date.prototype["getUTC{0}".re(ff[i])].call(T));

                    return Object.prototype.re.apply("{0}-{1}-{2}T{3}:{4}:{5}Z", ss);

                default: 
                    return T._toSource();
            }
        }
        
        Object.prototype.slice = function(n)
        {
            return Array.prototype.slice.call(this, n);
        }

        $.global.is = function(what)
        {
            if(what == undefined) what = "undefined";
            return Object.prototype.is.apply(what, arguments.slice(1));
        }

        $.global._in = function(what, oo)
        {
            return Object.prototype.in.call(what, oo);
        }

        // String * operator:
        String.prototype['*'] = function(op, joinChar){
            
            joinChar = joinChar || "";
            var ss = this, ts = [ss];
            if(isNaN(op = Math.floor(op || 0))) return ss;
            
            while(op--) ts.push(ss);
            return ts.join(joinChar);
        }

        // Special Array _join that accepts a function arg:
        Array.prototype._join = function(chr){
            var A = this, s = "";

            if(is(chr, undefined)) return A.join('');

            switch(chr.constructor)
            {
                case Function:
                    var i = -1;
                    while(++i<A.length) s+= chr(A[i], i);
                    break;
			    
                default: s = A.join(chr.toString())
            }
            
            return s;
        }

        // Function bind function:
        Function.prototype.bind = function(T) //This 
        {
            var F = this;
            var A = arguments.slice(1);

            return function(){
                return F.apply(T, arguments.slice());
            }
        }
    });

    var EXTO=
    {
        // BASIC
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
                DEPS: [
                    "Data/Folder",
                    "Data/File"
                ],
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
                    
                    "forEach", "eve",
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
                DEPS: [
                    "DATA/File"
                ],
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
            },

            Http:
            {
                PRFX: "Http.prototype.",
                DEPS: [],
                FUNS : 
                [
                    "request",
                    "responose", "rawResponse"      
                ]
            },

            Json:
            {
                PRFX: "$.global.",
                DEPS: [],
                FUNS: 
                [
                    "JSON.stringify",
                    "JSON.parse",
                    "ser",
                    "deser"
                ]
            }
        },

        // APP
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

            Expression:
            {
                PRFX: "$.global.",
                DEPS: [
                    "PRIM/String",
                    "PRIM/Object",
                    "DATA/Json"
                ],
                FUNS: [
                    "parseGen",
                    "standardReplace"
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
                DEPS: [
                    "PRIM/String",
                    "PRIM/Object"
                ],
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

        // EXTRA
        CSTR:
        {
            Table:
            {
                PRFX: "$.global.",
                DEPS: ["MATH/Complex", "MATH/Math"],
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
                DEPS: 
                [
                    "$$$$/DATA",
                    "PRIM/Object",
                    "CSTR/FileInterface",
                    "DATA/File",
                    "DATA/Folder",
                    "DATA/Json"
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
                DEPS: [
                    "DATA/File"
                ],
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
            var pWhat = what.split('/'), eWhat = EXTO, k =-1;
            while(++k<pWhat.length)
            {
                try{
                    eWhat = eWhat[pWhat[k]];
                }
                catch(e){ throw Error("XTO:Loading Error: " + e.toString()); }
            }

            var deps = eWhat? eWhat.DEPS:[], i=-1;
            while(++i<deps.length)
            {
                n = deps[i];
                n = n.replace(/\//g, '$').toUpperCase();

                //Dependecy does not exist in FUNS? continue:
                if(!(f = FUNS[n])) continue;
                
                //Already loaded before? push new parent:
                if(n.in(S.LOADED.asDepend))
                {
                    S.LOADED.asDepend[n].push(what);
                    continue;
                }
                //Never loaded? add to S.LOADED.asDepend ({dep: [parent]}):
                S.LOADED.asDepend[n] = [what];
                
                //Call the DEP
                f.call($.global);
            }
    
            FUNS[what.replace('/', '$').toUpperCase()].call($.global);
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

        version: '1.1.2',

        functionsOf: function(what)
        {
            if(!(efun = EXTO[what])) return;
            var arr  = [];

            var i = -1;
            while(++i<efun.length)
            {
                curr = efun[i];
                // curr = (curr[0] == '-')? curr.shift(): curr;
                jcur = [what, efun[i]].join('.');
    
                arr.push(jcurr);
            }

            return arr;
        },
        
        functions: function()
        {
            var A = [];
            for(x in EXTO) if(x.in(EXTO)) A.push(S.functionsOf(x));

            return A;
        }
    })

    //[DEBUG/EXAMINE]
    S.xt({
        getTODOS: function()
        {
            var A = [],
                R = /(\n|\r|\t)*\s*\/\/\s*TODO\s*\:\s*(.*)/g,
                F, M, cc;
            
            ((F = File($.fileName)).open('r'), cc = F.read(), F.close())

            while(M = R.exec(cc)) A.push(M[2]);
            return A;
        }
    })
    
})($.global, {toString: function(){return "xto"}});
