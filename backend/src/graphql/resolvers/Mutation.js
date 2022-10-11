import mongoose from "mongoose";
import jwt from "jwt-simple";
import bcrypt from "bcrypt";

import Movie from "../../models/Movie.js";
import User from "../../models/User.js";

const JWT_SECRET = "configDB.jwt.secret";

const Mutation = {
  addDashBoard: async (_, { tkn, id }, ctx) => {
    const { userId } = jwt.decode(tkn, JWT_SECRET);
    let _id = mongoose.Types.ObjectId(userId);
    const user = await User.findById(_id);
    if (!user) {
      return null;
    }
    _id = mongoose.Types.ObjectId(id);
    const film = await Movie.findById(_id);
    if (!film) {
      return null;
    }
    user.dashboard.push(_id);
    await user.save();
    return user;
  },
  createUser: async (_, { usuario, password }, ctx) => {
    const users = await User.find({ usuario });
    if (users.length > 0) {
      return [];
    }
    const encryptedPass = await bcrypt.hash(password, 4);
    let newUser = new User({
      usuario,
      password: encryptedPass,
      token: "",
      dashboard: [],
    });
    newUser = await newUser.save();
    return [newUser];
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
  createMovie: async (_, newData, ctx) => {
    //{ nid, titulo, image, descripcion, likes }
    const { nid } = newData;
    let doc = await Movie.findOneAndUpdate({ nid }, newData, { upsert: true });

    /*let doc = await Movie.findOne({ nid });
    if (!doc) {
      doc = new Movie({ nid, titulo, image, descripcion, likes });
      doc = await doc.save();
    }*/
    return doc;
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
