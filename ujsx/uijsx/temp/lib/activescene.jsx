//@include "../../elements/panel.jsx"
//@include "../../elements/statictext.jsx"
//@include "../res/strRes.jsx"

function ActiveScene(){
    this.build = function()
    {
        return new _Panel({
            orientation: "row",
            alignChildren:  ["left", "center"],
            spacing: 10,
            margins:0,
            children: [
                new _IconButton({
                    text: "Open",
                    src: File.decode(STR_RES.comp),
                }),
                new _CheckBox({
                    text: "info",
                    width: 44, 
                }),
                new _CheckBox({
                    text: "tiktok"
                }),
                new _CheckBox({
                    text: "gif"
                })
            ]
        })
    }
}