const express = require("express")
const app = express()
const port = process.env.PORT || 3005
const data = require("./data.json")
const cors = require("cors")
const env = require("dotenv").config()

app.use(cors())

app.get("/", (req, res, next) => {
  res.status(200).send({
    "message": "You have the data.",
    "data": data
  })
})

app.get("/:faction", (req, res, next) => {
  const selectedFaction = req.params.faction
  if(!data.factions.includes(selectedFaction)){
    res.status(404).send("Requested resource was not found.")
  } else {
    const matching = data.catagory.filter(catagory => catagory.faction.includes(selectedFaction))
    res.status(200).send(matching)
  }
})

app.post("/", (req, res) => {
  res.send("it worked!")
})

app.use((req, res, next) => {
  res.status(404).send("Requested resource was not found.")
})

app.listen(port, () => console.log(`Your data is available at http://localhost:${port}`))