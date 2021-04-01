const express = require('express');
const Comment = require('../models/Comment');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.post('/comment', async (req, res) => {
  try {
    const { message, name } = req.body;

    if(!message) throw new Error("No message");
    if(!name) throw new Error("No name");

    const comment = new Comment();
    comment.message = message;
    comment.name = name;
    await comment.save();

    res.json({success: true, id: comment._id})
  } catch (error) {
    console.error(error);
    res.json({success: false})
  }
})

router.get('/comment', async (req, res) => {
  try {
    const comments = await Comment.find();

    res.json({comments, success: true})
  } catch (error) {
    console.error(error);
    res.json({success: false})
  }
})

router.post('/like', async (req, res) => {
  try {
    const { id } = req.body;

    if(!id) throw new Error("No message");

    const comment = await Comment.findById(id);

    if(!comment) throw new Error("No comment found");

    comment.dislikes++;
    await comment.save();

    res.json({success: true})
  } catch (error) {
    console.error(error);
    res.json({success: false})
  }
})

router.delete('/like', async (req, res) => {
  try {
    const { id } = req.body;

    if(!id) throw new Error("No message");

    const comment = await Comment.findById(id);

    if(!comment) throw new Error("No comment found");

    comment.dislikes--;
    await comment.save();

    res.json({success: true})
  } catch (error) {
    console.error(error);
    res.json({success: false})
  }
})

module.exports = router;
