const FullBanner = require('../../models/full-banner.model');
const { send } = require('../../utils/response-utils');

function interceptBanners(req, res, next) {
    const query = _buildQuery(req.body);


    FullBanner.find(query, (err, banners) => {
        if (err) {
            return send(res, 500, err);
        }

        banners
            
            .sort()

        req.banners = banners;
        next();
    });
}

function _buildQuery(params) {
    const categories = Array.isArray(params.categories) ? params.categories : [];

    return {
        categories: { "$all" : categories}
    };
}

function getBanners(req, res) {
    if (req.banners) {
        send(res, 200, null, req.banners);
    }
}


module.exports = {
    interceptBanners,
    getBanners
};

