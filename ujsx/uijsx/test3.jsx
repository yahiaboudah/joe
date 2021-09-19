

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


function MyHomePage(){
/*
    this.state = {
        title: "MyHomePageTitle"
    }

    this.helloButtonClicked = function()
    {
        this.setState(function(s){
            s["title"] = "NewHomePageTitle";
            return s;
        })
        alert("Hello Button Clicked!");
    }

    this.build = function()
    {
        return new Scaffold({
            appBar: new AppBar({
                title: this.state.title
            }),
            body: new Group({
                children: [
                    new Button({
                        text: "Hello Button",
                        onClick: this.helloButtonClicked
                    })
                ]
            })
        })
    }


*/}

// w = new Window({
//     children: [
//         new myButtonClass()
//     ]
// })

function _IconButton(){

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
