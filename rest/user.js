/**
 * Created by TRAN CHI TAM on 5/10/2015.
 */

var userService = require('../services/user');

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
 * @api {get} /api/user Get all users
 * @apiVersion 0.0.1
 * @apiName GetAllUsers
 * @apiDescription Get all current users
 * @apiGroup Users
 *
 * @apiUse RequestHeaders
 *
 * @apiParam (Request Params) {Number} [size] Page size
 * @apiParam (Request Params) {Number} [page] Page number
 *
 * @apiSuccess (Response Header 200) {String} Content-Type="application/json" Content Type
 *
 * @apiSuccess (Response Body 200) {Object[]} users List of users
 * @apiSuccess (Response Body 200) {Number} users._id User ID
 * @apiSuccess (Response Body 200) {String} users.username Username
 * @apiSuccess (Response Body 200) {String} users.password Password
 * @apiSuccess (Response Body 200) {String} users.name Name
 * @apiSuccess (Response Body 200) {String} users.avatar Avatar
 * @apiSuccess (Response Body 200) {String[]} users.roles Roles
 * @apiSuccess (Response Body 200) {String} users.token Access Token
 *
 * @apiSuccessExample {json} Success-Response:
 *                              [
 *                                {
 *                                    "_id": 1,
 *                                    "username": "",
 *                                    "password": "",
 *                                    "name": "",
 *                                    "avatar": "",
 *                                    "roles": [],
 *                                    "token": ""
 *                                },
 *                                {
 *                                    "_id": 2,
 *                                    "username": "",
 *                                    "password": "",
 *                                    "name": "",
 *                                    "avatar": "",
 *                                    "type": [],
 *                                    "token": ""
 *                                }
 *                              ]
 *
 *
 */

exports.getAll = function (req, res) {
    userService.getAll(req.pagination)
        .then(function (users) {
            res.json(users.map(function (user) {
                return user.toObject();
            }));
        })
        .catch(function (ex) {
            res.status(500).json(ex);
        })
        .done();
};


/**
 * @api {get} /api/user/:id Get user
 * @apiVersion 0.0.1
 * @apiName GetUser
 * @apiDescription Get user by id
 * @apiGroup Users
 *
 * @apiUse RequestHeaders
 *
 * @apiParam (Request Params) {Number} id ID of User
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
 *                                    "token": ""
 *                                }
 *
 *
 */

exports.get = function (req, res) {
    var id = req.params.id;
    userService.getById(id)
        .then(function (user) {
            res.json(user.toObject());
        })
        .catch(function (ex) {
            res.status(500).json(ex);
        })
        .done();
};

/**
 * @api {post} /api/user Create user
 * @apiVersion 0.0.1
 * @apiName CreateUser
 * @apiDescription Create new user
 *
 * Request body:
 * {
 *  "username": "",
 *   "password": "",
 *   "name": "",
 *   "avatar": "",
 *   "roles": [],
 *   "token": ""
 * }
 * @apiGroup Users
 *
 * @apiUse RequestHeaders
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
 *                                    "token": ""
 *                                }
 *
 *
 */

exports.create = function (req, res) {
    var user = req.body;
    userService.create(user)
        .then(function (createdUser) {
            res.json(createdUser.toObject());
        })
        .catch(function (ex) {
            res.status(500).json(ex);
        })
        .done();
};


/**
 * @api {put} /api/user/:id Update user
 * @apiVersion 0.0.1
 * @apiName UpdateUser
 * @apiDescription Update user
 *
 * Request body:
 * {
 *   "_id": 1
 *   "username": "",
 *   "password": "",
 *   "name": "",
 *   "avatar": "",
 *   "roles": [],
 *   "token": ""
 * }
 * @apiGroup Users
 *
 * @apiUse RequestHeaders
 *
 * @apiParam (Request Params) {Number} id ID of User
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
 *                                    "token": ""
 *                                }
 *
 *
 */

exports.update = function (req, res) {
    var user = req.body;
    userService.update(user)
        .then(function (updatedUser) {
            res.json(updatedUser.toObject());
        })
        .catch(function (ex) {
            res.status(500).json(ex);
        })
        .done();
};


/**
 * @api {delete} /api/user/:id Delete user
 * @apiVersion 0.0.1
 * @apiName Delete
 * @apiDescription Delete user
 * @apiGroup Users
 *
 * @apiUse RequestHeaders
 *
 * @apiParam (Request Params) {Number} id ID of User
 *
 * @apiSuccess (Response Header 200) {String} message Response message
 *
 * @apiError (Response Body 500) {String} message Error message
 *
 */

exports.delete = function (req, res) {
    var id = req.params.id;
    userService.delete(id)
        .then(function (deletedUser) {
            if (deletedUser) {
                res.status(200).send();
            } else {
                res.status(500).json({message: 'User not found'});
            }
        })
        .catch(function (ex) {
            res.status(500).json(ex);
        })
        .done();
};