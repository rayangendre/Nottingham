const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//User schema - has a name, watchlist, and portfolio list
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    watchList: {
        type: Array
    },
    portfolioList: {
        type: Array
    }
    

})


module.exports = UserSchema;
