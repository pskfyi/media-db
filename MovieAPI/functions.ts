import { fetchGenres } from "../shared/functions.ts";
import { Credits, Genres } from "../shared/types.ts";
import { MOVIE_GENRES } from "./constants.ts";
import {
  MovieInfo,
  MovieSearchResult,
  RawMovieInfo,
  RawMovieSearchResult,
} from "./types.ts";

export async function fetchMovieGenres(key: string): Promise<Genres> {
  return await fetchGenres(key, "movie");
}

export async function searchMovie(
  key: string,
  title: string,
): Promise<MovieSearchResult[]> {
  const url =
    `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${title}`;

  const result = await fetch(url);
  const data = await result.json() as { results: RawMovieSearchResult[] };

  return data.results
    .map(({ id, title, genre_ids, overview, release_date: releaseDate }) => ({
      id,
      title,
      genres: genre_ids.map((id) => MOVIE_GENRES[id]),
      overview,
      releaseDate,
    }));
}

export async function fetchMovieCredits(
  key: string,
  id: number,
  options: {
    popularity?: { cast: number; crew: number };
    alwaysInclude?: string[];
  } = {
    popularity: { cast: 10, crew: 5 },
    alwaysInclude: ["Director"],
  },
): Promise<Credits> {
  const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${key}`;

  const result = await fetch(url);
  const { cast, crew } = await result.json() as {
    cast: Array<{ name: string; popularity: number }>;
    crew: Array<{ name: string; popularity: number; job: string }>;
  };

  const castPopularity = options?.popularity?.cast ?? 0;
  const crewPopularity = options?.popularity?.crew ?? 0;
  const alwaysInclude = options?.alwaysInclude ?? [];

  return {
    cast: cast
      .filter(({ popularity }) => popularity >= castPopularity)
      .map(({ name }) => name),
    crew: crew
      .filter(({ popularity, job }) =>
        alwaysInclude.includes(job) ||
        (popularity >= crewPopularity)
      )
      .reduce((mapping, { name, job }) => {
        if (!(name in mapping)) mapping[name] = [];

        mapping[name].push(job);

        return mapping;
      }, {} as Record<string, string[]>),
  };
}

export async function fetchMovieKeywords(
  key: string,
  id: number,
) {
  const url =
    `https://api.themoviedb.org/3/movie/${id}/keywords?api_key=${key}`;

  const result = await fetch(url);
  const raw = await result.json() as {
    keywords: Array<{ id: number; name: string }>;
  };

  return raw.keywords.map(({ name }) => name);
}

export async function fetchMovieInfo(
  key: string,
  id: number,
): Promise<MovieInfo> {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}`;

  const result = await fetch(url);
  const raw = await result.json() as RawMovieInfo;

  const keywords = await fetchMovieKeywords(key, id);
  const credits = await fetchMovieCredits(key, id);

  const data: MovieInfo = {
    id: raw.id,
    imdbID: raw.imdb_id,
    title: raw.title,
    tagline: raw.tagline,
    genres: raw.genres
      .map(({ name }) => name),
    credits,
    releaseDate: raw.release_date,
    languages: raw.spoken_languages
      .map(({ english_name }) => english_name),
    runtime: raw.runtime,
    countries: raw.production_countries
      .map(({ name }) => name),
    productionCompanies: raw.production_companies
      .map(({ name }) => name),
    keywords,
  };

  if (raw.belongs_to_collection) {
    data.collection = raw.belongs_to_collection.name;
  }

  return data;
}
