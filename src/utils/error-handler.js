exports.handleError = (res, error, responseCode = 500) => {
    console.error(error);
    res.status(responseCode).json({error: 'Error with your request'});
};
