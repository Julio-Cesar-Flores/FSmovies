import Movie from "../../models/Movie.js";
import User from "../../models/User.js";

const Query = {
  getMovies: async (_, _args, ctx) => {
    //console.log(ctx.request.get('x-foo')); old version?
    //En docs dice context.request.headers.get('x-foo')
    return await Movie.find();
  },
  getUsers: async (_, _args, ctx) => {
    return await User.find();
  },
};

export default Query;
