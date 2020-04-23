module.exports = {
    safeString: function (str) {
        return typeof str === 'string' ? str : '';
    }
};
