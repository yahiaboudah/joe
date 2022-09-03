
eval(CLASS.re("$.global", "WWindow", "create"))

    [PROTO]
    ({
        __name__: "CREATOR",
        create: function(cfg)
        {
            var ww = new Window(cfg.type || "palette", cfg.title || "untitled");

            if(typeof cfg.banner != "undefined")
            {
                switch(cfg.banner.type)
                {
                    case "ANIMATED":
                        Window.prototype.addAnimatedSequence.call(ww, cfg.banner.folder, cfg.banner.idx);
                        break;
                    default: break;
                }
            };

            cfg.children.forEach(function(child){

                switch(child.type)
                {
                    case "edittext":
                        
                        b = ww.add("edittext", undefined, child.text, {
                            multiline : child.multiline  || false,
                            borderless: child.borderless || false,
                            name: child.name
                        });
                        b.preferredSize = child.size;
                        break;

                    case "button":
                        b = ww.add("button", undefined, child.text);
                        b.onClick = child.onClick.bind(b);
                        break;

                    default:
                        break;
                }
            });

            return ww;
        }        
    })