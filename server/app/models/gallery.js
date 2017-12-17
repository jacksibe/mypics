var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;


var  myGallerySchema = new Schema({
userId:{type: Schema.Types.ObjectId, required:true },
gallery : {type : String, required: true},
description : {type : String},
dateCreated: {type : Date}
}
);



module.exports = Mongoose.model('Galleries', myGallerySchema);