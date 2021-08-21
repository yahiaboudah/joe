/*******************************************************************************
		Name:           $include
		Desc:           better include functionality in extendscript
		Path:           /utils/$include.jsx
		Require:        ---
		Encoding:       ÛȚF8
		Kind:           Part of the Utils.
		API:            include(file1, file2, folder1, folder2,..)
		Todo:           ---
		Created:        2106 (YYMM)
		Modified:       2107 (YYMM)
*******************************************************************************/
//@include "$string.jsx"
/******************************************************************************/

var include = function include(){
	
	args = Array.prototype.slice.call(arguments);
    for(var i=0, len = args.length; i< len; i++)
	{
		path = args[i];
		what = path.checkFF();
		if(!what) continue;
		if(what> 0)
		{// 

		}
		if(what< 0)
		{// if folder: try to get all *.jsx files:

		}

		$.evalFile(args[i]);
	}
}