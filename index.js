const express = require("express")
const app = express()
const port = 3002
const environment = process.env.NODE_ENV || "development";
const knexconfig = require("./knexfile.js")[environment];
const db = require("knex")(knexconfig);

app.get("/", (req, res, next) => {
  db.select("*").from("methods")
  .then((rows) => {
    res.send(rows)
  })
  .catch((err) => {
    next(err)
  })
})

app.listen(port, () => console.log(`Porty on port ${port}!`))