//@include "../../elements/group.jsx"
//@include "../../elements/statictext.jsx"

function ActiveProject(){
    this.build = function()
    {
        return new _Group({
            orientation: "row",
            alignChildren:  ["left", "center"],
            spacing: 10,
            margins:0,
            children: [
                new _Text({
                    text: "Active Project: Some Nice Video"
                })
            ]
        })
    }
}