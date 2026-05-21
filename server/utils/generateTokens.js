const jwt = require("jsonwebtoken");
const generateTokens = (userId) => ({
  accessToken:  jwt.sign({ id: userId }, process.env.JWT_SECRET,         { expiresIn: process.env.JWT_EXPIRE }),
  refreshToken: jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRE }),
});
module.exports = generateTokens;
