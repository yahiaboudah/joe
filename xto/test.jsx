//@include "src/xto.jsx"
xto.load("CSTR/Python");

var py = new Python(new FileInterface({path: "C:/Users/bouda/desktop/test.json"}));
py.call("C:/Users/bouda/Desktop/pytest.py", "cutecat", [100])