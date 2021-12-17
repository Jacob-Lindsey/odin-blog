const Comment = require("../models/commentModel");
const Post = require("../models/postModel");
const { body, validationResult } = require("express-validator");

exports.create_comment_post = [
    body("commentText")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Comment cannot be empty")
        .escape(),
    
    async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.redirect('back');
        }

        Post.findByIdAndUpdate(
            {_id: req.params.id},
            {$push: {"comments": {user: req.user.username, text: req.body.commentText, timestamp: Date.now()}}},
            {safe: true, upsert: true, new: true},
            function(err, model) {
                if (err) {
                    return next(err);
                }
                res.redirect("back");
            }
        );
    }
];

exports.delete_comment_get = (req, res) => { res.render("index", { title: "TBD DELETE Comment GET Route" }) };

exports.delete_comment_post = (req, res) => { res.render("index", { title: "TBD DELETE Comment POST Route" }) };