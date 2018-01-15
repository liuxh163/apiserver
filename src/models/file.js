var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

var FileSchema = new Schema({
    name: String,
    originname: String,
    path: String,
    type: String
});
mongoose.model('File', FileSchema);
