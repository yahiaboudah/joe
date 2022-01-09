//@include "src/xto.jsx"
xto.load("CSTR/Python");

var py = new Python(new FileInterface({path: "C:/Users/bouda/desktop/test.json"}));
py.contact(File("C:/Users/bouda/Desktop/pytest.py"));
