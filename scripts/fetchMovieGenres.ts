import { MOVIE_API_KEY } from "../env.ts";
import { fetchMovieGenres } from "../Movie/functions.ts";

const data = await fetchMovieGenres(MOVIE_API_KEY);

console.log(data);
