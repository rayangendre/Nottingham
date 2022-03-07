const express = require('express');
const mongoose = require('mongoose');

// set up our express app
const app = express();

const uri = "mongodb+srv://mainuser:mainuser@cluster0.uwdbk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


try {
    // Connect to the MongoDB cluster
    mongoose.connect(
      uri,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log(" Mongoose is connected"),
    );
  } catch (e) {
    console.log("could not connect");
  }
  
const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));


// // connect to mongodb
// mongoose.connect('mongodb://localhost/ourdata');
// mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use(express.json());
// initialize routes
app.use('/api',require('./router/api2'));

// error handling middleware
app.use(function(err,req,res,next){
    //console.log(err);
    res.status(422).send({error: err.message});
});

// listen for requests
app.listen(process.env.port || 4000, function(){
    console.log('Ready to Go!');
});