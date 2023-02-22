const jwt = require("jsonwebtoken");
require("dotenv").config();

const userToken = process.env.userToken;
module.exports.generateToken = (id) => {
  try {
    return new Promise((resolve, reject) => {
      const generatedToken = jwt.sign({ id }, userToken, { expiresIn: "1d" });
      resolve(generatedToken);
    });
  } catch (error) {
    console.log(error);
  }
};
