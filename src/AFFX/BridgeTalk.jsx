
BridgeTalk

    [STATIC]
    ({
        __name__: "SENDERS",

        _send: function(target, func, args)
        {
            new BridgeTalk.xt({
                target: target,
                body: "{0}({1});\n{2}"
                      .re(func.name, args.join(','), func.toString())
            }).send();
        }
    })