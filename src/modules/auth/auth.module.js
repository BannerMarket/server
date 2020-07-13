const Administrator = require('../../models/administrator.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { send } = require('../../utils/response-utils');
const { handleError } = require('../../utils/error-handler');

const _passwordStrengthOk = (password) => {
    return password && password.length > 5;
};

const _authenticate = async (username, password) => {
    const user = (await Administrator.find({username}))[0];

    if (!user) {
        return null;
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (passwordMatches) {
        return user;
    }

    return null;
};

exports.register = async (req, res) => {
    try {
        if (!_passwordStrengthOk(req.body.password)) {
            return send(res, 400, {message: 'Password not strong enough'});
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new Administrator({password: hashedPassword, username: req.body.username});
        await user.save();

        send(res, 200);
    } catch (e) {
        handleError(res, e, 500);
    }
};

exports.login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await _authenticate(username, password);

        if (!user) {
            return send(res, 400, {message: 'Wrong username or password'});
        }

        const accessToken = jwt.sign({_id: user._id}, process.env.JWT_ACCESS_TOKEN_SECRET);

        send(res, 200, null,{accessToken});
    } catch (e) {
        handleError(res, e, 500);
    }
};

exports.isAuthorized = async (req) => {
    const accessToken = req.headers['accesstoken'];

    if (!accessToken) {
        return false;
    }

    const {_id} = await jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET);

    try {
        const user = await Administrator.findById(_id);
        return !!user;
    } catch (e) {
        return false;
    }
};

exports.isAuthenticated = async (req, res) => {
    try {
        send(res, 200, await exports.isAuthorized(req));
    } catch (e) {
        handleError(res, e, 500);
    }
};
