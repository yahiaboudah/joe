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

        // REQUIRES: [String.prototype.f, Object.prototype.is, Function.prototype.body, Math.sum]
        "Array.prototype": (function()
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

        // REQUIRES: [,]
        "String.prototype": (function()
        {
            String.prototype.inspectFF = function() {

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
            }

            String.prototype.startsWith = function(search, rawPos)
            {
            
                var pos = rawPos > 0 ? rawPos | 0 : 0;
                
                return this.substring(pos, pos + search.length) === search;
            }
            
            String.prototype.padding = function()
            {    
                (pad = /^\s*/).exec(this);
                return pad.lastIndex;
            }
            
            String.prototype.checkFF = function() {
            
                var ff = Folder(this);
            
                if (!ff.exists) return 0;
                return (ff.constructor == File)? 1: -1;
            }
            
            String.prototype.replaceSeq = function(specialChar/*, str1, str2..*/) {
            
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
            }
            
            String.prototype.title = function() {
                return this[0].toUpperCase() + this.slice(1);
            }
            
            String.prototype.f = function() {
                
                var frmt = this,
                    args = Array.prototype.slice.call(arguments),
                    i    = -1;
            
                for (;++i < args.length;) 
                {
                    frmt = frmt.replace(
                        RegExp("\\{" + i + "\\}", 'gi'),
                        args[i]
                        );
                }
            
                return frmt;
            }
            
            String.prototype.trim = function(){
                return this.replace(/^\s*/,"").replace(/\s*$/,"");
            }
            
            String.prototype._replace = function(repCfg){
                
                var str = this;
                for(x in repCfg) if(repCfg.hasOwnProperty(x))
                {
                    str = str.split(x).join(repCfg[x])
                }
                return str;
            }
            
            String.prototype["*"] = function(op, joinChar)
            {
                if(!$.global.strr)
                {
                    $.global.strr = function(s){return new String(s)};
                }
            
                var str = this, fstr = [fstr];
                if(isNaN(op = Math.floor(op))) return str;
                
                while(op--) fstr.push(str);
                return fstr.join(joinChar); 
            }
            
            String.prototype.pushAt = function(atIndex, pushChar, delet, numDelete) {
                
                delet     = (typeof delet == "undefined")? 1: delet;
                numDelete = (typeof delet == "undefined")? 1: numDelete;
                
                first = this.substring(0, atIndex);
                last  = this.substring(delet? (atIndex+numDelete): atIndex);
            
                return first + pushChar + last;
            }
            
            String.prototype.fstr = function()
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
        }),

        // REQUIRES: [,]
        "a": (function(){
            
        })
    }
})();