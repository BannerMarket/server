const Translation = require('../../models/translation.model');

function setTranslation(req, res) {
    const key = req.params.key;

    Translation.findById(key, (err, translation) => {
        if (err) {
            return res.send(err);
        }

        if (translation) {
            translation.en = req.body.en;
            translation.ge = req.body.ge;
        } else {
            translation = new Translation({...req.body, _id: key});
        }

        translation.save(err => {
            if (err) {
                return res.send(err);
            }
            res.status(201).send(translation);
        });
    });
}

function getTranslation(req, res) {
    const key = req.params.key;

    Translation.findById(key, (err, translation) => {
        if (err) {
            return res.send(err);
        }

        if (translation) {
            return res.json(translation);
        }

        return res.sendStatus(404);
    });
}

function removeTranslation(req, res) {
    const key = req.params.key;

    Translation.findById(key, (err, translation) => {
        if (err) {
            return res.send(err);
        }

        if (translation) {
            return translation.remove(err => {
                if (err) {
                    return res.send(err);
                }

                return res.sendStatus(204);
            })
        }

        return res.sendStatus(404);
    });
}

function getDictionary(req, res) {
    const language = req.query.language;
    const hasSelectedLanguage = translation => !!translation[language];
    const withSelectedLanguage = (dictionary, translation) => ({...dictionary, [translation['_id']]: translation[language]});

    if (!language) {
        return res.sendStatus(404);
    }


    Translation.find({}, (err, translations) => {
        if (err) {
            return res.send(err);
        }

        if (translations) {
            return res.json(translations
                .filter(hasSelectedLanguage)
                .reduce(withSelectedLanguage, {}));
        }

        return res.sendStatus(404);
    });
}

module.exports = {
    setTranslation,
    getTranslation,
    removeTranslation,
    getDictionary
};
