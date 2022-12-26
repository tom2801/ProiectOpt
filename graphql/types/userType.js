const { 
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
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
        }
    }
});

module.exports = userType;