const express = require("express")
const app = express()
const port = 8000
const environment = process.env.NODE_ENV || "development";
const knexconfig = require("./knexfile.js")[environment];
const db = require("knex")(knexconfig);

app.get("/codex", (req, res, next) => {
  db.select("*").from("organizations")
  .then((rows) => {
    res.send(rows)
  })
  .catch((err) => {
    next(err)
  })
})

app.get("/codex/carinhall", (req, res, next) => {
  db.select("*").from("organizations")
  .then((rows) => {
    res.send(rows)
  })
  .catch((err) => {
    next(err)
  })
})

app.listen(port, () => console.log(`Porty on port ${port}!`))