const express = require("express");
const app = express();
const port = 3004;
const jsonfile = require("jsonfile");
const resultFile = "result.json";
const crawler = require("./crawler");

app.set("view engine", "pug");
app.use("/assets", express.static("assets"));

app.get("/", async (req, res) => {
  await crawler.getAnimes();
  const list = jsonfile.readFileSync(resultFile);
  res.render("index", { title: "Anime crawler", message: "Bem-vindo!", values: list });
});

app.get("/animes", async (req, res) => {
  const r = await crawler.getAnimes();
  res.send(r);
});

app.listen(port, () => {
  console.log(`Server anime crawler --> http://localhost:${port}`);
});
