const Post = require("../models/postModel");
const { body, validationResult } = require("express-validator");

exports.all_posts_get = async (req, res, next) => {
    try {
        const posts = await Post.find().sort([["timestamp", "descending"]]).populate("user");
        return res.render("post_list", { title: "All Blog Posts", user: req.user, posts: posts });
    } catch (err) {
        return next(err);
    }
};

exports.post_get = async (req, res, next) => { 
    Post.findById(req.params.id)
        .populate("user")
        .exec((err, post) => {
            if (err) {
                return next(err);
            }
            res.render("post", { title: post.title, post: post, comments: post.comments });
        })    
};

exports.create_post_get = (req, res) => { res.render("post_form", { title: "Create a new blog post" }) };

exports.create_post_post = [
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
            res.render("post_form", { title: "Create a new blog post", errors: errors.array() });
        }

        const post = new Post({
            user: req.user._id,
            title: req.body.postTitle,
            text: req.body.postText,
            isPublic: req.body.postPublish ? false : true,
            publishDate: req.body.postPublish ? req.body.postPublishDate : Date.now(),
            timestamp: Date.now()
        });

        await post.save((err) => {
            if (err) {
                return next(err);
            }
            res.redirect("/");
        });
    }
];