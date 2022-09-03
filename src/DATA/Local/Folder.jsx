
Folder

    [PROTO]
    ({
        __name__: "OPOVR",

        '/': function(op)
        {
            var pp = '{0}/{1}'.re(this.fsName, op);
            return op.split('.').length? File(pp): Folder(pp);
        }
    })

    [PROTO]
    ({
        __name__: "CLEANERS",

        clearFolder : function(extens)
        {
            var FD  = this,
                ALL = is(extens, undefined)?1:0;

            var FFS = FD.getFiles(), E, F;
            for(x in FFS) if(x.in(FFS))
            {
                F = FFS[x];
                E = F.fsName.split('.');
                E = E[E.length-1];

                if(F.is(File) && (A || E == extens)) F.remvoe();
            }

            return FD;
        }
    })

    [PROTO]
    ({
        __name__: "GETTERS",
        
        getF: function(what)
        {
            var cfg = 
            {
                olders: Folder,
                iles:   File
            }

            var FD = this,
                A  = [];

            var FFS = FD.getFiles(), F;
            for(x in FFS) if(x.in(FFS))
            {
                F = FFS[x];
                
                if(F.is(cfg[what])) A.push(F);
            }

            return A; 
        },

        getMostRecent: function()
        {
            var FD  = this,
                FFS = FD.getFiles(), F, MR = -99999;
            
            for(x in FFS) if(x.in(FFS))
            {
                F = FFS[x];
                if(F.modified > (FFS[x+1] || -9999))
                {
                    MR = F.modified;
                }
            }
        }
    })