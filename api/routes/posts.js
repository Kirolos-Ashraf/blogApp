const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//CREATE
router.post("/", async (req, res) => {
  const post = new Post(req.body);

  try {
    const newPost = await post.save();

    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.username === req.body.username) {
      try {
        const postUpdated = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          {
            new: true,
          }
        );

        res.status(200).json(postUpdated);
      } catch (err) {
        res.status(404).json(err);
      }
    } else {
      res.status(401).json("you can only update your post....");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.username === req.body.username) {
      try {
        await post.delete();

        res.status(200).json("post has been deleted...");
      } catch (err) {
        res.status(401).json(err);
      }
    } else {
      res.status(401).json("You can only delete your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts = await Post.find();

    if (username && catName) {
      posts = await Post.find({ username }, { categories: { $in: [catName] } });
      return res.status(200).json(posts);
    }

    if (username) {
      posts = await Post.find({ username });
      return res.status(200).json(posts);
    }

    if (catName) {
      posts = await Post.find({ categories: { $in: [catName] } });
      return res.status(200).json(posts);
    }

    

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
