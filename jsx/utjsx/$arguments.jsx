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
//@include "$string.jsx"
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
                    split     = currParam.split("*/"),
                    s0        = split[0],
                    s1        = split[1];

                params[k] = s0.slice(0, 2) == "/*"?
                            "{0}:{1}".f(s0.slice(2), s1):
                            "Any:{0}".f(s0);
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
                         + "Arg {0} is a {1} and not a {2}",
            MISSING_ARG : "Missing Argument Error.",
            EXTRA_ARG   : "Extra Argument Error."
        }

        var definedAndBool = function(myArg){
                return ((myArg !== undefined) || (myArg.constructor === Boolean));
        }

        if (!definedAndBool(limitArgs)) limitArgs = true;
        if (!definedAndBool(optArgs))   optArgs   = false;


        var stack      = $.stack.split("\n");
            funcName   = stack[stack.length - 3].split("(")[0],
            funcParams = Arguments.params(eval(funcName).toString()),
            isGreater  = (args.length > funcParams.length),
            isLess     = (args.length < funcParams.length);

        if (isGreater && limitArgs) throw Error(ERRS.EXTRA_ARG);
        if (isLess    && !optArgs ) throw Error(ERRS.MISSING_ARG);

        // Args length has priority over params length
        for (var i = 0; i < args.length; i++) {

                var split     = funcParams[i].split(":"),
                    type      = split[0].toLowerCase(),
                    paramName = split[1],
                    argValue  = args[i],
                    argType;

                if ([null, undefined].includes(argValue)) continue;

                argType = argValue.constructor.name.toLowerCase();
                if (!["any", argType].includes(type)) 
                {
                        throw Error(ERR.BAD_ARG.f(
                                "{0}[1]".f(paramName, i),
                                argType,
                                type
                        ));
                }
        }
}