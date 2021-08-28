

HD = String.fromCharCode(9632);
VD = String.fromCharCode(9619);

String.prototype["*"] = function(n){
    fs = "";
    while(n--) fs += this.toString();
    return fs;
}
var str = function(v){ return new String(v)}

function maxLen(a){
    m = a[0].length;
    if(a.length == 1) return m;
    for(i=1 ;i<a.length; i++)
    {
        l = a[i].length
        if(l > m) m = l;
    }
    return m;
}

function maxColumnSizes(table){
    
    var tb = table,
        cs = [];

    JL = "\n";

    for(var c=0; c< tb[0].length; c++)
    {
        max = 0;
        for(var r=0; r< tb.length; r++)
        {
            /**************************/
            curr = maxLen(tb[r][c].split(JL));
            /**************************/
            if(curr > max) max = curr;
        }
        cs.push(max);
    }
    return cs;
}

function format(table){

    // justify = left
    var tb = table,
        dm = 10,
        cs = maxColumnSizes(tb),
        // rs = this.maxRowSizes(),
        r  = -1,
        c  = -1;
    while(++r<tb.length) 
    {
        while(++c<tb[0].length)
        {
        block = tb[r][c];
        bKids = block.split("\n");
        cSize = cs[c];

        for(k=0; k<bKids.length;k++)
        {
            bKid = bKids[k];
            lPad = ((cSize - bKid.length)/2) + dm; 
            rPad = ((cSize - bKid.length)/2) + dm;
    
            bKid = str(" ") * Math.floor(lPad) + bKid + str(" ") * Math.ceil(rPad) + VD;
            bKids[k] = bKid;
        }

        tb[r][c] = bKids.join("\n");
        }
        c = -1;
        block = bKids = cSize = fblock = null;
    }
    return tb;
}

function render(tabla){

    t =tabla;
    s = "";
    fullRow = "";
    for(var r=0; r< t.length; r++)
    {
        row ="";
        for(var c=0; c< t[0].length; c++)
        {
            row += t[r][c];
        }
        s += /*+ VD*/ row +  "\n" + str(HD) * (row.length+1) + "\n";
        
    }
    // return str(HD)* (row.length +1) + "\n" + s;
    return s
}

r = format([
    ["smart", "work", "big", "play  pussy", "nah"],
    ["hard", "sex", "deep", "pussy", " i like it"],
    ["hard", "sex", "deep", "pussy", " how i like it"],
    
    ["hard", "sex", "deep", "pussy", " i like it"],
    ["hard", "sex", "deep", "pussy", " how i like it"],
    ["hard", "sex", "deep", "pussy", "t"]
]);
r = render(r);
$.writeln(r);