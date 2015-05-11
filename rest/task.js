/**
 * Created by TRAN CHI TAM on 5/10/2015.
 */

var taskService = require('../services/task');

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
 * @api {get} /api/task Get all tasks
 * @apiVersion 0.0.1
 * @apiName GetAllTasks
 * @apiDescription Get all current tasks
 * @apiGroup Tasks
 *
 * @apiUse RequestHeaders
 *
 * @apiParam (Request Params) {Number} [size] Page size
 * @apiParam (Request Params) {Number} [page] Page number
 *
 * @apiSuccess (Response Header 200) {String} Content-Type="application/json" Content Type
 *
 * @apiSuccess (Response Body 200) {Object[]} tasks List of tasks
 * @apiSuccess (Response Body 200) {Number} tasks._id Task ID
 * @apiSuccess (Response Body 200) {Number} tasks.user User Id
 * @apiSuccess (Response Body 200) {String} tasks.whatDid What did
 * @apiSuccess (Response Body 200) {String} tasks.willDo Will do
 * @apiSuccess (Response Body 200) {String} tasks.obstacle Obstacle
 * @apiSuccess (Response Body 200) {Date} tasks.date Created date
 *
 * @apiSuccessExample {json} Success-Response:
 *                            [
 *                                {
 *                                    "_id": 1,
 *                                    "user": "1",
 *                                    "whatDid": "",
 *                                    "willDo": "",
 *                                    "obstacle": "",
 *                                    "date": 1423465211815
 *                                },
 *                                {
 *                                    "_id": 2,
 *                                    "user": "2",
 *                                    "whatDid": "",
 *                                    "willDo": "",
 *                                    "obstacle": "",
 *                                    "date": 1423465211815
 *                                }
 *                            ]
 *
 *
 */

exports.getAll = function (req, res) {
    taskService.getAll(req.pagination)
        .then(function (tasks) {
            res.json(tasks);
        }).catch(function (err) {
            res.status(500).end(err);
        }).done();
};

/**
 * @api {get} /api/task/:id Get task
 * @apiVersion 0.0.1
 * @apiName GetTask
 * @apiDescription Get task by id
 * @apiGroup Tasks
 *
 * @apiUse RequestHeaders
 *
 * @apiParam (Request Params) {Number} id ID of task
 *
 * @apiSuccess (Response Header 200) {String} Content-Type="application/json" Content Type
 *
 * @apiSuccess (Response Body 200) {Object} task task
 * @apiSuccess (Response Body 200) {Number} task._id Task ID
 * @apiSuccess (Response Body 200) {Number} task.user User Id
 * @apiSuccess (Response Body 200) {String} task.whatDid What did
 * @apiSuccess (Response Body 200) {String} task.willDo Will do
 * @apiSuccess (Response Body 200) {String} task.obstacle Obstacle
 * @apiSuccess (Response Body 200) {Date} task.date Created date
 *
 * @apiSuccessExample {json} Success-Response:
 *                                {
 *                                    "_id": 1,
 *                                    "user": "1",
 *                                    "whatDid": "",
 *                                    "willDo": "",
 *                                    "obstacle": "",
 *                                    "date": 1423465211815
 *                                }
 */

exports.getById = function (req, res) {
    var id = req.params.id;
    taskService.getById(id)
        .then(function (task) {
            res.json(task);
        }).catch(function (err) {
            res.status(500).end(err);
        }).done();
};

/**
 * @api {get} /api/task/userId/:userId Get task
 * @apiVersion 0.0.1
 * @apiName GetTaskByUserId
 * @apiDescription Get task by user id
 * @apiGroup Tasks
 *
 * @apiUse RequestHeaders
 *
 * @apiParam (Request Params) {Number} id ID of task
 *
 * @apiSuccess (Response Header 200) {String} Content-Type="application/json" Content Type
 *
 * @apiSuccess (Response Body 200) {Object} task task
 * @apiSuccess (Response Body 200) {Number} task._id Task ID
 * @apiSuccess (Response Body 200) {Number} task.user User Id
 * @apiSuccess (Response Body 200) {String} task.whatDid What did
 * @apiSuccess (Response Body 200) {String} task.willDo Will do
 * @apiSuccess (Response Body 200) {String} task.obstacle Obstacle
 * @apiSuccess (Response Body 200) {Date} task.date Created date
 *
 * @apiSuccessExample {json} Success-Response:
 *                                {
 *                                    "_id": 1,
 *                                    "user": "1",
 *                                    "whatDid": "",
 *                                    "willDo": "",
 *                                    "obstacle": "",
 *                                    "date": 1423465211815
 *                                }
 */

exports.getByUserId = function (req, res) {
    var userId = req.params.userId;
    taskService.getByUserId(userId)
        .then(function (task) {
            res.json(task);
        }).catch(function (err) {
            res.status(500).end(err);
        }).done();
};

/**
 * @api {post} /api/task Create task
 * @apiVersion 0.0.1
 * @apiName CreateTask
 * @apiDescription Create new task
 *
 * Request body:
 * {
 *   "user": "",
 *   "whatDid": "",
 *   "willDo": "",
 *   "obstacle": "",
 *   "date": 1423465211815
 * }
 *
 * @apiGroup Tasks
 *
 * @apiUse RequestHeaders
 *
 * @apiSuccess (Response Header 200) {String} Content-Type="application/json" Content Type
 *
 * @apiSuccess (Response Body 200) {Object} task task
 * @apiSuccess (Response Body 200) {Number} task._id Task ID
 * @apiSuccess (Response Body 200) {Number} task.user User Id
 * @apiSuccess (Response Body 200) {String} task.whatDid What did
 * @apiSuccess (Response Body 200) {String} task.willDo Will do
 * @apiSuccess (Response Body 200) {String} task.obstacle Obstacle
 * @apiSuccess (Response Body 200) {Date} task.date Created date
 *
 * @apiSuccessExample {json} Success-Response:
 *                                {
 *                                    "_id": 1,
 *                                    "user": "1",
 *                                    "whatDid": "",
 *                                    "willDo": "",
 *                                    "obstacle": "",
 *                                    "date": 1423465211815
 *                                }
 */

exports.create = function (req, res) {
    var user = req.user;
    var task = req.body;
    taskService.create(task, user)
        .then(function (task) {
            res.json(task);
        }).catch(function (err) {
            res.status(500).end(err);
        }).done();
};

/**
 * @api {put} /api/task/:id Update task
 * @apiVersion 0.0.1
 * @apiName UpdateTask
 * @apiDescription Update task
 *
 * Request body:
 * {
 *   "_id": 1
 *   "user": "",
 *   "whatDid": "",
 *   "willDo": "",
 *   "obstacle": "",
 *   "date": 1423465211815
 * }
 *
 * @apiGroup Tasks
 *
 * @apiUse RequestHeaders
 *
 * @apiParam (Request Params) {Number} id ID of sprint
 *
 * @apiSuccess (Response Header 200) {String} Content-Type="application/json" Content Type
 *
 * @apiSuccess (Response Body 200) {Object} task task
 * @apiSuccess (Response Body 200) {Number} task._id Task ID
 * @apiSuccess (Response Body 200) {Number} task.user User Id
 * @apiSuccess (Response Body 200) {String} task.whatDid What did
 * @apiSuccess (Response Body 200) {String} task.willDo Will do
 * @apiSuccess (Response Body 200) {String} task.obstacle Obstacle
 * @apiSuccess (Response Body 200) {Date} task.date Created date
 *
 * @apiSuccessExample {json} Success-Response:
 *                                {
 *                                    "_id": 1,
 *                                    "user": "1",
 *                                    "whatDid": "",
 *                                    "willDo": "",
 *                                    "obstacle": "",
 *                                    "date": 1423465211815
 *                                }
 */

exports.update = function (req, res) {
    var user = req.user;
    var task = req.body;
    taskService.update(task, user)
        .then(function (task) {
            res.json(task);
        }).catch(function (err) {
            res.status(500).end(err);
        }).done();
};


/**
 * @api {delete} /api/task/:id Delete task
 * @apiVersion 0.0.1
 * @apiName DeleteTask
 * @apiDescription Delete task
 * @apiGroup Tasks
 *
 * @apiUse RequestHeaders
 *
 * @apiParam (Request Params) {Number} id ID of task
 *
 * @apiSuccess (Response Header 200) {String} message Response message
 *
 * @apiError (Response Body 500) {String} message Error message
 *
 */

exports.delete = function (req, res) {
    var id = req.params.id;
    var user = req.user;
    taskService.delete(id, user)
        .then(function (task) {
            res.json(task);
        }).catch(function (err) {
            res.status(500).end(err);
        }).done();
};