


table = {

    table: [],

    HD: String.fromCharCode(9632),
    VD: "(",

    create: function(tableArr, minMargin){
        this.table = tableArr;
        this.minMargin = minMargin || 10;
        temparr = this.getMaxSizes();
        this.maxRSizes = temparr[0];
        this.maxCSizes = temparr[1];
    },

    repeatStr: function(s, t){
        fs = "";
        while(t--) fs += s;
        return fs;
    },

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

    getMaxHorizontalLength: function(ez){
        var e_parts = ez.split("\n");
        for(ii=-1; ++ii<e_parts.length;) e_parts[ii] = e_parts[ii].length;
        return Math.max.apply(null, e_parts);
    },

    constructRow: function(margin, hsizes, vsizes, ri){
        
        fr = "";
        r  = this.table[ri];
        num_child_rows = vsizes[ri];
        child_rows = [];
        for(var i= 0, len= r.length; i<len; i++)
        {
            allSize = hsizes[i] + margin;
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

            fr = child_rows.join("\n") + "\n" + this.repeatStr(this.HD, this.sum(hsizes));

            return fr;

        }
    },

    sum: function(arr){
        s = 0;
        for(var q= 0; q< arr.length; q++)
        {
            s += arr[q]; 
        }   return s;
    },
    getMaxSizes: function(){
        tableArr = this.table;
        csizes = [];
        for(var c=0; c< tableArr[0].length; c++)
        {
            maxCSize = 0;
            for(var r=0; r< tableArr.length; r++)
            {
                currCSize = tableArr[r][c].length;
                if(currCSize > maxCSize) maxCSize = currCSize;
            }
            csizes.push(maxCSize);
        }

        rsizes = [];
        for(var r=0; r< tableArr.length; r++)
        {
            maxRSize = 0;
            for(var c=0; c< tableArr[r].length; c++)
            {
                currRSize = tableArr[r][c].split("\n").length;
                if(currRSize > maxRSize) maxRSize = currRSize;
            }
            rsizes.push(maxRSize);
        }

        return [rsizes, csizes]
    }
}


t = table.create([
    ["property is  really", "type extend", "default", "values"],
    ["text", "string", "button", "any"],
    ["onClick", "function", "undefinedd", "undefinedd"]
]);

rt = table.render();

$.writeln(rt);