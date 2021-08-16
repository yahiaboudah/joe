//@include "../blocks/container.jsx"

_Window = function _Window(cfg){
    _Container.call(this, cfg, "window");

    this.win = new Window(this.type);
    this.win.preferredSize.width = this.width;
    this.win.preferredSize.height = this.height;
    this.win.text = this.title;
    this.win.orientation = this.orientation;
    this.win.alignChildren = this.alignChildren;
    this.win.spacing = this.spacing;
    this.win.margins = this.margins;

}; Object.extends(_Window, _Container);

_Window.prototype.show = function(){
    this.win.show();
}

_Window.prototype.close = function(){
    this.win.close();
}

ww = new _Window({
    type: "palette",
    title: "My script",
    width: 400,
    height: 400,
});

ww.show();