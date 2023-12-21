const mongoose = require("mongoose");

const validateObjId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ msg: "Invalid Id" });
  }
  next();
};
module.exports = validateObjId;
