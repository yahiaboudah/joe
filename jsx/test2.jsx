

//@include "$table.jsx"
var comp  = app.project.activeItem;
var layer = comp.layer(1);

ShapeLayer.prototype.getit = function()
{
    var table = new Table(Table.process([
        "stuff, is, nasty",
        "All, I, want, to, say, here"
    ]))

    $.writeln(table.show())
    // $.writeln(this.reflect.properties.join("\n"))
}


try{
    layer.getit();
}

catch(e)
{
    $.writeln(e.line);
}