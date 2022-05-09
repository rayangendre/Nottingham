const mongoose = require("mongoose");
const UserSchema = require("./user");
const userServices = require("./user-services");
const mockingoose = require('mockingoose');
const { Schema } = mongoose;


let mongoServer;
let conn;
let userModel;

// const schema = Schema({
//   name: String,
//   email: String,
//   created: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('User', schema);

beforeAll(async () => {
  userModel = mongoose.model("User", UserSchema);
});

afterAll(async () => {
  jest.clearAllMocks();
  mockingoose.resetAll();
});

beforeEach(async () => {
  jest.clearAllMocks();
  mockingoose.resetAll();
});

afterEach(async () => {
  jest.clearAllMocks();
  mockingoose.resetAll();
});

test("Fetching all users", async () => {
  userModel.find = jest.fn().mockResolvedValue([]);

  const users = await userServices.getUsers();

  expect(users).toBeDefined();
  expect(users.length).toBeGreaterThanOrEqual(0);
  expect(userModel.find.mock.calls.length).toBe(1);
  expect(userModel.find).toHaveBeenCalledWith();
});

test("Fetching users by name", async () => {

  const result = [
    {
      name: 'Neymar',
      portfolioList: [],
      watchList: []
    }
  ]

  userModel.findOne = jest.fn().mockResolvedValue(result);

  const userName = 'Neymar';
  const users = await userServices.getUsers(userName);
  
  // Mock-related assertions
    //The mocked function (mongoose find) should be called only once  
  expect(userModel.findOne.mock.calls.length).toBe(1);
    // and should be called with the following param  
  expect(userModel.findOne).toHaveBeenCalledWith({name: userName});
  
  
});


test("Fetching by invalid id format", async () => {
  const anyId = "123";
  const result = undefined;
  userModel.findById = jest.fn().mockResolvedValue(result);
  const user = await userServices.findUserById(anyId);
  expect(user).toBeUndefined();
});

test("Fetching by valid id and not finding", async () => {
  const anyId = "6132b9d47cefd0cc1916b6a9";
  const result = null;

  userModel.findById = jest.fn().mockResolvedValue(result);
  const user = await userServices.findUserById(anyId);
  expect(user).toBeNull();
});

//NEED TO WORK &&&
test("Fetching by valid id and finding", async () => {
  const dummyUser = {
    name: "Harry Potter",
    job: "Young wizard",
  };
  const result = new userModel(dummyUser);
  userModel.findById = jest.fn().mockResolvedValue(result);

  const addedUser = await result.save();
  const foundUser = await userServices.findUserById(addedUser.id);
  expect(foundUser).toBeDefined();
  expect(foundUser.id).toBe(addedUser.id);
  expect(foundUser.name).toBe(addedUser.name);
  expect(foundUser.job).toBe(addedUser.job);
});

//NEED TO WORK &&&
test("Deleting a user by Id -- successful path", async () => {
  const dummyUser = {
    name: "Harry Potter",
    job: "Young wizard",
  };
  userModel.addUser = jest.fn().mockResolvedValue(result);

  const result = new userModel(dummyUser);
  const addedUser = await result.save();
  const deleteResult = await userModel.findOneAndDelete({ _id: addedUser.id });
  expect(deleteResult).toBeTruthy();
});

test("Deleting a user by Id -- inexisting id", async () => {
  const anyId = "6132b9d47cefd0cc1916b6a9";
  const result = null;
  userModel.findOneAndDelete = jest.fn().mockResolvedValue(result);

  const user = await userModel.findOneAndDelete({ _id: anyId });
  expect(user).toBeNull();
});

