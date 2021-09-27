/*******************************************************************************
        TODO:           ---
		Name:           $python
		Desc:           Enable communication between python and extendscript.
		Path:           $python.jsx
		Require:        $file, $object, $string, $misc
		Encoding:       ÛȚF8
		Kind:           Part of the Utils.
		API:            call(script, func, args), contact(script), build(script),
                        install(), reinstall(), unload()
		Created:        2106 (YYMM)
		Modified:       2109 (YYMM)
*******************************************************************************/
(function python(g, self){

    /*******************************************************/
    //@include "$file.jsx"
    //@include "$object.jsx"
    //@include "$string.jsx"
    //@include "$json.jsx"
    //@include "$sys.jsx"
    /*******************************************************/
    g[self] = self;
    self.instPath = "C:/Users/me/PYJSX"; //installation path

    // [JSON]
    jj = 
    {
        deser: function(ss)
        {
            return JSON.parse(ss);
        },

        ser  : function(oo)
        {
            return JSON.stringify(oo);
        }
    }

    // [PYTHON]
    PY = 
    {
        isInstalled: function()
        {
            return sys.cmd("python --version").split(" ")[0] == "Python";
        },

        functions  : function(p)
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

        makeExec   : function()
        {
            return File(this.execPath).$create(this.execStr);
        },

        runExec    : function()
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
            sys.cmd("{1} {0}".f(File(this.execPath).fsName), editor || "notepad");
        },

        editExec   : function(fs)
        {
            if(fs.constructor == File) fs = fs.$read();
            this.execStr = fs;
        },

        //============================//

        execStr    : "def pyjsx_run():\n    import json, sys, os\n    inst_path  = '"+self.instPath+"/'\n    intf_path   =  (inst_path + 'PyIntf.pyintf')\n    exec_signal =  (inst_path + 'executed.tmp')\n    def strr(ss):\n        if(ss in ['true', 'false']): return ss.title()\n        if(type(ss) is str):         return '\"' + ss + '\"'\n        return str(ss)\n    with open(intf_path, 'r') as f:\n        c= f.read()\n    if not c: return 'Python Error: interface corrupt'\n    intff = json.loads(c)\n    AR    = intff['active_req']\n    path  = AR   ['road']\n    func  = AR   ['trac']\n    name  = '.'.join(path.split('/')[-1].split('.')[0:-1])\n    args  = ','.join(strr(e) for e in AR['seed'])\n    sys.path.append(os.path.dirname(path))\n    try:\n        exec('import ' + name + ' as s')\n        result = eval('s.' + func + '(' + args + ')')\n    except Exception as e:\n        result = 'Python Error: ' + str(e).replace('\'', '\\\'')\n    intff['active_req']['crop'] = result\n    intff['info']['reqs_exec'] = intff['info']['reqs_exec'] + 1\n    with open(intf_path, 'w', encoding='utf8') as f:\n        f.write(json.dumps(intff, indent =4))\n    with open(exec_signal, 'w') as execf:\n        execf.write('')\n    return 0\npyjsx_run()",
        execPath   : "{0}/exec.pyw".f(self.instPath),
        execTime   : 180,
        extensions : ["py", "pyw"]
    }
    
    // [INTERFACE]
    I = 
    {
        validate : function(intfObj)
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
        },

        make    : function()
        {
            return File(I.intfPath).$create(jj.ser(I.intf0, 1));
        },

        set     : function()
        {
            if(!this.validateIntf(intfObj)) throw Error("Invalid PyInterface Obj");
        
            return File(this.intfPath).$write(jj.ser(intfObj, 1), 'w');
        },

        get     : function()
        {
            return jj.deser(File(this.intfPath).$read());
        },

        modify  : function(keysP, newV)
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
        },

        post    : function(request)
        {
            if(!Object.validateKeys(request, "path", "func", "args")) throw Error("Request structure invalid");

            this.modify("active_req", request);
            return PY;
        },

        crop    : function(clean)
        {
            if(typeof clean == "undefined") clean = true;

            var intf    = this.get(),
                output  = intf.active_req.crop; //crop
        
            intf.active_req = this.intf0.active_req;
            if(clean) this.set(intf);
            
            return output;
        },

        //======================================//

        
        intfExtn : "pyintf",
        intfName : "PyIntf",
        intfPath : "{0}/{1}.{2}".f(self.instPath, I.intfName, I.intfExtn),
        sgnlPath : "{0}/executed.tmp".f(self.instPath),

        //======================================//

        contact0 : Object.newObject(["path", []], ["funcs", ""]),

        request0 : Object.newObject(["path", ""],["func", ""],["args", ""]),

        intf0    : Object.newObject(["meta", {
            
            reqs_made:  0,
            reqs_exec:  0,
            past_reqs: [],
            contacts : {}
        
        }], ["active_req", {
            
            road: "",
            trac: "",
            seed: [],
            crop: ""
        
        }])

    }

    // [API]: [INSTALL, REINSTALL, CALL, CONTACT, BUILD, UNINSTALL, UNLOAD]
    self.install = function()
    {
        if(!PY.isInstalled()) throw Error("Python not installed!");
        
        var fd = Folder(self.instPath);
        if(fd.exists) fd.$remove();   
        
        fd.create();
        (I.make(), PY.makeExec())
    },

    self.reinstall = function()
    {
        
        if(!Folder(self.instPath).exists) self.install();
        else return;

        if(!PY.isInstalled())    throw Error ("Python not installed!"); //python

        var ff      = File(I.intfPath),
            xf      = File(PY.execPath),
            ffvalid = I.validate(jj.deser(ff.$read())),
            xfvalid = (PY.execStr == xf.$read());

        (ff.exists && ff.length && ffvalid) || I.makeIntf();
        (xf.exists && xf.length && xfvalid) || PY.makeExec();
    }
    
    self.call    = function(script, about, talk){
        
        return I.post({

            path: script,
            func: about,
            args: talk
        
        }).runExec().get(false);
    }

    self.contact = function(pp)
    {

        var ff = File(pp);
        if(!ff.exists || ff.constructor !== File) throw Error("Contact file invalid!");
        
        I.modify("metadata/contacts/{0}".f(ff.getName()), //display name of py file
                 {
                    path  : pp,
                    funcs : PY.functions(pp)
                 });
    }
    // (JSX BINDINGS):
    self.build   = function(contactName)
    {
        
        if(contactName.checkFF() == 1) contactName = self.contact(contactName);

        var pyo  = {functions: []};
        intf     = I.getIntf();
        contact  = intf.contacts[contactName];

        if(!Object.validateKeys(contact, "path", "funcs")) throw Error("Contact is not valid");

        var cSkills  = contact.funcs,
            ttSkills = cSkills.length, i=-1;
        
        for(;++i < ttSkills;)
        {

            pyo[cSkills[i].name] = Function((function(){

                var cPath   = $contactPath,
                    name    = $skillName,
                    nDefNum = nondefLen,
                    defNum  = defLen;
                
                var args    = Array.prototype.slice.call(arguments),
                    numArgs = args.length,
                    ttArgs  = (nDefNum + defNum);
            
                const ERRS    = 
                {
                    extrArgs    : "Pyjsx:{0}() takes at most  {1} but {2} were given".f(name, ttArgs, numArgs),
                    missingArgs : "Pyjsx:{0}() takes at least {1} non-default args but {2} were given".f(name, nDefNum, numArgs)
                };
            
                if(numArgs < nDefNum) throw Error(ERRS.missingArgs)
                if(numArgs > ttArgs ) throw Error(ERRS.extrArgs)
                
                return self.call(cPath, name, args);              

            }).body().replace({
                
                $contactPath : contact.path,
                $skillName   : cSkills[i].name,
                nondefLen    : cSkills[i].args[non_default].length,
                defLen       : cSkills[i].args[_default].length
            
            }));

            pyo.functions.push(skill.name);
        }
            return pyo;
    }

    // ================================ //

    self.uninstall = function()
    {
        var instFolder = Folder(self.instPath);
        if(instFolder.exists) instFolder.$remove();
    }
    self.unload   = function(){
        delete(host[self]);
    }
    // ================================= //

    // (INSTALLATION)
    self.install();

})($.global, {"toString": function(){ return "python";}})