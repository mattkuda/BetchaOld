
/*
Defines the schema used by graphql to read and write information to/from the database.
*/


//IMPORTS

const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLSchema,
        GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;
const graphQLDate = require('graphql-iso-date');
const { GraphQLDateTime } = graphQLDate;

const User = require('./models/user');

const bcrypt = require('bcrypt');
const saltRounds = 10;





//TYPE DEFINITIONS

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    email: { type: GraphQLString, unique: true },
    username: { type: GraphQLString, unique: true },
    password: { type: GraphQLString },
    loggedIn: { type: GraphQLBoolean }
  })
});


const LoginType = new GraphQLObjectType({
  name: 'UserLogin',
  fields: () => ({
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  })
});


const LogoutType = new GraphQLObjectType({
  name: 'UserLogout',
  fields: () => ({
    id: { type: GraphQLString }
  })
});



//QUERIES (READ FROM DATABASE)

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to grab object from mongo database
        //return _.find(users, { id: args.id });
        return User.findById(args.id);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        //return users;
        return User.find({});
      }
    }
  }
});





//MUTATIONS (WRITE TO DATABASE)

const Mutations = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstname: { type: new GraphQLNonNull(GraphQLString) },
        lastname: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parent, args) {
        let user = new User({
          firstname: args.firstname,
          lastname: args.lastname,
          email: args.email,
          username: args.username,
          loggedIn: false
        });
        user.password = await bcrypt.hash(args.password, saltRounds);
        return user.save();
      }
    },
    loginUser: {
      type: LoginType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parent, args) {
        const user = await User.findOne({email: args.email});
        if (!user) {
          throw new Error('No user with that email.');
        }
        const valid = await bcrypt.compare(args.password, user.password);
        if (!valid) {
          throw new Error('Password does not match.');
        }
        return User.updateOne({email: args.email}, {loggedIn: true});
      }
    },
    logoutUser: {
      type: LogoutType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return User.updateOne({id: args.id}, {loggedIn: false});
      }
    }
  }
});





//EXPORT SCHEMA

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations
});
