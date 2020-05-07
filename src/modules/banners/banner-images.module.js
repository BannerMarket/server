const { v4: uuidv4 } = require('uuid');
const { send } = require('../../utils/response-utils');
fs = require('fs');

function _getFileExtension(fileName) {
    const tokens = fileName.split('.');
    return tokens[tokens.length - 1];
}

function uploadImages(req, res) {
    if (!req.banner) {
        return;
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return send(res, 400, 'No files were uploaded.');
    }

    const fileNames = Object.keys(req.files);
    const results = [];

    fileNames.forEach(async fileName => {
        const file = req.files[fileName];

        const fileExtension = _getFileExtension(fileName);
        const newFileName = `${uuidv4()}.${fileExtension}`;
        file.name = newFileName;
        const err = await file.mv(`./public/images/banners/${file.name}`);

        results.push({fileName, path: `http://localhost:3000/public/images/banners/${newFileName}`, err: err});

        const allProcessed = results.length === fileNames.length;

        if (allProcessed) {
            _addImagesToBanner(req, res, results);
        }
    });
}

function _addImagesToBanner(req, res, results) {
    const banner = req.banner;
    const urls = results.map(res => res.path);
    banner.images = [...req.banner.images, ...urls];
    banner.save(err => {
       if (err) {
           return send(res, 500, err);
       }

       send(res, 201, null, results);
    });
}

async function deleteImages(req, res) {
    const imageNames = req.body['imgNames'];
    const banner = req.banner;

    if (!banner) {
        return;
    }

    if (!Array.isArray(imageNames)) {
        return send(res, 400, `Bad arguments`);
    }

    banner.images = banner.images
        .filter(image => !imageNames.some(imageNameToRemove => image.includes(imageNameToRemove)));

    banner.save(err => {
        if (err) {
            return send(res, 500, err);
        }
        send(res, 200);
        deleteImageFiles(imageNames);
    });
}

function deleteImageFiles(imageNames) {
    imageNames.forEach(imageName => {
        fs.unlink(`./public/images/banners/${imageName}`, error => { })
    });
}

module.exports = {
    uploadImages,
    deleteImages,
    deleteImageFiles,
};
