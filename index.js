const express = require("express")
const app = express()
const port = 3005
const cors = require("cors")
const environment = process.env.NODE_ENV || "development";
const knexconfig = require("./knexfile.js")[environment];
const db = require("knex")(knexconfig);
const bodyParser = require("body-parser");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cors())

app.get("/", (req, res, next) => {
  db.select("*").from("organizations")
  .then(function(row) {
    res.send(row)
  })
  .catch((err) => {
    next(err)
  });
})

app.post("/", (req, res, next) => {
  db('organizations').insert(req.body)
  .then((rows) => {
    res.send(rows);
  })
  .catch((err) => {
    next(err);
  });
});

app.put("/", (req, res, next) => {
  console.log(req.body)
})

app.listen(port, () => console.log(`Porty on port ${port}!`))