var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CartCollectionSchema = new Schema ({
    collUser: String,
    collName: String,
    desc: String,
    isprivate: Boolean,
    items : Array()
});

module.exports = mongoose.model('Collections', CartCollectionSchema);