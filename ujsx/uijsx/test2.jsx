


function use(){
    return "hello"
}

oo = {
    name: "obj name",
    text: function(){
        return this.name;
    }
}

$.writeln(oo.text())