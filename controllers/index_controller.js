const Post = require("../models/postModel");

/* exports.index = async (req, res, next) => {
    try {
        const posts = await Post.find().sort([["timestamp", "descending"]]);
        return res.render("index", { title: 'The Underground', user: req.user, messages: messages });
    } catch (err) {
        return next(err);
    }
}; */

exports.index = (req, res) => {
    res.render("index", { title: "TBD Index Route" });
};