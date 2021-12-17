const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const PostSchema = new Schema({
    title: { type: String, required: true, minLength: 1, maxLength: 75 },
    text: { type: String, required: true, minLength: 1 },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    comments: { type: Array },
    isPublic: { type: Boolean, required: true, default: true },
    publishDate: { type: Date },
    timestamp: { type: Date, default: Date.now, required: true }
});

PostSchema.virtual("date").get(function() {
    return DateTime.fromJSDate(this.timestamp).toFormat("yyyy-MM-dd, HH:mm");
});

PostSchema.virtual("dateToPublish").get(function() {
    return DateTime.fromJSDate(this.publishDate).toFormat("yyyy-MM-dd, HH:mm");
});

module.exports = mongoose.model("Post", PostSchema);