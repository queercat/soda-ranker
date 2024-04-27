import express from "express";
import fs from "fs";
import { readDatabase } from "./utilities/readDatabase";

const app = express();
const port = 3000;

/* JSON Middleware */
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

/** Retieve a list of all sodas with their details. */
app.get("/sodas", (req, res) => {
  const data = readDatabase<Array<Soda>>("./database/soda.json");
  res.send(data);
});

app.post("/sodas", (req, res) => {
  const data = readDatabase<Array<Soda>>("./database/soda.json");
  const newSoda = req.body as Soda;
  data.push(newSoda);
  fs.writeFileSync("./database/soda.json", JSON.stringify(data));
  res.send(newSoda);
});

/**
 * GET `/sodas/{soda_id}`:
 * Response: Details of a specific soda by ID.
 */
app.get("/sodas/:name", (request, response) => {
  const data = readDatabase<Array<Soda>>("./database/soda.json");
  const userSoda = request.params.name;
  const filteredData = data.filter((soda) => {
    return userSoda === soda.name;
  });

  response.send(filteredData);
});

/**
 * PUT /sodas/{soda_id}
 * Request: Updated details of a specific soda.
 */
app.put("/sodas/:name", (request, response) => {
  const data = readDatabase<Array<Soda>>("./database/soda.json");
  const newSoda = request.body as Soda;
  const userSoda = request.params.name;

  const updatedData = data.map((soda) => {
    if (soda.name === userSoda) return newSoda;
    return soda;
  });

  fs.writeFileSync("./database/soda.json", JSON.stringify(updatedData));
  response.send();
});

app.listen(port);

type Soda = {
  name: string;
  rating: number;
};
