
// [MATRIX RELATED OPERATIONS]
CameraLayer.prototype.xt({
    
    getAOV : function()
    {
        var filmSize    = this.containingComp.height;
            focalLength = this.getProp("Camera Options/Zoom").value;

        return MathEx.getAOV(filmSize, focalLength);
    },

    getWorldMatrix : function()
    {
        return LayerEx.getWorldMatrix(camera = this);
    },

    getLocalMatrix : function()
    {
        var camera = this;
        var lookAtMatrix = LayerEx.getLookAt(camera);
        var localMatrix  = Matrix.multiplyArrayOfMatrices([

            LayerEx.getRotationMatrix(camera),
            LayerEx.getOrientationMatrix(camera),
            Matrix.invert(lookAtMatrix),
            LayerEx.getPositionMatrix(camera),
        ]);

        return localMatrix;
    },

    getProjectedZ : function(w)
    {
        var z = this.getProp("Camera Options/Zoom").value;
        return (z - (z / w));
    },

    getViewMatrix : function()
    {
        var viewMatrix;

        return viewMatrix = Matrix.multiplyArrayOfMatrices([
            
            this.getLocalMatrix(camera),
            this.getWorldMatrix(camera),
        ]);
    }
})