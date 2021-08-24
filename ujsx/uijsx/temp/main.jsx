
//@include "../containers/window.jsx"
//@include "../elements/button.jsx"


w = new _Window({
	type: "dialog",
	title: "test",
	children: [
		new _Button({
			text: "test button"
		})
	]
});

w.show();