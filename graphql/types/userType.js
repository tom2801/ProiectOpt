const { 
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
} = require('graphql');


const userType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: {
            type: GraphQLID,
        },
        userName: {
            type: GraphQLString,
        },
        password: {
            type: GraphQLString,
        },
        wallet:{
            type: GraphQLInt
        }
    }
});

module.exports = userType;