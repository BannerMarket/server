const Translation = require('../../models/translation.model');

function translationResolver(req, res, next) {
    const key = req.params.key;

    Translation.findById(key, (err, translation) => {
       if (err) {
           return res.send(err);
       }

       if (translation) {
           req.translation = translation;
           return next();
       }

        return next();
    });
}

function setTranslation(req, res) {
    const key = req.params.key;
    const alreadyExists = !!req.translation;

    let translation;

    if (alreadyExists) {
        translation = req.translation;
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
}

function getTranslation(req, res) {
    if (req.translation) {
        return res.json(req.translation);
    }
    return res.sendStatus(404);
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
    translationResolver,
    setTranslation,
    getTranslation,
    getDictionary
};
