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
	picture: {
		type: String,
	},
	name: {
		type: String,
		required: [true, "can't be blank"],
	},
	createdAt: {
		type: Date
	},
	lang:{
		type: String
	}
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
