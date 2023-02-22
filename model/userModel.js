const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },

  isDelete: {
    type: Boolean,
    default: false,
  },
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
