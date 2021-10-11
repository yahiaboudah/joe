

function $http(config)
{
	jj =
	{
		ser: function(data)
		{
			return JSON.stringify(data);
		},
		deser: function(data)
		{
			return JSON.parse(data);
		}
	}

	function makeRequest()
	{
		var request = 
		[
			"{0} {1} HTTP/1.0".f(method, url.path),
			"Connection: close",
			"Host: {0}".f(url.host)
		
		].join("\r\n"), header;

		// PÄYLOAD:
		if(typeof config.payload === "object")
		{
			config.payload = jj.ser(config.payload);
			config.headers = config.headers || {};

			config.headers["Content-Type"]   = "application/json";
			config.headers["Content-Length"] = config.payload.length;
		}

		// ADD [HEADER] INFO:
		for(h in config.headers) request += "\r\n{0}: {1}".f(h, config.headers[h]);

		return request;
	}

    return function(config) {

		var socket       = new Socket(),
			URL_PATTERN  = (/^(.*):\/\/([A-Za-z0-9\-\.]+):?([0-9]+)?(.*)$/),
			HTTP_PATTERN = (/^HTTP\/([\d\.?]+) (\d+) (.*)\r/),
			HTTP_REGEX   = (/(.*): (.*)\r/g);

		var url    = URL_PATTERN.exec(config.url),
        	method = config.method || 'GET';

		//----------------------------------------------------------
		if(!url)			 throw Error("UNABLE to parse URL"); //|
		if(url[1] != "http") throw Error("ONLY scheme is HTTP"); //|
		//----------------------------------------------------------

		url =
        {
			scheme: url[1],
			host  : url[2],
			port  : url[3] || (url[1] == "https" ? 443 : 80),
			path  : url[4]
		}

		var linkStr = "{0}:{1}".f(url.host, url.port),
			isOpen  = socket.open(linkStr, "binary");
		
		//-------------------------------------------------------------
		if(!isOpen) throw Error("Can't connect to {0}".f(linkStr)); //|
		//-------------------------------------------------------------

		
		// WRITE THE [REQUEST]:
		var req = makeRequest();
		socket.write("{0}\r\n\r\n".f(req));
		if(config.payload) socket.write(config.payload);


		// [RESPONSE] HANDLING:
		var payload, http = {};
		for(var data = socket.read(); !socket.eof;)
		{
			data += socket.read();
		}

		var response = data.indexOf("\r\n\r\n");

		//--------------------------------------------------------------------------
		if(response == -1) throw Error("No HTTP payload found in the response.");//|
		//--------------------------------------------------------------------------

		response = data.substr(0, response);
		payload  = data.substr(response + 4); // after response..

		var http = HTTP_PATTERN.exec(response), header;
		
		//-----------------------------------------------------------------
        if(!http) throw Error("No HTTP payload found in the response!");//|
		//-----------------------------------------------------------------

		http = 
        {
			ver           : Number(http[1]),
			status        : Number(http[2]),
			statusMessage : http[3],
			headers       : {}
		}

		while(header = httpregex.exec(response))
		{
			http.headers[header[1]] = header[2];
		}

		var contenttype = (http.headers["Content-Type"] || http.headers["content-type"] || '').split(";");
		var charset     = config.charset || (contenttype[1] ? /charset=(.*)/.exec(contenttype[1])[1] : null);

		if(charset) payload = payload.toString(charset);
		contenttype = contenttype[0];

		if(config.forcejson || contenttype == "application/json")
		{
			http.payload = jj.deser(payload);
		}

		else http.payload = payload;
		
		return http;
	}
}