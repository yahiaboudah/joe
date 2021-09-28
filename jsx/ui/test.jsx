function IconButton(cfg)
{
    DISTINCT_PROPS:
    this.img = cfg.img.standard;
    
    SPECIAL_PROPS:
    this.specialProps = 
    {
        style: cfg.style
    }

    ARGS:
    var b = this.add("iconbutton", undefined, 
    ScriptUI.newImage(
        img,
        cfg.img.disabled || img, 
        cfg.img.clicked  || img, 
        cfg.img.hover    || img
    ), 
    this.specialProps);

    PROPS:
    Object.modify(b,{
        onClick   : cfg.onClick,
        alignment : cfg.alignment,
        helpTip   : cfg.helpTip
    })

    EVENT_LISTENERS: 
    var listen = cfg.eventListeners;
    for(evType in listen)
    {
        if(!listen.hasOwnProperty(evType)) continue;
        for(ev in listen[evType]) 
        {
            if(!listen[evType].hasOwnProperty(ev)) continue;
            b.addEventListener(evType, listen[evType][ev].bind(b))
        }
    }
}



myButton = new _IconButton({
    
    img:
    {
        standard:  "/d/icons/img/sova.png", 
        disabled: "/d/icons/img/kj.png",
        clicked:  "/d/icons/img/kj.png",
        hover:    "/d/icons/img/sova.png"
    },
    
    style: "toolbutton",
    onClick: function(){},
    alignment: ["center", "top"],
    helpTip  :"test iconbutton",

    eventListeners: {
        "mousedown": []
    }
})
