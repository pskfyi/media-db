import { MovieAPI } from "./MovieAPI/mod.ts";

import * as path from "https://deno.land/std@0.166.0/path/mod.ts";
import { writeMovie } from "./DB/functions.ts";

const API_KEY = "<PUT YOUR API KEY HERE>";

// this file's containing directory
const ROOT_DIR = new URL(".", import.meta.url).pathname;
const DB_DIR = path.join(ROOT_DIR, "data");

const movieAPI = new MovieAPI(API_KEY);

console.log("Search movies by title");
console.log(await movieAPI.search("The Talented Mr. Ripley"));

console.log("Fetch movie info by ID");
console.log(await movieAPI.fetchInfo(60308)); // Moneyball

// To be polite to the API, using this helper function
// to rate-limit our API calls.
function onePerSecond(
  movieIDs: number[],
  callback: (id: number) => void,
): void {
  movieIDs.map(async (id, i) => {
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        callback(id);
        resolve();
      }, (i + 1) * 1000);
    });
  });
}

onePerSecond([101, 111, 345, 807, 419430], (id) => {
  console.log(id);
  writeMovie(DB_DIR, API_KEY, id);
});
