import mongoose from "mongoose";

mongoose
	.connect("mongodb://localhost/FSmovies", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((db) => console.log("DB is connected"))
	.catch((err) => console.log(err));
