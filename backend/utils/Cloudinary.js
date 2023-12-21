const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Upload Image to Cloudinary
const uploadToCloudinary = async (imagePath) => {
  try {
    const data = await cloudinary.uploader.upload(imagePath, {
      resource_type: "auto",
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Cloudinary upload Error");
  }
};
// Delete Image from Cloudinary
const deleteImageFromCloudinary = async (imagePublicId) => {
  try {
    const data = await cloudinary.uploader.destroy(imagePublicId);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Cloudinary Delete Error");
  }
};

module.exports = { uploadToCloudinary, deleteImageFromCloudinary };
