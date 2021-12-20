
//@include "xto/src/xto.jsx"
xto.load("$$$$/DATA");

$.global.HTTP = function HTTP(url)
{
    this.S = new Socket();
    
    var url = HTTP.PATTERNS.URL.exec(url), L;
    
    if(url === null)     throw Error("HTTP: Invalid URL");
    if(url[1] != "http") throw Error("HTTP: Invalid Scheme");

    this.U = 
    {
        scheme: url[1],
        host  : url[2],
        port  : url[3] || 80,
        path  : url[4]
    }

    if(!this.S.open(L = "{0}:{1}".re(this.U.host, this.U.port), "binary"))
    {
        throw Error("HTTP: Failed to Connect to {0}".re(L));
    }
}

// [PATTERNS]
HTTP.xt({

    PATTERNS:
    {
        // Use brackets to extract groups later with patt.exec(str)

        URL  : new RegExp(
            [
                "^(.*):\/\/",         // => anything://
                "([A-Za-z0-9\-\.]+)", // => www.mywebsite.com
                ":?([0-9]+)?",        // => :8080 (optional)
                "(.*)$"               // => knazekn (anything at the end)
            
            ].join('')                // => anything://www.mywebsite.com:8080knazekn
        ),
        
        HTTP : new RegExp(
            [
                "/^HTTP\/",     // => HTTP/
                "[\d\.?]+",     // => 88.
                "\d+",          // => 781
                ".*\r/",        // => knaze    
            ].join('')          // HTTP/88.781knaze
        ),
        
        HTTP_HEADER : new RegExp(
            [
                "(.*):",    // => khazekhaze:
                "(.*)\r"    // => oihairhknq
            ].join(''),
            'g'
        )
    }
})

// [REQUST MAKING]
HTTP.prototype.xt({

    request: function(M/*ethod*/, config)
    {
        // PAYLOAD & HEADERS (default/serialization):
        config.payload = $.ser(config.payload || {});
        config.headers = config.headers || {};
        config.connectionType = config.connectionType || "close";

        // BASIC REQUEST STRUCTURE
        var R =
        [
            "{0} {1} HTTP/1.0",
            "Host: {2}",
            "Connection: {3}"

        ].join("\r\n").re(M, this.U.path, this.U.host, config.connectionType), h, H;

        // Default headers
        H = config.headers.xt({
            "Content-Type"  : "application/json",
            "Content-Length": config.payload.length 
        })

        // Insert all headers into Request
        for(h in H) if(h.in(H)) R += "\r\n{0}: {1}".re(h, H[h]);
    
        // Write the Request (return whatever Socket.write() returns)
        return this.S.write("{0}\r\n\r\n{1}".re(R, config.payload));
        //=======================================================
    }
})

// [RESPONSE HANDLING]
HTTP.prototype.xt({
    
    handleResponse: function(config)
    {
        var data,
            payload, payloadIndex, response, 
            http, header;
        
        // Socket.read(), read all data
        for(data = this.S.read(); !this.S.eof; data += this.S.read());

        payloadIndex = data.indexOf("\r\n\r\n");
        //--------------------------------------------------------------------------
        if(payloadIndex == -1) throw Error("HTTP: No Payload found in Response.");//|
        //--------------------------------------------------------------------------

        response = data.substr(0, payloadIndex);
        payload  = data.substr(payloadIndex + 4); // after response..
    
        var http = HTTP.PATTERNS.HTTP.exec(response);
        //-----------------------------------------------------------------
        if(!http) throw Error("HTTP: Response is Invalid");//|
        //-----------------------------------------------------------------
    
        http =
        {
            ver           : Number(http[1]),
            status        : Number(http[2]),
            statusMessage : http[3],
            headers       : {},
            payload       : payload
        }
        // Collect all headers in Response
        while(header = HTTP.PATTERNS.HTTP_HEADER.exec(response))
        {
            http.headers[header[1]] = header[2];
        }

        // Deal with ContentType and Charset
        var contentType = (http.headers["Content-Type"] || http.headers["content-type"] || '').split(";");
        var charset     = config.charset || 
                          (contentType[1] ? /charset=(.*)/.exec(contentType[1])[1] : null);
        
        if(charset) payload = payload.toString(charset);
        contentType = contentType[0];
        if(config.forcejson || contenttype == "application/json") http.payload = $.deser(payload);
        
        return http;
    }
})

var hh = new HTTP("http://uniquefreshtranscendentsecret.neverssl.com/online");
// $.writeln(hh.U.se());
hh.request("GET");