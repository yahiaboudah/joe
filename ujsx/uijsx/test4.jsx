
Function.prototype.bind = function(thisArg) {
	
    var method = this,
	    args   = Array.prototype.slice.call(arguments, 1);

	return function() 
    {
        return method.apply(thisArg, args.concat(
            Array.prototype.slice.call(arguments)
        ));
	}
}



function _Image(cfg)
{
    this.properties = cfg;
    
    this.build = function(context)
    {
        this.widget = context.add("image", undefined,  this.properties)
    }

    this.widget.onClick = this.properties.onClick.bind(this.widget);
}

w = new Window("palette", "title", undefined,
{
    state:
    {
        myVar: "is this",
        other: "is that"
    },
    myWin: "hello baby"
});

b = w.add(undefined, undefined, undefined,{
    type: "button",
    text: "test"
})

w.show();