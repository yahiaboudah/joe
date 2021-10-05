
//@include "$misk.jsx"
//@include "$array.jsx"


var comp  = app.project.activeItem;
var layer = comp.layer(1);

ShapeLayer.prototype.getit = function()
{
    $.writeln(s)
    $.writeln(this.reflect.methods.join("\n"))
}

layer.getit();

// try{
//     layer.getit();
// }

// catch(e)
// {
//     $.write(e);
//     $.writeln(" => " + e.line)
// }