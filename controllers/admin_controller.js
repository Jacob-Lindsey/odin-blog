const User = require("../models/userModel");
const Post = require("../models/postModel");
const { body, validationResult } = require("express-validator");

exports.admin_get = async (req, res, next) => {
    try {
        const posts = await Post.find().populate("user");
        return res.render("admin_dashboard", { title: "Admin Dashboard", posts: posts });
    } catch (err) {
        return next(err);
    }
};

exports.admin_post = (req, res) => { res.render("index", { title: "TBD Admin POST Route" }) };

exports.admin_edit_get = async (req, res, next) => {
    Post.findOne({ _id: req.params.id }, (err, post) => {
        if (err) {
            return next(err);
        }
        if (!post) {
            return next(err);
        }
        res.render("post_form", { title: "Editing Post", post: post });
    })
};

exports.admin_edit_post = [
    body("postTitle")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Title cannot be empty")
        .escape(),
    body("postText")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Post cannot be empty")
        .escape(),
    
    async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render("post_form", { title: "Editing Post", errors: errors.array() });
        }

        const post = new Post({
            user: req.user._id,
            title: req.body.postTitle,
            text: req.body.postText,
            isPublic: req.body.postPublish ? false : true,
            publishDate: req.body.postPublish ? req.body.postPublishDate : Date.now(),
            timestamp: Date.now(),
            _id: req.params.id,
        });

        Post.findByIdAndUpdate(req.params.id, post, { new: true })
            .exec((err, updatedPost) => {
                if (err) {
                    return next(err);
                }
                res.redirect("/admin");
            })
    }
];

exports.admin_delete_post = (req, res, next) => {
    Post.findByIdAndDelete(req.params.id, function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/admin");
    });
};