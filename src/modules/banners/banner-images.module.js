const { v4: uuidv4 } = require('uuid');
const { send } = require('../../utils/response-utils');
const { handleError } = require('../../utils/error-handler');
const { getFileExtension } = require('../../utils/utils');
fs = require('fs');


const _addImagesToBanner = async (req, res, results) => {
    const banner = req.banner;
    const urls = results.map(res => res.path);
    banner.images = [...req.banner.images, ...urls];
    await banner.save();

    return results;
};

module.exports.deleteImageFiles = (imageNames) => {
    imageNames.forEach(imageName => {
        fs.unlinkSync(`./public/images/banners/${imageName}`)
    });
};

// @desc Add new image to the banner
// @route POST /banners/full/images/:id
// @access Public
// todo make access Private
exports.uploadImages = async (req, res) => {
    try {
        if (!req.banner) {
            return;
        }

        const fileNames = Object.keys(req.files);
        const results = [];

        for (let i = 0; i < fileNames.length; i++) {
            const fileName = fileNames[i];
            const file = req.files[fileName];
            const fileExtension = getFileExtension(fileName);
            const newFileName = `${uuidv4()}.${fileExtension}`;
            file.name = newFileName;

            await file.mv(`./public/images/banners/${file.name}`);

            results.push({fileName, path: `http://localhost:3000/public/images/banners/${newFileName}`});
        }

        const finalResults = await _addImagesToBanner(req, res, results);
        send(res, 200, null, finalResults);
    } catch (e) {
        handleError(res, e, 500);
    }
};

// @desc Delete banner images
// @route POST /banner/full/images/delete/:id
// @access Public
// todo make access Private
exports.deleteImages = async (req, res) => {
    try {
        const imageNames = req.body['imgNames'];
        const banner = req.banner;

        if (!banner) {
            return;
        }

        if (!Array.isArray(imageNames)) {
            return send(res, 400, `Bad arguments`);
        }

        banner.images = banner.images
            .filter(image => !imageNames.some(imageNameToRemove => image && image.includes(imageNameToRemove)));

        await banner.save();
        module.exports.deleteImageFiles(imageNames);

        send(res, 200);
    } catch (e) {
        handleError(res, e, 500);
    }
};

