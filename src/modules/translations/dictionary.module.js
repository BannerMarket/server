const Translation = require('../../models/translation.model');
const { send } = require('../../utils/response-utils');

function setTranslation(req, res) {
    const key = req.params.key;

    Translation.findById(key, (err, translation) => {
        if (err) {
            return send(res, 500, err);
        }

        if (translation) {
            translation.en = req.body.en;
            translation.ge = req.body.ge;
        } else {
            translation = new Translation({...req.body, _id: key});
        }

        translation.save(err => {
            if (err) {
                send(res, 500, err);
            }
            send(res, 201, null, translation);
        });
    });
}

function getTranslation(req, res) {
    const key = req.params.key;

    Translation.findById(key, (err, translation) => {
        if (err) {
            return send(res, 500, err);
        }

        if (translation) {
            return send(res, 200, null, translation);
        }

        return send(res, 404, `Translation with key ${key} not found`);
    });
}

function removeTranslation(req, res) {
    const key = req.params.key;

    Translation.findById(key, (err, translation) => {
        if (err) {
            return send(res, 500, err);
        }

        if (translation) {
            return translation.remove(err => {
                if (err) {
                    return send(res, 500, err);
                }

                return send(res, 204);
            })
        }

        return send(res, 404, `Translation with key ${key} not found`);
    });
}

function getDictionary(req, res) {
    const language = req.query.language;
    const hasSelectedLanguage = translation => !!translation[language];
    const withSelectedLanguage = (dictionary, translation) => ({...dictionary, [translation['_id']]: translation[language]});

    if (!language) {
        return send(res, 400, `No language argument was supplied`);
    }


    Translation.find({}, (err, translations) => {
        if (err) {
            return send(res, 500, err);
        }

        if (translations) {
            const dictionary = translations
                .filter(hasSelectedLanguage)
                .reduce(withSelectedLanguage, {});

            return send(res, 200, null, dictionary);
        }

        return send(res, 404, `No dictionary for ${language}`);
    });
}

module.exports = {
    setTranslation,
    getTranslation,
    removeTranslation,
    getDictionary
};
