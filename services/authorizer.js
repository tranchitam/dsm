/**
 * Created by TRAN CHI TAM on 5/10/2015.
 */

var jwt = require('jwt-simple');
var authConfig = require('../config/authConfig');
var userService = require('../services/user');
var userRoles = require('../models/user-roles');

exports.authorize = function (roles) {
    if (typeof roles == 'string') {
        roles = [roles];
    } else if (roles && !(roles instanceof Array)) {
        roles = [];
    }

    return function (req, res, next) {
        var token = (req.body && req.body.accessToken) || (req.query && req.query.accessToken) || req.headers['x-access-token'];
        if (token) {
            try {
                var decodedToken = jwt.decode(token, authConfig.jwtSecretKey);
                if (decodedToken.exp <= Date.now()) {
                    res.status(400);
                    res.json({message: req.i18n.__('auth.message.token.expired')});
                    return;
                }

                userService.getByUserName(decodedToken.username)
                    .then(function (user) {
                        if (user && user.token && user.token == token) {
                            if (req.url.indexOf('/api/') != -1 && ((user.roles.indexOf(userRoles.values[0]) != -1) || (user.roles.indexOf(userRoles.values[1]) != -1))) {
                                if (!roles) {
                                    req.token = token;
                                    req.user = user;
                                    next();
                                } else {
                                    var hasPermission = roles.filter(function (role) {
                                            return user.roles.indexOf(role) != -1;
                                        }).length > 0;

                                    if (hasPermission) {
                                        req.token = token;
                                        req.user = user;
                                        next();
                                    } else {
                                        res.status(403);
                                        res.json({
                                            message: req.i18n.__('auth.message.forbidden')
                                        });
                                    }
                                }
                            } else {
                                res.status(403);
                                res.json({
                                    message: req.i18n.__('auth.message.forbidden')
                                });
                            }

                        } else {
                            res.status(401);
                            res.json({
                                message: req.i18n.__('auth.message.invalid.user.or.token')
                            });
                        }
                    }).catch(function (err) {
                        res.status(500);
                        res.json({
                            message: req.i18n.__('auth.message.common.error.message'),
                            error: ex
                        });
                    });
            } catch (ex) {
                res.status(500);
                res.json({
                    message: req.i18n.__('auth.message.common.error.message'),
                    error: ex
                });
            }
        } else {
            res.status(401);
            res.json({
                message: req.i18n.__('auth.message.not.authorized')
            });
        }
    };
};