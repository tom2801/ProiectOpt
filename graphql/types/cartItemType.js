const { 
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
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
        quantity: {
            type: GraphQLString,
        }
    }
});

module.exports = cartItemType;