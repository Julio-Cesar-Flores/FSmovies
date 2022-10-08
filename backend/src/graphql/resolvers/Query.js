import Movies from "../../models/Movie.js";

const Query = {
  getMovies: async () => {
    return await Movies.find();
  },
};

export default Query;
