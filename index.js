const express = require("express")
const app = express()
const port = 3001
const environment = process.env.NODE_ENV || "development";
const knexconfig = require("./knexfile.js")[environment];
const db = require("knex")(knexconfig);

app.get("/", (req, res, next) => {
  db.select("*").from("organizations")
  .then((rows) => {
    res.send(rows)
  })
  .catch((err) => {
    next(err)
  })
})

app.get("/additionaldata", (req, res, next) => {
  db.select("*").from("additionaldata")
  .then((rows) => {
    res.send(rows)
  })
  .catch((err) => {
    next(err)
  })
})

app.listen(port, () => console.log(`Porty on port ${port}!`))