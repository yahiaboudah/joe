

var comp  = app.project.activeItem;
var layer = comp.layer(1);

ShapeLayer.prototype.getit = function()
{
    // $.writeln(this.reflect.properties.join("\n"))
}


try{
    layer.getit();
}

catch(e)
{
    $.writeln(e);
}