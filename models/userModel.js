const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, maxLength: 30 },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    isAdmin: { type: Boolean, default: false }
});

module.exports = mongoose.model("User", UserSchema);