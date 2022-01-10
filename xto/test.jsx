//@include "src/xto.jsx"
xto.load("CSTR/Python");

var py = new Python(new FileInterface({path: "C:/Users/bouda/desktop/test.json"}));
var OO = py.build("C:/Users/bouda/Desktop/pytest.py");
