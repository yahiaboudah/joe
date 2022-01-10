//@include "src/xto.jsx"
xto.load("CSTR/Python");
var py = new Python(fi = new FileInterface({path: "C:/Users/bouda/desktop/test.json"}));
var pytest = py.build("C:/Users/bouda/Desktop/pytest.py");

$.writeln(pytest.functionNames._toSource())