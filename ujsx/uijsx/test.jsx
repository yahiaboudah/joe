
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


ui = 
{
    type: "palette",
    state: {
        "statetext": {
            value: "textvalue",
            listeners:[
                [1, "text", function(v){ return v}]
            ]
        },
        "statecounter": {
            value: 0,
            listeners:[]
        }
    },
    spacing: 15,
    margins: 10,
    orientation: "column",
    children: [
        {
            type: "button",
            text: "button",
            onClick: function(){
                // this.text ="weirdly";
                this.setState("statetext", function(s){ return "t:" + this.statecounter.value});
                this.setState("statecounter", function(c){ return c+1})
            }
        },
        {
            type: "statictext",
            text: "no worries",
            onClick: function(){

            }
        }
    ]
}

function StateManager(){}
StateManager.setState = function(stateVar, newState){
    
    // update the state value:
    oldState = this.state[stateVar].value;
    if(typeof newState == "function") newState = newState.call(this.state, oldState);
    this.state[stateVar].value = newState;

    //notify the listeners:
    ls = this.state[stateVar].listeners;
    for(var i=0; i<ls.length; i++)
    {
        addr = ls[i][0];
        prop = ls[i][1];
        func = ls[i][2];
        this.children[addr][prop] = newState;
    }
}


function parse(tree){

    root = new Window(tree.type);
    root.spacing = tree.spacing;
    root.margins = tree.margins;
    root.orientation = tree.orientation;
    root.setState = StateManager.setState.bind(root);

    root.state = tree.state;

    children = tree.children;

    for(var i=0; i<children.length;i++)
    {
        tmp = root.add(children[i].type);
        tmp.text    = children[i].text;
        tmp.onClick = children[i].onClick.bind(root);
    }

    return root;
}

rend = parse(ui);
rend.show();