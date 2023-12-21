const router = require("express").Router();
const {
  createListingCtrl,
  getAllListingsCtrl,
  getListingCtrl,
  updateListingCtrl,
  updateListingImagesCtrl,
  deleteListingCtrl,
} = require("../controllers/listingCtrl");
const uploadPhoto = require("../middleware/uploadPhoto");
const validateObjId = require("../middleware/validateObjectId");
const verifyToken = require("../middleware/verifyToken");

// /api/listings
router
  .route("/")
  .post(verifyToken, uploadPhoto.array("images", 6), createListingCtrl)
  .get(getAllListingsCtrl);

// /api/listings/:id
router
  .route("/:id")
  .get(validateObjId, getListingCtrl)
  .put(validateObjId, verifyToken, updateListingCtrl)
  .delete(validateObjId, verifyToken, deleteListingCtrl);

// /api/listings/update-listingImages/:id
router
  .route("/update-listingImages/:id")
  .put(
    validateObjId,
    verifyToken,
    uploadPhoto.array("images", 6),
    updateListingImagesCtrl
  );
module.exports = router;
