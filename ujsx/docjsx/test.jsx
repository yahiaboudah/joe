

function TableUtils()
{
    var extend = function(x,c) { for(b in c) x[b] = c[b] } 
    extend(this , {

        maxLen: function(a)
        {
            m = a[0].length;
            if(a.length == 1) return m;
            for(i=1 ;i<a.length; i++)
            {
                l = a[i].length
                if(l > m) m = l;
            }
            return m;
        },
        sum: function(a){
            var s = 0, 
                i = a.length; 
            while(i--) s += a[i]
            return s;
        },
        write: function()
        {
            nm = __("table [&1, &2](&3)", this.maxRowSizes, this.maxColSizes, tableCount);
        }

    });
    
    String.prototype["*"] = function(n){
        fs = "";
        while(n--) fs += this.toString();
        return fs;
    };

    String.prototype.pushAt = function(i, p, d, n) {
    
        d = (typeof d == "undefined")? true: d;
        n = (typeof d == "undefined")? 1: n;
        f = this.substring(0,i);
        l = this.substring(d? (i+n): i);
    
        return f + p + l;
    }
    
    $.gloabl["__"] = function(s)
    {
        arra = Array.prototype.slice.call(arguments, 1);
        patt = /&/g;
        
        while(!!patt.exec(s))
        {
          li = patt.lastIndex -1;
          no = s[li+1];
          if(isNaN(no)) continue;
          s = s.pushAt(li, arra[no-1], true, 2);
        }
    
        return s;
    }

    $.global["str"] = function(v)
    {
        return new String(v);
    }
    
}

function Table(table, margin, VD, HD){
    
    TableUtils.call(this);
    this.setup();

    this.VD     = VD || String.fromCharCode(9619); // ▓
    this.HD     = HD || String.fromCharCode(9632); // ■■■
    
    this.table  = table || [];
    this.margin = margin || 5;

    this.maxColSizes = this.maxColumnSizes();
    this.maxRowSizes = this.getMaxRowSizes();
}
Table.prototype.maxColumnSizes = function(){
    
    var tb = this.table,
        cs = [];

    JL = "\n";

    for(var c=0; c< tb[0].length; c++)
    {
        max = 0;
        for(var r=0; r< tb.length; r++)
        {
            /**************************/
            curr = this.maxLen(tb[r][c].split(JL));
            /**************************/
            if(curr > max) max = curr;
        }
        cs.push(max);
    }
    return cs;
}
Table.prototype.getMaxRowSizes = function(){
    
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
}
Table.prototype.format = function(){

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
    return tb;
}
Table.prototype.render() = function{

    // Stitch the blocks together:

    var tb  = this.table,
        fs  = "",
        JL  = "\n",
        fR  = "",
        rs  = this.maxRowSizes,
        cs  = this.maxColSizes,
        mg  = this.margin;
        
    for(var r=0; r< tb.length; r++)
    {
        rr = "";
        rw = sum(cs); // calculate the row width

        for(var k=0; k< rs[r]; k++) // go through each line of each row:
        {
            for(var c=0; c< cs.length; c++) // go through each column:
            {
                rr += t[r][c].split(JL)[k]; // running split (csize) times not efficient.
            }   rr += JL;
        }
        s += rr + (str(this.HD) * rw) + "\n";
    }
    return s
}

// r = format([
//     ["smart", "work", "big", "play"],
//     ["hard", "sex", "deep", "pussy"],
// ]);
// r = render(r);
// $.writeln(r);