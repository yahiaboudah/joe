/*
    @requires ["PRIM/Object"]
*/

;eval(CLASS.re("$.global", "FileInterface"))

    [PROTO]
    ({
        create: function(cfg)
        {
            cfg = cfg || {};
            var defInterfPath = "C:/Users/bouda/AppData/Roaming/PYJSX/INTFS/"; 

            this.path      = cfg.path || "{0}intf.json".re(defInterfPath);
            this.file = File(this.path);
            this.signal    = File("{0}/executed_{1}.tmp".re(this.file.path, this.file.displayName));

            // do Object.adapt
            this.intf0     = Object.adapt(cfg.intf0 || {}, {

                info:
                {
                    contacts : [],
                    requests_arch: [],
                    requests_made: 0,
                    requests_exec: 0
                },

                active_req:
                {
                    road: "",
                    trac: "",
                    seed: "",
                    crop: ""
                }

            });
        }
    })

    [PROTO]
    ({    
        __name__: "GETTERS",

        validate: function(intf)
        {
            return Object.validateKeys(
                intf,
                [
                    "info",
                    "info/contacts",
                    "info/requests_made",
                    "info/requests_exec",
                    "info/requests_arch",
                    
                    "active_req",
                    "active_req/road",
                    "active_req/trac",
                    "active_req/seed",
                    "active_req/crop"
                ]
            );
        },

        get: function(keyPath)
        {
            var oo = deser(File(this.path).$read());
            if(is(keyPath, undefined)) return oo;

            return Object.value(oo, keyPath);
        },

        crop: function(clean)
        {
            var I = this.get(),         
                C = I.active_req['crop'];

            if(clean) this.set((I.active_req = undefined, I));
            return C;
        },

        contactExists: function(contactPath)
        {
            var C = this.get("info/contacts"), i=-1;
            while(++i<C.length)
            {
                if(C[i]["path"] == contactPath) return true;
            }

            return false;
        },

        // (0): Contact added, (1): Contact exists
        addContact: function(path, defs_cb, contactName, overwrite)
        {
            var F = File(path);
            if(!(F.exists && is(defs_cb, Function))) throw Error("Invalid Contact Path or Parser Function");

            var P = F.fsName.replace(/\\/g, '/');
            var contacts = this.get("info/contacts");
            //----------------------------------------------
            if(this.contactExists(P))
            {
                if(overwrite) contacts = this.removeContact(P, contacts);
                else return 1;    
            }
            //-----------------------------------------------
            var C =
            {
                name: contactName || F.getName(),
                path: P,
                defs: defs_cb.call({"path": path})
            }
            //-----------------------------------------------
            contacts[contacts.length] = deser(ser(C));

            this.modify("info/contacts", contacts);
            return C;
        },

        // Needs an upgrade (Schema):
        validateContact: function(oo)
        {
            return Object.validateKeys(
                oo,[
                "name",
                "path",
                "defs"
            ])
        },

        getContact: function(contactName)
        {
            var C = I.get("info/contacts"), i=-1;

            while(++i<C.length) if(C[i]["name"] == contactName)
            {
                C = C[i];
                // Schema checking
                // ...
                break;
            }

            return C;
        },

        removeContact: function(contactPath, contacts)
        {
            var C = contacts || this.get("info/contacts"), i=-1;

            while(++i<C.length) if(C[i]["path"] == contactPath)
            {
                C.splice(i, 1);
            }

            return C;
        },

        //===================================
        validateDef: function(oo)
        {
            return Object.validateKeys(
                oo,
                [
                "name",
                "args"
            ]) && Object.validateKeys(oo["args"], ["_default", "non_default"]);
        }
    })

    [PROTO]
    ({
        __name__: "SETTERS",

        forceMake: function()
        {
            return File(this.path).forceCreate(ser(this.intf0, undefined, 4));
        },
        
        set: function(intf)
        {
            return File(this.path).$write(
                ser(Object.adapt(intf, this.intf0), undefined, 4), 'w'
            );
        },
        
        modify: function(keyPath, v)
        {
            var I = this.get();

            this.set(
                Object.modify(
                    I,
                    keyPath,
                    is(v, Function)?
                    v.call(I, Object.value(I, keyPath)):v
                )
            );

            return this;
        },
        
        post: function(R) //Request
        {
            if(!Object.validateKeys(R, ["path", "func", "args"]))
            {
                throw Error("FileInterface: Invalid Request");
            }

            this.modify("active_req/road", R.path);
            this.modify("active_req/trac", R.func);
            this.modify("active_req/seed", R.args);
        }
    })