const router = require("express").Router();
const {
  signUpCtrl,
  signInCtrl,
  authGoogleCtrl,
  verifyAccount,
} = require("../controllers/authCtrl");
const uploadPhoto = require("../middleware/uploadPhoto");

// /api/auth/signUp
router.route("/signUp").post(uploadPhoto.single("image"), signUpCtrl);
// /api/auth/signIn
router.route("/signIn").post(signInCtrl);
// /api/auth/:userId/verify/:token
router.route("/:userId/verify/:token").get(verifyAccount);
// /api/auth/google
router.route("/google").post(authGoogleCtrl);

module.exports = router;
