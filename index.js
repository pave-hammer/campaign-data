const express = require("express")
const app = express()
const port = 3005
const cors = require("cors")
const environment = process.env.NODE_ENV || "development";
const knexconfig = require("./knexfile.js")[environment];
const db = require("knex")(knexconfig);
const bodyParser = require("body-parser");

app.use(cors())
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
}

app.listen(port, () => console.log(`Porty on port ${port}!`))