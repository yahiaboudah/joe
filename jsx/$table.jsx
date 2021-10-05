/*******************************************************************************
		Name:           $table
		Desc:           Create a table/ draw a table.
        API :           format, render, write, show, getMaxColSizes, 
                        getMaxRowSizes
		
        Created:        2106 (YYMM)
		Modified:       2110 (YYMM)
*******************************************************************************/
//@include "$array.jsx"
//@include "$string.jsx"
//@include "$file.jsx"
/******************************************************************************/

var Table = (function(){
    
    var cstr = function Tabla(table, margin, VD, HD)
    {
        this.VD     = VD || "▓";
        this.HD     = HD || "■";
        
        this.table  = table || [];
        this.ftable = []; // formatted table
        this.margin = margin || 5;
    
        this.maxColSizes = this.maxColumnSizes();
        this.maxRowSizes = this.getMaxRowSizes();
    }

    cstr.prototype = 
    {
        maxColumnSizes : function(){
    
            var tb = this.table,
                cs = [];
        
            JL = "\n";
        
            for(var c=0; c< tb[0].length; c++)
            {
                max = 0;
                for(var r=0; r< tb.length; r++)
                {   
                    !tb[r][c]? tb[r][c] = "":0;
                    /**************************/
                    curr = (tb[r][c].split(JL)).max("length");
                    /**************************/
                    if(curr > max) max = curr;
                }
                cs.push(max);
            }
            return cs;
        },

        getMaxRowSizes : function(){
    
            var tb = this.table,
                rs = [];
        
            JL = "\n";
        
            for(var r=0; r< tb.length; r++)
            {
                max = 0;
                for(var c=0; c< tb[0].length; c++)
                {
                    /**************************/
                    curr = tb[r][c].split(JL).length;
                    /**************************/
                    if(curr > max) max = curr;
                }
                rs.push(max);
            }
            return rs;
        },

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
                        bKids[k] = (str(" ") * (cSize + 2*mg)) + this.VD;
                        continue;
                    }
        
                    lPad = str(" ") * Math.floor(((cSize - bKid.length)/2) + mg);
                    rPad = str(" ") * Math.ceil (((cSize - bKid.length)/2) + mg);
            
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
                of  = typeof offset == "undefined"?" ":(str(" ") * offset),
                mg  = this.margin,
                rw  = cs.sum() + (2 * mg * cs.length) + cs.length;
                fs  = of + str(this.HD) * (rw+1) + JL;
                
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
                fs += rr + of +(str(this.HD) * (rw+1)) + "\n";
            }
            return fs;
        },

        write : function(path, pad){
    
            path = path || Folder(File($.fileName).path).fsName;
            pad  = pad || 8;
            patt = Table.fNamePatt;
            txtf = Folder(path).getFiles("*.txt");
            num  = 1;
            
            len  = txtf.length;
            while(len--) if(!!(txtf[len].displayName.match(patt))) num++;
        
            name = ("table [&1x&2](&3)").fstr(this.maxRowSizes.length, this.maxColSizes.length, num);
        
            file = File(path + "\\" + name + ".txt");
            file._write(this.render(pad));
        
            return file.fsName;
        },
        
        show : function(){
            $.writeln(this.render())
        }
    }

    // constants:
    cstr.fNamePatt = /^(table)\s+\[\d+(x)\d+\]\(\d+\)/g;
    cstr.removeAll = function(path)
    {
        fs = Folder(path || File($.fileName).path).getFiles("*.txt");
        i  = fs.length;
        while(i--) if(fs[i].displayName.match(Table.fNamePatt)) fs[i].remove();
    }
    cstr.process = function(sign)
    {
        arr  = Array.prototype.slice.call(arguments);
        fArr = [];
        sign = (sign || ",");
        behN = 35;
        
        for(i=0; i<arr.length; i++)
        {
            tmp = [];
            row = arr[i];
            spt = row.split(sign);
            for(k = 0; k<spt.length; k++)
            {
                tmp.push(spt[k]
                        .replace(/^\s*|\s*$/g, "")
                        .replace(RegExp("(.{"+behN+"})", "g"), "$1\n"));
            }
            fArr.push(tmp);
        }
        return fArr;
    }

    return cstr;

})();