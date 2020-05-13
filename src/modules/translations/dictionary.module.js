const Translation = require('../../models/translation.model');
const { send } = require('../../utils/response-utils');
const { handleError } = require('../../utils/error-handler');

// @desc Add new translation or update old one
// @route PUT /dictionary/by-key/:key
// @access Public
// todo make access Private
exports.setTranslation = async (req, res) => {
    try {
        const key = req.params.key;
        let translation = await Translation.findById(key);

        if (translation) {
            translation.en = req.body.en;
            translation.ge = req.body.ge;
        } else {
            translation = new Translation({...req.body, _id: key});
        }

        const updated = await translation.save();
        send(res, 200, null, updated);
    } catch (e) {
        handleError(res, e, 500);
    }
};

// @desc Get translation
// @route GET /dictionary/by-key/:key
// @access Public
exports.getTranslation = async (req, res) => {
    try {
        const key = req.params.key;
        const translation = await Translation.findById(key);

        if (!translation) {
            return send(res, 404, `Translation with key ${key} not found`);
        }

        send(res, 200, null, translation);
    } catch (e) {
        handleError(res, e, 500);
    }
};

// @desc Remove translation
// @route DELETE /dictionary/by-key/:key
// @access Public
// todo make access Private
exports.removeTranslation = async (req, res) => {
    try {
        const key = req.params.key;
        const translation = await Translation.findById(key);

        if (!translation) {
            return send(res, 404, `Translation with key ${key} not found`);
        }

        await translation.remove();
        send(res, 204);
    } catch (e) {
        handleError(res, e, 500);
    }
};

// @desc Get all translations for specified language
// @route GET /dictionary/by-language/:language
// @access Public
exports.getDictionary = async (req, res) => {
    try {
        const language = req.query.language;
        const hasSelectedLanguage = translation => !!translation[language];
        const withSelectedLanguage = (dictionary, translation) => ({...dictionary, [translation['_id']]: translation[language]});

        if (!language) {
            return send(res, 400, `No language argument was supplied`);
        }

        const translations = await Translation.find({});

        const dictionary = translations
            .filter(hasSelectedLanguage)
            .reduce(withSelectedLanguage, {});

        send(res, 200, null, dictionary);
    } catch (e) {
        handleError(res, e, 500);
    }
};

