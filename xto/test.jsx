//@include "src/xto.jsx"
xto.load("CSTR/Python");

py = new Python();
ff = new FileInterface({path: "C:/Users/bouda/desktop/test.json"})
ff.post({path: "stuff", func: "cutecat", args: ["some", "params"]})
ff.modify("active_req/crop", "some new shit I got you brother");
$.writeln(ff.crop())

// cc = py.call("roadtoheaven", "function", ["params1", "params2"])

// $.writeln(JSON.stringify(ss, 4, 4))

// $.writeln({value: ["knaze", "nazena"], key: 44}.toSource())

// try
// {
//     var rs = py.call("C:/Users/bouda/Desktop/pytest.py", "cutedog", [20]);
//     alert("Python result: {0}".re(rs));
// }
// catch(e) {alert(e)}