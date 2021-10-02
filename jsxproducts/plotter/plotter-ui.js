
function _Window(cfg)
{
    var w = new Window(cfg.type || "palette", cfg.title || "untitled");

    if(typeof cfg.banner != "undefined")
    {
        switch(cfg.banner.type)
        {
            case "ANIMATED":
                w.addAnimatedSequence(cfg.banner.folder, cfg.banner.idx);
        }
    };

    cfg.children.forEach(function(child){
        
    })
}

var w;

w = new _Window({

    title : "Plotter",
    banner: {
        type  : "ANIMATED",
        folder: "/d/media/plotterSequence/",
        idx   : 260 
    },

    children: [
        
        new TextBox({
            text: "Math.pow(x, 2)",
            multiline: true,
            borderless: true,
            size: [110, 70]
        }),

        new Button({
        text  : "Plot",
        onClick: function(){
            
            this.win.PlotterLib.plot(
                
                app.project.activeItem,
                funcBox.text,
                false,
                parseInt(xbasis.text),
                parseInt(ybasis.text),
                -10,
                10,
                1, // stepSize
                parseInt(strokew.text),
                [1,1,1,1]
              )
        }
        })
    ]
})