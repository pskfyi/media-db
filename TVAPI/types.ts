export type RawTVInfo = {
  // image src
  backdrop_path: string;
  first_air_date: `${number}-${number}-${number}`;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  // image src
  poster_path: string;
  vote_average: number;
  vote_count: number;
};

export type TVSearchResult = {
  id: number;
  overview: string;
  releaseDate: `${number}-${number}-${number}`;
  title: string;
  genres: string[];
};
