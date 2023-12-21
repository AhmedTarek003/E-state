const asyncHandler = require("express-async-handler");
const Validate = require("../models/Validation");
const { User, validateToNewPass } = require("../models/Users");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcryptjs");

/**
 * @desc create a resetpassword Link
 * @route /api/password/reset_pass_link
 * @method POST
 * @access public
 */
exports.createResetPasswordLink = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({ msg: "user not found" });
  }
  const Validation = await Validate.findOne({ userId: user._id.toString() });
  if (!Validation) {
    const Validation = await Validate.create({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    });
    const link = `${process.env.URL}/password/${user._id}/reset-password/${Validation.token}`;
    const htmlMsg = `<div>
  reset your password click here
  <a href="${link}">RESET</a>
  </div>`;
    await sendEmail(user.email, "Reset Password", htmlMsg);
    return res.status(201).json({ msg: "check your mail, we send a message" });
  }

  const link = `${process.env.URL}/password/${user._id}/reset-password/${Validation.token}`;
  const htmlMsg = `<div>
  reset your password click here
  <a href="${link}">RESET</a>
  </div>`;
  await sendEmail(user.email, "Reset Password", htmlMsg);
  res.status(201).json({ msg: "check your mail, we send a message" });
});

/**
 * @desc check if a resetpassword Link is Valid
 * @route /api/password/:userId/reset-password/:token
 * @method GET
 * @access public
 */
exports.checkIfResetLinkValid = asyncHandler(async (req, res) => {
  const { userId, token } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(400).json({ msg: "Invalid Link" });
  }
  const validationToken = await Validate.findOne({
    userId: user._id,
    token: token,
  });
  if (!validationToken) {
    return res.status(400).json({ msg: "Invalid Link" });
  }
  res.status(200).json({ msg: "Link is Valid" });
});

/**
 * @desc reset Password
 * @route /api/password/:userId/reset-password/:token
 * @method POST
 * @access public
 */
exports.resetPassword = asyncHandler(async (req, res) => {
  const { error } = validateToNewPass(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  const { userId, token } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(400).json({ msg: "Invalid Link" });
  }
  const validationToken = await Validate.findOne({
    userId: user._id,
    token: token,
  });
  if (!validationToken) {
    return res.status(400).json({ msg: "Invalid Link" });
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  user.password = hashedPassword;
  await user.save();
  await validationToken.deleteOne();

  res.status(200).json({ msg: "password reset successfully, please login" });
});
