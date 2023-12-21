const asyncHandler = require("express-async-handler");
const { User, validateToUpdateUser } = require("../models/Users");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const {
  deleteImageFromCloudinary,
  uploadToCloudinary,
} = require("../utils/Cloudinary");
const { Listing } = require("../models/Listings");

/**
 * @desc get specific user
 * @route /api/users/:id
 * @method GET
 * @access public
 */
exports.getUserCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate({
    path: "listings",
    options: { sort: "-createdAt" },
  });
  if (!user) {
    return res.status(404).json({ msg: "user not found" });
  }
  res.status(200).json(user);
});

/**
 * @desc update user
 * @route /api/users/:id
 * @method PUT
 * @access private (only user)
 */
exports.updateUserCtrl = asyncHandler(async (req, res) => {
  const { error } = validateToUpdateUser(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user || user._id.toString() !== req.user._id) {
    return res.status(404).json({ msg: "user not found" });
  }
  // check if userkname already exists
  if (req.body.username) {
    const userExist = await User.findOne({ username: req.body.username });
    if (userExist && userExist.username !== user.username) {
      return res.status(403).json({ msg: "change username" });
    }
  }
  // check if uesrEmail already exists
  if (req.body.email) {
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist && userExist.email !== user.email) {
      return res.status(403).json({ msg: "user already exists" });
    }
  }

  // Hash Password
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
  }
  const newUser = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      },
    },
    { new: true }
  );
  res.status(200).json(newUser);
});

/**
 * @desc update Profile Image user
 * @route /api/users/profile-image/:id
 * @method PUT
 * @access private (only user)
 */
exports.updateProfileImageUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);

  const user = await User.findById(id);
  if (!user || user._id.toString() !== req.user._id) {
    // delete image from server
    fs.unlinkSync(imagePath);
    return res.status(404).json({ msg: "user not found" });
  }

  if (user.profileUser.publicId) {
    // delete image form cloudinary
    const publicId = user.profileUser.publicId;
    await deleteImageFromCloudinary(publicId);
  }

  //  upload image to cloudinary
  const uploadResult = await uploadToCloudinary(imagePath);
  const updateUser = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        profileUser: {
          url: uploadResult.secure_url,
          publicId: uploadResult.public_id,
        },
      },
    },
    { new: true }
  );
  res.status(200).json(updateUser);
  // delete image from server
  fs.unlinkSync(imagePath);
});

/**
 * @desc Delete user
 * @route /api/users/:id
 * @method DELETE
 * @access private (only user)
 */
exports.deleteUserCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user || user._id.toString() !== req.user._id) {
    return res.status(404).json({ msg: "user not found" });
  }
  const listings = await Listing.find({ userId: user._id.toString() });

  listings.map((listing) =>
    listing.listingImages.map(async (image) => {
      if (image.publicId.length > 0) {
        await deleteImageFromCloudinary(image.publicId);
      }
    })
  );
  await Listing.deleteMany({ userId: user._id.toString() });
  if (user.profileUser.publicId) {
    // delete image form cloudinary
    const publicId = user.profileUser.publicId;
    await deleteImageFromCloudinary(publicId);
  }
  await User.findByIdAndDelete(id);
  res.status(200).json({ msg: "delted Successfully" });
});
