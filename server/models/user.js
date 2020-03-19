
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
  email: String,
  username: String
});

//MODEL
module.exports = mongoose.model('User', userSchema);
