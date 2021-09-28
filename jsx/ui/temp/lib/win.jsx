//@include "activeproject.jsx"
//@include "../../elements/window.jsx"

app = new _Window({
    type: "palette",
    text: "Content Machine",
    width: 275,
    height: 224,
    orientation: "column",
    alignChildren: ["fill", "top"],
    spacing: 10,
    margins: 16,
    children: [
        new _Button({
            text: "stuff goes here!"
        })
    ]
})