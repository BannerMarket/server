const ROUTES = {
    // Get list of all banners with full data
    fullBanners: '/banners/full',
    // Get or edit a specific banner with full data
    fullBanner: '/banners/full/banner/:id',
    // Upload banner images
    bannerImages: '/banners/full/images/:id',
    // Delete banner images
    bannerDeleteImages: '/banner/full/images/delete/:id',

    banner: '/banner/:id'
};

module.exports = ROUTES;
