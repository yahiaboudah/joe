
(function(h,s){

    h[s] = s;
    s.getWindow = function(){
        
        return new _Window({

            title : "Plotter",
            banner: {
                type  : "ANIMATED",
                folder: "/d/media/plotterSequence/",
                idx   : 260 
            },
        
            children: [
                
                {
                    type: "edittext",
                    name: "functionbox",
                    text: "Math.pow(x, 2)",
                    multiline: true,
                    borderless: true,
                    size: [110, 70]
                },
        
                {
                type  : "button",
                text  : "Plot",
                onClick: function(){
                    
                    this.window.Plotter.plot(
                        
                        app.project.activeItem,
                        this.window.children["functionbox"],
                        false,
                        100,
                        100,
                        -10,
                        10,
                        1, // stepSize
                        5,
                        [1,1,1,1]
                      )
                    }
                }
            ]
        })
    }

})($.global, {toString: function(){return "PlotterScript"}})