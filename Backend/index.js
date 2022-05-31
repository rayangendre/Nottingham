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
  const username = req.body.name;
  const pwd = req.body.pwd;

  const existing_user = await userServices.getUsers(username);

  if (existing_user === undefined || existing_user == null) {
    //Unauthorized due to invalid username
    res.status(401).send({ error: "Unauthorized Username" });
  } else {
    const isValid = await bcrypt.compare(pwd, existing_user.pwd);
    if (isValid) {
      const token = generateAccessToken(username);
      const id = existing_user._id;
      const name = existing_user.name;

      const result = {
        token: token,
        id: id,
        name: name,
      };

      res.status(200).send(result);
    } else {
      body = {};
      body.error = "Unauthorized Password";
      res.status(401).send(body);
    }
  }
});

app.post("/signup", async (req, res) => {
  const username = req.body.name;
  const userPwd = req.body.pwd;
  if (!username && !userPwd) {
    res.status(400).send("Bad request: Invalid input data.");
  } else {
    const existing_user = await userServices.getUsers(username);

    if (existing_user != null && username === existing_user.name) {
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
        name: new_user.name,
      };

      if (savedUser) {
        res.status(201).send(result);
      } else {
        res.status(500).end();
      }
    }
  }
});

/* Using this funcion as a "middleware" function for
  all the endpoints that need access control protecion */
function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  //Getting the 2nd part of the auth hearder (the token)
  const token = authHeader && authHeader.split(" ")[1];

  console.log("Calling Authenticate Users");

  if (!token) {
    console.log("No token received");
    return res.status(401).end();
  } else {
    // If a callback is supplied, verify() runs async
    // If a callback isn't supplied, verify() runs synchronously
    // verify() throws an error if the token is invalid
    try {
      // verify() returns the decoded obj which includes whatever objs
      // we use to code/sign the token
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      // in our case, we used the username to sign the token
      // console.log(decoded);

      return decoded;
    } catch (error) {
      console.log(error);
      return res.status(401).end();
    }
  }
}

app.get("/users", async (req, res) => {
  console.log("Calling getUsers in the API");

  const authHeader = req.headers["authorization"];
  //Getting the 2nd part of the auth hearder (the token)
  const token = authHeader && authHeader.split(" ")[1];

  console.log("Calling Authenticate Users");

  decoded = null;
  if (!token) {
    console.log("No token received");
    return res.status(401).end();
  } else {
    // If a callback is supplied, verify() runs async
    // If a callback isn't supplied, verify() runs synchronously
    // verify() throws an error if the token is invalid
    try {
      // verify() returns the decoded obj which includes whatever objs
      // we use to code/sign the token
      decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      // in our case, we used the username to sign the token
      // console.log(decoded);
    } catch (error) {
      console.log(error);
      return res.status(401).end();
    }
  }

  const name = decoded.username;
  console.log(name);
  try {
    const result = await userServices.getUsers(name);
    res.send({ users_list: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server.");
  }
});

app.get("/users/:id", async (req, res) => {
  console.log("Calling getUsers with a userID");
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
  if (result == false) {
    res.status(500).end();
  }
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

  if (result == false) {
    console.log("Returning 500");
    res.status(500).end();
  }
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(500).end();
  }
});

app.put("/purchase_hist/:id", async (req, res) => {
  console.log("Adding item to the purchase history");
  let purchase = req.body["purchase"];
  const id = req.params["id"];

  const result = await userServices.purchase(id, purchase);

  if (result) {
    res.status(200).send(result);
  } else {
    res.status(500).end();
  }
});

app.listen(process.env.PORT || port, () => {
  console.log("REST API is listening.");
});
