/*******************************************************************************
		Name:           $avlayer
		Desc:           AVLayer prototype extensions.
		Path:           /utjsx/$avlayer.jsx
		Created:        2109 (YYMM)
		Modified:       2110 (YYMM)
*******************************************************************************/
(function(){
    AVLayer.prototype.addProp = function(propPath)
    {            
        var props = propPath.split("/");
        var lastProp  = props[props.length-1].split(':');
        var layer = this;

        props[props.length-1] = lastProp[0];
        var name = lastProp[1]; 

        currProp = layer;
        for(i in props) if(props.hasOwnProperty(i))
        {
            currProp = currProp.hasOwnProperty(props[i])?
                    currProp.property(props[i]):
                    currProp.addProperty(props[i]);
        }

        if(!!name) currProp.name = name;
        return currProp;
    }

    AVLayer.prototype.getProp = function(propPath)
    {    
        var props = propPath.split("/");
        var layer = this;

        currProp = layer;
        for(i in props) if(props.hasOwnProperty(i))
        {
            currProp = currProp.hasOwnProperty(props[i])?
                    currProp.property(props[i]):0;
            
            if(!currProp) return undefined;
        }

        return currProp;
    }

    AVLayer.prototype.removeProp = function(propPath)
    {    
        var props = propPath.split("/");
        var layer = this;

        currProp = layer;
        for(i in props) if(props.hasOwnProperty(i))
        {
            currProp = currProp.hasOwnProperty(props[i])?
                    currProp.property(props[i]):0;
            
            if(!currProp) return undefined;
        }

        return currProp.remove();
    }
})();