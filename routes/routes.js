var express = require('express');
var router = express.Router();

const admin_controller = require("../controllers/admin_controller");
const auth_controller = require("../controllers/auth_controller");
const comment_controller = require("../controllers/comment_controller");
const index_controller = require("../controllers/index_controller");
const post_controller = require("../controllers/post_controller");
const user_controller = require("../controllers/user_controller");

/// ----------- HOMEPAGE ---------- ///
router.get("/", post_controller.all_posts_get);

/// ----------- COMMENTS ---------- ///
router.post("/blog/post/:id/comment/new", comment_controller.create_comment_post);
router.get("/blog/comment/:id/delete", comment_controller.delete_comment_get); // ADMIN OR COMMENT.USER ONLY
router.post("/blog/comment/:id/delete", comment_controller.delete_comment_post); // ADMIN OR COMMENT.USER ONLY

/// ----------- REGISTER ---------- ///
router.get("/register", auth_controller.register_get);
router.post("/register", auth_controller.register_post);

/// ----------- LOGIN/LOGOUT ---------- ///
router.get("/login", auth_controller.login_get);
router.post("/login", auth_controller.login_post);
router.get("/logout", auth_controller.logout_get);

/// ----------- POSTS ---------- ///
router.get("/blog", post_controller.all_posts_get);
router.get("/blog/post/new", post_controller.create_post_get); // ADMIN ONLY
router.post("/blog/post/new", post_controller.create_post_post); // ADMIN ONLY
router.get("/blog/post/:id", post_controller.post_get);

/// ----------- ADMIN DASHBOARD ---------- ///
router.get("/admin", admin_controller.admin_get);
router.post("/admin", admin_controller.admin_post);
router.get("/admin/:id/edit", admin_controller.admin_edit_get);
router.post("/admin/:id/edit", admin_controller.admin_edit_post);
router.post("/admin/:id/delete", admin_controller.admin_delete_post);

module.exports = router;