test("Adding user -- successful path", async () => {
  const dummyUser = {
    name: "Presnel Kimpembe",
    watchList: ["AAPL", "SHOP", "PYPL"],
    portfolioList:[
        {name: "V", numShares: "2"},
        {name: "DIS", numShares: "5"},
        {name: "TTD", numShares: "20"}
    ]
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

//NEED TO WORK &&&
test("Adding user -- failure path with already taken id", async () => {
  const dummyUser = {
    name: "Kylian Mbappe",
    watchList: ["V", "M", "PYPL"],
    portfolioList:[
        {name: "V", numShares: "2"},
        {name: "DIS", numShares: "5"}
    ]
  };
  const addedUser = await userServices.addUser(dummyUser);

  const anotherDummyUser = {
    _id: addedUser.id,
    name: "Angel DiMaria",
    watchList:[],
    portfolioList:[]
  };

  const result = null;
  userModel.addUser = jest.fn().mockResolvedValue(result);
  const users = await userServices.addUser(anotherDummyUser);
  
  expect(users).toBeNull();
});

test("Adding user -- failure path with no name", async () => {
  const dummyUser = {
    watchList: [],
    portfolioList: []
  };
  const result = await userServices.addUser(dummyUser);
  expect(result).toBeFalsy();
});

//NEED TO WORK &&&
test("Modifying User -- success adding to the watch list", async () => {
    const dummyUser = {
        name: "Kylian Mbappe",
        watchList: ["V", "M", "PYPL"],
        portfolioList:[
            {name: "V", numShares: "2"},
            {name: "DIS", numShares: "5"}
        ]
      };
    const addedUser = await userServices.addUser(dummyUser);
    
    let values = {
        "id": addedUser.id,
        "watchListAddition": "SBUX",
        "portfolioAddition": ""
    }
    const result = await userServices.updateUser(values);

    expect(result).toHaveProperty("_id");
    userModel.addUser = jest.fn().mockResolvedValue(result);

    expect(result.name).toBe(dummyUser.name);
    expect(result.watchList[3]).toBe("SBUX");
  });

//NEED TO WORK &&&
  test("Modifying User -- success adding to the portfolio list", async () => {
    const dummyUser = {
        name: "Kylian Mbappe",
        watchList: ["V", "M", "PYPL"],
        portfolioList:[
            {name: "V", numShares: "2"},
            {name: "DIS", numShares: "5"}
        ]
      };
    const addedUser = await userServices.addUser(dummyUser);
    
    let values = {
        "id": addedUser.id,
        "watchListAddition": "",
        "portfolioAddition": {name: "TSLA", numShares: "10"}
    }
    const result = await userServices.updateUser(values);

    expect(result).toHaveProperty("_id");
    expect(result.name).toBe(dummyUser.name);

    userModel.addUser = jest.fn().mockResolvedValue(result);

    expect(result.portfolioList[2].name).toBe("TSLA");
  });

  test("Modifying User -- fail adding to the portfolio list", async () => {
    const dummyUser = {
        name: "Kylian Mbappe",
        watchList: ["V", "M", "PYPL"],
        portfolioList:[
            {name: "V", numShares: "2"},
            {name: "DIS", numShares: "5"}
        ]
      };
    const addedUser = await userServices.addUser(dummyUser);
    
    let values = {
        "id": addedUser.id,
        "watchListAddition": "",
        "portfolioAddition": ""
    }
    const result = await userServices.updateUser(values);

    expect(result).toBeFalsy();

  });

  test("Modifying User -- failure adding to the watch list", async () => {
    const dummyUser = {
        name: "Kylian Mbappe",
        watchList: ["V", "M", "PYPL"],
        portfolioList:[
            {name: "V", numShares: "2"},
            {name: "DIS", numShares: "5"}
        ]
      };
    const addedUser = await userServices.addUser(dummyUser);
    
    let values = {
        "id": addedUser.id,
        "watchListAddition": "",
        "portfolioAddition": ""
    }
    const result = await userServices.updateUser(values);

    expect(result).toBeFalsy();
  });

  //NEED TO WORK &&&
  test("Modifying User -- success removing from the watch list", async () => {
    const dummyUser = {
        name: "Kylian Mbappe",
        watchList: ["V", "M", "PYPL"],
        portfolioList:[
            {name: "V", numShares: "2"},
            {name: "DIS", numShares: "5"}
        ]
      };
    const addedUser = await userServices.addUser(dummyUser);
    
    let values = {
        "id": addedUser.id,
        "watchListSub": "PYPL",
        "portfolioSub": ""
    }
    const result = await userServices.removeStock(values);

    expect(result).toHaveProperty("_id");
    userModel.addUser = jest.fn().mockResolvedValue(result);

    expect(result.name).toBe(dummyUser.name);
    expect(result.watchList[1]).toBe("M");
  });

  //NEED TO WORK &&&
  test("Modifying User -- success removing from the portfolio list", async () => {
    const dummyUser = {
        name: "Kylian Mbappe",
        watchList: ["V", "M", "PYPL"],
        portfolioList:[
            {name: "V", numShares: "2"},
            {name: "DIS", numShares: "5"}
        ]
      };
    const addedUser = await userServices.addUser(dummyUser);
    
    let values = {
        "id": addedUser.id,
        "watchListSub": "",
        "portfolioSub": {name:"DIS", numShares: "5"}
    }
    const result = await userServices.removeStock(values);

    expect(result).toHaveProperty("_id");
    userModel.addUser = jest.fn().mockResolvedValue(result);

    expect(result.name).toBe(dummyUser.name);
    expect(result.portfolioList[0].name).toBe("V");
  });


