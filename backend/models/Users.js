const mongoose = require("mongoose");
const joi = require("joi");
const complexPass = require("joi-password-complexity");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      minlength: 2,
      maxlength: 32,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileUser: {
      type: Object,
      default: {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRUwDlUk5QpJ5jJapsEFJ71ENLk2xpKslpvNPx_D8rdw&s",
        publicId: null,
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isGoogle: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

UserSchema.virtual("listings", {
  foreignField: "userId",
  localField: "_id",
  ref: "Listings",
});

const User = mongoose.model("users", UserSchema);

// Check validate To Create User
function validateToCreateUser(obj) {
  const schema = joi.object({
    username: joi.string().trim().min(2).max(32).required(),
    email: joi.string().email().required(),
    password: complexPass().required(),
  });
  return schema.validate(obj);
}

// Check validate To login User
function validateToLoginUser(obj) {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.required(),
  });
  return schema.validate(obj);
}
// Check validate To New Password
function validateToNewPass(obj) {
  const schema = joi.object({
    password: complexPass(),
  });
  return schema.validate(obj);
}
// Check validate To update password of User
function validateToUpdateUser(obj) {
  const schema = joi.object({
    username: joi.string(),
    email: joi.string().email(),
    password: complexPass(),
  });
  return schema.validate(obj);
}

module.exports = {
  User,
  validateToCreateUser,
  validateToLoginUser,
  validateToUpdateUser,
  validateToNewPass,
};
