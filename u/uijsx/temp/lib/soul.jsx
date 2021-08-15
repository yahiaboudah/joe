//@include "../../elements/group.jsx"
//@include "../../elements/tab.jsx"
//@include "../../elements/statictext.jsx"

function Soul(){
    this.build = function()
    {
        return new _TabbedPanel({
            orientation: "horizontal",
            alignChildren:  "fill",
            width: 220,
            margins:0,
            children: [
                new Plan(),
                new Gather(),
                new Make(),
                new Give(),
                new Listen(),
                new Receive()
            ]
        })
    }
}