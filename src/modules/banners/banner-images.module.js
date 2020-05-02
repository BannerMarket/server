const { v4: uuidv4 } = require('uuid');

function _getFileExtension(fileName) {
    const tokens = fileName.split('.');
    return tokens[tokens.length - 1];
}

function uploadImages(req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
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
            await res.json(results);
        }
    });
}

module.exports = {
    uploadImages
};
