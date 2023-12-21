const asyncHandler = require("express-async-handler");
const {
  Listing,
  ValidateToCreateListing,
  ValidateToUpdateListing,
} = require("../models/Listings");
const {
  uploadToCloudinary,
  deleteImageFromCloudinary,
} = require("../utils/Cloudinary");
const path = require("path");
const fs = require("fs");

/**
 * @desc create a listing
 * @route /api/listings
 * @method POST
 * @access private(only logged in)
 */
exports.createListingCtrl = asyncHandler(async (req, res) => {
  const files = req.files;
  const { error } = ValidateToCreateListing(req.body);
  if (error) {
    for (let i = 0; i < files.length; i++) {
      const imagesPathes = path.join(
        __dirname,
        `../images/${files[i].filename}`
      );

      fs.unlinkSync(imagesPathes);
    }
    return res.status(400).json({ msg: error.details[0].message });
  }
  // check if user select images
  if (req.files.length <= 0) {
    return res.status(400).json({ msg: "Images is required" });
  }
  // lopping in images

  let images = [];
  for (let i = 0; i < files.length; i++) {
    const imagesPathes = path.join(__dirname, `../images/${files[i].filename}`);
    const uploadRes = await uploadToCloudinary(imagesPathes);
    const imageUrl = uploadRes.secure_url;
    const imageID = uploadRes.public_id;
    images.push({ url: imageUrl, publicId: imageID });
    fs.unlinkSync(imagesPathes);
  }
  // Create listing
  const listing = await Listing.create({
    name: req.body.name,
    desc: req.body.desc,
    address: req.body.address,
    type: req.body.type,
    listingImages: images,
    price: req.body.price,
    discountPrice: req.body.discountPrice,
    offer: req.body.offer,
    beds: req.body.beds,
    baths: req.body.baths,
    parking: req.body.parking,
    furnished: req.body.furnished,
    userId: req.user._id,
  });
  // send response
  res.status(201).json({ msg: "listing created successfully", listing });
});

/**
 * @desc GET All listings
 * @route /api/listings
 * @method GET
 * @access public
 */
exports.getAllListingsCtrl = asyncHandler(async (req, res) => {
  let { type, parking, offer, furnished } = req.query;
  if (offer === undefined || offer === "false") {
    offer = { $in: [false, true] };
  }
  if (parking === undefined || parking === "false") {
    parking = { $in: [false, true] };
  }
  if (furnished === undefined || furnished === "false") {
    furnished = { $in: [false, true] };
  }
  if (type === undefined || type === "all") {
    type = { $in: ["sell", "rent"] };
  }
  const search = req.query.search || "";
  const sort = req.query.sort || "-createdAt";
  const listings = await Listing.find({
    name: { $regex: search, $options: "i" },
    offer,
    furnished,
    parking,
    type,
  }).sort(sort);
  res.status(200).json(listings);
});

/**
 * @desc GET listing
 * @route /api/listings/:id
 * @method GET
 * @access public
 */
exports.getListingCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    return res.status(404).json({ msg: "Not found this listing" });
  }
  res.status(200).json(listing);
});

/**
 * @desc Update listing
 * @route /api/listings/:id
 * @method PUT
 * @access private(only user)
 */
exports.updateListingCtrl = asyncHandler(async (req, res) => {
  const { error } = ValidateToUpdateListing(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing || listing.userId.toString() !== req.user._id) {
    return res.status(404).json({ msg: "Not found this listing" });
  }
  const newListing = await Listing.findByIdAndUpdate(
    id,
    {
      $set: {
        name: req.body.name,
        desc: req.body.desc,
        address: req.body.address,
        type: req.body.type,
        price: req.body.price,
        discountPrice: req.body.discountPrice,
        offer: req.body.offer,
        beds: req.body.beds,
        baths: req.body.baths,
        parking: req.body.parking,
        furnished: req.body.furnished,
        userId: req.user._id,
      },
    },
    { new: true }
  );
  res.status(200).json(newListing);
});

/**
 * @desc Update Profile image
 * @route /api/listings/update-listingImages/:id
 * @method PUT
 * @access private(only user)
 */
exports.updateListingImagesCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing || listing.userId.toString() !== req.user._id) {
    return res.status(404).json({ msg: "Not found this listing" });
  }
  const files = req.files;
  if (!files) {
    return res.status(400).json({ msg: "no files uploaded" });
  }
  // mapping in listing of images
  listing.listingImages.map(async (image) => {
    if (image.publicId) {
      // delete images from cloudinary
      await deleteImageFromCloudinary(image.publicId);
    }
  });
  let images = [];
  // lopping in files
  for (let i = 0; i < files.length; i++) {
    const imagesPath = path.join(__dirname, `../images/${files[i].filename}`);
    const uploadRes = await uploadToCloudinary(imagesPath);
    const imageUrl = uploadRes.secure_url;
    const imageID = uploadRes.public_id;
    images.push({ url: imageUrl, publicId: imageID });
    fs.unlinkSync(imagesPath);
  }
  const newListing = await Listing.findByIdAndUpdate(
    id,
    {
      $set: {
        listingImages: images,
      },
    },
    { new: true }
  );
  res.status(200).json(newListing);
});

/**
 * @desc Delete listing
 * @route /api/listings/:id
 * @method PUT
 * @access private(only user)
 */
exports.deleteListingCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing || listing.userId.toString() !== req.user._id) {
    return res.status(404).json({ msg: "Not found this listing" });
  }
  // mapping in listing of images
  listing.listingImages.map(async (image) => {
    if (image.publicId) {
      // delete images from cloudinary
      await deleteImageFromCloudinary(image.publicId);
    }
  });
  // Delete Listing
  await Listing.findByIdAndDelete(id);
  res.status(200).json({ msg: "Listing deleted successfully" });
});
