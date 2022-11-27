import * as yaml from "https://deno.land/std@0.166.0/encoding/yaml.ts";
import * as path from "https://deno.land/std@0.166.0/path/mod.ts";
import { slug } from "https://deno.land/x/slug@v1.1.0/mod.ts";

import { fetchMovieInfo } from "../MovieAPI/mod.ts";

export async function write(
  filePath: string,
  data: Record<string, unknown>,
): Promise<void> {
  // await console.log({ filePath, data });
  await Deno.writeTextFile(filePath, yaml.stringify(data), {});
}

export async function writeMovie(
  rootPath: string,
  apiKey: string,
  id: number,
): Promise<void> {
  const info = await fetchMovieInfo(apiKey, id);

  const year = info.releaseDate.split("-")[0];
  const dirPath = path.join(rootPath, "movies", year);

  Deno.mkdir(dirPath, { recursive: true });

  const filename = slug(
    info.title,
    { lower: true, remove: /[,:]/g },
  );
  const filePath = path.join(dirPath, `${filename}.yml`);

  await write(filePath, info);
}
