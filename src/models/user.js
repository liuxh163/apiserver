var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  loginname: String,
  pass: String,
  email: String,

  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
});

UserSchema.index({loginname: 1}, {unique: true});
UserSchema.index({email: 1}, {unique: true});

UserSchema.pre('save', function(next){
  var now = new Date();
  this.update_at = now;
  next();
});

mongoose.model('User', UserSchema);
