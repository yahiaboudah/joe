

arr = [5,6,7];

var yo = {Array: [], Object: {}}[arr.constructor.name];

for(x in arr) if(arr.hasOwnProperty(x))
{
    yo[x] = arr[x];
}

$.writeln(yo)
