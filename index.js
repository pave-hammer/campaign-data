const express = require("express")
const app = express()
const port = 3005
const cors = require("cors")
const environment = process.env.NODE_ENV || "development";
const knexconfig = require("./knexfile.js")[environment];
const knex = require("knex")(knexconfig);
const bodyParser = require("body-parser");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cors())

app.get('/catagories', (req, res, next) => {
  knex('catagories').then((row) => {
    res.status(200)
    res.send(row)
  })
  .catch((err) => {
    next(err)
  })
})

app.get("/content", (req, res, next) => {
  knex.select("*").from("content")
  .then(function(row) {
    res.status(200)
    res.send(row)
  })
  .catch((err) => {
    next(err)
  });
})

app.post("/", (req, res, next) => {
  knex('content').insert(req.body)
  .then((rows) => {
    res.status(200)
    res.send(rows);
  })
  .catch((err) => {
    next(err);
  });
});

app.put('/:id', (req, res, next) => {
  knex('content').update(req.body).where('id', req.params.id).returning("*")
  .then((rows) => {
    res.status(200)
    res.send(rows);
  })
  .catch((err) => {
    next(err);
  });
});

app.delete('/:id', (req, res, next) => {
  knex('content').del().where('id', req.params.id).returning("*")
  .then((rows) => {
    res.status(200)
    res.send(rows);
  })
  .catch((err) => {
    next(err);
  });
})

app.listen(port, () => console.log(`Porty on port ${port}!`))