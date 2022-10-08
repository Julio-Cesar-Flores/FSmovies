import mongoose from "mongoose";
import Movie from "../../models/Movie.js";
import User from "../../models/User.js";

const Mutation = {
  createUser: async (_, { usuario, password }, ctx) => {
    const newUser = new User({ usuario, password, token: "", dashboard: [] });
    return await newUser.save();
  },
  deleteUser: async (_, { id }, ctx) => {
    let Msg, Ok, _id;
    _id = mongoose.Types.ObjectId(id);

    const doc = await User.findByIdAndDelete(_id);
    if (!doc) {
      Ok = false;
      Msg = "Not found";
    } else {
      Ok = true;
      Msg = "Deleted: " + doc.usuario;
    }
    return { Ok, Msg };
  },
  createMovie: async (_, { titulo, image, descripcion, likes }, ctx) => {
    console.log("Del ", ctx);
    const newMovie = new Movie({ titulo, image, descripcion, likes });
    return await newMovie.save();
  },
  deleteMovie: async (_, { id }, ctx) => {
    let Msg, Ok, _id;
    _id = mongoose.Types.ObjectId(id);

    const doc = await Movie.findByIdAndDelete(_id);
    if (!doc) {
      Ok = false;
      Msg = "Not found";
    } else {
      Ok = true;
      Msg = "Deleted: " + doc.titulo;
    }
    return { Ok, Msg };
  },
  incMovieLikes: async (_, { id }, ctx) => {
    let Msg = "Likes: ",
      Ok,
      _id;
    try {
      _id = mongoose.Types.ObjectId(id);
      const doc = await Movie.findByIdAndUpdate(id, { $inc: { likes: 1 } });
      /*const doc = await Movie.findById(id);
      doc.likes++
      await doc.save();*/
      if (!doc) {
        Ok = false;
        Msg = "Not found";
      } else {
        Ok = true;
        Msg += doc.likes;
      }
    } catch (error) {
      Ok = false;
      Msg = error;
    }
    return { Ok, Msg };
  },
};

export default Mutation;
/*
    try {
      
    } catch (error) {
      Ok = false;
      Msg = error;
    }
*/
