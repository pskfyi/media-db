import { Genres } from "../shared/types.ts";
import { MOVIE_GENRES } from "./constants.ts";
import { fetchMovieGenres, fetchMovieInfo, searchMovie } from "./functions.ts";
import { MovieSearchResult } from "./types.ts";

export class MovieAPI {
  genres = MOVIE_GENRES;

  constructor(private key: string) {}

  async fetchGenres(): Promise<Genres> {
    return await fetchMovieGenres(this.key);
  }

  async search(title: string): Promise<MovieSearchResult[]> {
    return await searchMovie(this.key, title);
  }

  async fetchInfo(id: number) {
    return await fetchMovieInfo(this.key, id);
  }
}
