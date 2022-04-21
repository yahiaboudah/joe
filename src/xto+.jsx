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
    const µ = '/';
    const SOURCE_PATH = "C:" + µ + "xto" + µ + "src";
    const CONFIG_PATH = SOURCE_PATH + µ + "xto.cfg";

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

    H[S] = S;
    // BY-DEFAULT: load BASC [is, in, re, xt, se, zisc]
    //---------------------
    XTO_GUTS.BASC.call($.global);//|
    //---------------------
    
    // ALWAYS: construct xto.root:
    //---------------------
    XTO_GUTS.POPULATE_ROOT.call({}, S.root, processXaml(File(CONFIG_PATH)))
    //---------------------

    var LOADED = { asModule: [], asDepend: {} };
    // [LOADERS]:
    S.xt({
        
        getDeps: function(F)
        {
            //@@requires regex
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

        // build the xto.root object
        // Either pass an object with a path property
        // Or simply pass
        xto.load(
            xto.root.PRIM.String,
            xto.root.MATH.Bezier,
            xto.root.MATH.M,
            { path: "PRIM/Number" },
            "PRIM/Boolean"
        )

        load: function load()
        {
            var loadees = arguments.slice(0), loadee, i=-1;
            
            loader:
            while(++i<loadees.length)
            {
                switch(typeof loadee = loadees[i])
                {
                    case "object":
                        if(loadee["path"] === undefined) continue loader;
                        break;
                    
                    case "string":
                        "{1}{0}{2}".re(µ, S.SOURCE_PATH, loadee.split('/').join(µ))
                }
            }

            what = what.split('/'), i=-1, folder = Folder(S.SOURCE_PATH);
            
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