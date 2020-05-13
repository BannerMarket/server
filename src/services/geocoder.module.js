const axios = require('axios');

const country = 'GE';

exports.decode = async (address, language) => {
    return await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.MAPS_API_KEY}&components=country:${country}&language=${language}`);
};
