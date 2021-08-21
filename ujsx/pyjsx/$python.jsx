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
		Modified:       2107 (YYMM)
*******************************************************************************/
delete($.global.python);
($.global.hasOwnProperty("python") || (function (host, self){

    /*******************************************************/
    //@include "../utjsx/$file.jsx"
    //@include "../utjsx/$object.jsx"
    //@include "../utjsx/$string.jsx"
    //@include "../utjsx/$misc.jsx"
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
        "path"    : "",
        "funcs" : []
    }
    I.request0 = {
        "path": "",
        "func": "",
        "args": ""
    }
    I.intf0    = 
    {    
        "info"      : {
            "reqs_made":  0,
            "reqs_exec":  0,
            "past_reqs": []
        },
        
        "contacts"  : {},
        
        "active_req": {
            "road": "",
            "trac": "",
            "seed": [],
            "crop": ""
        }
    };
    I.execStr  = 
    "def pyjsx_run():\n"+
        
         //import py utils
    "    import json, sys, os\n"+
        
        // intializing vars
    "    inst_path  = '"+  I.instPath + "/'\n"+
    "    intf_path   =  (inst_path + 'PyIntf.pyintf')\n"+
    "    exec_signal =  (inst_path + 'executed.tmp')\n"+
    
         // pythonic args
    "    def strr(ss):\n"+
    "        if(ss in ['true', 'false']): return ss.title()\n"+
    "        if(type(ss) is str):         return '\\\"' + ss + '\\\"'\n"+
    "        return str(ss)\n"+
    
         // grab the interface:
    "    with open(intf_path, 'r') as f:\n"+
    "        c= f.read()\n"+
    "    if not c: return 'Python Error: interface corrupt'\n"+

         // interface vars:
    "    intff = json.loads(c)\n"+
    "    AR    = intff['active_req']\n"+
    "    path  = AR   ['road']\n"+
    "    func  = AR   ['trac']\n"+
    "    name  = '.'.join(path.split('/')[-1].split('.')[0:-1])\n"+
    "    args  = ','.join(strr(e) for e in AR['seed'])\n"+
        
         // include script in sys paths
    "    sys.path.append(os.path.dirname(path))\n"+
        
        // execute
    "    try:\n"+
    "        exec('import ' + name + ' as s')\n"+
    "        result = eval('s.' + func + '(' + args + ')')\n"+
    "    except Exception as e:\n"+
    "        result = 'Python Error: ' + str(e).replace('\\\'', '\\\\\\\'')\n"+
         
         // store crop:
    "    intff['active_req']['crop'] = result\n"+
    "    intff['info']['reqs_exec'] = intff['info']['reqs_exec'] + 1\n"+
        
        // write result, and create temp signal file:
    "    with open(intf_path, 'w', encoding='utf8') as f:\n"+
    "        f.write(json.dumps(intff, indent =4))\n"+
    "    with open(exec_signal, 'w') as execf:\n"+
    "        execf.write('')\n"+
        
        // success: return(0)
    "    return 0\n"+
    "pyjsx_run()";

    I.isPyInstalled = function(){ // terrible method, when implemented in a library
        
        var ispy,
            cmd = "python --version > %temp%/pycheck.txt",
            chk = File(Folder.temp + "/pycheck.txt").$create(),
            bat = File(Folder.temp + "/pycheck.bat").$create(cmd);
        
        bat.$execute(250);
        ispy = !!chk.$read();

        File.remove(bat, chk);
        return ispy; //ispy (buggy at the moment)
    }
    I.getFuncs = function(p){
        
        m   = File(p).$read().match(/(([\n]+def)|^def)\s+.+\(.*\)/g);
        fs  = [];

        for(var i=0, len=m.length; i< len;i++)
        {
            nameArgs = m[i].replace(/[\n]+/g, "").replace(/def[\s]+/g, "").split("(");
            name     = nameArgs[0].replace(/\s*$/,"");
            args     = nameArgs[1].slice(0,-1).split(",");
            aaa      = { "default": [], "non_default": []};

            if(args[0]) for(var k=0, klen = args.length; k< klen; k++)
            {
                arg = args[k].split("=");
                aaa[(arg.length-1)?"default":"non_default"].push(arg[0]);
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
    I.makeIntf = function(){
        return File(I.intfPath).$create(_m.ser(I.intf0, 1));
    }
    I.setIntf  = function(intfObj){
        if(!I.validateIntf(intfObj)) throw Error("Passed object does not resemble a pyinterface");
        return File(I.intfPath).$write(_m.ser(intfObj, 1), 'w');
    }
    I.getIntf  = function(){
        return _m.deser(File(I.intfPath).$read());
    }
    I.modIntf  = function(keysP, newV){
        var intf = I.getIntf();
        if(typeof newV == "function") newV = newV(Object.getValue(intf,keysP));
        
        Object.modify(intf, keysP, newV);
        
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
        I.modIntf("contacts/"+ contact, //display name of py file
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

        var cSkills = contact.funcs;
        
        for(var i=0, len = cSkills.length; i<len; i++){

            var skill = cSkills[i];
            var fStr  = ""+
            "var cPath   = \"" + contact.path + "\";\n"+
            "var name    = \"" + skill.name   + "\";\n"+
            "var nDefNum = " + skill.args["non_default"].length + ";\n"+
            "var defNum  = " + skill.args["default"].length + ";\n"+
            
            "var args    = Array.prototype.slice.call(arguments);\n"+
            "var numArgs = args.length;\n"+
            "var ttArgs  = (nDefNum + defNum);\n"+
            "var errs    = {\n"+
            "    extrArgs    : \"Pyjsx:\" + name + \"() takes at most \" + ttArgs + \" but \"+ numArgs +\" were given\",\n"+
            "    missingArgs : \"Pyjsx:\" + name + \"() takes at least \" + nDefNum + \" non-default args but \"+ numArgs +\" were given\"\n"+
            "};\n"+

            "if(numArgs < nDefNum) {throw Error(errs.missingArgs)}\n"+
            "if(numArgs > ttArgs ) {throw Error(errs.extrArgs)}\n"+

            "return self.call(cPath, name, args);\n";

            pyo[skill.name] = Function(fStr);
            pyo["functions"].push(skill.name);
        }
            return pyo;
    }
    self.unload   = function(){
        eval("delete(" + self.toString() + ");");
    }
    self.install();

})($.global, {"toString": function(){ return "python";}}))