
Array.prototype.forEach = function(f)
{
    var arr = this;
    for(var i=0; i<arr.length; i++) arr[i] = f.call(null, arr[i], i);
    return arr;
}

IconButton.prototype.resize = function(){

}

function iconbutton(cfg)
{

    var specialProps = {};
    var iname = "iconbutton";
    var spps  = ["style", "toggle"];

    spps.forEach(function(prop){
        specialProps[prop] = cfg[prop];
    }) 

    var ico = this.add(iname, undefined, ScriptUI.newImage(
        
        cfg.image.standard,
        cfg.image.disabled,
        cfg.image.clicked,
        cfg.image.hover

    ), specialProps);

    ico.size = [50, 50];

    ico.onDraw = function()
    {
        if( !this.icon ) return;
        
        var WH = this.size,
        wh = this.icon.size,
        k = Math.min(WH[0]/wh[0], WH[1]/wh[1]);

        this.graphics.drawImage(this.icon,
            
            (WH[0]-wh[0])/2, //x
            (WH[1]-wh[1])/2, //y
            k * wh[0], // w
            k * wh[1]  //h
        
        );
    }

    return ico;
}


iconbutton.call(w = new Window("palette"),{
    
    image: {
        standard: "/d/icons/img/sova.png",
        clicked : "/d/icons/img/kj.png"
    },

    style: "toolbutton",
    toggle: false,

});
w.show();