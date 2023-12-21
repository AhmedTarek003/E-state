const router = require("express").Router();
const {
  createResetPasswordLink,
  checkIfResetLinkValid,
  resetPassword,
} = require("../controllers/passwordCtrl");

// /api/password/reset_pass_link
router.route("/reset_pass_link").post(createResetPasswordLink);

// /api/password/:userId/reset-password/:token
router
  .route("/:userId/reset-password/:token")
  .get(checkIfResetLinkValid)
  .post(resetPassword);

module.exports = router;
