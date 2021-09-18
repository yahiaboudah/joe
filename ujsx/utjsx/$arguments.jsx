/*******************************************************************************
		Name:           $arguments
		Desc:           A class that verifies the existence and types of function arguments.
		Path:           /utils/$arguments.jsx
		Require:        String: repSeq
		Encoding:       ÛȚF8
		Kind:           Part of the Utils.
		API:            Arguments.params, Arguments.paramCheck
		Todo:           ---
		Created:        2106 (YYMM)
		Modified:       2107 (YYMM)
*******************************************************************************/
//@include "$string.jsxinc"
/******************************************************************************/

function Arguments() {};

/*
* Get a function args (eg. Arguments.getArgs(Arguments.getArgs) => ["c", "nocom"])
*/
Arguments.getArgs = function(c, nocom)
{

  if(typeof nocom == "undefined") nocom =true;
  return  c.toString().split(/\)\/*/)[0]
                      .replace(/^[^(]*[(]/, '')  
                      .replace(/\s+/g, '')
                      .replace(nocom?/\/\*([\s\S]*?)\*\//g:'','')
                      .split(',');
}

/**
 * Extract parameter names and types from a function definition.
 * @param {String} func The function string  
 */
Arguments.params = function( /*String*/ func) {

        var paramsList = Arguments.getArgs(func);

        for (var k = 0, len = params.length; k < len; k++) {

                var currParam = params[k],
                    split     = currParam.split("*/");

                if (split[0].slice(0, 2) == "/*") params[k] = "{0}:{1}".f(split[0].slice(2), split[1]);
                else params[k] = "Any:{0}".f(split[0]);
        }


        return paramsList;
}
/**
 * 
 * @param {object} args the function arguments
 * @param {Boolean} limitArgs the name of the function: optional parameter.
 * @returns {0}  if params are healthy
 */
Arguments.check = function( /*Object*/ args, /*Boolean*/ optArgs, /*Boolean*/ limitArgs) {
        

        const ERRS = 
        {
            BAD_ARG     :  "Bad Argument Error."
                          + "Arg type of: {0} was found [{1}] insead of [{2}]",
            MISSING_ARG : "Missing Argument Error.",
            EXTRA_ARG   : "Extra Argument Error."
        }

        var definedAndBool = function(myArg){
                return (myArg !== undefined) || (myArg.constructor === Boolean);
        }

        if (!definedAndBool(limitArgs)) limitArgs = true;
        if (!definedAndBool(optArgs))   optArgs   = false;


        var stack = $.stack.split("\n"),
        funcName = stack[stack.length - 3].split("(")[0],
        funcParams = Arguments.params(eval(funcName).toString()),
        isGreater = (args.length > funcParams.length),
        isLess = (args.length < funcParams.length);

        if (isGreater && limitArgs) return { errMsg: errs.extraArgMsg };
        else if (isLess && !optArgs) return { errMsg: errs.missingArgMsg };

        // Args length has priority over params length
        for (var i = 0; i < args.length; i++) {

                var split = funcParams[i].split(":"),
                    type = split[0].toLowerCase(),
                    paramName = split[1],
                    argValue = args[i],
                    argValueType;

                if (argValue === undefined || argValue === null) continue;

                argValueType = argValue.constructor.name.toLowerCase();
                badArgMsgg   = errs.badArgMsg.repSeq('@',paramName + "[" + i + "]", argValueType, type);
                if ((argValueType != type) && (type != "any")) return { errMsg: badArgMsgg };
                else continue;
        }

        return 0;
}
