export type Genres = Record<number, string>;

/** Mapping from person's name to their jobs */
export type Credits = {
  cast: string[];
  crew: Record<string, string[]>;
};
