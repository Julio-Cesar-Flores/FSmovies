import mongoose from "mongoose";
import Movie from "../../models/Movie.js";

const Mutation = {
  createMovie: async (_, { titulo, image, descripcion, likes }) => {
    const newMovie = new Movie({ titulo, image, descripcion, likes });
    return await newMovie.save();
  },
  deleteMovie: async (_, { id }) => {
    let Msg, Ok, _id;
    try {
      _id = mongoose.Types.ObjectId(id);
      const M = await Movie.findByIdAndDelete(_id);
      if (!M) {
        Ok = false;
        Msg = "Not found";
      } else {
        Ok = true;
        Msg = "Deleted: " + M.titulo;
      }
    } catch (error) {
      Ok = false;
      Msg = error;
    }
    return { Ok, Msg };
  },
};

export default Mutation;
