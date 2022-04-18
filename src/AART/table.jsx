
;eval(CLASS.re("$.global", "Table"))

    [PROTO]
    ({
        __name__: "CONSTRUCTOR",

        create: function(table, margin, verDivider, horDivider)
        //@requires ["PRIM.Object.adapt"]
        //@requires ["module.PROTO.getMaxColSizes", "module.PROTO.getMaxRowSizes"]
        {
            this.xt(Object.adapt({
                        
                    table: table,
                    margin: margin,
                    VD: verDivider,
                    HD: horDivider
                },{
                
                    VD: "▓",
                    HD: "■",

                    table: [],
                    ftable: [],
                    margin: 5,

                    maxColSizes: this.getMaxColSizes(),
                    maxRowSizes: this.getMaxRowSizes()
                }))
        }
    })

    [STATIC]
    ({
        __name__: "UTILS",


        // File name regex pattern table [4x6](2):

        // ^(table) ==> "table" (starts w/ table)
        // \s* ==> "table  " (space)
        // \[\d+(x)\d+\]\s* ==> "table [10x3] " (table dimensions)
        // \(\d+\) ==> "table [10x3] (2)" (table number)

        REGX: /^(table)\s*(\[\d+(x)\d+\]\s*)(\(\d+\))/g,

        transpose: function(T)
        {
            var numCols = T[0].length;
            var C = [], i = j = -1;

            while(++i < numCols){
                C[i] = [];
                while(++j<T.length) C[i].push(T[j][i]);
            }

            return C;
        },
        
        process: function(A, sign)
        {
            var T = [];
            S = (sign || ",");
            
            var jumpAtChar = 35,  
            row, elements;

            var i=j=-1;
            while(++i < A.length)
            {
                tmp = [];
                row = A[i];
                elements = row.split(S);
                
                T[i] = [];
                while(++j < elements.length)
                {
                    e = elements[j];
                    T[i].push(e.trim().replace(
                        RegExp("(.{{0}})".re(jumpAtChar), 'g'), "$1\n"
                    ))
                }
            }

            return T;
        },

        removeFiles: function(FP)
        //@requires ["module.STATIC.REGX"]
        {
            var FS = Folder(FP || File($.fileName).path).getFiles("*.txt"), i=-1, f;

            while(++i < FS.length){
                f = FS[i];
                if(f.displayName.match(this.REGX)) f.remove();
            }
        },
    })

    [PROTO]
    ({
        __name__: "INFO",

        toString: function()
        //@requires ["module.PROTO.render"]
        {
            return this.render();
        },

        getMaxColSizes: function()
        //@requires [module.PROTO.FORS.forEachCol]
        {
            var MS = [], max;
            var i = j = -1, e;

            this.forEachCol(function(col){
                
                max = 0;
                while(++i<col)
                {
                    e = col[i];
                    e = e.split('\n');
                    m = e[0].length, j = -1;
                    while(k = e[++j]) if(k.length > m) m = k.length;
                    j = -1;
                    if(m > max) max = m;   
                }
                MS.push(max)
            })

            return MS;
        },

        getMaxRowSizes: function()
        //@requires ["module.PROTO.FORS.forEachRow"]
        {
            var MS = [], max, m;
            var i = -1;

            this.forEachRow(function(row){

                max = 0;
                while(++i<row.length)
                {
                    e = row[i];
                    m = e.split("\n").length;
                    if(m > max) max = m;
                }
                MS.push(max);
            })

            return MS;
        }
    })

    [PROTO]
    ({

        __name__: "ITERATORS",

        forEachRow: function(cb, modify)
        {
            if(!is(cb, Function)) return;

            var T = this.table, i=-1;
            var orow, nrow; //old row, new row

            while(++i<T.length){
                orow = T[i];
                nrow = cb.call(this, orow, i, T);
                if(modify) T[r] = nrow;
            }
        },

        forEachCol: function(cb, modify)
        //@requires ["module.STATIC.transpose"]
        {
            if(!is(cb, Function)) return;

            var T = Table.transpose(this.table), i;
            var col, res;
            
            while(++i<T.length)
            {
                ocol = T[i];
                ncol = cb.call(this, ocol, i, T);
                if(modify) T[i] = ncol;
            }

            this.table = Table.transpose(T);
        }
    })

    [PROTO]
    ({
        __name__: "RENDERER",

        format : function()
        {
            // change the contents of each block:
            // justify = center
        
            var tb = this.table,
                mg = this.margin,
                cs = this.maxColSizes,
                rs = this.maxRowSizes,
                r  = -1,
                c  = -1;
            
            while(++r<tb.length) 
            {
                rSize = rs[r];
        
                while(++c<tb[0].length)
                {
                bKids = tb[r][c].split("\n");
                cSize = cs[c];
        
                for(k=0; k<rSize;k++) // loop through internal row lines:
                {
                    bKid = bKids[k];
                    
                    if(!bKid) {
                        bKids[k] = (strr(" ") * (cSize + 2*mg)) + this.VD;
                        continue;
                    }
        
                    lPad = strr(" ") * Math.floor(((cSize - bKid.length)/2) + mg);
                    rPad = strr(" ") * Math.ceil (((cSize - bKid.length)/2) + mg);
            
                    bKids[k] = lPad + bKid + rPad + this.VD; // block = "   block    |"
                }
        
                tb[r][c] = bKids.join("\n");
                }
                c = -1; // reset column count for new row
                block = bKids = cSize = fblock = null; // cleanup
            }
            this.ftable = tb;
        },

        render: function(offset)
        //@requires ["module.STATIC.format"]
        {
            this.format(); // should be non-optional:
        
            var tb  = this.ftable,
                JL  = "\n",
                rs  = this.maxRowSizes,
                cs  = this.maxColSizes,
                of  = typeof offset == "undefined"?" ":(strr(" ") * offset),
                mg  = this.margin,
                rw  = cs.sum() + (2 * mg * cs.length) + cs.length;
                fs  = of + strr(this.HD) * (rw+1) + JL;

            for(var r=0; r< tb.length; r++)
            {
                rr = "";
                for(var k=0; k< rs[r]; k++) // go through each line of each row:
                {
                    rr += of + this.VD + tb[r][0].split(JL)[k];
                    for(var c=1; c< cs.length; c++) // go through each column:
                    {
                        rr += tb[r][c].split(JL)[k]; // running split (csize) times not efficient.
                    }   rr += JL;
                }
                fs += rr + of +(strr(this.HD) * (rw+1)) + "\n";
            }
            return fs;
        }

    })

    [PROTO]
    ({ 
        __name__: "DISPLAYERS",

        write: function(removePrev, pad, path)
        //@requires ["module.STATIC.removeFiles", "module.PROTO.render"]
        //@requires ["DATA.File.PROTO.$write"]
        {
            if(removePrev) Table.removeFiles(path);
            path = path || Folder(File($.fileName).path).fsName;
            pad  = pad || 8;
            patt = Table.fNamePatt;
            txtf = Folder(path).getFiles("*.txt");
            num  = 1;
            
            len  = txtf.length;
            while(len--) if(!!(txtf[len].displayName.match(patt))) num++;
        
            var name = ("table [{0}x{1}]({2})").re(this.maxRowSizes.length, this.maxColSizes.length, num);
        
            return File(
            
                "{0}\\{1}.txt".re(path, name)
            
            ).$write(this.render(pad)).fsName;
        },
        
        show: function()
        //@requires ["module.PROTO.render"]
        {
            $.writeln(this.render())
        }
    })