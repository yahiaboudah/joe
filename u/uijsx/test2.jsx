
//@include "utils/$include.jsx"

include(    "C:/projects/uijsx/elements/radiobutton.jsx",
            "C:/projects/uijsx/elements/button.jsx",
            "C:/projects/uijsx/elements/image.jsx",
            "C:/projects/uijsx/elements/treeview.jsx",
            "C:/projects/uijsx/elements/treeitem.jsx",
            "C:/projects/uijsx/elements/tab.jsx");
            

rb = new _RadioButton({decide: "decidejaze"});
$.writeln(rb.type);
$.writeln(new _RadioButton({decide: "decidejaze"}).type);
$.writeln(new _Button({babyyy: "BVABBBBBBBT"}).babyyy);
$.writeln(new _Image({put: "sytff"}).put);
$.writeln(new _TreeView({here: "jahzbeklaz"}).here);
$.writeln(new _TreeItem({right: "gere"}).right);
$.writeln(new _Tab({}).type);

$.writeln($.fileName);