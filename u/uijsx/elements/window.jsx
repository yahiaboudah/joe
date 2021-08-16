//@include "../blocks/container.jsx"

_Window = function _Window(cfg){
    _Container.call(this, cfg, "window");

    this.win = new Window(this.type);
    
    this.win.preferredSize.width = 
                this.assign(this.width,200, undefined,
                function(x){return x<=0;});
    
    this.win.preferredSize.height = 
                this.assign(this.height,200, undefined,
                function(x){return x<=0});

    this.win.text = this.assign(this.title, "untitled");
    this.win.orientation = this.assign(this.orientation, "column");
    this.win.alignChildren = this.assign(this.alignChildren, ["left", "center"]);
    this.win.spacing = this.assign(this.spacing, 0);
    this.win.margins = this.assign(this.margins,0);

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

ww = new _Window({
    type: "palette",
    // title: "My script",
    // width: 400,
    // height: 400,
});

ww.show();