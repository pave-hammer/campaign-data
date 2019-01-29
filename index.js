const express = require("express")
const app = express()
const port = 3005
const environment = process.env.NODE_ENV || "development";
const knexconfig = require("./knexfile.js")[environment];
const db = require("knex")(knexconfig);
const bodyParser = require("body-parser");

app.use(bodyParser.json())

app.get("/", (req, res, next) => {
  db.select("*").from("data")
  .then(function(row) {
    res.send(row)
  })
  .catch((err) => {
    next(err)
  });
})

app.get("/:id", (req, res, next) => {
  db.schema.createTable("data_ranks", table => {
    table.increments()
    table.string('name').references('name').inTable("data").notNullable().defaultsTo('')
    table.text('description').references('description').inTable('data').notNullable().defaultsTo('')
  })
})

app.post("/data"), (req, res, next) => {
  console.log(req.body)
  knex('data').insert(req.body)
  .then((rows) => {
    res.send(rows);
  })
  .catch((err) => {
    next(err);
  });
}

app.listen(port, () => console.log(`Porty on port ${port}!`))