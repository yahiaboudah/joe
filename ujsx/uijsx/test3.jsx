

Function.prototype.bind = Function.prototype.bind || function bind(thisArg) {
	var method = this;
	var args = Array.prototype.slice.call(arguments, 1);

	return function bound() {
		var _args = args.concat(Array.prototype.slice.call(arguments));
		if (!(this instanceof bound))
			return method.apply(thisArg, _args);

		var __args = [];
		for (var i = 0, len = _args.length; i < len; i++)
			__args.push('_args[' + i + ']');

		return eval('new method(' + __args.join(',') + ')');
	};
}

function iconButton(cfg)
{
    var img = cfg.img.standard;

    var b = this.add("iconbutton", undefined, 
    
    ScriptUI.newImage(
        img, // default
        cfg.img.disabled || img, // onDisabled (b.enabled = false)
        cfg.img.clicked  || img, //onClick
        cfg.img.hover    || img // mouseOver (rollover state)
    ),
    {
        style: cfg.style
    });

    b.onClick = cfg.onClick;
    b.alignment = cfg.alignment;
    b.helpTip = cfg.helpTip;

    listen = cfg.eventListeners;

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

w = new Window("palette");

iconButton.call(w,{
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
        "mousedown": [
            function(){
                app.setTimeout((function(){
                    alert(this.helpTip);
                }).bind(this), 2000)
            }
        ]
    }
})

w.show();