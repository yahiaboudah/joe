

function $http(config)
{
    return function(config) {

		var socket      = new Socket(),
			URL_PATTERN = (/^(.*):\/\/([A-Za-z0-9\-\.]+):?([0-9]+)?(.*)$/);

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

		var request = 
		[
			"{0} {1} HTTP/1.0".f(method, url.path),
			"Connection: close",
			"Host: {0}".f(url.host)
		
		].join("\r\n");

		if(config.payload) 
        {
			if(typeof config.payload === 'object') 
            {
				config.payload = JSON.stringify(config.payload);
				(config.headers = config.headers || {})["Content-Type"] = "application/json";
			}

			(config.headers = config.headers || {})["Content-Length"] = config.payload.length;
		}

		for(header in (config.headers || {})) 
        {
			request += "\r\n{0}: {1}".f(header, config.headers[header]);
		}

		s.write("{0}\r\n\r\n".f(request));

		if(config.payload) s.write(config.payload);


		var data, response, payload, http = {};
		data = s.read();
		while(!s.eof) data += s.read();

		var response = data.indexOf("\r\n\r\n");
		if(response == -1) throw "No HTTP payload found in the response!";

		payload  = data.substr(response + 4);
		response = data.substr(0, response);

		var http = /^HTTP\/([\d\.?]+) (\d+) (.*)\r/.exec(response), header;
		
        if(http == null) throw "No HTTP payload found in the response!";

		http = 
        {
			ver           : Number(http[1]),
			status        : Number(http[2]),
			statusMessage : http[3],
			headers       : {}
		};

		var httpregex = /(.*): (.*)\r/g;

		while(header = httpregex.exec(response)) http.headers[header[1]] = header[2];

		var contenttype = (http.headers["Content-Type"] || http.headers["content-type"] || '').split(";");
		var charset = config.charset || (contenttype[1] ? /charset=(.*)/.exec(contenttype[1])[1] : null);

		if(charset) payload = payload.toString(charset);
		contenttype = contenttype[0];

		if(config.forcejson || contenttype == "application/json") http.payload = JSON.parse(payload);
		else http.payload = payload;
		
		return http;
	}
};