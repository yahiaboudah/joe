
    /*
        @requires
    */

    $.global.Table = function Table(T, M, V, H)
    {
        this.xt(Object.adapt({
            
            table: T,
            margin: M,
            VD: V,
            HD: H
        },{
            
            VD: "▓",
            HD: "■",

            table: [],
            ftable: [],
            margin: 5,

            maxColSizes: this.maxColSizes(),
            maxRowSizes: this.maxRowSizes()
        }))
    }

    // [UTILS/PREPROCESSING]
    Table.xt({

        transpose: function(T)
        {
            var numCols = T[0].length;
            var C = [], i =-1;

            while(++i<numCols)
            {   
                C[i] = [];
                for(r in T) if(r.in(T))
                {
                    C[i].push(T[r][i]);
                }
            }

            return C;
        },

        process : function(A, sign)
        {
            var T = [];
            S = (sign || ",");
            
            var jumpAtChar = 35, 
            temp = [], 
            row, els;

            for(a in A) if(a.in(A))
            {
                tmp = [];
                row = A[a];
                els = row.split(S);

                for(e in els) if(e.in(els))
                {
                    tmp.push(e.trim().replace(
                        RegExp("(.{{0}})".re(jumpAtChar), 'g'), "$1\n"
                    ))
                }

                T.push(tmp);
            }

            return A;
        },
        // File name regex pattern table [4x6](2)
        fRegex : new RegExp([
            
            "^(table)", // starts w/ table
            "\s+",      // space (1-)
            "\[\d+(x)\d+\]", // [(d)x(d)] (d): table dimens
            "\(\d+\)" // ((d)) (d): table number
        
        ].join(''), 'g'),

        removeAll : function(FP)
        {
            var FS = Folder(FP || File($.fileName).path).getFiles("*.txt");

            for(f in FS) if(f.in(FS))
            {
                if(f.getName().match(Table.fRegx)) f.remove();
            }
        },
    })

    // [FOREACH]
    Table.prototype.xt({

        forEachRow: function(cb, modify)
        {
            if(!(cb && cb.is(Function))) return;

            var T = this.table, r, row, res;
            for(r in T) if(r.in(T))
            {
                row = T[r];
                res = cb.call(this, r, row, T);
                if(modify) T[r] = res;
            }
        },

        forEachCol: function(cb, modify)
        {
            if(!(cb && cb.is(Function))) return;

            var T = Table.transpose(this.table), c, col, res;
            for(c in T) if(c.in(T))
            {
                col = T[c];
                res = cb.call(this, c, col, T);
                if(modify) T[c] = res;
            }

            this.table = Table.transpose(T);
        }
    })

    // [INFO/GETTERS]
    Table.prototype.xt({
        
        toString: function(){
            return this.render();
        },

        getMaxColSizes: function()
        {
            var MS = [];

            this.forEachCol(function(col){
                
                var max = 0;
                for(e in col) if(e.in(col))
                {
                    e = e.split("\n");
                    m = e[0].length, i = -1;
                    while(k = e[++i]) if(k.length > m) m = k.length;
                    if(m > max) max = m;
                }

                MS.push(max)
            })

            return MS;
        },

        getMaxRowSizes: function()
        {
            var T = this.table;
                MS = [];
            
            this.forEachRow(function(row){

                var max = 0;
                for(e in row) if(e.in(row))
                {
                    e = row[e];
                    m = e.split("\n").length;
                    if(m > max) max = m;
                }

                MS.push(max);
            })
        },
    })

    // [FORMATTER/RENDERER]
    Table.prototype.xt( 
    {
        format : function(){

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
        
        render : function(offset){

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
        },
    });

    // [OUTPUT/DISPLAYERS]
    Table.prototype.xt({ 

        write : function(removePrev ,pad, path){

            if(removePrev) Table.removeAll(path);
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
        
        show : function(){
            $.writeln(this.render())
        },
    })