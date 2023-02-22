const bcrypt = require("bcrypt");
const userModel = require("../model/userModel");
const { Types } = require("mongoose");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");
require("dotenv").config();

const signup = async (req, res) => {
  try {
    let { username, password } = req.body;
    const salt = 10;
    password = await bcrypt.hash(password, salt);
    const userDetails = {
      username,
      password,
    };
    const user = await userModel(userDetails).save();
    res.json(user);
  } catch (error) {
    if (error.message === "registered") {
      res.json({ message: "username is already taken" });
    }
  }
};

const Login = async (req, res) => {
  try {
    let { username, password } = req.body;
    const fetchUser = await userModel.findOne({ username });
    if (fetchUser === null) {
      throw new Error("invalid credentials");
    }
    const hashedPassword = await bcrypt.compare(password, fetchUser.password);
    if (hashedPassword === false) {
      throw new Error("wrong");
    }
    const { _id } = fetchUser;
    const token = await generateToken(_id);
    res.cookie("userToken", token).json({ status: true });
  } catch (error) {
    if (error.message === "invalid credentials") {
      res.json({ message: "wrong credentials" });
    }
    if (error.message === "wrong") {
      res.json({ message: "wrong Password" });
    }
  }
};

const getUsers = async (req, res) => {
  try {
    const userDetail = await userModel.find({ isDelete: false });
    res.status(200).json(userDetail);
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const deletedUser = await userModel.findByIdAndUpdate(
      { _id: Types.ObjectId(id) },
      {
        $set: {
          isDelete: true,
        },
      }
    );
    res.json(deletedUser);
  } catch (error) {
    console.log(error);
  }
};

const editUser = async (req, res) => {
  try {
    const Id = req.params.id;
    console.log(Id);
    const { username } = req.body;
    const editedUser = await userModel.findByIdAndUpdate(
      { _id: Types.ObjectId(Id) },
      {
        $set: {
          username: username,
        },
      }
    );
    res.json(editedUser);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  signup,
  Login,
  deleteUser,
  editUser,
  getUsers,
};
