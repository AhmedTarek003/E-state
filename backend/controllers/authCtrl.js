const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  User,
  validateToCreateUser,
  validateToLoginUser,
} = require("../models/Users");
const path = require("path");
const { uploadToCloudinary } = require("../utils/Cloudinary");
const fs = require("fs");
const crypto = require("crypto");
const Validate = require("../models/Validation");
const sendEmail = require("../utils/sendEmail");

/**
 * @desc create new user (SIGN UP)
 * @route /api/auth/signUp
 * @method POST
 * @access public
 */
exports.signUpCtrl = asyncHandler(async (req, res) => {
  const { error } = validateToCreateUser(req.body);
  if (error) {
    if (req.file) {
      const imagePath = await path.join(
        __dirname,
        `../images/${req.file.filename}`
      );
      fs.unlinkSync(imagePath);
    }
    return res.status(400).json({ msg: error.details[0].message });
  }
  // Check if username already exists
  const usernameExist = await User.findOne({ username: req.body.username });
  if (usernameExist) {
    if (req.file) {
      const imagePath = await path.join(
        __dirname,
        `../images/${req.file.filename}`
      );
      fs.unlinkSync(imagePath);
    }
    return res.status(400).json({ msg: "please,change username" });
  }
  // Check if user Email already exists
  const userEmailExist = await User.findOne({ email: req.body.email });
  if (userEmailExist) {
    if (req.file) {
      const imagePath = await path.join(
        __dirname,
        `../images/${req.file.filename}`
      );
      fs.unlinkSync(imagePath);
    }
    return res.status(400).json({ msg: "User already exists" });
  }
  // Hash Password
  const hashPassword = await bcrypt.hash(req.body.password, 10);

  // create user if upload image
  if (req.file) {
    const imagePath = await path.join(
      __dirname,
      `../images/${req.file.filename}`
    );
    const uploadResults = await uploadToCloudinary(imagePath);
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
      profileUser: {
        url: uploadResults.secure_url,
        publicId: uploadResults.public_id,
      },
    });
    // Remove image form server
    fs.unlinkSync(imagePath);
    // create token
    const token = await jwt.sign(
      { _id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );
    // Send a response
    return res.status(201).json({
      msg: "user created successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profileUser: user.profileUser,
        isAdmin: user.isAdmin,
        token,
      },
    });
  }
  // create user if not upload image
  const user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: hashPassword,
  });

  // Verification email
  const verification = await Validate.create({
    userId: user._id,
    token: crypto.randomBytes(32).toString("hex"),
  });
  const link = `${process.env.URL}/users/${user._id}/verify/${verification.token}`;
  const htmMSG = `<div>click here to verify your account 
  <a href=${link}>verify</a>
  </div>`;
  await sendEmail(user.email, "Verifiy Email", htmMSG);
  // send response
  res.status(201).json({
    msg: "We Sent to you an email, please verify your email address",
  });
});

/**
 * @desc Login (SIGN IN)
 * @route /api/auth/signIn
 * @method POST
 * @access public
 */
exports.signInCtrl = asyncHandler(async (req, res) => {
  const { error } = validateToLoginUser(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  // check user
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(404).json({ msg: "Invalid email or password" });
  }
  if (!user.isVerified) {
    let verificationToken = await Validate.findOne({
      userId: user._id,
    });

    if (!verificationToken) {
      await Validate.create({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      });
    }
    // Making the line
    const link = `${process.env.URL}/users/${user._id}/verify/${verificationToken.token}`;
    // Putting the link into an html template
    const htmlTemplate = `<div>
  <p>Click here to verify your account</p>
  <a href="${link}">Verify</a>
  </div>`;
    // Sendin email to the user
    await sendEmail(user.email, "verify Your Email", htmlTemplate);
    return res.status(400).json({
      msg: "We Sent to you an email, please verify your email address",
    });
  }

  // create token
  const token = await jwt.sign(
    { _id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET
  );
  // send response
  res.status(200).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    profileUser: user.profileUser,
    isAdmin: user.isAdmin,
    isGoogle: user.isGoogle,
    isVerified: user.isVerified,
    token,
  });
});

/**
 * @desc verify Account
 * @route /api/auth/:userId/verify/:token
 * @method GET
 * @access public
 */
exports.verifyAccount = asyncHandler(async (req, res) => {
  const { userId, token } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ msg: "Invalid Link" });
  }
  const verification = await Validate.findOne({
    userId: user.id,
    token: token,
  });
  if (!verification) {
    return res.status(404).json({ msg: "Invalid Link" });
  }
  user.isVerified = true;
  await user.save();

  await verification.deleteOne();
  res.status(200).json({ msg: "your account verified" });
});

/**
 * @desc Continue With Google (SIGNIN & SIGNUP)
 * @route /api/auth/signIn
 * @method POST
 * @access public
 */
exports.authGoogleCtrl = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    // create token
    const token = await jwt.sign(
      { _id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );
    // send response
    return res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      profileUser: user.profileUser,
      isAdmin: user.isAdmin,
      isGoogle: user.isGoogle,
      isVerified: user.isVerified,
      token,
    });
  }
  // Create password
  const creatPassword =
    Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
  // Hash Password
  const hashPassword = await bcrypt.hash(creatPassword, 10);

  const username = await User.findOne({ username: req.body.username });
  let userName;
  if (username) {
    userName = `${req.body.username}-${creatPassword.slice(0, 5)}`;
  } else {
    userName = req.body.username;
  }

  const newUser = await User.create({
    username: userName,
    email: req.body.email,
    password: hashPassword,
    profileUser: {
      url: req.body.image,
    },
  });
  newUser.isGoogle = true;
  newUser.isVerified = true;
  await newUser.save();
  // create token
  const token = await jwt.sign(
    { _id: newUser._id, isAdmin: newUser.isAdmin },
    process.env.JWT_SECRET
  );
  res.status(200).json({
    _id: newUser._id,
    username: newUser.username,
    email: newUser.email,
    profileUser: newUser.profileUser,
    isAdmin: newUser.isAdmin,
    isGoogle: newUser.isGoogle,
    isVerified: newUser.isVerified,
    token,
  });
});
