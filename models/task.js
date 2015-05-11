/**
 * Created by TRAN CHI TAM on 5/10/2015.
 */

var mongoose = require('mongoose-q')();

var taskSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    date: Date,
    whatDid: String,
    willDo: String,
    obstacle: String
});

module.exports = mongoose.model('Task', taskSchema);