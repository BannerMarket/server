const ROUTES = {
    // Get list of all banners with full data
    banners: '/banners',
    // Get or edit a specific banner with full data
    banner: '/banners/banner/:id',
    // Get banners for the list and map view
    bannersMain: '/banners/main',
    // Upload banner images
    bannerImages: '/banners/upload/images'
};

module.exports = ROUTES;
