

w = new Window("palette");
b = w.add("iconbutton", undefined, 
    
    ScriptUI.newImage(
        "/d/icons/img/sova.png", // default
        "/d/icons/img/kj.png", // onDisabled (b.enabled = false)
        "/d/icons/img/kj.png", //onClick
        "/d/icons/img/sova.png" // mouseOver (rollover state)
    ), 
    
    {
    style: "toolbutton",
});

b.onClick   = clearConsole;
b.alignment = ["center", "top"];
b.helpTip   = "Clear all console data!";

b.addEventListener("mousedown", function(){
    app.setTimeout(function(){
        b.active = !b.active;
        c.active = true;
    })
})

c = w.add("edittext", undefined, "test",
{
    multiline: true, 
    scrollbars: true,
});
c.preferredSize = [150, 100];

w.show();