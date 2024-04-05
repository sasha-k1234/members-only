const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
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
});

module.exports = mongoose.model("User",UserSchema);
