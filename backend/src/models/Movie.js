import { Schema, model } from "mongoose";

const movieSchema = new Schema({
	titulo: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	descripcion: {
		type: String,
		required: true,
	},
	likes:{
		type: Number,
		required: true,
	},
});

export default model("movies_catalog", movieSchema);
