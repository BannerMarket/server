const Utils = {
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
    },

    getResponseLanguage: function (language) {
        return language && language === 'en' ? 'en' : 'ka';
    },

    extractBannerForLanguage: function(language) {
        return language === 'en' ? Utils.extractBannerInEnglish : Utils.extractBannerInGeorgian;
    },

    extractBannerInGeorgian: function (fullBanner) {
        return {
            _id: fullBanner._id,
            lat: fullBanner.lat,
            lng: fullBanner.lng,
            directions: fullBanner.directionsGe,
            categories: fullBanner.categories,
            title: fullBanner.titleGe,
            shortDescription: fullBanner.shortDescriptionGe,
            fullDescription: fullBanner.fullDescriptionGe,
            images: fullBanner.images,
        }
    },

    extractBannerInEnglish: function (fullBanner) {
        return {
            _id: fullBanner._id,
            lat: fullBanner.lat,
            lng: fullBanner.lng,
            directions: fullBanner.directionsEn,
            categories: fullBanner.categories,
            title: fullBanner.titleEn,
            shortDescription: fullBanner.shortDescriptionEn,
            fullDescription: fullBanner.fullDescriptionEn,
            images: fullBanner.images,
        }
    },
};

 module.exports = Utils;
