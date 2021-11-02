
(function tester(h, self){

    h[self] = self;

    self.testSplitTimes = function(thr){
    
        try{
            
            var layer = app.project.activeItem.layer(1);
            SceneDetection.setThreshold(thr);
            /*====================================== */
            st = SceneDetection.getSplitTimes(layer);
            /*====================================== */
            $.writeln("THRESHOLD: {0} => ( {2} split times)\n{1}\n=========".f(thr, st.join("\n"), st.length))
        }
        catch(e){
            $.writeln([e, e.line].join("\n"))
        }
    }

    // // ==========================================================

    // testSplitTimes(102);

    /*
    THRESHOLD: 102 => ( 5 split times)

    1.36803470136803

    1.46813480146813

    1.53486820153487

    1.66833500166833

    1.86853520186854

    =========
    */

    self.numOfSplitsInRange = function(range, step)
    {
        try{
        
            var layer = app.project.activeItem.layer(1);
            var i = range[0], k = range[1],
            numOfSplits = {};
        
            while((k-=step) >= i)
            {
                SceneDetection.setThreshold(k);
                numOfSplits[k] = SceneDetection.getSplitTimes(layer).length;
            }
        
            return numOfSplits;
            
        }
        catch(e){
            $.writeln([e, e.line].join("\n"))
        }
    }

    // // ==========================================================
    // var infoNumOfSplit = numOfSplitsInRange([50, 120], 10);
    // $.writeln(infoNumOfSplit.toSource()) // ({110:0, 100:26, 90:62, 80:62, 70:62, 60:62, 50:62})

})($.global.SceneDetection, {toString: function(){return "tester"}})