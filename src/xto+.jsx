
(function(H, S)
{   
    var FUNS = {};
    // Initialize the framework with Basic functionality
    var BASC = (function(){

        //@include "0000/re.jsx"
        //@include "0000/xt.jsx"
        //@include "0000/is.jsx"
        //@include "0000/in.jsx"
        //@include "0000/se.jsx"
        //@include "0000/zisc.jsx"
    });

    var EXTO =
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

        getDeps: function(F)
        {
            // @requires regex
            var REQ_REGEX = /\/\*[\n\r]*\s*\@requires\s+\[(.+)\][\n\r]*\*\//;
            var D = [], R, i=-1;
            var ss;

            F.open('r');

            R = REQ_REGEX.exec(F.read());
            if(R == null) return D;
            R = R[1].split(',');

            while(++i<R.length) D.push(R[i].replace(/\s+|\"|\'/g, ''));
            return D;
        },

        load: function load(what)
        {
            what = what.split('/'), i=-1, folder = Folder(File($.fileName).path);
            var fd, ff;
            while(folder.exists){
                fd = Folder("{0}\\{1}".re(folder.fsName, what[++i]));
                if(fd.exists) folder = fd;
                else break; 
            }
            i=-1;


            ff = File("{0}\\{1}.jsx".re(folder.fsName, what[what.length-1]))
            var D = S.getDeps(ff), i=-1;
            while(++i<D.length) load(D[i])
            $.evalFile(ff);
        }
    })

    // [INFO]
    S.xt({

        version: '1.1.2',

        functionsOf: function(what){
            
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

    //[EXAMINE]
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
