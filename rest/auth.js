/**
 * Created by TRAN CHI TAM on 5/10/2015.
 */

var authService = require('../services/auth');


/**
 * @apiDefine RequestHeaders
 *
 * @apiHeader (Request Header) {String} Client-Name="Web" Client Name
 * @apiHeader (Request Header) {String} X-Access-Token AccessToken
 * @apiHeaderExample {String} Client-Name:
 * Web
 * @apiHeaderExample {String} X-AccessToken:
 * <token>
 */

/**
 * @apiDefine RequestHeadersWithoutAccessToken
 *
 * @apiHeader (Request Header) {String} Client-Name="Web" Client Name
 * @apiHeaderExample {String} Client-Name:
 * Web
 */


/**
 * @api {post} /api/login User login
 * @apiVersion 0.0.1
 * @apiName Login
 * @apiDescription User login
 *
 * Request body:
 * {
 *  "username": "",
 *   "password": ""
 * }
 * @apiGroup Authentication
 *
 * @apiUse RequestHeadersWithoutAccessToken
 *
 * @apiSuccess (Response Header 200) {String} Content-Type="application/json" Content Type
 *
 * @apiSuccess (Response Body 200) {Object} user User
 * @apiSuccess (Response Body 200) {Number} user._id User ID
 * @apiSuccess (Response Body 200) {String} user.username Username
 * @apiSuccess (Response Body 200) {String} user.password Password
 * @apiSuccess (Response Body 200) {String} user.name Name
 * @apiSuccess (Response Body 200) {String} user.avatar Avatar
 * @apiSuccess (Response Body 200) {String[]} user.roles Roles
 * @apiSuccess (Response Body 200) {String} user.token Access Token
 *
 * @apiSuccessExample {json} Success-Response:
 *                                {
 *                                    "_id": 1,
 *                                    "username": "",
 *                                    "password": "",
 *                                    "name": "",
 *                                    "avatar": "",
 *                                    "roles": [],
 *                                    "token": "<JWT>", // JSON Web Token
 *                                }
 *
 *
 */

exports.login = function (req, res) {
    var username = req.body.username || '';
    var password = req.body.password || '';

    authService.login(username, password)
        .then(function (user) {
            if (!user || !user.token) {
                res.status(401);
                res.json({message: req.i18n.__('auth.message.invalid.credentials')});
                return;
            }
            res.json(user.toObject());
        })
        .done();
};

/**
 * @api {post} /api/logout User logout
 * @apiVersion 0.0.1
 * @apiName Logout
 * @apiDescription User logout
 *
 * @apiGroup Authentication
 *
 * @apiUse RequestHeaders
 *
 * @apiSuccess (Response Header 200) {String} Content-Type="application/json" Content Type
 *
 * @apiSuccessExample {boolean} Success-Response:
 *                                              true
 *
 *
 */

exports.logout = function (req, res) {
    var token = req.token;

    authService.logout(token)
        .then(function (result) {
            res.json(result);
        })
        .done();
};