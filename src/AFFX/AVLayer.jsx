

AVLayer

    [PROTO]
    ({
        __name__: "PROPS",

        addProp: function(pp)
        {
            var layer = this,
                props = pp.split('/'),
                lprop = props[props.length-1].split(':'), //last prop
                pname = lprop[1],
                prop, i=-1;

            //reset lprop:
            props[props.length-1] = lprop[0];

            prop = layer;
            while(++i<props.length)
            {
                prop = prop.hasOwnProperty(props[i])?
                       prop.property(props[i]):
                       prop.addProperty(props[i]);
            }

            if(is(name, String)) prop.name = name;
            return prop;
        },

        getProp: function(pp)
        {    
            var layer = this,
                props = pp.split('/'),
                prop, i =-1;
            
            prop = layer;
            while(++i<props.length)
            {
                if(!prop.hasOwnProperty(props[i])) return undefined;
                prop = prop.property(props[i]);
            }

            return prop;
        },

        removeProp : function(pp)
        //@requires ["this.getProp"]
        {
            pp = this.getProp(pp);
            if(is(pp, undefined)) return undefined;
            return pp.remove();
        }
    })