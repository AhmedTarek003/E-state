const mongoose = require("mongoose");

const connectionDB = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("MONGO IS CONNECTED👍"));
};
module.exports = connectionDB;
