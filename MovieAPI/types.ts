import { Credits } from "../shared/types.ts";

export type RawMovieSearchResult = {
  adult: boolean;
  // image src
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  // image src
  poster_path: string;
  release_date: `${number}-${number}-${number}`;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MovieSearchResult = {
  id: number;
  overview: string;
  releaseDate: `${number}-${number}-${number}`;
  title: string;
  genres: string[];
};

export type RawMovieInfo = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null | {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: Array<{ id: number; name: string }>;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  popularity: number;
  poster_path: string;
  production_companies: Array<{
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }>;
  production_countries: Array<{
    iso_3166_1: string;
    name: string;
  }>;
  release_date: `${number}-${number}-${number}`;
  revenue: number;
  // Minutes
  runtime: number;
  spoken_languages: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }>;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MovieInfo = {
  id: number;
  imdbID: string;
  title: string;
  collection?: string;
  tagline: string;
  genres: string[];
  credits: Credits;
  releaseDate: `${number}-${number}-${number}`;
  languages: string[];
  // Minutes
  runtime: number;
  countries: string[];
  productionCompanies: string[];
  keywords: string[];
};
