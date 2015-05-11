/**
 * Created by TRAN CHI TAM on 5/10/2015.
 */

var mongoose = require('mongoose-q')();
var userRoles = require('./user-roles');

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    avatar: String,
    roles: [{type: String, enum: userRoles, default: userRoles.values[1]}],
    token: String
});

// Transformation
if (!userSchema.options.toObject) {
    userSchema.options.toObject = {};
}
userSchema.options.toObject.transform = function (doc, ret, options) {
    delete ret.password;
}

module.exports = mongoose.model('User', userSchema);
