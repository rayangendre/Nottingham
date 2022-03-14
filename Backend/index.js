const express = require('express');
var cors = require("cors")

// set up our express app
const app = express();
var cors = require("cors");

const userServices = require("./models/user-services");
const port = 4000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  const name = req.query["name"];
  
  try {
    const result = await userServices.getUsers(name);
    res.send({ users_list: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server.");
  }
});

app.get("/users/:id", async (req, res) => {
  const id = req.params["id"];
  const result = await userServices.findUserById(id);
  if (result === undefined || result === null)
    res.status(404).send("Resource not found.");
  else {
    res.send({ users_list: result });
  }
});

app.post("/users", async (req, res) => {
  const user = req.body;
  const savedUser = await userServices.addUser(user);
  if (savedUser) res.status(201).send(savedUser);
  else res.status(500).end();
});

app.patch("/users/:id", async (req, res) => {
    let watchListAddition = req.body["watchListAddition"];
    let portfolioAddition = req.body["portfolioAddition"];
    const id = req.params["id"];
    //console.log(id)
    var values = {};
    values.watchListAddition = watchListAddition;
    values.portfolioAddition = portfolioAddition;
    values.id = id;
    const result = await userServices.updateUser(values);

    if(result){
      res.status(200).send(result);
    }else{
      res.status(500).end();
    }
})

app.patch("/users", async (req, res) => {
  let watchListAddition = req.body["watchListAddition"];
  let portfolioAddition = req.body["portfolioAddition"];
  const name = req.body["name"];

  var values = {};
  values.watchListAddition = watchListAddition;
  values.portfolioAddition = portfolioAddition;
  values.name = name;

  const result = await userServices.updateUser(values);

  if(result){
    res.status(200).send(result);
  }else{
    res.status(500).end();
  }
})

app.delete("/users", async (req, res) => {
  let watchListSub = req.body["watchListSub"];
  let portfolioSub = req.body["portfolioSub"];
  const name = req.body["name"];

  var values = {};
  values.watchListSub = watchListSub;
  values.portfolioSub = portfolioSub;
  values.name = name;

  const result = await userServices.removeStock(values);

  
  if(result){
    res.status(200).send(result);
  }else{
    res.status(500).end();
  }
})

app.listen(process.env.PORT || port, () => {
  console.log("REST API is listening.");
});