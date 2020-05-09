module.exports = {
    safeString: function (str) {
        return typeof str === 'string' ? str : '';
    },

    flatten: function (arr) {
        return arr.reduce((flat, curr) => flat.concat(curr));
    },

    unique: function (arr) {
        return Array.from(new Set(arr));
    },

    getFileName: function (fileUrl) {
        const tokens = fileUrl.split('/');
        return tokens[tokens.length - 1];
    },

    removeUndefinedValues: function (obj) {
        const result = {};

        Object.keys(obj).forEach(key => {
            if (key && typeof obj[key] !== 'undefined') {
                result[key] = obj[key];
            }
        });

        return result;
    }
};
