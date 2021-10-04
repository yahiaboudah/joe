

(function(){
    String.prototype.trim = function(){
        return this.replace(/^\s*/,"").replace(/\s*$/,"");
    }
})();

//@include "$array.jsx"

// simple explode/implode



try
{    
    var layer = app.project.activeItem.layer(1);
    var ss = layer.grabProps("Filter");

    for(var i = 0; i<ss.length; i++)
    {
        $.writeln(ss[i].name)
    }
}
catch(e)
{
    $.writeln(e);
}