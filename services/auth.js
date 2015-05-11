/**
 * Created by TRAN CHI TAM on 5/10/2015.
 */

var jwt = require('jwt-simple');
var bcrypt = require('bcrypt-nodejs');
var authConfig = require('../config/authConfig');
var Q = require('q');
var userService = require('../services/user');

exports.login = function (username, password) {
    if (!username || !password || username == '' || password == '') {
        return null;
    }

    return userService.getByUserName(username)
        .then(function (user) {
            if (!isPasswordValid(user, password)) {
                return null;
            }
            user.token = generateToken(user);
            return userService.updateToken(user);
        });
};

exports.logout = function (token) {
    return Q.Promise(function (resolve, reject, notify) {
        try {
            var decodedToken = jwt.decode(token, authConfig.jwtSecretKey);
            userService.getByUserName(decodedToken.username)
                .then(function (user) {
                    if (!user) {
                        resolve(false);
                        return;
                    }
                    user.token = '';
                    userService.updateToken(user)
                        .then(function (newUser) {
                            if (newUser && !newUser.token) {
                                resolve(true);
                            }
                        }).catch(function (err) {
                            resolve(false);
                        }).done();
                });
        } catch (ex) {
            resolve(false);
        }
    });
};


function isPasswordValid(user, password) {
    if (!user) {
        return false;
    }
    return bcrypt.compareSync(password, user.password);
};

function generateToken(user) {
    var expiredDate = getExpiredDate(authConfig.numberOfExpiredDays);
    return jwt.encode({
        iat: Date.now(),
        exp: expiredDate,
        username: user.username,
        roles: user.roles
    }, authConfig.jwtSecretKey);
};

function getExpiredDate(numberOfDays) {
    var currentDate = new Date();
    return currentDate.setDate(currentDate.getDate() + numberOfDays);
};