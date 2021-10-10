

function FileInterface()
{
    this.extension = cfg.extension;
    this.path      = cfg.filePath;
    this.fileName  = File(this.path).name;
    this.structure = cfg.structure;
    this.signal    = "{0}/executed.tmp".f(this.path)
}


FileInterface.prototype.validate = function(intfObj)
{
    return Object.validateKeys(
        intfObj,
        "info",
        "contacts",
        "active_req",
        "info/reqs_made",
        "info/reqs_exec",
        "info/past_reqs",
        "active_req/road",
        "active_req/trac",
        "active_req/seed",
        "active_req/crop"
    );
}

FileInterface.prototype.make = function()
{
    return File(I.intfPath).$create(jj.ser(I.intf0, 1));
}

FileInterface.prototype.set = function()
{
    if(!this.validateIntf(intfObj)) throw Error("Invalid PyInterface Obj");

    return File(this.intfPath).$write(jj.ser(intfObj, 1), 'w');
}

FileInterface.prototype.get = function()
{
    return jj.deser(File(this.intfPath).$read());
}

FileInterface.prototype.modify = function(keysP, newV)
{
    var intf = this.get();

    Object.modify(
        intf,
        keysP,
        typeof newV == "function"?
        newV.call(null, Object.getValue(intf, keysP)):
        newV
    );
    
    this.set(intf);
}

FileInterface.prototype.post = function(request)
{
    if(!Object.validateKeys(request, "path", "func", "args")) throw Error("Request structure invalid");

    this.modify("active_req", request);
    return PY;
}

FileInterface.prototype.crop = function(clean)
{
    if(typeof clean == "undefined") clean = true;

    var intf    = this.get(),
        output  = intf.active_req.crop; //crop

    intf.active_req = this.intf0.active_req;
    if(clean) this.set(intf);
    
    return output;
}