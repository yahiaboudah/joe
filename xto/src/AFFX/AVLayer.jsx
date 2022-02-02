AVLayer.prototype.xt(
{
    addProp : function(propPath)
    {            
        var props    = propPath.split("/"),
            lastProp = props[props.length-1].split(':'),
            layer    = this;

        props[props.length-1] = lastProp[0];
        var name = lastProp[1];

        currProp = layer;
        for(i in props) if(props.has(i))
        {
            currProp = currProp.has(props[i])?
                    currProp.property(props[i]):
                    currProp.addProperty(props[i]);
        }

        if(!!name) currProp.name = name;
        return currProp;
    },

    getProp : function(propPath)
    {    
        var props = propPath.split("/");
        var layer = this;

        currProp = layer;
        for(i in props) if(props.has(i))
        {
            currProp = currProp.has(props[i])?
                    currProp.property(props[i]):
                    0;
            
            if(!currProp) return undefined;
        }

        return currProp;
    },

    removeProp : function(propPath)
    {
        return this.getProp(propPath).remove();
    }
})

ShapeLayer.prototype.getProp = AVLayer.prototype.getProp;
ShapeLayer.prototype.removeProp = AVLayer.prototype.removeProp;
ShapeLayer.prototype.addProp = AVLayer.prototype.addProp;