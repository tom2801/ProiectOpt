const { 
    GraphQLObjectType,
    GraphQLString,
} = require('graphql');


const userSessionType = new GraphQLObjectType({
    name: 'UserSession',
    fields: {
        token: {
            type: GraphQLString,
        }
    }
});

module.exports = userSessionType;