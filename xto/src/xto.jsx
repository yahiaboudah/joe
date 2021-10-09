/*******************************************************************************
		Name:           xto
		Desc:           A mini-framework for Extendscript in after effects.
        API :           ---
		Created:        2110 (YYMM)
		Modified:       2110 (YYMM)
*******************************************************************************/
/******************************************************************************/

(function xto()
{
    TODO = 
    [
        "Object.getKeyByValue",
        "Object.getKeysByValue",
        "ShapeLayer.prototype.reverseEngineer",
        "ShapeLayer.prototype.clone",
    ]

    CSTR = 
    [
        "Table",
        "Path",
        "CollectionInterface",
        "$Shape"
    ]

    EXTN = 
    {
        "$":
        [
            "$sleep",
            "inside"
        ],

        "$.global":
        [
            "-MATCH_NAMES",
            "-AECMD",
            "-ClipBoard",
            "-PYJSX",
            "-logger",
            "strr",
        ],
        
        "Function.prototype":
        [
            "body",
            "bind",
            "timeme"
        ],

        "Object":
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
        ],

        "Array":
        [
            "range",
            "oneDimIndexFunc", "twoDimIndexFunc"
        ],

        "Array.prototype":
        [
            ["forEach", "forEvery"],
            ["indexOf", "remove", "includes"], 
            "rotate", 
            ["reduce", "map"], 
            ["fliter", "select"],

            ["max", "min", "sortedIndices", "math2D", "sum"],

            ["upIndex", "bottomIndex", "leftIndex", "rightIndex",
            "upperLeftIndex", "upperRightIndex", "bottomRightIndex", "bottomLeftIndex"],

            ["+", "-", "*", "/", "^"]
        ],

        "String.prototype":
        [
            ["inspectFF", "checkFF"],
            ["startsWith", "padding"],
            ["replaceSeq", "f", "fstr", "_replace"],
            ["title", "trim", "pushAt"],
            "*"
        ],

        "Math": 
        [
            "sum",
            "mult"
        ],

        "File.prototype":
        [
            "-isOpen"
            ["$open", "$write", "$read", "$close", "$clear"],
            ["$seek", "$create"],
            "$execute",
            "$lines",
            
            ["$listenForChange", "$listenForChar", "$listen"],

            ["getDuration", "getName", "getExtension", "getType"]
        ],

        "Folder.prototype":
        [
            ["$clearFolder", "$remove"],
            ["getFolders", "$getFiles"]
        ],

        "Window.prototype":
        [
            "addAnimatedSequence"
        ],

        "CompItem.prototype": 
        [
            ["setResolution", "getResolution"],
            ["getLayersWith", "numLayersWithName"],
            "snap",
            "sel",
            "setTime",
            "workAreaDomain"
        ],

        "CollectionInterface":
        [
            ["toArray", "grab"]
        ],

        "ItemCollection.prototype":
        [
            ["toArray", "grab"],
        ],

        "LayerCollection.prototype":
        [
            ["toArray", "grab"],
        ],

        "AVLayer.prototype":
        [
            ["addProp", "getProp", "removeProp"]
        ],

        "ShapeLayer.prototype":
        [
            ["addProp", "getProp", "removeProp"],
            "alpha",
            ["area", "areas"],
            "distances",
            "moveFirstVertex",
            "grabProps",

            ["addStroke", "addFill"]
        ],

        "PropertyGroup.prototype":
        [
            ["is", "isnt"],
            "containingComp",
            "properties",
            ["moveFirstVertex", "mFirstIndex"],
            "$nearestKeyIndex"
        ],

        "Table":
        [
            "-fNamePatt",
            "process", 
            "removeAll"
        ],

        "Table.prototype":
        [
            "toString",
            "getMaxRowSizes", "maxColumnSizes",
            "format", "render",
            "write", "show"
        ],

        "ClipBoard":
        [
            ["get", "set", "clear"],
            "unload"
        ],

    }

    FUNS = 
    {
        // REQUIRES: [String.prototype.f, Object.prototype.is,]
        "$": (function(){
            
            $.$sleep = function(ms, msg){

                if(ms.is(undefined)) return;
                
                if(msg.is(String)) $.writeln("{0}: Sleeping for {1}..".f(msg, ms))
                $.sleep(ms);
            },
        
            $.log = function(mm)
            {
                var fn = $.fileName.split("/").pop();
                var fr = File(Folder(File($.fileName).parent).fsName + "/" + fn + ".log");
                return (fr.encoding = "UTF-8", fr.open('w'), fr.write(mm + "\n"), fr.close())
            }
        
            $.inside = function(ff)
            {
                return ($.stack.split("\n")[0] == "[{0}]".f(ff.split("/").pop()));
            }
        }),
        
        // REQUIRES: [String.prototype.f, Object.prototype.is,]
        "CompItem.prototype": (function()
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
                return this.getLayersWith("name", RegExp("{0} \d+".f(name),"gi")).length;
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

        "": (function(){
            
        })


    }

})();
























