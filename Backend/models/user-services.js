const mongoose = require("mongoose");
const UserSchema = require("./user");
const dotenv = require("dotenv");
dotenv.config();

let dbConnection;

function setConnection(newConn) {
  dbConnection = newConn;
  return dbConnection;
}

function getDbConnection() {
  if (!dbConnection) {
    dbConnection = mongoose.createConnection(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  return dbConnection;
}

async function getUsers(name) {
  console.log("Calling getUsers");
  const userModel = getDbConnection().model("User", UserSchema);
  let result;
  if (name === undefined) {
    result = await userModel.find();
  } else {
    result = await findUserByName(name);
  }
  return result;
}

async function findUserById(id) {
  console.log("Calling findUserById");
  const userModel = getDbConnection().model("User", UserSchema);
  try {
    return await userModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function addUser(user) {
  // userModel is a Model, a subclass of mongoose.Model
  const userModel = getDbConnection().model("User", UserSchema);
  try {
    const userToAdd = new userModel(user);
    const savedUser = await userToAdd.save();
    return savedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function updateUser(values) {
  const userModel = getDbConnection().model("User", UserSchema);
  let user;
  if (values.id) {
    //console.log("Using ID")
    user = await findUserById(values.id);
    console.log(user);
  } else if (values.name) {
    //console.log("Using name")
    user = await findUserByName(values.name);
    // user = await findUserById(user.id);
  } else {
    return false;
  }

  if (user === undefined) {
    return false;
  }

  console.log("user:");
  console.log(user);

  if (values.watchListAddition != "" && values.watchListAddition != null) {
    let newWatchList = [].concat(user.watchList);
    newWatchList.push(values.watchListAddition);
    //console.log(user.id)
    //console.log(user._id)
    const update = { watchList: newWatchList };
    const filter = { _id: user.id };
    const opts = { new: true };

    let result = await userModel.findOneAndUpdate(filter, update, opts);
    //console.log(result)
    if (result) {
      return result;
    } else {
      return false;
    }
  }

    console.log("user:");
    console.log(user);
    

    if(values.portfolioAddition != "" && values.portfolioAddition != null){
      let newPortList = [].concat(user.portfolioList);
      console.log(values)
      indexForAddition = newPortList.findIndex(item => {return item.name == values.portfolioAddition.name})
      console.log("Adding:", indexForAddition)
      if (indexForAddition == -1) {
        newPortList.push(values.portfolioAddition);
      } else {
        newPortList[indexForAddition].numShares += parseInt(values.portfolioAddition.numShares)
      }
      const update = {portfolioList: newPortList};
      const filter = {_id: user.id};
      const opts = {new: true};

    let result = await userModel.findOneAndUpdate(filter, update, opts);

    if (result) {
      return result;
    } else {
      return false;
    }
  }

  return false;
}

  async function removeStock(values){
    const userModel = getDbConnection().model("User", UserSchema);
    let user;
    if(values.id){
      //console.log("Using ID")
      user = await findUserById(values.id);
      console.log(user)

    }else if(values.name){
      //console.log("Using name")
      user = await findUserByName(values.name);
      // user = await findUserById(user.id);
    }else{
      return false;
    }

    if(user === undefined){
      return false;
    }

    console.log('values');
    console.log(values);
    

    if(values.watchListSub != ""){
      let newWatchList = [].concat(user.watchList);
      newWatchList = newWatchList.filter(function(e){
        return e != values.watchListSub;
      });
      const update = {watchList: newWatchList};
      const filter = {_id: user.id};
      const opts = {new: true};

      let result = await userModel.findOneAndUpdate(filter, update, opts);

      if(result){
        return result;
      }else{
        return false;
      }
    }

    if(values.portfolioSub != ""){
      let newPortList = [].concat(user.portfolioList);
      indexForRemoval = newPortList.findIndex(item => {return item.name == values.portfolioSub.name})
      console.log("Removing:", indexForRemoval)
      /*newPortList = newPortList.filter(function(e){
        return e.name != values.portfolioSub.name;
      });*/
      newPortList[indexForRemoval].numShares -= values.portfolioSub.numShares
      const update = {portfolioList: newPortList};
      const filter = {_id: user.id};
      const opts = {new: true};

      console.log('update:');
      console.log(update);
      console.log('portfolioSub');
      console.log(values.portfolioSub);
    }

  if (values.watchListSub != "") {
    let newWatchList = [].concat(user.watchList);
    newWatchList = newWatchList.filter(function (e) {
      return e != values.watchListSub;
    });
    const update = { watchList: newWatchList };
    const filter = { _id: user.id };
    const opts = { new: true };

    let result = await userModel.findOneAndUpdate(filter, update, opts);

    if (result) {
      return result;
    } else {
      return false;
    }
  }

  if (values.portfolioSub != "") {
    let newPortList = [].concat(user.portfolioList);
    newPortList = newPortList.filter(function (e) {
      return e.name != values.portfolioSub.name;
    });
    const update = { portfolioList: newPortList };
    const filter = { _id: user.id };
    const opts = { new: true };

    console.log("update:");
    console.log(update);
    console.log("portfolioSub");
    console.log(values.portfolioSub);

    let result = await userModel.findOneAndUpdate(filter, update, opts);

    if (result) {
      return result;
    } else {
      return false;
    }
  }

  return false;
}


async function findUserByName(name) {
  const userModel = getDbConnection().model("User", UserSchema);
  return await userModel.findOne({ name: name });
}

module.exports = {
  getUsers,
  findUserById,
  addUser,
  setConnection,
  updateUser,
  removeStock,
}
