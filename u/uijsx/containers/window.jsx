//@include "../blocks/container.jsx"

_Window = function _Window(cfg){
    _Container.call(this, cfg, "window");

    // Window properties:
    this.wintype = this.assign(this.wintype, "palette", ["string"],
                    function(t){
                        if(t != "window"
                        && t != "palette"
                        && t != "dialog"){
                            return true;
                        }
                    });

    this.win = new Window(this.wintype);
    
    this.win.preferredSize.width = 
                this.assign(this.width,200, undefined,
                function(x){return x<=10;});
    
    this.win.preferredSize.height = 
                this.assign(this.height,200, undefined,
                function(x){return x<=10});

    this.win.text = this.assign(this.title, "untitled", ["string"]);
    this.win.orientation = this.assign(this.orientation, "column");
    this.win.alignChildren = this.assign(this.alignChildren, ["left", "center"]);
    this.win.spacing = this.assign(this.spacing, 0);
    this.win.margins = this.assign(this.margins,0);
    
    // Event handling: 
    this.win.onClose = this.assign(this.onClose, undefined, ["function"]);

}; Object.extends(_Window, _Container);

_Window.prototype.show = function(){
    this.win.show();
}

_Window.prototype.close = function(){
    this.win.close();
}

_Window.prototype.center = function(){
    this.win.center();
}

_Window.prototype.setOnClose = function(fn){
    if(typeof fn != "function") return;
    this.win.onClose = fn;
}

ww = new _Window({
    wintype: "palette",
});

ww.show();