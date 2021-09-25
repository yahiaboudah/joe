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
	//@include "fstring.jsx"
	
	S.$sleep = function(ms, msg){

		if(typeof ms == "undefined") return;
		
		if(!!msg) $.writeln("{0}: Sleeping for {1}..".f(msg, ms))
		$.sleep(ms);
	}

})($);