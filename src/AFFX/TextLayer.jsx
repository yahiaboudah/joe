
TextLayer

    [PROTO]
    ({
        __name__: "SETTERS",
        
        config: function(cfg)
        {
            var prop = textLayer.property("Source Text");
            var doc = textProp.value;
            doc.applyFill = cfg.applyFill;
            doc.fontSize = cfg.fontSize;
            doc.font = cfg.font;
            doc.fillColor = cfg.fill;
            prop.setValue(doc);

            return this;
        },
    )}

    [PROTO]
    ({
        __name__: "EXPRESSIONS",
        /**Expression to apply to a text layer source:
        * 
        * Example JSON:
        * 
        * [
        * {
        *    "animation": "move ball up"
        * },
        * {
        *    "animation": "move ball down" 
        * }
        * ]
        * 
        * On timeline:
        * 
        * (text = "move ball up")
        * |  <>    <>
        * (text = "move ball up")
        *  <>  |  <>
        * (text = "move ball down")
        * <>   <>   |
        */
        fromJSONAndMarkersOf: function(layerName, jsonDataName, dataPointName)
        //@@requires ["AFFX.Expression"]
        {
            this.sourceText.expression = new Expression(function(){

                var m = thisComp.layer($layerName).marker;
                var t = time;
                var i = m.nearestKey(time).index;
            
                if(m.nearestKey(t).time>t){ i--; } //if: |  <>
                i || (i = 1);
            
                var obj = footage($footageName).sourceData;

                obj[i][$dataPointName];
                
            },{
                $layerName: layerName,
                $footageName: jsonDataName,
                $dataName : dataPointName
            });
        }
    })

    [PROTO]
    ({
        __name__: "WRAPPERS",
        
        animator: function(name)
        {
            var am = this.Text.Animators.addProperty("ADBE Text Animator");
            am.name = name || "animator"; 
            return am;
        }
    })