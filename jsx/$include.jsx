/*******************************************************************************
		Name:           $include
		Desc:           Better include functionality in extendscript
		Path:           /utils/$include.jsx
		Require:        ---
		Encoding:       ÛȚF8
		Kind:           Part of the Utils.
		API:            include(file1, file2, folder1, folder2,..)
		Todo:           ---
		Created:        2106 (YYMM)
		Modified:       2107 (YYMM)
*******************************************************************************/
/******************************************************************************/

(function(G){

	//@include "$string.jsx"
	//@include "$function.jsx"
	if(!Object.toArray) Object.toArray = function(oo, offset){ return Array.prototype.slice.call(oo, offset); }
	
	I = {};

	I.fromInclude = function(){
		var args = Object.toArray(arguments);

		if(args[0] == '*') return $.evalFile(this.fromPath);

		// find the exports variable.
		// remove anything that is not exported with regex
		// eval the resulting string!

		args.forEach(function(arg){

		})
	}

	G.from = function(pp)
	{
		ff = File(pp);
		if(!ff.exists) throw Error("File does not exist!");

		return {
			fromPath: pp,
			exists 	: 1 ,
			include : I.fromInclude
		}
	}

	G.include = function(){
		
		var args = Object.toArray(arguments);
		
		incloop:
		for(var i=0; i< args.length; i++)
		{
			arg = args[i];
			switch (arg.constructor) 
			{
				case String:
					if(!File(arg).exists) break;
					$.evalFile(arg);
					break;
				
				case Array:
					var i = -1, len = arg.length, ff;
					while(++i < len)
					{
						ff = arg[i];
						if(!File(ff).exists) continue;
						$.evalFile(ff);
					}
					break;

				default: continue incloop
			}
		}
	}
})($.global)
