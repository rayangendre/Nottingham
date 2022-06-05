const mongoose = require("mongoose");
const UserSchema = require("./user");
const userServices = require("./user-services");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;
let conn;
let userModel;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  conn = await mongoose.createConnection(uri, mongooseOpts);

  userModel = conn.model("User", UserSchema);

  userServices.setConnection(conn);
});

afterAll(async () => {
  await conn.dropDatabase();
  await conn.close();
  await mongoServer.stop();
});

beforeEach(async () => {
  let dummyUser = {
    name: "Kylian Mbappe",
    watchList: ["V", "M", "PYPL"],
    portfolioList: [
      { name: "V", numShares: "2" },
      { name: "DIS", numShares: "5" },
    ],
    pwd: "TEST",
  };
  let result = new userModel(dummyUser);
  await result.save();

  dummyUser = {
    name: "Neymar",
    watchList: [],
    portfolioList: [
      { name: "AAPL", numShares: "100" },
      { name: "KO", numShares: "5" },
      { name: "BA", numShares: "5" },
    ],
    pwd: "TEST",
  };
  result = new userModel(dummyUser);
  await result.save();

  dummyUser = {
    name: "Neymar",
    watchList: ["KO", "AAPL"],
    portfolioList: [{ name: "AAPL", numShares: "100" }],
    pwd: "TEST",
  };
  result = new userModel(dummyUser);
  await result.save();

  dummyUser = {
    name: "Verratti",
    watchList: ["SBUX", "QQQ", "MSFT"],
    portfolioList: [
      { name: "MSFT", numShares: "100" },
      { name: "SPXL", numShares: "10" },
      { name: "MA", numShares: "5" },
    ],
    pwd: "TEST",
  };
  result = new userModel(dummyUser);
  await result.save();
});

afterEach(async () => {
  await userModel.deleteMany();
});

test("Fetching all users", async () => {
  const users = await userServices.getUsers();
  expect(users).toBeDefined();
  expect(users.length).toBeGreaterThan(0);
});

test("Fetching users by name", async () => {
  const userName = "Neymar";
  const users = await userServices.getUsers(userName);
  console.log("FETCH BY NAME");
  console.log(users);
  expect(users).toBeDefined();

  expect(users.name).toBe(userName);
});

test("Fetching by invalid id format", async () => {
  const anyId = "123";
  const user = await userServices.findUserById(anyId);
  expect(user).toBeUndefined();
});

test("Fetching by valid id and not finding", async () => {
  const anyId = "6132b9d47cefd0cc1916b6a9";
  const user = await userServices.findUserById(anyId);
  expect(user).toBeNull();
});

test("Fetching by valid id and finding", async () => {
  const dummyUser = {
    name: "Harry Potter",
    job: "Young wizard",
    pwd: "TEST",
  };
  const result = new userModel(dummyUser);
  const addedUser = await result.save();
  const foundUser = await userServices.findUserById(addedUser.id);
  expect(foundUser).toBeDefined();
  expect(foundUser.id).toBe(addedUser.id);
  expect(foundUser.name).toBe(addedUser.name);
  expect(foundUser.job).toBe(addedUser.job);
});

test("Deleting a user by Id -- successful path", async () => {
  const dummyUser = {
    name: "Harry Potter",
    job: "Young wizard",
    pwd: "TEST",
  };
  const result = new userModel(dummyUser);
  const addedUser = await result.save();
  const deleteResult = await userModel.findOneAndDelete({ _id: addedUser.id });
  expect(deleteResult).toBeTruthy();
});

test("Deleting a user by Id -- inexisting id", async () => {
  const anyId = "6132b9d47cefd0cc1916b6a9";
  const deleteResult = await userModel.findOneAndDelete({ _id: anyId });
  expect(deleteResult).toBeNull();
});

test("Adding user -- successful path", async () => {
  const dummyUser = {
    name: "Presnel Kimpembe",
    watchList: ["AAPL", "SHOP", "PYPL"],
    portfolioList: [
      { name: "V", numShares: "2" },
      { name: "DIS", numShares: "5" },
      { name: "TTD", numShares: "20" },
    ],
  };
  const result = await userServices.addUser(dummyUser);
  expect(result).toBeTruthy();
  expect(result.name).toBe(dummyUser.name);
  expect(result).toHaveProperty("_id");
});

test("Adding user -- failure path with invalid id", async () => {
  const dummyUser = {
    _id: "123",
    name: "Harry Potter",
    job: "Young wizard",
  };
  const result = await userServices.addUser(dummyUser);
  expect(result).toBeFalsy();
});

test("Adding user -- failure path with already taken id", async () => {
  const dummyUser = {
    name: "Kylian Mbappe",
    watchList: ["V", "M", "PYPL"],
    portfolioList: [
      { name: "V", numShares: "2" },
      { name: "DIS", numShares: "5" },
    ],
  };
  const addedUser = await userServices.addUser(dummyUser);

  const anotherDummyUser = {
    _id: addedUser.id,
    name: "Angel DiMaria",
    watchList: [],
    portfolioList: [],
  };
  const result = await userServices.addUser(anotherDummyUser);
  expect(result).toBeFalsy();
});

test("Adding user -- failure path with no name", async () => {
  const dummyUser = {
    watchList: [],
    portfolioList: [],
  };
  const result = await userServices.addUser(dummyUser);
  expect(result).toBeFalsy();
});

test("Modifying User -- success adding to the watch list", async () => {
  const dummyUser = {
    name: "Kylian Mbappe",
    watchList: ["V", "M", "PYPL"],
    portfolioList: [
      { name: "V", numShares: "2" },
      { name: "DIS", numShares: "5" },
    ],
  };
  const addedUser = await userServices.addUser(dummyUser);

  let values = {
    id: addedUser.id,
    watchListAddition: "SBUX",
    portfolioAddition: "",
  };
  const result = await userServices.updateUser(values);

  expect(result).toHaveProperty("_id");
  expect(result.name).toBe(dummyUser.name);
  expect(result.watchList[3]).toBe("SBUX");
});

test("Modifying User -- success adding to the portfolio list", async () => {
  const dummyUser = {
    name: "Kylian Mbappe",
    watchList: ["V", "M", "PYPL"],
    portfolioList: [
      { name: "V", numShares: "2" },
      { name: "DIS", numShares: "5" },
    ],
  };
  const addedUser = await userServices.addUser(dummyUser);

  let values = {
    id: addedUser.id,
    watchListAddition: "",
    portfolioAddition: { name: "TSLA", numShares: "10" },
  };
  const result = await userServices.updateUser(values);

  expect(result).toHaveProperty("_id");
  expect(result.name).toBe(dummyUser.name);
  expect(result.portfolioList[2].name).toBe("TSLA");
});

test("Modifying User -- fail adding to the portfolio list", async () => {
  const dummyUser = {
    name: "Kylian Mbappe",
    watchList: ["V", "M", "PYPL"],
    portfolioList: [
      { name: "V", numShares: "2" },
      { name: "DIS", numShares: "5" },
    ],
  };
  const addedUser = await userServices.addUser(dummyUser);

  let values = {
    id: addedUser.id,
    watchListAddition: "",
    portfolioAddition: "",
  };
  const result = await userServices.updateUser(values);

  expect(result).toBeFalsy();
});

test("Modifying User -- failure adding to the watch list", async () => {
  const dummyUser = {
    name: "Kylian Mbappe",
    watchList: ["V", "M", "PYPL"],
    portfolioList: [
      { name: "V", numShares: "2" },
      { name: "DIS", numShares: "5" },
    ],
  };
  const addedUser = await userServices.addUser(dummyUser);

  let values = {
    id: addedUser.id,
    watchListAddition: "",
    portfolioAddition: "",
  };
  const result = await userServices.updateUser(values);

  expect(result).toBeFalsy();
});

test("Modifying User -- success removing from the watch list", async () => {
  const dummyUser = {
    name: "Kylian Mbappe",
    watchList: ["V", "M", "PYPL"],
    portfolioList: [
      { name: "V", numShares: "2" },
      { name: "DIS", numShares: "5" },
    ],
  };
  const addedUser = await userServices.addUser(dummyUser);

  let values = {
    id: addedUser.id,
    watchListSub: "PYPL",
    portfolioSub: "",
  };
  const result = await userServices.removeStock(values);

  expect(result).toHaveProperty("_id");
  expect(result.name).toBe(dummyUser.name);
  expect(result.watchList[1]).toBe("M");
});

test("Modifying User -- success removing from the portfolio list", async () => {
  const dummyUser = {
    name: "Kylian Mbappe",
    watchList: ["V", "M", "PYPL"],
    portfolioList: [
      { name: "V", numShares: "2" },
      { name: "DIS", numShares: "5" },
    ],
  };
  const addedUser = await userServices.addUser(dummyUser);

  let values = {
    id: addedUser.id,
    watchListSub: "",
    portfolioSub: { name: "DIS", numShares: "5" },
  };
  const result = await userServices.removeStock(values);

  expect(result).toHaveProperty("_id");
  expect(result.name).toBe(dummyUser.name);
  expect(result.portfolioList[0].name).toBe("V");
});
