const { 
    GraphQLObjectType,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

const models = require('../models');

const userType = require('./types/userType');
const productType = require('./types/productType');


const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
      users: {
        type: new GraphQLList(userType),
        resolve: () => {
          return models.User.findAll();
        }
      }
    }}
    );


module.exports= queryType;    