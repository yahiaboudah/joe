
/*
    @requires ["INOP/FileInterface", "DATA/JSON", "DATA/File", "DOLR/Data"]
*/

// [PYTHON COSNTRUCTOR]
$.global.Python = function Python(FInterface)
{
    var PYJSX_FOLDER = Folder("C:/Users/bouda/Appdata/Roaming/PYJSX/");
    this.INTERFACE = is(FInterface, FileInterface)? FInterface: new FileInterface();
    
    // Make the file that holds interfaces' addresses
    ff = File("{0}/interfaces.json".re(PYJSX_FOLDER.fsName));
    dd = deser(ff.$read());
    pp = this.INTERFACE.path;

    if(ff.exists && dd.is(Array)){
        if(!pp.in(dd)) ff.$write(ser(dd.concat(this.INTERFACE.path), undefined, 2));
    }
    else ff.create(ser([this.INTERFACE.path]));

    return this;
};


// [main logic]
Python.prototype.xt({
    
    run_pyjsx: function()
    {
        $.cmd('pyjsx-run --file-interface {0}'.re(this.INTERFACE.path.replace(/\//g, '\\')), true);
    },

    execute: function(signalFileDebug)
    {
        var I  = this.INTERFACE, SF = I.signal,

        SF_config = Object.value({

            wait: Python.execTime,
            debug: signalFileDebug,
            patience: undefined,
            cleanup: true,
        });

        if(SF.exists) SF.remove();
        I.modify("info/requests_made", function(v){return v+1});
        this.run_pyjsx();
        File.prototype.listen.apply(SF, SF_config);

        return I;
    },

    call: function(script, about, talk)
    {
        this.INTERFACE.post({
            path: script,
            func: about,
            args: talk
        })
        return this.execute().crop();
    },

    contact: function(contactPath, contactName, overwrite)
    {
        // Returns the Contact Object
        return this.INTERFACE.addContact(
            contactPath, Python.functions, contactName,
            is(overwrite, undefined)?true:overwrite
        );
    },

    build: function(contact) // Contact
    {
        var I = this.INTERFACE, thatPy = this;

        if(is(contact, String) && (contact = File(contact)).exists) 1;
        if(is(contact, File)) contact = this.contact(contact);
        if(is(contact, Object) && I.validateContact(contact)) 1;
        else throw Error("Invalid Contact");

        var B = {functionNames: []}; //Built Object
        var defs  = contact["defs"], i=-1;
        while(++i<defs.length) if(def = defs[i])
        {
            B[def.name] = ((function()
            {
                var A = arguments.slice(), i=-1,
                kwargs = {}, args = [];

                while(++i < A.length) if(a = A[i])
                {
                    if(is(a, Object) && a["kwargs"] === true)
                    {
                        kwargs = a["kwargs"];
                        delete kwargs["kwargs"];   
                    }
                    else args.push(a);
                }

                if(args.length !== def.args["non_default"].length)
                {
                    throw Error("Invalid Arguments Length");
                }

                return this.python.call(this.path, this.defName, {args:args, kwargs: kwargs});
            
            }).bind({"python": thatPy, "path": contact.path, "defName": def.name}));

            B.functionNames.push(def.name);
        }

        return B;
    }
})

// [SETUP/TOOLS]
Python.xt({
    
    execTime   : 180,
    extensions : ["py", "pyw"],  
    
    isPythonInstalled: function()
    {
        return system.callSystem("python --version").split(' ')[0] == "Python";
    }
})

// [LEXER/PARSER/GETTER]
Python.xt({ 
    functions: function(ff)
    {
        if(this && this.path) ff = this.path;

        var FUNCS = [];
        ff = File(ff).$read();
        var P = /(.*def|^def)\s+(.+)\((.*)\)\s*\:/g;

        //Name, Args, Z: Def Obj {_default: [], non_default:[]}
        var N, A, Z;
        while(m = P.exec(ff))
        {
            N = m[2];
            A = m[3].split(',');
            Z = { _default: [], non_default: []};

            for each(a in A) if(!is(a, Function))
            {
                a = a.split('=');
                Z[(a.length-1)?"_default":"non_default"].push(a[0]);
            }
            FUNCS.push({"name": N, "args": Z});
        }
        return FUNCS;
    }
})

// [PYFILE/FILEINTERFACE HANDLING]
Python.xt({

    install: function()
    {
        if(!Python.installed()) throw Error("Python not installed");
        
        var IP = Python.instPath;
        var FD = Folder(IP);
            if(FD.exists) FD.remove();
        (
            FD.create(),
            this.INTERFACE.make(IP),
            Python.makeExec()
        );

        return 1;
    },

    repair: function()
    {

        var IP = Python.instPath,
            I  = this.INTERFACE;

        if(!Folder(IP).exists) throw Error("Pyjsx not found");

        var FF = File(I.path);
            FF = FF.exsits && I.validate($.deser(FF.$read())); 
            
        var XF = File(Python.execPath);
            XF = XF.exists && (Python.execStr == XF.$read());

        if(!FF) I.make();
        if(!XF) Python.makeExec();
    },

    uninstall : function()
    {
        if((FD = Folder(Python.instPath)).exists) FD.$remove();
    }
})