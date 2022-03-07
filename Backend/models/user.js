const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//User schema - has a name, watchlist, and portfolio list
const UserSchema = new Schema({
    name: {
        type: String,
    },
    watchList: [{
        type: String
    }],
    portfolioList: [{
        type: String
    }]

})

const User = mongoose.model('user', UserSchema);

module.exports = User;
