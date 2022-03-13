const mongoose = require("mongoose");
const UserSchema = require("./user");
const dotenv = require("dotenv");
dotenv.config();

let dbConnection;

function setConnection(newConn){
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
    const userModel = getDbConnection().model("User", UserSchema);
    let result;
    if (name === undefined) {
      result = await userModel.find();
    } else{
      result = await findUserByName(name);
    }
    return result;
  }
  
  async function findUserById(id) {
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

  async function updateUser(values){
    
    const userModel = getDbConnection().model("User", UserSchema);
    let user;
    if(values.id){
        user = await findUserById(values.id);
    }else if(values.name){
        user = await findUserByName(values.name);
    }else{
      return false;
    }

    if(user === undefined){
      return false;
    }
    
    
    
    if(values.watchListAddition != ""){
      let newWatchList = [].concat(user.watchList);
      newWatchList.push(values.watchListAddition);
      const update = {watchList: newWatchList};
      const filter = {id: user.id};
      const opts = {new: true};

      let result = await userModel.findOneAndUpdate(filter, update, opts);

      if(result){
        return result;
      }else{
        return false;
      }
    }

    if(values.portfolioAddition != ""){
      let newPortList = user.portfolioList;
      newPortList.push(values.portfolioAddition);
      const update = {portfolioList: newPortList};
      const filter = {id: user.id};
      const opts = {new: true};

      let result = await userModel.findOneAndUpdate(filter, update, opts);

      if(result){
        return result;
      }else{
        return false;
      }
    }

    return false;
  }

  
  
  async function findUserByName(name) {
    const userModel = getDbConnection().model("User", UserSchema);       
    return await userModel.find({ name: name });
  }
  
  
  module.exports = {
    getUsers,
    findUserById,
    addUser,
    setConnection,
    updateUser
  }