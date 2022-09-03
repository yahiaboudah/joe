
# PYJSX

Call python scripts from extendscript, and build bindings as well.

# Installation

Download the $python.jsx file and include it in your scripts using:
```
//@include "$python.jsx"
```
You should aslo include the utility files that come along with the library.
($file, $object, $string, $misc)

# Usage

There are two different ways in which you can interact with python scripts.

The first and straightforward way is to use the "call" method.
```
var result = python.call("path/to/python/script", "pymethod", [arg1, arg2,..]);
```
Or you can create javascript bindings, much like the C/C++ built-in ExternalObject:
```
zip = python.build("path/to/python/script");
$.writeln(zip.functions.toSource()); // ["zipfile"]
iszipped = zip.zipfile("path/to/zippee");
$.writeln(iszipped); // true
```
You can also fetch the functions that exist inside a python script using the contact function:
```
python.contact("path/to/python/script");
```
This basically adds the script to the list of contacts in the interface file. By doing this, you can
then call
```
mypython = python.build("mypyscript");
```
The library will automatically detect the script from its file display name because it has already been
contacted.

# Contributing
All contributions are welcome.

# License
This project falls under the MIT license.