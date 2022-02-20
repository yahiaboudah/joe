

String

    [PROTO]
    ({
        __name__: "JSON",
        toJSON: function(){
            return this.valueof;
        }
    })

    [PROTO]
    ({
        __name__: "PATH",

        inspectPath: function()
        {
            var S = this, 
                P = S.split('/'), 
                I, L;

            I =
            {
                depth : P.length,
                drive : S[1] == ':'?S[0]:undefined,
                file  : 0,
                folder: 0,
            }
            
            if('.'.in(L = P.pop()))
            {
                I.valid = I.file = 1;
                I.extens = L.split('.').pop();
            }
            else I.valid = I.folder = 1

            return inspection;
        }
    })

    [PROTO]
    ({
        __name__: "REPLACERS",

        replaceBetween: function(start, end, what)
        {
            return "{1}{0}{2}".re(what, this.substring(0, start), this.substring(end));
        },

        replaceSeq : function(C/*, str1, str2..*/)
        {
            var startIdx = 1;
            if(!C) C = '@'; startIdx = 0;

            var S = this; // String
            var A  = arguments.slice(startIdx), // Args
                P  = new RegExp(C); // Pattern
            
            var i = 0;
            while(S.search(P) != -1) S = S.replace(P, A[i++] || C);
        
            return S;
        },

        _replace: function(R, cb)
        {    
            var S = this;
            for(x in R) if(x.in(R))
            {
                S = S.split(x).join(is(cb, Function)? cb.call(undefined, R[x]): R[x])
            }

            return S;
        },

        fstr : function() // "replace &1 with &2".fstr("me", "this")
        {
            var S = this,
                A = arguments.slice(),
                P = /&/g;
            
            var li, no;
            while(!!P.exec(S))
            {
                li = P.lastIndex -1;
                no = S[li+1];
                
                if(isNaN(no)) continue;
                S = S.pushAt(li, A[no-1], 1, 2);
            }
        
            return S;
        }
    })

    [PROTO]
    ({

        __name__: "INFO",

        startsWith : function(S, P)
        {
            P = P > 0 ? (P | 0) : 0;
            return this.substring(P, P + S.length) === S;
        },
        
        padding : function()
        {
            (pad = /^\s*/).exec(this);
            return pad.lastIndex;
        }
    })

    [PROTO]
    ({

        __name__: "SETTERS",

        title: function()
        {
            var S = this;
            return S.toUpperCase()[0] + S.slice(1);
        },
        
        trim: function()
        {
            return this.replace(/^\s*|\s*$/,'');
        },
        
        pushAt: function(atIndex, pushChar, Delete, numDelete)
        {
            if(!Delete)    Delete = 1;
            if(!numDelete) numDelete = 1;

            var S = this, F,L; //String/First/Last

            F = S.substring(0, atIndex);
            L = S.substring(Delete? (atIndex + numDelete): atIndex);

            return F + pushChar + L;
        }
    })

    [PROTO]
    ({
        __name__: "OPOVR",
            
        '*' : function(op, joinChar)
        {
            if(!$.global.str)
            {
                $.global.str = function(s){return new String(s)};
            }
        
            var S = this, FS = [S]; // String & FinalString
            if(isNaN(op = Math.floor(op))) return S;
            
            while(op--) FS.push(S);
            return FS.join(joinChar || "");
        }

    })