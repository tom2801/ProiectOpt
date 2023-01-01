const { 
    GraphQLObjectType,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString
} = require('graphql');

const models = require('../models');
const jwt = require('jsonwebtoken');
const userType = require('./types/userType');
const productType = require('./types/productType');

const JWT_KEY = '1158659639IFIUHSDIUSDF';

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
      users: {
        type: new GraphQLList(userType),
        resolve: () => {
          return models.User.findAll();
        }
      },
      products:{
        type: new GraphQLList(productType),
        resolve: () => {
          return models.Product.findAll();
        }
      },
      user:{
        type: userType,
        resolve: (root, args, context, info) => {
          payload=jwt.verify(context,JWT_KEY)
          return models.User.findByPk(payload.id)
        }

      }
    }}
    );


module.exports= queryType;    