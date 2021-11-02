/*******************************************************************************
    Name:           latex
    Desc:           Latex Getter (info + UI).
    Path:           latex.js
    Created:        2107 (YYMM)
    Modified:       2110 (YYMM)
*******************************************************************************/

//📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜
//                                                                                     📜 
(function(h,s){

    h[s] = s;
    s.version   = 1.0;
    s.getWindow = function(){
        
        return new _Window({

            type  : "palette",
            title : "Get Equation!",

            children: [
                
                {   // TEXTBOX:

                    type: "edittext",
                    name: "latexbox",
                    text: "x",
                    multiline: true,
                    borderless: true,
                    size: [110, 70]
                },

                {
                    type  : "button",
                    text  : "GET!",
                    onClick: function(){
                        
                        s.LatexLib.get(

                            this.window.children["latexbox"].text
                        )
                    }
                }
            ]
        })
    }

})($.global, {toString: function(){return "LatexScript"}}); $.sleep(0);
//                                                                                📜
//📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜📜