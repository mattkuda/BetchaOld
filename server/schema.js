
/*
Defines the schema used by graphql to read and write information to/from the database.
*/


//IMPORTS

const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema,
        GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;
const graphQLDate = require('graphql-iso-date');
const { GraphQLDateTime } = graphQLDate;

const User = require('./models/user');





//TYPE DEFINITIONS

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    email: { type: GraphQLString },
    username: { type: GraphQLString }
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
        username: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let user = new User({
          firstname: args.firstname,
          lastname: args.lastname,
          email: args.email,
          username: args.username
        });
        return user.save();
      }
    }
  }
});





//EXPORT SCHEMA

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations
});
