import { Genres } from "../shared/types.ts";

export async function fetchGenres(
  key: string,
  type: "movie" | "tv",
): Promise<Genres> {
  const url = `https://api.themoviedb.org/3/genre/${type}/list?api_key=${key}`;

  const result = await fetch(url);
  const data = await result.json() as {
    genres: Array<{ id: number; name: string }>;
  };

  return Object.fromEntries(
    data.genres.map(({ id, name }) => [id, name]),
  );
}
