//@include "../blocks/widget.jsx"

_TreeItem = function _TreeItem(cfg){
    _Widget.call(this, cfg, "treeitem");
}; Object.extends(_TreeItem, _Widget);

_TreeView = function _TreeView(cfg){
    _Widget.call(this, cfg, "treeview");
}; Object.extends(_TreeView, _Widget);

_Text = function _Text(cfg){
    _Widget.call(this, cfg, "statictext");
}; Object.extends(_Text, _Widget);

_Slider = function _Slider(cfg){
    _Widget.call(this, cfg, "slider");
}; Object.extends(_Slider, _Widget);

_RadioButton = function _RadioButton(cfg){
    _Widget.call(this, cfg, "radiobutton");
}; Object.extends(_RadioButton, _Widget);

_ProgressBar = function _ProgressBar(cfg){
    _Widget.call(this, cfg, "progressbar");
}; Object.extends(_ProgressBar, _Widget);

_ListBox = function _ListBox(cfg){
    _Widget.call(this, cfg, "listbox");
}; Object.extends(_Button, _Widget);

_Image = function _Image(cfg){
    _Widget.call(this, cfg, "image");
}; Object.extends(_Image, _Widget);

_IconButton = function _IconButton(cfg){
    _Widget.call(this, cfg, "iconbutton");
}; Object.extends(_IconButton, _Widget);

_TextBox = function _TextBox(cfg){
    _Widget.call(this, cfg, "edittext");
}; Object.extends(_TextBox, _Widget);

_Divider = function _Divider(cfg){
    _Widget.call(this, cfg, "divider");
}; Object.extends(_Divider, _Widget);

_CheckBox = function _CheckBox(cfg){
    _Widget.call(this, cfg, "checkbox");
}; Object.extends(_CheckBox, _Widget);