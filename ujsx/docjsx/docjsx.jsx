


function Table()
{
    this.setup();
    this.table = [];
    this.add_row.apply(this, Object.arr(arguments));
    return this.table.join("\n");
}

Table.prototype.setup = function()
{
    String.prototype.rep = function(x){
        s ="", v = String(this);
        while(x--) s += v;
        return s;
    }

    Object.arr = function(o){
        return Array.prototype.slice.call(o);
    }
}

Table.vd = ")"; // vertical   divider 
Table.hd = String.fromCharCode(9632); // horizontal divider

Table.prototype.row = function()
{
    var args = Array.prototype.slice.call(arguments);
        fsp  = args[0];
        len  = args.length -1,
        str  = "";
    
    for(i=0; ++i<len;)
    {
        str += args[i] + " ".rep(fsp/2) + Table.vd + " ".rep(fsp/2);
    }   str += args[len];

    return str +"\n" + Table.hd.rep(str.length);
}

Table.prototype.add_row = function(){
    this.table.push(this.row.apply(null, Object.arr(arguments)));
}

Table.prototype.get = function(){
    return this.table.join("\n");
}

table = new Table([
    ["property", "type", "default", "values"],

    ["text", "string", "buttontext", "string"],

    ["", "", "", ""]
])
table.spacing = 10;

table = new Table(10, "property", "type" ,"default","values");
table.add_row(10, "text", "string", "button", "any");
// table = new Table();
// table.add_row(10, "stuff", "specialtype", "defaultvalue", "string");

$.writeln(table.get())