const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { route } = require("./auth");
const { findByIdAndDelete, deleteMany } = require("../models/User");
const Post = require("../models/Post");

//UPDATE
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const userUpdated = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json(userUpdated);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can only update your account");
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);

      try {
        await deleteMany(user.username);
        await findByIdAndDelete(req.params.id);

        res.status(200).json("your account has been deleted....");
      } catch (err) {
        res.status(401).json(err);
      }
    } catch (err) {
      res.status(404).json(err);
    }
  } else {
    res.status(401).json("You can only delete your account");
  }
});

//GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
     const {password , ...others} = user._doc
    res.status(200).json(others);
  } catch (err) {
    res.status(401).json(err);
  }
});

module.exports = router;
