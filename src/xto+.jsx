/***********************************************************************************
		Name:           xto
		Desc:           A helper framework for Extendscript and AE.
		Created:        2110 (YYMM)
		Modified:       2204 (YYMM)
        
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

(function(H/*ost*/, S/*elf*/)
{
    var LOADED;
    S.root = {};

    const µ = {
        sep: $.os.split('/')[0].toLowerCase() == "windows"? '\\':'/',
        req: /\/\*[\n\r]*\s*\@requires\s+\[(.+)\][\n\r]*\*\//,
        ext: 'jsx',
        cfg: 'cfg'
    };

    // Add xto source path to Environ Vars
    const SOURCE_PATH = (function()
    {
        var path = $.getenv(S.toString());
        if(path !== null) return path;
        else
        {
            throw Error([
                "No source path was found in the User variables",
                "Please add: [\"xto\" = \"path/to/xto\"]"
            ].join('\n'));
        }
    })();

    // TODO: what if cfg file is damaged or not found?
    // Create a cfg extractor function
    const CONFIG_PATH = (function(){
        return SOURCE_PATH + µ.sep + "xto." + µ.cfg;
    })();

    var XTO_GUTS =
    {
        // Initialize
        BASC: function(){

            //@include "0000/re.jsx"
            //@include "0000/xt.jsx"
            //@include "0000/is.jsx"
            //@include "0000/in.jsx"
            //@include "0000/se.jsx"
            //@include "0000/zisc.jsx"
        },
        
        PROCESS_XAML: function(file){
    
            // String util functions:
            var padding = function(str){ (pad = /^\s*/).exec(str); return pad.lastIndex; }
            var trim = function(str){ return str.replace(/^\s*|\s*$/,''); }
            
            // "global" vars: (A for structure data, and address for keeping count of what's last)
            var A = [], address = [];
        
            var lineProcessor = function(lvl, str)
            {
                if(!str) return;
        
                var evalStr = "A", i = -1, iLvl = lvl;
                while(++i<lvl) evalStr += "[{0}].branches".re(address[i]);
                evalStr += ".push({name: \"{0}\", branches:[]})".re(str);
                
                eval(evalStr);
        
                //Increment address
                if(address[lvl] == undefined) address.push(0);
                else address[lvl]++;
        
                //Reset all next addresses
                while(++iLvl<address.length) address[iLvl] = -1;
            }
        
            file.open('r');
            while(!file.eof) lineProcessor(padding(line = file.readln())/4, trim(line))
        
            return A;
        },
    
        // Populate xto.root
        POPULATE_ROOT: function populateRoot(oo, tree)
        {
            var currElement, i =-1;
            while(++i<tree.length)
            {
                currElement = tree[i];       
                if(currElement.branches[0] == undefined){
                    oo[currElement.name] = { "kind": "function" };
                    continue;
                }
                oo[currElement.name] = { "kind": "container" };
                oo[currElement.name] = populateRoot(oo[currElement.name], currElement.branches);
            }
        
            return oo;
        }
    };

    var XTO_LEDGER = {
        
    };


    H[S] = S;
    // BY-DEFAULT: load BASC [is, in, re, xt, se, zisc]
    //---------------------
    XTO_GUTS.BASC.call($.global);//|
    //---------------------
    
    // ALWAYS: construct xto.root:
    //---------------------
    XTO_GUTS.POPULATE_ROOT.call({}, S.root, processXaml(File(CONFIG_PATH)))
    //---------------------

    // [LOADERS]:
    
    // build the xto.root object
    // Either pass an object with a path property
    // Or simply pass

    // xto.load(
    //     xto.root.PRIM.String,
    //     xto.root.MATH.Bezier,
    //     xto.root.MATH.M,
    //     { path: "PRIM/Number" },
    //     "PRIM/Boolean"
    // )

    // Ledger logic to keep track of what's being loaded
    $.global.LoadedLedger = function LoadedLedger(asMain, asDeps)
    {
        this.main = asMain;
        this.deps = asDeps;
    }

    LoadedLedger.prototype.xt({
        
        getMain: function(){
            return this.main;
        },

        getDeps: function(){
            return this.deps;
        },

        addDep: function(dep, depender)
        {
            if(is(this.deps[dep], Array)) this.deps[dep].push(depender);
            else this.deps[dep] = [depender];
        },

        mergeAsMain: function(loadedLedger, loadeeVal)
        {
            Array.prototype.push.apply(this.main, loadedLedger.getMain());
            this.deps.xt(loadedLedger.getDeps());
        },

        mergeAsDeps: function(loadedLedger, loadeeVal)
        {    
            var i=-1, k;
            var loadedMain = loadedLedger.getMain(),
                loadedDeps = loadedLedger.getDeps();
            
            while(++i<loadedMain.length) this.addDep(loadedMain[i], loadeeVal);
            this.deps.xt(loadedDeps);
        }
    });

    S.xt({
    
        loadFile: function loadFile(file)
        {
            if(!is(file, File)) throw Error("First arg needs to be of type File")
            
            try { $.evalFile(file); }
            catch(e){
                throw Error("{0} error in file: {1}".re(e.split(':')[0], file.fsName))
            }
        },

        loadDeps: function(F, loader)
        {
            var R, i=-1;
            F.open('r');
            if(R = µ.req.exec(F.read())) R = (F.close(), R[1].split(','));
            else return [];

            while(++i<R.length) R[i] = R[i].replace(/\s+|\"|\'/g, '');
            
            return loader.apply(undefined, R);
        },

        load: function(){
            
            var loaded = new LoadedLedger([], {}),
                loadees = arguments.slice(0), i=-1;
            
            while(++i<loadees.length) loaded.mergeAsMain(this._load(loadees[i]));

            return loaded;
        },

        _load: function _load(thing)
        {
            const shoveDepsToLoaded = function(otherLoaded, loadeeVal)
            {
                var i=-1, k;
                var lam = otherLoaded.asMain;
                while(++i<lam.length){
                    if(is(loaded.asDeps[lam[i]], Array)) loaded.asDeps[lam[i]].push(loadeeVal);
                    else loaded.asDeps[lam[i]] = [loadeeVal];
                }

                for(k in otherLoaded.asDeps) if(k.in(otherLoaded.asDeps)){
                    loaded.asDeps[k] = loadedDeps.asDeps[k];
                }
            }

            var loaded = {asDeps:{}, asMain:[]};
            var loadees = arguments.slice(0), loadee, i=-1;
            var fd, fl, pp = "", dp, i=-1;

            loader:
            while(++i<loadees.length)
            {
                rawLoadee = loadees[i]; 
                loadee = rawLoadee;
                if(is(loadee, Object) && is(loadee["path"], String)) loadee = loadee.path;
                else if(is(loadee, String) && Folder(pp = callee.loadeeToPath(loadee)).exists) loadee = Folder(pp);
                else if(!Folder(pp).exists && File(pp + µ.ext)).exists) loadee = File(pp);
                else throw callee.InvalidLoadeeError(loadee, i);

                switch(loadee.constructor)
                {
                    case Folder:

                        var fd = loadee, files = fd.getFiles(), j=-1;
                        while(++j < files.length)
                        {
                            var subLoads = load("{1}{0}{2}".re(µ.sep, rawLoadee, files[j].name.split('.')[0]));
                            Array.prototype.push.apply(loaded.asMain, subLoads.asMain);

                            var k;
                            for(k in loadedSubFiles.asDeps) if(loadedSubFiles.asDeps.hasOwnProperty(k)){
                                loaded.asDeps[k] = loadedSubFiles.asDeps[k];
                            }
                        }

                        break;
                    //==========================
                    //--------------------------
                    case File:
                        var fl = loadee;

                        /*
                            Within each file there is a "requires" annotation
                            that points to the dependecies of the loadee, this function
                            loads all the dependecies before loading the file, and 
                            it shoves them into the "loaded" object.
                        */
                        shoveDepsToLoaded(
                            S.loadDeps(fl, load),
                            rawLoadee
                        );

                        /**************/
                        S.loadFile(fl);
                        loaded.asMain.push(rawLoadee);
                        /*************/
                        break;
                    //----------------------------
                    //============================
                }
            }

            loaded.asMain.push(rawLoadee);
            return loaded;

        }.xt({
            
            loadee_sep: '/',
            
            loadeeToPath: function(loadeeVal)
            {
                return "{1}{0}{2}".re(µ.sep, S.SOURCE_PATH, loadeeVal.split(this.loadee_sep).join(µ.sep));
            },

            InvalidLoadeeError: function(loadeeVal, index)
            {
                this.message =
                [
                    "Invalid loadee argument: \"{0}\" at index position: [{1}].\n"
                    .re(loadeeVal, index),
                    "Loadees must be a valid path string: \"path/to/loadee\" or ",
                    "an Object with a path key: ({path: \"path/to/thing\"}) "
                    "with a valid path string as a value."
                
                ].join('');

                return this.message;
            }
        })
    })

    // [INFO]
    S.xt({

        version: '0.9',

        showRoot: function(){
            $.writeln(S.root.se())
        },

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