import { fetchGenres } from "../shared/functions.ts";
import { Genres } from "../shared/types.ts";
import { TV_GENRES } from "./constants.ts";
import { RawTVInfo, TVSearchResult } from "./types.ts";

export async function fetchTVGenres(key: string): Promise<Genres> {
  return await fetchGenres(key, "tv");
}

export async function searchTV(
  key: string,
  title: string,
): Promise<TVSearchResult[]> {
  const url =
    `https://api.themoviedb.org/3/search/tv?api_key=${key}&query=${title}`;

  const result = await fetch(url);
  const data = await result.json() as { results: RawTVInfo[] };

  return data.results
    .map((
      { id, genre_ids, name: title, overview, first_air_date: releaseDate },
    ) => ({
      id,
      title,
      genres: genre_ids.map((id) => TV_GENRES[id]),
      overview,
      releaseDate,
    }));
}
