/***********************************************************************************
		Name:           xto
		Desc:           A helper framework for Extendscript and AE.
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
    ]
    
    YOLO = "youwillneverguessthispassword"; 
    H[S] = S;

    // BY-DEFAULT: load the BASC functions when XTO is included:
    //-----------------------------
    FUNS["BASC"].call($.global);//|
    //-----------------------------

    S.xt({

        version: '1.0.2',

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

        MATH:
        {
            TRIG:
            [
                "degreesToRadians", "radiansToDegrees"
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
                "workAreaDomain",

                "getAOV", "getProjectedZ", "getViewMatrix", "getZoom"
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

        MATH$TRIG: (function()
        {
            Math.xt({
                
                degreesToRadians : function(degrees)
                {
                    return degrees * Math.PI / 180;
                },
            
                radiansToDegrees : function(radians)
                {
                    return radians * 180 / Math.PI;
                }
            })
        }),

        MATH$MATRIX: (function(){

            $.global.Matrix = function Matrix(){};

            Matrix.identity = function(dim)
            {
                if(typeof dim !== "number") dim = 4;
                
                var mat = [], i = j = -1;
                while(++i < dim)
                {
                    mat[i] = [];
                    while(++j < dim) mat[i][j] = (i==j)?1:0;
                }
                
                return new Matrix(mat);
            }
        }),

        //**************************** */
        //*************************** */

        //---------- $$$$ -------------
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
            
                function f(n){ return (n < 10) ? ("0" + n): n;}
            
                function quote(string) {
            
                    rx_escapable.lastIndex = 0;
                    return rx_escapable.test(string)
                        ? "\"" + string.replace(rx_escapable, function (a) {
                            var c = meta[a];
                            return typeof c === "string"
                                ? c
                                : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
                        }) + "\""
                        : "\"" + string + "\"";
                }
            
                function str(key, holder) {
                    
                    var i;          
                    var k;          
                    var v;          
                    var length;
                    var mind = gap;
                    var partial;
                    var value = holder[key];
            
                    if (
                        value
                        && typeof value === "object"
                        && typeof value.toJSON === "function"
                    ) {
                        value = value.toJSON(key);
                    }
            
                    if (typeof rep === "function") {
                        value = rep.call(holder, key, value);
                    }
            
                    switch (typeof value) {
                        case "string":
                            return quote(value);
                        case "number":
                            return (isFinite(value))
                                ? String(value)
                                : "null";
                        case "boolean":
                        case "null":
                            return String(value);
                        case "object":
                            if (!value) {
                                return "null";
                            }
                            gap += indent;
                            partial = [];
            
                            if (Object.prototype.toString.apply(value) === "[object Array]") {
                                length = value.length;
                                for (i = 0; i < length; i += 1) {
                                    partial[i] = str(i, value) || "null";
                                }
            
                                v = partial.length === 0
                                    ? "[]"
                                    : gap
                                        ? (
                                            "[\n"
                                            + gap
                                            + partial.join(",\n" + gap)
                                            + "\n"
                                            + mind
                                            + "]"
                                        )
                                        : "[" + partial.join(",") + "]";
                                gap = mind;
                                return v;
                            }
            
                            if (rep && typeof rep === "object") {
                                length = rep.length;
                                for (i = 0; i < length; i += 1) {
                                    if (typeof rep[i] === "string") {
                                        k = rep[i];
                                        v = str(k, value);
                                        if (v) {
                                            partial.push(quote(k) + (
                                                (gap)
                                                    ? ": "
                                                    : ":"
                                            ) + v);
                                        }
                                    }
                                }
                            } else {
            
                                for (k in value) {
                                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                                        v = str(k, value);
                                        if (v) {
                                            partial.push(quote(k) + (
                                                (gap)
                                                    ? ": "
                                                    : ":"
                                            ) + v);
                                        }
                                    }
                                }
                            }
            
                            v = partial.length === 0
                                ? "{}"
                                : gap
                                    ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}"
                                    : "{" + partial.join(",") + "}";
                            gap = mind;
                            return v;
                        }
                }
            
            
                Date.prototype.toJSON = function ()
                {
                    return isFinite(this.valueOf())
                        ? (
                            this.getUTCFullYear()
                            + "-"
                            + f(this.getUTCMonth() + 1)
                            + "-"
                            + f(this.getUTCDate())
                            + "T"
                            + f(this.getUTCHours())
                            + ":"
                            + f(this.getUTCMinutes())
                            + ":"
                            + f(this.getUTCSeconds())
                            + "Z"
                        )
                        : null;
                }
                Boolean.prototype.toJSON = function(){return this.valueOf()};
                Number.prototype.toJSON  = function(){return this.valueOf()};
                String.prototype.toJSON  = function(){return this.valueOf()};
            
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
                        if (value && typeof value === "object") {
                            for (k in value) {
                                if (Object.prototype.hasOwnProperty.call(value, k)) {
                                    v = walk(value, k);
                                    if (v !== undefined) {
                                        value[k] = v;
                                    } else {
                                        delete value[k];
                                    }
                                }
                            }
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

                inspect: function(k)
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
                
                    io.PPS = io.PPS.join(",");
                    io.FUNS = io.FUNS.join(",");
                    return io;
                },

                scan: function()
                {
                    return $.summary();
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
                    var oo = system.callSystem((sp?"cmd /c \"{0}\"":"{0}").re(myCommand));
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

            function _MN(prop)
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

                var ALL_MATCH_NAMES = [TOP_LEVEL, TRANSFORM, AUDIO, THREED, THREEDMATERIALS, CAMERA, CAMERAIRIS, LIGHT, TEXT, SHAPE];

                var curr, i =-1;
                for(;++i< ALL_MATCH_NAMES.length;)
                {
                    curr = ALL_MATCH_NAMES[i];
                    for(x in curr) if(x.in(curr) && x == prop) return curr[x];
                }

                return "ADBE";
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
              
                doUndo   : function(func, thisArg, offsetTime)
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
                    }, offsetTime || 0);
              
                },
            })
        }),

        AFFX$Project: (function(){

            if($.global["proj"].is(undefined)) $.global["proj"] = app.project;

            app.project.xt({

                ITEM_TYPES: [FolderItem, FootageItem, CompItem],

                itemsArr: function()
                {
                    for(var i =0; ++i<this.numItems+1;) items.push(this.item(i))
                },

                $import: function(filePath)
                {
                    this.importFile(new ImportOptions(filePath));
                },

                getItemsWith: function(prop, cb)
                {
                    var pr    = this,
                        items = [];

                    pr.itemsArr().forEach(function(item)
                    {
                        if(cb.call(pr, item[prop])) items.push(item);
                    })

                    return items;
                },

                $addComp: function(cfg)
                {
                    var num = this.getItemsWith("name", function(n){return (/comp \d+/gi).test(n)})
                              .reduce(function(item1, item2)
                              {
                                  return parseInt(item1.split(" ")[1]) > parseInt(item2.split(" ")[1])?
                                  item1:
                                  item2;
                              }).name.split(" ")[1];

                    cfg = Object.adapt(cfg, 
                    {
                        name: "comp {0}".re(parseInt(num) + 1),
                        width: 1920,
                        height: 1080,
                        someBool: 1,
                        length: 10,
                        frameRate: 24
                    });

                    var comp = this.items.addComp.apply(this.items, Object.values(cfg));
                    comp.bgColor = cfg.bgColor || [21,21,21];
                    return comp;
                }

            })
        }),
        
        AFFX$CompItem_prototype: (function()
        {
            // make default "comp" reference activeItem. [REQURES FIX: case of activeItem not CompItem]
            if($.global["comp"].is(undefined)) $.global["comp"] = app.project.activeItem;

            CompItem.FILM_SIZE    = 36;
            CompItem.FOCAL_LENGTH = 50;

            CompItem.prototype.xt({

                drop : function(project, itemIdx)
                {
                    var items = project.items.is(undefined)?app.project.items: project.items;
                    
                    return this.layers.add(
                        items[itemIdx + 1]
                    )
                },

                importAndDrop : function(filePath, force)
                {

                    var _file = File(filePath);
                    var items = app.project.getItemsWith("name", function(name){return name == _file.name});

                    // layer:
                    var layer = comp.layers.add(

                        (items.length && !force)?
                        items[0]:
                        _file.importAE()
                    );
                    app.project.lastItem().selected = false;
                    return layer;
                },

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
                },

            });
        }),

        AFFX$Camera : (function(){

            CameraLayer.prototype.getAOV = function()
            {
                var filmSize    = this.containingComp.height;
                    focalLength = this.getProp("Camera Options/Zoom").value;

                return MathEx.getAOV(filmSize, focalLength);
            }

            
            CameraLayer.prototype.getWorldMatrix = function()
            {
                return LayerEx.getWorldMatrix(camera = this);
            }

            CameraLayer.prototype.getLocalMatrix = function()
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
            }

            CameraLayer.prototype.getProjectedZ = function(w)
            {
                var z = this.getProp("Camera Options/Zoom").value;
                return (z - (z / w));
            }

            CameraLayer.prototype.getViewMatrix = function()
            {
                var viewMatrix;

                return viewMatrix = Matrix.multiplyArrayOfMatrices([
                    
                    this.getLocalMatrix(camera),
                    this.getWorldMatrix(camera),
                ]);
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

            LayerCollection.prototype.xt({

                $add : function(what, cfg)
                {
                    var that = this;
                
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

                    if(func = that["add{0}".re(what.title())])
                    {
                        func.apply(that, Object.values(Object.adapt(Configs[what.toUpperCase()], cfg)));
                    }
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

        AFFX$Layer_prototype: (function(){

            if($.global["layr"].is(undefined))
            {
                var currComp = app.project.activeItem;
                $.global["layr"] = currComp.selectedLayers[0] || currComp.layer(1);
            }

            var LayerExt = 
            {
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
                            if(this.source.constructor.name == "CompItem") return "CompLayer";
                            if(this.nullLayer) return "NullLayer";
                            if(this.source.mainSource.constructor.name == "SolidSource") return "SolidLayer";
                            if(this.hasAudio && !this.hasVideo) return "AudioLayer";
                            if(this.hasVideo) return "VideoLayer";
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
                                 offset),

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

                adapt: function(ob, oo)
                {
                    for(x in oo) if(x.in(oo) && x.in(ob) && !!(k = ob[x]))
                    {
                        oo[x] = k;   
                    }
                
                    return oo;
                },

                values: function()
                {
                    var valArr = [];
                    for(x in oo) if(x.in(oo)) valArr.push(oo[x]);
                    return valArr;
                },

                keys: function(obj)
                {
                    if(obj.isnt(Object)) throw TypeError("Object.keys called on non-object");

                    var ks = [];
                    for(prop in obj) if(prop.in(obj)) ks.push(prop);

                    return ks;
                },

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

                getArgs : function(nocom)        /*
                * Get a function args (eg. Arguments.getArgs(Arguments.getArgs) => ["c", "nocom"])
                */
                {  
                     if(typeof nocom == "undefined") nocom =true;
                     return this.toString().split(/\)\/*/)[0]
                                        .replace(/^[^(]*[(]/, '')  
                                        .replace(/\s+/g, '')
                                        .replace(nocom?/\/\*([\s\S]*?)\*\//g:'','')
                                        .split(',');                
                },

                params: function()
                /** 
                * Extract parameter names and types from a function definition.
                */
                {
                        var paramsList = A.getArgs(this.toString());
        
                        for (var k = 0, len = params.length; k < len; k++) {
                
                                var currParam = params[k],
                                    split     = currParam.split("*/"),
                                    s0        = split[0],
                                    s1        = split[1];
                
                                params[k] = s0.slice(0, 2) == "/*"?
                                            "{0}:{1}".f(s0.slice(2), s1):
                                            "Any:{0}".f(s0);
                        }
                
                
                        return paramsList;
                },

                check : function(/*Boolean*/ optArgs, /*Boolean*/ limitArgs)
                /**
                * @param {Boolean} optArgs whether to include optional args 
                * @param {Boolean} limitArgs whether to limit args to a number.
                * @returns {0}  if params are healthy
                */
                {
                                        
        
                        const ERRS = 
                        {
                        BAD_ARG     :  "Bad Argument Error."
                                        + "Arg {0} is a {1} and not a {2}",
                        MISSING_ARG : "Missing Argument Error.",
                        EXTRA_ARG   : "Extra Argument Error."
                        }
        
                        var definedAndBool = function(myArg){
                                return ((myArg !== undefined) || (myArg.constructor === Boolean));
                        }
        
                        if (!definedAndBool(limitArgs)) limitArgs = true;
                        if (!definedAndBool(optArgs))   optArgs   = false;
        
        
                        var stack      = $.stack.split("\n");
                        funcName   = stack[stack.length - 3].split("(")[0],
                        funcParams = this.params(),
                        isGreater  = (args.length > funcParams.length),
                        isLess     = (args.length < funcParams.length);
        
                        if (isGreater && limitArgs) throw Error(ERRS.EXTRA_ARG);
                        if (isLess    && !optArgs ) throw Error(ERRS.MISSING_ARG);
        
                        // Args length has priority over params length
                        for (var i = 0; i < args.length; i++) {
        
                                var split     = funcParams[i].split(":"),
                                type      = split[0].toLowerCase(),
                                paramName = split[1],
                                argValue  = args[i],
                                argType;
        
                                if ([null, undefined].includes(argValue)) continue;
        
                                argType = argValue.constructor.name.toLowerCase();
                                if (!["any", argType].includes(type)) 
                                {
                                        throw Error(ERR.BAD_ARG.f(
                                                "{0}[1]".f(paramName, i),
                                                argType,
                                                type
                                        ));
                                }
                        }
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
                    if(cb.is(Function)) cb.call(this);
        
                    return this;
                },
                
                lines : function()
                {
                    var lines = [];
                    this.$open("r");
    
                    while(!this.eof) lines.push(this.readln());
    
                    return (this.$close(), lines);
                },
                
                listenForChange : function(debug, wait, maxiter)
                {
                    var iter = -1, maxiter = maxiter || 100;
    
                    while (++iter < maxiter)
                    {
                        if(this.modified > lmod) break;
                        $.$sleep(

                            !wait? 180: wait == "exp"? Math.round(Math.pow(2, iter+6)):
                            wait,
                            debug,
                            iter
                        );
                    }
    
                },
                
                listenForChar : function(charac, pos, wait, maxiter, debug)
                {
    
                    var iter = -1, maxiter = maxiter || 100;
                    while(++iter < maxiter)
                    {
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
                
                getExtension : function(toLower)
                {
                    var ext = this.name.replace(/^.*\./, ""); 
                    return toLower?
                           ext.toLowerCase():
                           ext;
                },

                withExtension : function(extension, noReplace)
                // File("mylife.txt").withExtension("eps") ==> File: mylife.eps;
                {
                    return File(
                        noReplace? "{0}.{1}".re(this.fsName, extension):
                        "{0}.{1}".re(this.fsName.replace(/.[^.]+$/, ""), extension)
                    );
                },
                
                getType : function()
                {
                    return File.CATEGORIES
                    [ 
                        File.TYPES_BY_EXTENSION[this.getExtension(true)] || 7
                    
                    ].toLowerCase();
                },

                importAE: function(customName)
                {
                    if(app.appName != "After Effects") return;
                    var newItem = app.project.importFile(new ImportOptions(this));
                    if(customName.is(String)) newItem.name = customName;

                    return newItem;
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
                },

                mostRecent: function()
                {
                    return Folder(fp).getFiles().reduce(function(file1, file2){
                        return (file1.modified < file2.modified)?
                               file1:
                               file2;
                      })
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