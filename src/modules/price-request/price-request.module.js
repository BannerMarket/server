const { send } = require('../../utils/response-utils');
const { handleError } = require('../../utils/error-handler');
const PriceRequest = require('../../models/price-request.module');

// @desc Get all price requests
// @route GET /price-request/requests
// @access Public
// todo make access Private
exports.getRequests = async (req, res) => {
    try {
        const query = req.query;
        const priceRequests = await PriceRequest.find(query);
        send(res, 200, null, priceRequests);
    } catch (e) {
        handleError(res, e, 500);
    }
};

// @desc Add new price requests
// @route POST /price-request/requests
// @access Public
exports.addRequest = async (req, res) => {
    try {
        const request = new PriceRequest(req.body);
        await request.save();
        send(res, 200, null, request);
    } catch (e) {
        handleError(res, e, 500);
    }
};

// @desc Remove price request
// @route DELETE /price-request/requests/:id
// @access Public
// todo make access Private
exports.removeRequest = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return handleError(res, {message: 'No request was found to remove'}, 404);
        }

        const request = await PriceRequest.findById(id);
        await request.remove();
        send(res, 200);
    } catch (e) {
        handleError(res, e, 500);
    }
};
