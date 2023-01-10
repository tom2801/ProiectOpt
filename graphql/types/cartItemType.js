const { 
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    graphql,
    GraphQLInt,
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
        },
        price:{
            type:GraphQLInt
        }
    }
});

module.exports = cartItemType;