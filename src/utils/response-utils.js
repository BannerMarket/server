module.exports = {
    send: function (res, code = 200, error = null, data = null) {
        if (error) {
            res.status(code).json({error, code});
        } else if (data) {
            res.status(code).json({data, code});
        } else {
            res.status(code).json({code});
        }
    },
};
