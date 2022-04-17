const express = require("express");
var cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// set up our express app
const app = express();
var cors = require("cors");

const userServices = require("./models/user-services");
const port = 4000;

app.use(cors());
app.use(express.json());

function generateAccessToken(username) {
  return jwt.sign({ username: username }, process.env.TOKEN_SECRET, {
    expiresIn: "3600s",
  });
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const pwd = req.body.pwd;

  const existing_user = await userServices.getUsers(username);

  if (existing_user === undefined || existing_user == null) {
    //Unauthorized due to invalid username
    res.status(401).send("Unauthorized Username");
  } else {
    const isValid = await bcrypt.compare(pwd, existing_user.pwd);
    if (isValid) {
      const token = generateAccessToken(username);
      const id = existing_user._id;

      const result = {
        token: token,
        id: id,
      };

      res.status(200).send(result);
    } else {
      res.status(401).send("Unauthorized Password");
    }
  }
});

app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const userPwd = req.body.pwd;
  if (!username && !userPwd) {
    res.status(400).send("Bad request: Invalid input data.");
  } else {
    const existing_user = await userServices.getUsers(username);

    if (username === existing_user.name) {
      //Conflicting usernames. Assuming it's not allowed, then:
      res.status(409).send("Username already taken");
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPWd = await bcrypt.hash(userPwd, salt);

      new_user = {};
      new_user.name = username;
      new_user.pwd = hashedPWd;

      const token = generateAccessToken(username);

      const savedUser = await userServices.addUser(new_user);

      const result = {
        token: token,
        id: savedUser._id,
      };

      if (savedUser) {
        res.status(201).send(result);
      } else {
        res.status(500).end();
      }
    }
  }
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
  console.log("ID");
  console.log(id);
  var values = {};
  values.watchListAddition = watchListAddition;
  values.portfolioAddition = portfolioAddition;
  values.id = id;
  const result = await userServices.updateUser(values);

  if (result) {
    res.status(200).send(result);
  } else {
    res.status(500).end();
  }
});

app.patch("/users", async (req, res) => {
  let watchListAddition = req.body["watchListAddition"];
  let portfolioAddition = req.body["portfolioAddition"];
  const name = req.body["name"];

  var values = {};
  values.watchListAddition = watchListAddition;
  values.portfolioAddition = portfolioAddition;
  values.name = name;

  const result = await userServices.updateUser(values);

  if (result) {
    res.status(200).send(result);
  } else {
    res.status(500).end();
  }
});

app.put("/users", async (req, res) => {
  console.log("Called delete with user name");
  let watchListSub = req.body["watchListSub"];
  let portfolioSub = req.body["portfolioSub"];
  const name = req.body["name"];

  var values = {};
  values.watchListSub = watchListSub;
  values.portfolioSub = portfolioSub;
  values.name = name;

  const result = await userServices.removeStock(values);

  if (result) {
    res.status(200).send(result);
  } else {
    res.status(500).end();
  }
});

app.put("/users/:id", async (req, res) => {
  console.log("Called delete with user id");
  let watchListSub = req.body["watchListSub"];
  let portfolioSub = req.body["portfolioSub"];
  const id = req.params["id"];

  console.log("req body");
  console.log(req.body);

  var values = {};
  values.watchListSub = watchListSub;
  values.portfolioSub = portfolioSub;
  values.id = id;

  const result = await userServices.removeStock(values);

  if (result) {
    res.status(200).send(result);
  } else {
    res.status(500).end();
  }
});

app.listen(process.env.PORT || port, () => {
  console.log("REST API is listening.");
});
