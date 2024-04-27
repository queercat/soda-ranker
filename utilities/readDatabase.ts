import fs from "fs";

export const readDatabase = <T>(path: string) => {
  return JSON.parse(fs.readFileSync(path, "utf-8")) as T;
};
