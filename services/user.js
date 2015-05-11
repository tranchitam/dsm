/**
 * Created by TRAN CHI TAM on 5/10/2015.
 */

var User = require('../models/user');
var userRoles = require('../models/user-roles');
var bcrypt = require('bcrypt-nodejs');

User.findOneQ({username: 'admin'})
    .then(function (user) {
        if (!user) {
            var admin = new User({
                username: 'admin',
                password: bcrypt.hashSync('123456'),
                name: 'admin',
                roles: userRoles.values
            });

            admin.saveQ();
        }
    });

exports.getAll = function (pagination) {
    if (pagination) {
        return User.find().skip(pagination.skip).limit(pagination.size).execQ();
    } else {
        return User.findQ();
    }
};

exports.getById = function (id) {
    return User.findByIdQ(id);
};

exports.getByUserName = function (username) {
    return User.findOneQ({username: username});
};

exports.create = function (user) {
    var userModel = new User({
        username: user.username,
        password: bcrypt.hashSync(user.password),
        name: user.name,
        avatar: user.avatar,
        roles: userRoles.values
    });

    return userModel.saveQ();
};

exports.update = function (user) {
    return User.findByIdQ(user._id)
        .then(function (oldUser) {
            if (user.password) {
                oldUser.password = bcrypt.hashSync(user.password);
            }
            oldUser.name = user.name;
            oldUser.avatar = user.avatar;
            oldUser.roles = user.roles;

            return oldUser.saveQ();
        });
};

exports.updateToken = function (user) {
    return User.findByIdQ(user._id)
        .then(function (oldUser) {
            oldUser.token = user.token;

            return oldUser.saveQ();
        });
};

exports.delete = function (id) {
    return User.findByIdAndRemoveQ(id);
};