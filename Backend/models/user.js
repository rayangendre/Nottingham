const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//User schema - has a name, watchlist, and portfolio list
const UserSchema = new Schema({
    name: {
        type: String,
    },
    watchList: [{
        stock: {
            stockTicker :{type: String},
        }
    }],
    portfolioList: [{
        stock: {
            stockTicker :{type: String},
            numShares: {type: String}
        }
    }]

})

const User = mongoose.model('user', UserSchema);

module.exports = User;
