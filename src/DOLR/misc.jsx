$
    [STATIC]
    ({
        frame: function(strr, chrc, entr)
        {
            strr = (strr || "undefined").toString();
            strr += strr.length%2? ' ':'';
            entr = (entr && entr.is(Number))?entr:20;
            chrc = (chrc || '■'); 

            String.prototype.xt({
                isEmoji: function()
                {
                    return this.length == 2;
                }
            })

            var B   = new String(chrc),
                S   = new String(" ");
            
            var EMOJ_WIDTH = B.isEmoji()? 1.8: 1;
            var tsize = (entr * 2) + (((strr.length + 4) /chrc.length));
            tsize /= EMOJ_WIDTH;

            //####################################################
            //#
            var framo   = "{0}\n{1}\n{0}".re(

                B * tsize,   // ■■■■■■
                
                "{0}{1}{0}".re( // ■       HELLO        ■

                    B * 2, // ■
                    "{0}{1}{0}".f((S * entr), strr) //      STR        
                )
            );
            //#
            //#####################################################

            delete(String.prototype['*']);
            delete(String.prototype.isEmoji);
            return framo;
        },

        hexToRgb : function(hx)
        {
            return [/*r*/(hx >> 16), /*g*/((hx & 0x00ff00) >> 8),/*b*/ (hx & 0xff), /*a*/(255)] / 255;
        },

        rgbToHex : function(rgb)
        {
            var abc = 
            {
                a: (rgb[0] * 255).toString(16),
                b: (rgb[1] * 255).toString(16),
                c: (rgb[2] * 255).toString(16)
            
            }, hx;

            for(x in abc) if(x.in(abc))
            {
                if(abc[x].length != 2) abc[x] = '0' + abc[x];
            }
            
            for(x in abc) if(x.in(abc)) /**/ hx += abc[x]; /**/

            return hx;
        },

        $colorPicker  : function(rgba)
        {
            var hx = $.colorPicker();
            return  rgba? $.hexToRgb(hx): hx;
        }
        //===========================================================================
    })