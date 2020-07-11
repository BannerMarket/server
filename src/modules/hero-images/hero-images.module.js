const { v4: uuidv4 } = require('uuid');
const { send } = require('../../utils/response-utils');
const { handleError } = require('../../utils/error-handler');
const { getFileExtension } = require('../../utils/utils');
const HeroImage = require('../../models/hero-image.model');
fs = require('fs');

const _saveImages = async (results) => {
    for (let i = 0; i < results.length; i++) {
        const img = new HeroImage(results[i]);
        await img.save();
    }
};

exports.upload = async (req, res) => {
    try {
        const fileNames = Object.keys(req.files);
        const results = [];

        for (let i = 0; i < fileNames.length; i++) {
            const fileName = fileNames[i];
            const file = req.files[fileName];
            const fileExtension = getFileExtension(fileName);
            const newFileName = `${uuidv4()}.${fileExtension}`;
            file.name = newFileName;

            await file.mv(`./public/images/hero/${file.name}`);

            results.push({fileName, path: `http://localhost:3000/public/images/hero/${newFileName}`});
        }

        await _saveImages(results);
        send(res, 200, null, results);
    } catch (e) {
        handleError(res, e, 500);
    }
};

exports.delete = async (req, res) => {
    try {
        const imgId = req.body['imgId'];

        if (!imgId) {
            return send(res, 400, `Bad arguments`);
        }

        const img = await HeroImage.findById(imgId);
        const fragments = img.path.split('/');
        const imgName = fragments[fragments.length - 1];
        await img.remove();
        fs.unlinkSync(`./public/images/hero/${imgName}`);

        send(res, 200);
    } catch (e) {
        handleError(res, e, 500);
    }
};

exports.getImageUrls = async (req, res) => {
    try {
        const images = await HeroImage.find({});
        send(res, 200, null, images);
    } catch (e) {
        handleError(res, e, 500);
    }
};
