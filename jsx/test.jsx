
url = "https://www.facebook.com";
iss = (/^(.*):\/\/([A-Za-z0-9\-\.]+):?([0-9]+)?(.*)$/).exec(url);

$.writeln(iss.join("\n"))