import { Genres } from "../shared/types.ts";
import { TV_GENRES } from "./constants.ts";
import { fetchTVGenres, searchTV } from "./functions.ts";
import { TVSearchResult } from "./types.ts";

export class TVAPI {
  #rootURL = "https://api.themoviedb.org/3/";
  genres = TV_GENRES;

  constructor(private key: string) {}

  async fetchGenres(): Promise<Genres> {
    return await fetchTVGenres(this.key);
  }

  async search(title: string): Promise<TVSearchResult[]> {
    return await searchTV(this.key, title);
  }
}
