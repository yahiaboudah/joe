/*******************************************************************************
    Name:           plotter
    Desc:           Plotter Script (info + UI).
    Path:           plotter.js
    Created:        2109 (YYMM)
    Modified:       2110 (YYMM)
*******************************************************************************/

//📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜
//                                                                                     📜 
(function(h,s){

    h[s] = s;
    s.version   = 1.32;
    s.getWindow = function(){
        
        return new _Window({

            title : "Plotter",
            banner: {
                type  : "ANIMATED",
                folder: "/d/media/plotterSequence/",
                idx   : 260 
            },
        
            children: [
                {   // TEXTBOX:

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
                        
                        s.Plotter.plot(
                            
                            app.project.activeItem,
                            this.window.children["functionbox"].text,
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

})($.global, {toString: function(){return "PlotterScript"}}); $.sleep(0);
//                                                                                📜
//📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