const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
	dislikes: {
		type: Number,
		default: 0
	},
	message: {
		type: String,
		required: [true, "can't be blank"],
	},
	name: {
		type: String,
		required: [true, "can't be blank"],
	},
	createdAt: {
		type: Date
	}
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
