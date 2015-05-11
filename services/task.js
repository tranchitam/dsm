/**
 * Created by TRAN CHI TAM on 5/10/2015.
 */

var Task = require('../models/task');

exports.getAll = function (pagination) {
    if (pagination) {
        return Task.find().skip(pagination.skip).limit(pagination.size).execQ();
    } else {
        return Task.findQ();
    }
};

exports.getById = function (id) {
    return Task.findByIdQ(id);
};

exports.getByUserId = function (userId) {
    return Task.findQ({user: userId});
};

exports.create = function (task, user) {
    var taskModel = new Task({
        user: user._id,
        whatDid: task.whatDid,
        willDo: task.willDo,
        obstacle: task.obstacle,
        date: Date.now()
    });
    return taskModel.saveQ();
};

exports.update = function (task, user) {
    return Task.findByIdQ(task._id)
        .then(function (oldTask) {
            if (oldTask.user != user._id) {
                return null;
            }
            oldTask.user = user._id;
            oldTask.whatDid = task.whatDid;
            oldTask.willDo = task.willDo;
            oldTask.obstacle = task.obstacle;
            oldTask.date = task.date;

            return oldTask.saveQ();
        });
};

exports.delete = function (id, user) {
    return Task.findByIdQ(id)
        .then(function (task) {
            if (task.user != user._id) {
                return null;
            } else {
                return Task.findByIdAndRemoveQ(id);
            }
        });
};