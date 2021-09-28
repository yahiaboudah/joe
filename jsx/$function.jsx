/*******************************************************************************
		Name:           $function
		Desc:           Function polyfills.
		Path:           /utjsx/$function.jsx
		Encoding:       ÛȚF8
		Kind:           Polyfill for Function.
		API:            bind
		Created:        2109 (YYMM)
		Modified:       2109 (YYMM)
*******************************************************************************/
//---
/******************************************************************************/

(function FunctionUtils(){

	if(!String.prototype._replace)
	{
		String.prototype._replace = function(repCfg){
    
			var str = this;
			for(x in repCfg) if(repCfg.hasOwnProperty(x))
			{
				str = str.split(x).join(repCfg[x])
			}
			return str;
		}
	}

	Function.prototype.bind = Function.prototype.bind || function bind(thisArg) 
	{
		var method = this;
		var args = Array.prototype.slice.call(arguments, 1);
	
		return function bound() {
			var _args = args.concat(Array.prototype.slice.call(arguments));
			if (!(this instanceof bound))
				return method.apply(thisArg, _args);
	
			var __args = [];
			for (var i = 0, len = _args.length; i < len; i++)
				__args.push('_args[' + i + ']');
	
			return eval('new method(' + __args.join(',') + ')');
		};
	}
	
	Function.prototype.body = function(repConfig)
	{
		return this.toString()
			   .replace(/^[^{]*\{[\s]*/,"    ")
			   .replace(/\s*\}[^}]*$/,"")._replace(repConfig || {});
	}
	
	Function.prototype.time = function(context, args){
		var func = this;
		$.hiresTimer;
		func.apply(context, args);
		return $.hiresTimer / 1000000;	
	}
})