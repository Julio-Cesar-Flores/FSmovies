import { Schema, model } from "mongoose";

const userSchema = new Schema({
	usuario: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	token: {
		type: String,
		required: true,
	},
	dashboard :[{
		type: String,
		required: true,
	}],
});

export default model("user", userSchema);