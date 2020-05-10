const { send } = require('../../utils/response-utils');
const { handleError } = require('../../utils/error-handler');
const axios = require('axios');

// Center for fetching suggestions
const location = "41.7325661,44.7688133";
const radius = 500000;

const fetchSuggestions = async (input) => {
    return await axios.get(encodeURI(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&location=${location}&radius=${radius}&strictbounds&key=${process.env.MAPS_API_KEY}`));
};

const mapSuggestions = (suggestions) => {
    return suggestions.map(suggestion => ({
        description: suggestion['description'],
        id: suggestion['place_id'],
    }));
};

// @desc Get suggestions for the place
// @route GET /places/autocomplete
// @access Public
// Todo add session https://developers.google.com/places/web-service/session-tokens
exports.getSuggestions = async (req, res) => {
    try {
        const input = req.body.input;

        if (!input) {
            send(res, 200, []);
        }

        const response = await fetchSuggestions(input);

        if (response.status !== 200 || response.data.status !== "OK") {
            return send(res, 200, null, []);
        }

        send(res, 200, null, mapSuggestions(response.data['predictions']));
    } catch (e) {
        handleError(res, e, 500);
    }
};
