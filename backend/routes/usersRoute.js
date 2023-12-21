const router = require("express").Router();
const {
  getUserCtrl,
  updateUserCtrl,
  updateProfileImageUser,
  deleteUserCtrl,
} = require("../controllers/usersCtrl");
const uploadPhoto = require("../middleware/uploadPhoto");
const validateObjId = require("../middleware/validateObjectId");
const verifyToken = require("../middleware/verifyToken");

// /api/users/:id
router
  .route("/:id")
  .get(validateObjId, getUserCtrl)
  .put(validateObjId, verifyToken, updateUserCtrl)
  .delete(validateObjId, verifyToken, deleteUserCtrl);

// /api/users/profile-image/:id
router
  .route("/profile-image/:id")
  .put(
    validateObjId,
    verifyToken,
    uploadPhoto.single("image"),
    updateProfileImageUser
  );

module.exports = router;
