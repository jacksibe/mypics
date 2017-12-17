var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var myPicsSchema = new Schema({
    galleryId:{type: Schema.Types.ObjectId, required:true },
    picName:{type: String},
    picDescription: {type: String},
    file: {filename: String, originalName: String, dateUploaded: Date}

});

module.exports = Mongoose.model('Mypics', myPicsSchema);