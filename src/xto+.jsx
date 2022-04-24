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
                "No source path was found in User Variables",
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

            //@include "0000/is.jsx"
            //@include "0000/in.jsx"
            //@include "0000/re.jsx"
            //@include "0000/xt.jsx"
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

    H[S] = S;
    // BY-DEFAULT: load BASC [is, in, re, xt, se, zisc]
    //---------------------
    XTO_GUTS.BASC.call($.global);//|
    //---------------------
    
    // ALWAYS: construct xto.root:
    //---------------------
    // SLOW AND NASTY FUNCTION!
    // XTO_GUTS.POPULATE_ROOT.call({}, S.root, XTO_GUTS.PROCESS_XAML(File(CONFIG_PATH)))
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

    // [LEDGER]
    // Ledger logic to keep track of what's being loaded
    $.global.LoadedLedger = function LoadedLedger(rawLoadee)
    {
        $.hiresTimer;

        this.rawLoadee = rawLoadee || "loadeePlaceholder";
        this.main = [];
        this.deps = {};

        if(this.rawLoadee !== "loadeePlaceholder") this.main.push(rawLoadee);
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

        mergeAsMain: function(loadedLedger)
        {
            Array.prototype.push.apply(this.main, loadedLedger.getMain());
            this.deps.xt(loadedLedger.getDeps());
        },

        mergeAsDeps: function(loadedLedger)
        // this requires a defined rawLoadee value
        {    
            var i=-1, k;
            var loadedMain = loadedLedger.getMain(),
                loadedDeps = loadedLedger.getDeps();
            
            while(++i<loadedMain.length) this.addDep(loadedMain[i], this.rawLoadee);
            this.deps.xt(loadedDeps);
        },

        endTimer: function(){
            this.loadTime = $.hiresTimer / 1000000;
        }
    });

    S.xt({
    
        loadFile: function loadFile(file)
        {
            if(!is(file, File)) throw Error("First arg needs to be of type File")
            
            try { $.evalFile(file); }
            catch(e){
                throw Error("{0} error in file: {1}".re(e.toString().split(':')[0], file.fsName))
            }
        },

        loadAll: function(){
            
            var loaded = new LoadedLedger(),
                loadees = arguments.slice(0), i=-1;
            
            while(++i<loadees.length) loaded.mergeAsMain(this.load(loadees[i]));

            return loaded;
        },

        load: function load(rawLoadee)
        {
            var loaded = new LoadedLedger(rawLoadee), loadee = rawLoadee;
            var ff, pp = "", i=-1;

            if(!is(loadee, Object, String))
                throw new callee.InvalidLoadeeType(loadee);

            if(is(loadee, Object) && !is(loadee = loadee["path"], String))
                throw new callee.InvalidLoadeeObject(loadee);
            
            if(
                is(loadee, String) &&
                !
                (
                 (ff = Folder((pp = callee.loadeeToPath(loadee)))).exists ||
                 (ff = File(pp + '.' + µ.ext)).exists
                )
            ) throw new callee.InvalidLoadeePath(ff.fsName);

            switch(ff.constructor)
            {
                /*
                    Try to load all the subfolders and files:
                    This would break if any file is corrupt or is not loadable
                    as a jsx script. This part could produce tons of errors because
                    it operates blindly. It does not know of the structure of the folder
                    or of that of the files, it has no map of the package. It just blindly
                    iterates through the sub-files, and idiotically loads everything.

                    The better alternative is to create a structure extractor that first
                    grabs the structure of the package, delivers warnings or errors, and then
                    have the loader use that middle-man structure instead to load files properly
                    and avoid evalFile errors
                */
                case Folder:
                
                    var files = ff.getFiles(), j=-1;
                    while(++j < files.length){
                        // Merge whatever Ledger you get into the current parent Ledger
                        loadedLedger.mergeAsMain(
                            load("{1}{0}{2}".re(µ.sep, rawLoadee, files[j].name.split('.')[0]))
                        );
                    }

                    break;

                //==========================
                //--------------------------
                case File:
                    /*
                        Within each file there is a "requires" annotation
                        that points to the dependecies of the loadee, this function
                        loads all the dependecies before loading the file, and 
                        it shoves them into the "loaded" object.
                    */
                    var deps = callee.getDeps(ff), loadedDep, j=-1;
                    while(++j<deps.length)
                    {
                        loadedDep = load(deps[j]); 
                        loaded.mergeAsDeps(loadedDep);
                        delete(loadedDep);
                        loadedDep = undefined;
                    }

                    /**************/
                    S.loadFile(ff);
                    /*************/
                    break;
                //----------------------------
                //============================
                default: break;
            }

            loaded.endTimer();
            return loaded;

        }.xt({
            
            loadee_sep: '/',
            
            loadeeToPath: function(loadeeVal)
            {
                return "{1}{0}{2}".re(µ.sep, SOURCE_PATH, loadeeVal.split(this.loadee_sep).join(µ.sep));
            },
            
            getDeps: function(file)
            {
                var D, i=-1;
                file.open('r');
                if(D = µ.req.exec(file.read())) D = (file.close(), D[1].split(','));
                else return [];
    
                while(++i<D.length) D[i] = D[i].replace(/\s+|\"|\'/g, '');

                return D;
            },

            InvalidLoadeeType: function(loadeeVal)
            {
                this.message = 
                [
                    "Bad loadee type: {0}\n".re(typeof loadeeVal),
                    "Loadees must be a valid path string: \"path/to/loadee\" or ",
                    "an Object with a path key: ({path: \"path/to/thing\"}) ",
                    "with a valid path string as a value."
                ].join('');

                return this.message;
            },

            InvalidLoadeeObject: function(loadeeVal)
            {
                this.message = 
                [
                    "Bad loadee Object: {0}\n".re(loadeeVal.toSource()),
                    "It must be an Object with a \"path\" key: ({path: \"path/to/thing\"}) ",
                    "having a valid path string as a value."
                ].join('');

                return this.message;
            },
            
            InvalidLoadeePath: function(loadeeVal)
            {
                this.message = 
                [
                    "Bad loadee path: {0}\n".re(loadeeVal),
                    "Check if the loadee path actually exists inside the xto package"
                ].join('');

                return this.message;
            },
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
