/*******************************************************************************
		Name:           $$
		Desc:           An extension to extendscript's $ functions.
		Path:           /utils/$$.jsx
		Require:        ---
		Encoding:       ÛȚF8
		Kind:           Part of the Utils.
		API:            $sleep
		Todo:           ---
		Created:        2106 (YYMM)
		Modified:       2107 (YYMM)
*******************************************************************************/
/******************************************************************************/
(function $$(S)
{
	//@include "$fstring.jsx"
	
	S.$sleep = function(ms, msg){

		if(typeof ms == "undefined") return;
		
		if(!!msg) $.writeln("{0}: Sleeping for {1}..".f(msg, ms))
		$.sleep(ms);
	},

	$.log = function(mm)
    {
        var fn = $.fileName.split("/").pop();
        var ff = Folder(File($.fileName).parent).fsName + "/" + fn + ".log";
        var fr = File(ff);
        return (fr.encoding = "UTF-8", fr.open('w'), fr.write(mm + "\n"), fr.close())
    }
	
})($);