
//@include "src/xto.jsx"
xto.load("CSTR/Python");


var III = new FileInterface({

    filePath: "C:/Users/bouda/Desktop/PYJSX/myInterface.txt",
    intf0: {
        info: {
            contacts: ["D:/PythonScripts/pythonScript.py"]
        }
    }
});

var python = new Python(III);

$.writeln(Python.path);
$.writeln(III.path);