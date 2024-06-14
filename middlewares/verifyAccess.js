const jwt = require("jsonwebtoken");
const User = require("../schemas/userSchema");

const verifyAccess = async (req, res, next) => {
  let token;

  token = req.headers?.authorization?.split(" ").at(1);
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findOne({ email: decoded.email });
      next();
    } catch (error) {
      res.status(401).send({ message: "Unauthorized action.Invalid token" });
    }
  } else {
    res.status(401).send({ message: "Unauthorized action.No token" });
  }
};

module.exports = { verifyAccess };
