import mongoose from "mongoose";
import jwt from "jwt-simple";
import bcrypt from "bcrypt";

import Movie from "../../models/Movie.js";
import User from "../../models/User.js";

const JWT_SECRET = "configDB.jwt.secret";

const Query = {
  getDashBoard: async (_, { tkn }, ctx) => {
    const { userId } = jwt.decode(tkn, JWT_SECRET);
    let _id = mongoose.Types.ObjectId(userId)
    const agg = [
      {
        $match: {
          _id,
        },
      },
      {
        $lookup: {
          from: "movies_catalogs",
          localField: "dashboard",
          foreignField: "_id",
          as: "dashboard",
        },
      },
    ];
    const result = await User.aggregate(agg);
    if(!result.length){
      return null
    }
    const res = result[0]
    return res;
  },
  getMovies: async (_, _args, ctx) => {
    //console.log(ctx.request.get('x-foo')); old version?
    //En docs dice context.request.headers.get('x-foo')
    return await Movie.find();
  },
  getUsers: async (_, _args, ctx) => {
    return await User.find();
  },
  findUser: async (_, { usuario, password }, ctx) => {
    //console.log("jwtSecret", JWT_SECRET);
    const users = await User.find({ usuario });
    if (users.length == 0) {
      return [];
    }

    const user = users[0];
    const passCorrect = await bcrypt.compare(password, user.password);
    if (!passCorrect) {
      return [];
    }

    const payload = {
      userId: user.id,
    };
    const token = jwt.encode(payload, JWT_SECRET);
    user.token = token;
    //user.save();
    return [user];
  },
};

export default Query;
