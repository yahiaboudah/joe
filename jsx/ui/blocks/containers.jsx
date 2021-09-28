_Group = function _Group(cfg){
    _Widget.call(this, cfg, "group");
}; Object.extends(_Group, _Container);

_Panel = function _Panel(cfg){
    _Widget.call(this, cfg, "panel");
}; Object.extends(_Panel, _Widget);

_Tab = function _Tab(cfg){
    _Widget.call(this, cfg, "tab");
}; Object.extends(_Tab, _Container);

_TabbedPanel = function _TabbedPanel(cfg){
    _Widget.call(this, cfg, "tabbedpanl");
}; Object.extends(_TabbedPanel, _Container);