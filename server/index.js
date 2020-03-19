const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema');

const app = express();

const MONGO_URL = 'mongodb+srv://bmorrison:Mongodbme1%21@betacluster-ceqwe.mongodb.net/test?retryWrites=true&w=majority';


//CONNECT TO MONGODB
mongoose.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once('open', () => {
  console.log('Connected to database');
}).on('error', (e) => {
  console.log('error is:', e);
});


//CONNECT TO GRAPHIQL
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));


//START SERVER
app.listen(4000, () => {
  console.log("Listening for requests on port 4000...");
});
