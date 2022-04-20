
(function(H, S)
{
    const SOURCE_PATH = "C:/xto/src";
    const CFG_PATH = SOURCE_PATH + "/xto.cfg";

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

    
    var processXaml = function(file){

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
    }

    H[S] = S;
    // BY-DEFAULT: load BASC [is, in, re, xt, se]
    //---------------------
    BASC.call($.global);//|
    //---------------------

    // ALWAYS: load the STRUCT from the xto config file:
    //---------------------
    var STRUCT = processXaml(File(CFG_PATH));
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

        load: function load(what)
        {
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

        version: '1.1.2',

        // Do this without loading the JSON module
        loadStruct: function(){
            
            var config = {};

            var padding = function(str){
                (pad = /^\s*/).exec(str);
                return pad.lastIndex;
            }

            var file = File(S.CFG_PATH), dd, line, pad;
            (file.open('r'), dd = file.read(), file.close())

            while(!file.eof)
            {
                line = file.readln();
                pad = padding(line);
                if(pad == 4) config[line.trim()] = {};
            }
        },

        functionsOf: function(what){
            
            var EXTO = loadStruct();
            
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