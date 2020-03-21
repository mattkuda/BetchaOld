
/*
Defines how a user is stored within the database.
*/



//IMPORTS
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//SCHEMA
const userSchema = new Schema({
  firstname: String,
  lastname: String,
  email: {
    type: String,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
  },
  password: String,
  loggedIn: Boolean
});

//MODEL
module.exports = mongoose.model('User', userSchema);
