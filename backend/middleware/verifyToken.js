const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const headerAutho = req.headers.authorization;
  if (headerAutho) {
    const token = headerAutho.split(" ")[1];
    if (token) {
      try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
      } catch (error) {
        return res.status(400).json({ msg: "invalid token" });
      }
    } else {
      return res.status(400).json({ msg: "no token found" });
    }
  } else {
    return res.status(404).json({ msg: "no authorization Found" });
  }
};
module.exports = verifyToken;
