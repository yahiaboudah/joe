


table = {

    table: [],

    HD: String.fromCharCode(9632),
    VD: "(",

    create: function(arr, marg){
        this.table = arr || [];
        this.minMargin = marg || 10;
    },

    repeatStr: function(s, t){
        fs = "";
        while(t--) fs += s;
        return fs;
    },

    // render function ok?
    render: function(){
        $.writeln(this.maxCSizes.toSource() + "\n" + this.maxRSizes.toSource());
        // return 0;
        strTable = "";
        for(var i=0, len= this.table.length; i<len;i++)
        {
            currRow  = this.constructRow(this.minMargin, this.maxCSizes, this.maxRSizes, i/*the row index*/);
            strTable += currRow;
        }

        return strTable;
    },

    // Still a bit foggy!
    constructRow: function(margin, csizes, vsizes, ri){
        
        fr = "";
        r  = this.table[ri];
        num_child_rows = vsizes[ri];
        child_rows = [];
        for(var i= 0, len= r.length; i<len; i++)
        {
            allSize = csizes[i] + margin;
            e = r[i];
            
            // elen = this.getMaxHorizontalLength(e);

            e_parts = e.split("\n");

            for(var k = 0; k< num_child_rows; k++)
            {
                e_part =  e_parts[k] || "";
                elen   =  e_part.length;
                spacing = this.repeatStr(" ", allSize - elen);
                child_rows[k] += e_part + spacing + this.VD + spacing;
            }

            fr = child_rows.join("\n") + "\n" + this.repeatStr(this.HD, this.sum(csizes));

            return fr;

        }
    },
    format: function(){
        // justify = left
        var tb = this.table,
            dm = this.minMargin,
            cs = this.maxColumnSizes(),
            rs = this.maxRowSizes(),
            r  = -1,
            c  = -1;

        var spc = function(n){return this.repeatStr(" ", n)}
        
        for(;++r<tb.length;) for(;++c<tb[0].length;)
        {
                block = tb[r][c];
                bKids = block.split("\n");
                bWdth = this.strWidth(block);
                bHght = this.strHeight(block);
                cSize = cs[c];
                rSize = cs[r];

                for(k=0; k<bKids.length;k++)
                {
                    bKid = bKids[k];

                    // justify: left
                    // lPad = 0 + dm; 
                    // rPad = (cSize - bKid.length) + dm; 

                    // justify: right
                    // rPad =  0 + dm;
                    // lPad = (cSize - bKid.length) + dm;

                    // justify: center
                    lPad = ((cSize - bKid.length)/2) + dm; 
                    rPad = ((cSize - bKid.length)/2) + dm;
        
                    bKid = spc(lPad) + bKid + spc(rPad) + this.VD;
                    bKids[k] = bKid;
                }

                fblock = bKids.join("\n") + "\n" + this.repeatStr(this.HD, cSize);
                tb[r][c] = fblock;
        }
        this.table = tb;
    },
    strWidth: function(s)
    {
        return this.arrMax(s.split("\n"), function(s){
            return s.length;
        });
    },
    strHeight: function(s){
        return s.split("\n").length;
    },
    sum: function(a){
        s = 0;
        for(q=-1; ++q< a.length;) s += a[q]; 
        a = q = null;
        return s;
    },
    arrMax: function(a, f){

        if(!!f) for(i=-1;++i<a.length;) a[i] = f(a[i])
        
        m = a[0];
        for(i=-1;++i<a.length;) if(a[i] > m) m = a[i];

        a = f = i = null;
        return m;
    },
    maxColumnSizes: function(){
        
        var tb = this.table,
            cs = [];

        JL = "\n";

        for(var c=0; c< tb[0].length; c++)
        {
            max = 0;
            for(var r=0; r< tb.length; r++)
            {
                /**************************/
                curr = this.arrMax(tb[r][c].split(JL), function(s){
                    return s.length;
                });
                /**************************/
                if(curr > max) max = curr;
            }
            cs.push(max);
        }
        tb = JL = null;
        return cs;
    },
    maxRowSizes: function(){
        
        var tb = this.table,
            rs = [];
        
        JL = "\n";

        for(var r=0; r< tb.length; r++)
        {
            max = 0;
            for(var c=0; c< tb[r].length; c++)
            {
                /********************************/
                curr = tb[r][c].split(JL).length;
                /********************************/
                if(curr > max) max = curr;
            }
            rs.push(max);
        }
        tb = JL = null;
        return rs;
    }
}


t = table.create([
    ["property is  really", "type extend", "default", "values"],
    ["text", "string", "button", "any"],
    ["onClick", "function", "undefinedd", "undefinedd"]
]);

table.format();

$.writeln(table.table[0][0]);