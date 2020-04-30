const Banner = require('../../models/banner.model');

function getBanners(req, res) {
    const query = req.query;
    Banner.find(query, (err, banners) => {
        if (err) {
            return res.send(err);
        }
        res.json(banners);
    });
}

function addNewBanner(req, res) {
    const lat = Number(req.body.lat);
    const lng = Number(req.body.lng);
    const categories = Array.isArray(req.body.categories) ? req.body.categories : [];
    const title = typeof req.body.title === 'string' ? req.body.title : '';
    const shortDescription = typeof req.body.shortDescription === 'string' ? req.body.shortDescription : '';
    const fullDescription = typeof req.body.fullDescription === 'string' ? req.body.fullDescription : '';
    const images = Array.isArray(req.body.images) ? req.body.images : [];

    if (Number.isNaN(lat) || Number.isNaN(lng) || !title || !shortDescription || !fullDescription) {
        return res.sendStatus(400);
    }

    const banner = new Banner({lat, lng, categories, title, shortDescription, fullDescription, images});

    banner.save(err => {
        if (err) {
            return res.send(err);
        }
        res.status(200).json(banner);
    });
}

module.exports = {
    getBanners,
    addNewBanner,
};
