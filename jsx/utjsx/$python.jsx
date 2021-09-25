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
(function python(host, self){

    /*******************************************************/
    //@include "$file.jsx"
    //@include "$object.jsx"
    //@include "$string.jsx"
    //@include "$misc.jsx"
    //@include "$sys.jsx";
    /*******************************************************/
    host[self] = self;

    I = {};
    I.intfExtn = "pyintf";
    I.intfName = "PyIntf";
    I.instPath = "C:/Users/me/PYJSX"; //installation path
    I.intfPath = I.instPath + '/' +  I.intfName + "." + I.intfExtn;
    I.execPath = I.instPath + "/exec.pyw";
    I.pyExTime = 180;
    I.sgnlPath = I.instPath + "/executed.tmp";
    I.pyExts   = ["py", "pyw"];
    I.AR       = "active_req";
    
    I.contact0 = {
        path    : "",
        funcs   : []
    }
    I.request0 = 
    {
        path: "",
        func: "",
        args: ""
    }
    I.intf0    = 
    {    
        info: 
        {
            reqs_made:  0,
            reqs_exec:  0,
            past_reqs: []
        },
        
        contacts  : {},
        
        active_req: 
        {
            road: "",
            trac: "",
            seed: [],
            crop: ""
        }
    };

    I.execStr  = 
    [
    "def pyjsx_run():",
        
         //import py utils
    "    import json, sys, os",
        
        // intializing vars
    "    inst_path  = '$instPath/'",
    "    intf_path   =  (inst_path + 'PyIntf.pyintf')",
    "    exec_signal =  (inst_path + 'executed.tmp')",
    
         // pythonic args
    "    def strr(ss):",
    "        if(ss in ['true', 'false']): return ss.title()",
    "        if(type(ss) is str):         return '\\\"' + ss + '\\\"'",
    "        return str(ss)",
    
         // grab the interface:
    "    with open(intf_path, 'r') as f:",
    "        c= f.read()",
    "    if not c: return 'Python Error: interface corrupt'",

         // interface vars:
    "    intff = json.loads(c)",
    "    AR    = intff['active_req']",
    "    path  = AR   ['road']",
    "    func  = AR   ['trac']",
    "    name  = '.'.join(path.split('/')[-1].split('.')[0:-1])",
    "    args  = ','.join(strr(e) for e in AR['seed'])",
        
         // include script in sys paths
    "    sys.path.append(os.path.dirname(path))",
        
        // execute
    "    try:",
    "        exec('import ' + name + ' as s')",
    "        result = eval('s.' + func + '(' + args + ')')",
    "    except Exception as e:",
    "        result = 'Python Error: ' + str(e).replace('\\\'', '\\\\\\\'')",
         
         // store crop:
    "    intff['active_req']['crop'] = result",
    "    intff['info']['reqs_exec'] = intff['info']['reqs_exec'] + 1",
        
        // write result, and create temp signal file:
    "    with open(intf_path, 'w', encoding='utf8') as f:",
    "        f.write(json.dumps(intff, indent =4))",
    "    with open(exec_signal, 'w') as execf:",
    "        execf.write('')",
        
        // success: return(0)
    "    return 0",
    "pyjsx_run()"
    
    ].join("\n").replace("$instPath", I.instPath);

    I.isPyInstalled = function()
    {
        return sys.cmd("python --version").split(" ")[0] == "Python";
    }

    I.getFuncs = function(p){
        
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
    }

    I.validateIntf = function(intfObj){

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

    I.makeIntf = function()
    {
        return File(I.intfPath).$create(_m.ser(I.intf0, 1));
    }
    I.setIntf  = function(intfObj)
    {
        if(!I.validateIntf(intfObj)) throw Error("Invalid PyInterface Obj");
        
        return File(I.intfPath).$write(_m.ser(intfObj, 1), 'w');
    }
    
    I.getIntf  = function()
    {
        return _m.deser(File(I.intfPath).$read());
    }

    I.modIntf  = function(keysP, newV)
    {
        var intf = I.getIntf();
        
        Object.modify(
            intf,
            keysP,
            typeof newV != "function"?
            newV                     :
            newV.call(null, Object.getValue(intf, keysP))
        );
        
        I.setIntf(intf);
    }

    I.makeExec = function(){
        return File(I.execPath).$create(I.execStr);
    }
    I.runExec  = function(){
        var sf = File(I.sgnlPath);
        if(sf.exists) sf.remove();
        
        I.modIntf("info/reqs_made", function(v){ return v+1});
        File(I.execPath).$execute();
        sf.$listen(I.pyExTime, false, undefined, true/*remove signal file when it appears*/);
    }
    I.post = function(request){

        if(!Object.validateKeys(request, "path", "func", "args")) throw Error("Request structure invalid");
        myIntf = I.getIntf();
        
        myIntf[I.AR]["road"] = request["path"];
        myIntf[I.AR]["trac"] = request["func"];
        myIntf[I.AR]["seed"] = request["args"];

        I.setIntf(myIntf);
    }
    I.get = function(clean){
        
        if(typeof clean == "undefined") clean = true;

        var intf    = I.getIntf(),
            output  = intf[I.AR]["crop"];
    
        intf[I.AR] = I.intf0[I.AR];
        if(clean) I.setIntf(intf);
        
        return output;
    }
    self.uninstall = function(){
        var instFolder = Folder(I.instPath);
        if(!instFolder.exists) return 0;

        instFolder.$remove();
        
        return 0;
    }
    self.install = function(){
        
        if(!I.instPath.checkFF()) self.reinstall();
        else return;

        if(!I.isPyInstalled())    throw Error ("Python is not installed!"); //python

        var ff      = File(I.intfPath),
            xf      = File(I.execPath),
            ffvalid = I.validateIntf(_m.deser(ff.$read())),
            xfvalid = Object.validate(I.execStr, xf.$read());

        (ff.exists && ff.length && ffvalid) || I.makeIntf();
        (xf.exists && xf.length && xfvalid) || I.makeExec();

        return;
    }
    self.reinstall = function(){
        
        fd = Folder(I.instPath);
        if(fd.exists) fd.$remove();   
        
        fd.create();
        I.makeIntf();
        I.makeExec();
    }
    self.call    = function(script, about, talk){
        I.post({
            "path": script,
            "func": about,
            "args": talk
        });
        I.runExec();
        return I.get(false);
    }
    self.contact = function(pp){

        if(pp.checkFF() != 1) throw Error("Path argument is not a file path");
        
        contact = _m.fname(pp);
        I.modIntf("contacts/{0}".f(contact), //display name of py file
                 {
                    path  : pp,
                    funcs : I.getFuncs(pp)
                 });
        return contact;
    }
    // create jsx bindings:
    self.build   = function(contactName){
        
        if(contactName.checkFF() == 1) contactName = self.contact(contactName);

        var pyo     = {"functions": []};
        intf    = I.getIntf();
        contact = intf["contacts"][contactName];

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

            pyo["functions"].push(skill.name);
        }
            return pyo;
    }
    self.unload   = function(){
        delete(host[self]);
    }

    self.install();

})($.global, {"toString": function(){ return "python";}})