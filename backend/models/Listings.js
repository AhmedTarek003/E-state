const mongoose = require("mongoose");
const Joi = require("joi");
const { json } = require("express");

const ListiingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    name: {
      type: String,
      minlength: 2,
      maxlength: 15,
      required: true,
    },
    desc: {
      type: String,
      minlength: 15,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["sell", "rent"],
      default: "rent",
    },
    listingImages: {
      type: Object,
      images: [{ url: "", publicId: null }],
      required: true,
    },
    price: {
      type: Number,
      minlength: 0,
      required: true,
    },
    discountPrice: {
      type: Number,
      minlength: 0,
      default: 0,
    },
    beds: {
      type: Number,
      minlength: 0,
      default: 0,
      required: true,
    },
    baths: {
      type: Number,
      minlength: 0,
      default: 0,
      required: true,
    },
    offer: {
      type: Boolean,
      default: false,
    },
    parking: {
      type: Boolean,
      default: false,
    },
    furnished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listings", ListiingSchema);

// Validate to Create a Listing
const ValidateToCreateListing = (obj) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(15).required(),
    desc: Joi.string().min(15).required(),
    address: Joi.string().required(),
    type: Joi.string(),
    price: Joi.number().min(0).required(),
    discountPrice: Joi.number().min(0),
    beds: Joi.number().min(0).required(),
    baths: Joi.number().min(0).required(),
    offer: Joi.boolean(),
    parking: Joi.boolean(),
    furnished: Joi.boolean(),
  });
  return schema.validate(obj);
};
// Validate to Update a Listing
const ValidateToUpdateListing = (obj) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(15),
    desc: Joi.string().min(15),
    address: Joi.string(),
    type: Joi.string(),
    price: Joi.number().min(0),
    discountPrice: Joi.number().min(0),
    beds: Joi.number().min(0),
    baths: Joi.number().min(0),
    offer: Joi.boolean(),
    parking: Joi.boolean(),
    furnished: Joi.boolean(),
  });
  return schema.validate(obj);
};

module.exports = { Listing, ValidateToUpdateListing, ValidateToCreateListing };
