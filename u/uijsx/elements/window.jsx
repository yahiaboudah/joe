
function oinfo($obj, $type){
    for(var i=0, str = "", ps = $obj.reflect[$type], len = ps.length; i<len; i++)
    {
        k    = ps[i].toString();
        str += (k + ": " + uneval(win[k]) + "\n");
    }   return str;
}

function _Window(cfg){
    
    this.win  = new Window(cfg.type);
    var props = Object.keys(cfg).remove("children").remove("type");
    
    for(var i=0, len= props.length; i< len; i++)
    {
        this.win[props[i]] = cfg[props[i]];
    }
    
    this.win.preferredSize.width = cfg.width || 100;
    this.win.preferredSize.height = cfg.height || 50;

    if(typeof cfg.children == "undefined") return this.win;

    children = cfg.children;
    for(var k=0, klen= children.length; k< klen; k++)
    {
        child = children[k];
        this.win.add(child.type, undefined, child.text);
    }

    return this.win;
}

win = new Window("palette");
b= win.add("button", undefined, "some random button");

Window.prototype.fill = function(cfg){
    for(x in cfg) this[x] = cfg[x];
}

$.writeln(oinfo(win, "properties"));

win.fill({
    visible: true,
    opacity: 1,
    enabled: true
})
win.show();