function _Video(cfg){
    this.type = "video";
    for(x in cfg) this[x] = cfg[x];
    return this;
}