const mongoose = require('mongoose')
const validator = require("validator");


const playListSchema = new mongoose.Schema({
	name: { type: String, required: true },
	user: { type: mongoose.ObjectId, ref: "user", required: true },
	desc: { type: String, default: ""},
	songs: { type: Array, default: [] },
	img: { type: String, default: ""},
});

// validate model with joi package
// const Joi = require("joi");
// const validate = (playList) => {
// 	const schema = Joi.object({
// 		name: Joi.string().required(),
// 		user: Joi.string().required(),
// 		desc: Joi.string().allow(""),
// 		songs: Joi.array().items(Joi.string()),
// 		img: Joi.string().allow(""),
// 	});
// 	return schema.validate(playList);
// };


module.exports = mongoose.model('PlayList', playListSchema)
