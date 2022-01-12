//@include "src/xto.jsx"
xto.load("MATH/MATRIX");

var aa = new M([
    [1,2,3],
    [4,5,4]
]);

var bb = new M([
    [2,3,4],
    [2,3,4],
]);

//---------------------------------------------------
function reduce(lum, b) // helper
{
        var n = lum.length;
        var x = M.zeros(n, 1);
        
        var i=-1;
        while(++i<n) x[i] = b[i];

        for (var i = 1; i < n; ++i) {
            var sum = x[i];
            for (var j = 0; j < i; ++j) {
            sum -= lum[i][j] * x[j];
            }
            x[i] = sum;
        }

        x[n - 1] /= lum[n - 1][n - 1];
        for (var i = n - 2; i >= 0; --i) {
            var sum = x[i];
            for (var j = i + 1; j < n; ++j) {
            sum -= lum[i][j] * x[j];
            }
            x[i] = sum / lum[i][i];
        }

        return x;
}
