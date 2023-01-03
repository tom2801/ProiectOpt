const { 
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    graphql,
} = require('graphql');


const cartItemType = new GraphQLObjectType({
    name: 'CartItem',
    fields: {
        id: {
            type: GraphQLID,
        },
        productId: {
            type: GraphQLString,
        },
        productName: {
            type: GraphQLString
        },
        quantity: {
            type: GraphQLString,
        }
    }
});

module.exports = cartItemType;