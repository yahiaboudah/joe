


table = {

    table: [],

    HD: String.fromCharCode(9632),
    VD: String.fromCharCode(9619),

    create: function(arr, marg){
        this.table = arr || [];
        this.minMargin = marg || 2;
    },

    format: function(){

        String.prototype["*"] = function(n){
            fs = "";
            while(n--) fs += this.toString();
            return fs;
        }
        
        var str = function(v){ return new String(v)}

        // justify = left
        var tb = this.table,
            dm = this.minMargin,
            cs = this.maxColumnSizes(),
            // rs = this.maxRowSizes(),
            r  = -1,
            c  = -1;

        while(++r<tb.length) while(++c<tb[0].length)
        {
                block = tb[r][c];
                bKids = block.split("\n");
                cSize = cs[c];
                // rSize = rs[r];

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
        
                    bKid = str(" ") * lPad + bKid + str(" ") * rPad + this.VD;
                    bKids[k] = bKid;
                }

                fblock = bKids.join("\n") + "\n" + str(this.HD) * (this.maxLen(bKids));
                $.writeln(fblock)
                tb[r][c] = fblock;
        }
        return tb;
        this.table = tb;

        // delete(String.prototype["*"]);
        // str = tb = dm = cs = rs = r = c = null;
    },
    maxLen: function(a){
        m = a[0].length;
        if(a.length == 1) return m;
        for(i=1 ;i<a.length; i++)
        {
            l = a[i].length
            if(l > m) m = l;
        }
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
                curr = this.maxLen(tb[r][c].split(JL));
                /**************************/
                if(curr > max) max = curr;
            }
            cs.push(max);
        }
        tb = JL = null;
        return cs;
    }
}


table.create([
    ["prop bigger is bigger", "type extend", "defaultshit"],
    ["property cool there is a problem", "type extend", "defaultshit tt"]
]);

t = table.format();

// $.writeln(t.length)