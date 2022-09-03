
$.global.M = function M(A){
    
    this.value = (is(A, Array) && is(A[0], Array))? A: [[]];
    this.numRows = this.value.length;
    this.numCols = this.value[0].length;
};

// [HELPERS]
M.prototype.xt({

    toVector: function()
    {
        var A = this;
        if(A.numRows == 1) return A.value[0];
        if(A.numCols == 1) return A.transpose().value[0];

        return 2;
    },

    show: function(joinChar)
    {
        var frame = {
            topleft: "╔",
            topright: "╗",
            bottomright: "╝",
            bottomleft: "╚",
            line: "┊"
        }

        var A = this.value, i = -1, j, row;
        var msg = [];
        while(++i<A.length)
        {   
            j = -1; row = [];
            while(++j<A[0].length) row.push(A[i][j])
            msg.push(row.join(joinChar || (joinChar = '  ')));
        }

        $.writeln(msg._join(function(e, i){
            if(i == 0) return "{0} {1} {2}\r".re(frame.topleft, e, frame.topright);
            if(i == msg.length-1) return "{0} {1} {2}".re(frame.bottomleft, e, frame.bottomright);

            return "{0} {1} {0}\r".re(frame.line, e);
        }));
    }
})

// [GETTERS]
M.prototype.xt({
    
    det: function()
    {
        var A = this;
        var R, i=-1, n = A.value.length;

        var lum = M.zeros(n, n),
            perm= M.zeros(n, 1);

        R = this.decompose(lum.value, perm.toVector());  // -1 or +1
        while(++i<n) R *= lum[i][i];

        return R;
    },

    decompose: function(lum, perm)
    {
                        
        var A = this;
        var toggle = +1; // even (+1) or odd (-1) row permutatuions
        var n = A.value.length;

        var luma = new M(A.value), lum = A.value;
        var perm = M.zeros(n, 1).toVector();

        var j = -1;
        while(++j<n-1)
        {
            var max = Math.abs(lum[j][j]);
            var piv = j;

            var i = j;
            while(++i<n)
            {
                var xij = Math.abs(lum[i][j]);
                if(xij > max) (max = xij, piv = i)
            }

            if (piv != j) 
            {
                var tmp = lum[piv]; (lum[piv] = lum[j], lum[j] = tmp);
                var t = perm[piv]; (perm[piv] = perm[j], perm[j] = t);

                toggle = -toggle;
            }

            var xjj = lum[j][j];
            if (xjj != 0) 
            {
                var i = j;
                while(++i<n)
                {
                    var xij = lum[i][j] / xjj;
                    lum[i][j] = xij;
                    var k = j;
                    while(++k <n) lum[i][k] -= xij * lum[j][k]
                }
            }

        } // j

        return toggle;  // for determinant
    },

    inverse: function()
    {
        var A =this;
        var n = A.value.length, R, lum, perm;

        R = lum = M.zeros(n, n);
        b = perm = M.zeros(n, 1);

        this.decompose(lum, perm);  // ignore return
        while(++i<n) 
        {
            while(++j<n) b[j] = (i == perm[j])? 1:0;
            
            var x = reduce(lum, b);
            while(++j<n) R[j][i] = x[j];
        }

        return new M(R);
    }
})

// [standard functions]
M.xt({

    dot: function(A, B)
    {
        if(A.length !== B.length) return;

        var i=-1, R=0;
        while(++i<A.length) R += (A[i] * B[i]);

        return R;
    },

    zeros: function(numRow, numCol)
    {
        var A = [], i=-1, j;
        while(++i<numRow)
        {
            A[i] = []; j=-1;
            while(++j<numCol) A[i].push(0);
        }

        return new M(A);
    },

    reduce: function(lum, b)
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
})

// [Shape Shifters]
M.prototype.xt({

    invert: function()
    {
        // det != 0
        var n = this.length, R, lum, perm;

        R = lum = M.zeros(n, n);
        b = perm = M.zeros(n, 1);

        this.decompose(lum, perm);  // ignore return
        
        while(++i<n) 
        {
            while(++j<n) b[j] = (i == perm[j])? 1:0;
            
            var x = M.reduce(lum, b);
            while(++j<n) R[j][i] = x[j];
        }

        return new M(R);
    },

    transpose: function()
    {
        var A = this.value;
        var R = [], i=-1, j=-1, col;
        while(++i<A[0].length)
        {
            col = []; j=-1;
            while(++j<A.length) col.push(A[j][i]);
            R.push(col);
        }

        return new M(R);
    }
})

// [PROPERTIES]
M.xt({                
    identity : function(dim)
    {
        if(!(dim && dim.is(Number))) dim = 4;
        
        var mat = [], i = j = -1;
        while(++i < dim)
        {
            mat[i] = [];
            while(++j < dim) mat[i][j] = (i==j)?1:0;
        }
        
        return new M(mat);
    }
})

// [OPERATORS]
M.prototype.xt({

    '*': function(K)
    {
        var MX = this.value, R;

        switch(K.constructor)
        {
            case Number:
                this.forEach(function(e){
                    return 2 * e;
                });
                break;
            
            case M:
                if(this.numCols != K.numRows) return 2;
            
                K  = K.transpose().value;
                R  = M.zeros(this.numRows, K.numCols).value;

                var i=-1, j;
                while(++i<K.length){
                    j = -1;
                    while(++j<MX.length) R[j][i] = M.dot(K[i], MX[j])
                }

                return new M(R);
            
            default: return 1;
        }
    },

    '/': function(K)
    {
        switch(K.constructor)
        {
            case Number:
                this.forEach(function(e){
                    return e / K;
                })
                break;
            
            case M:
                K = K.invert();
                if(this.numCols != K.numCols || this.numRows != K.numRows) return 2;

                this['*'](K);
        }
    },

    '+': function(K)
    {
        switch(K.constructor)
        {
            case Number:
                this.forEach(function(e){
                    return e + K;
                })
                break;
            
            case M:
                if(this.numCols != K.numCols || this.numRows != K.numRows) return 2;

                this.forEach(function(e, i, j){
                    return e + K.value[i][j];
                })
        }
    },

    '-': function(K)
    {
        switch (K.constructor) {
            case Number:
                this['+'](-K);
                break;
            
            case M:
                K.forEach(function(e){return -e});
                this['+'](K);
            
            default: return 2;
        }
    },

    // Hadamard
    '^': function(K)
    {
        if(!is(K, M)) return 2;

        if(this.numCols != K.numCols || this.numRows != K.numRows) return 2;

        this.forEach(function(e, i, j){
            return e * K.value[i][j];
        })
    },

    '==': function(K)
    {
        return (
            is(K, M)
            && this.numRows == K.numRows
            && this.numCols = K.numCols
            && this.every(function(e, i, j){
                return e == K.value[i][j]
            })
        )
    }
})

// [ITERATORS]
M.prototype.xt({

    forEach: function(cb)
    {
        var i=-1, j;
        while(++i<this.numRows)
        {
            j =-1;
            while(++j<this.numCols) this.value[i][j] = cb.call(undefined, this.value[i][j], i, j);    
        }
    },

    every: function(cb)
    {
        var i=-1, j;
        while(++i<this.numRows)
        {
            j = -1;
            while(++j<this.numCols) if(!cb.call(undefined, this.value[i][j], i, j)) return false;
        }

        return true;
    }
})