
Date

    [PROTO]
    ({
        toJSON: function()
        {
            return isFinite(this.valueOf())?
                (
                    "{0}-{1}-{2}T{3}:{4}:{5}Z".re(
                        this.getUTCFullYear(),
                        this.getUTCMonth(),
                        this.getUTCDate(), //Date or day?
                        this.getUTCHours(),
                        this.getUTCMinutes(),
                        this.getUTCSeconds()
                    )
                ) : null;
        }
    })