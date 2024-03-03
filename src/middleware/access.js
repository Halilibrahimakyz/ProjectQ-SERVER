require("dotenv").config();
const config = process.env;

const verifyAccessToken = (req, res, next) => {
  //const token = req.body.secretToken || req.query.secretToken;

  // try {
  //   if (!token || token !== config.SECRET_TOKEN) {
  //     throw new Error("Invalid Token");
  //   }
  // } catch (err) {
  //   return res.status(401).json({
  //     result: null,
  //     error: "Invalid Access Token",
  //   });
  // }
  return next();
};

module.exports = verifyAccessToken;
