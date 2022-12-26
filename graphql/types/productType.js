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
        priceName: {
            type: GraphQLString,
        }
    }
});

module.exports = productType;