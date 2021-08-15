_RadioButton = function _RadioButton(cfg){
    this.type = "radiobutton";
    for(x in cfg) this[x] = cfg[x];
    return this;
}