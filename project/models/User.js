const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: false,
  },
  last_name: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "member", "admin"],
    default: "user",
  },
  username: {
    type: String,
    required: true,
  },
  password:{
    type:String,
    required:true,
  },
});

module.exports = mongoose.model("User",UserSchema);
