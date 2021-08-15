//@include "activeproject.jsx"
//@include "activescene.jsx"

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
        new ActiveProject(),
        new ActiveScene()
    ]
})