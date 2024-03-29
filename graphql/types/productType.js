const { 
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
} = require('graphql');


const productType = new GraphQLObjectType({
    name: 'Product',
    fields: {
        id: {
            type: GraphQLID,
        },
        productName: {
            type: GraphQLString,
        },
        price: {
            type: GraphQLString,
        }
    }
});

module.exports = productType;