import { MOVIE_API_KEY } from "../env.ts";
import { fetchTVGenres } from "../TV/functions.ts";

const data = await fetchTVGenres(MOVIE_API_KEY);

console.log(data);
