const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//User schema - has a name, watchlist, and portfolio list
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    pwd: {
      type: String,
      required: true,
    },
    watchList: {
      type: Array,
      required: true,
    },
    portfolioList: {
      type: Array,
      required: true,
    },
    purchase_history: {
      type: Array,
    },
  },
  { collection: "users" }
);

module.exports = UserSchema;
