const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const CommentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true, minLength: 1 },
    timestamp: { type: Date, default: Date.now, required: true }
});

CommentSchema.virtual("date").get(function() {
    return DateTime.fromJSDate(this.timestamp).toFormat("yyyy-MM-dd, HH:mm");
});

module.exports = mongoose.model("Comment", CommentSchema);
