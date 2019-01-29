const express = require("express")
const app = express()
const port = 8000
const cors = require("cors")
const environment = process.env.NODE_ENV || "development";
const knexconfig = require("./knexfile.js")[environment];
const db = require("knex")(knexconfig);
const bodyParser = require("body-parser");

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get("/", (req, res, next) => {
  db.select("*").from("data")
  .then((rows) => {
    res.send(rows)
  })
  .catch((err) => {
    next(err)
  })
})

app.post("/codex"), (req, res, next) => {
  console.log("It works")
  res.send("It works")
}

app.listen(port, () => console.log(`Porty on port ${port}!`))