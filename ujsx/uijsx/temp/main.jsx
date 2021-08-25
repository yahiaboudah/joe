
//@include "../containers/window.jsx"
//@include "../elements/button.jsx"
//@include "../elements/statictext.jsx"


w = new _Window({
	wintype: "palette",
	nosize: true,
	spacing: 10,
	margins: 10,
	title: "test",
	children: [	
		new _Button({
			text: "some stuff",
			onClick: function(){
				alert("some stuff got cliked on, clicked on, shit on..!");
			}
		})
	]
});

w.show();