const { send } = require('../../utils/response-utils');
const { handleError } = require('../../utils/error-handler');
const Administrator = require('../../models/administrator.model');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');

const _getUserByUsername = async (username) => {
    return (await Administrator.find({username}))[0];
};

const _authUser = async (username, password, next) => {
    const user = await _getUserByUsername(username);
    // No user found
    if (!user) {
        return next(null, null);
    }

    try {
        if (await bcrypt.compare(password, user.password)) {
            return next(null, user);
        } else {
            // Wrong password
            return next(null, null);
        }
    } catch (e) {
        return next(e);
    }
};

exports.login = async (req, res, next) => {
    passport.authenticate('local', {}, (error, user, params, code) => {
        console.log(error, user, params, code);
        if (error || !user) {
            send(res, 400);
        } else {
            send(res, 200);
        }
    })(req, res, next);
};

exports.register = async (req, res) => {
    try {
        if (!req.body.password || req.body.password.length < 6) {
            return send(res, 400, {message: 'Password is too weak'});
        }

        if (!req.body.username) {
            return send(res, 400, {message: 'Bad username'});
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const administrator = new Administrator({password: hashedPassword, username: req.body.username});
        await administrator.save();

        send(res);
    } catch (e) {
        handleError(res, e, 500);
    }
};

exports.logout = async (req, res) => {
    try {

    } catch (e) {
        handleError(res, e, 500);
    }
};

exports.initialize = (passport) => {
    passport.use(new LocalStrategy({}, _authUser));

    passport.serializeUser((user, next) => {});
    passport.deserializeUser((user, next) => {});
};
