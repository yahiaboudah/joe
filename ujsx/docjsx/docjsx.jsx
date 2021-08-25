


function Table()
{
    this.setup();
    this.table = [
        this.row(10, "property", "type" ,"default","values")
    ];
    return this.table.join("\n");
}

Table.prototype.setup = function()
{
    String.prototype.rep = function(x){
        s ="", v = String(this);
        while(x--) s += v;
        return s;
    }
}

Table.vd = "|"; // vertical   divider 
Table.hd = "_"; // horizontal divider

Table.prototype.row = function(fsp)
{
    var args = Array.prototype.slice.call(arguments),
        len  = args.length -1,
        str  = "";
    
    for(i=0; ++i<len;)
    {
        str += args[i] + " ".rep(fsp/2) + Table.vd + " ".rep(fsp/2);
    }   str += args[len];

    return str +"\n" + Table.hd.rep(str.length);
}

Table.prototype.get = function(){
    return this.table.join("\n");
}

table = new Table();

$.writeln(table.get())