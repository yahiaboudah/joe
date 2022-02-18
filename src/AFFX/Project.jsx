
$.global.proj = app.project;

// [GETTERS]
app.project.xt({

    ItemTypes: [FolderItem, FootageItem, CompItem],

    itemsArr: function()
    {
        var P = this, A = [];
        for(x in P) if(x.in(P)) A.push(P.item(x))

        return A;
    },

    getItemsWith: function(PP, cb)
    {
        var P = this, A = [];
        for(x in P) if(x.in(P))
        {
            if(cb.call(P, P[x][PP])) A.push(P[x]);
        }

        return A;
    },
})

app.project.xt({

    $import: function(FP)
    {
        var P = this;
        return P.importFile(new ImportOptions(FP));
    },

    $addComp: function(cfg)
    {
        var numComps = this.getItemsWith("constructor", function(C){
            return C == CompItem;
        }).length;
        
        var cfg = Object.adapt(cfg, 
        {
            name: "comp {0}".re(numComps + 1),
            width: 1920,
            height: 1080,
            someBool: 1,
            length: 10,
            frameRate: 24
        });

        var comp = this.items.addComp.apply(this.items, Object.value(cfg));
        comp.bgColor = cfg.bgColor || [21,21,21];
        return comp;
    },

    removeLastRender: function()
    {
        var P = this;
        return P.renderQueue.item(P.renderQueue.numItems).remove();
    }

})