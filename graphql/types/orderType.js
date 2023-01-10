const { 
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    graphql,
    GraphQLInt,
} = require('graphql');


const orderType = new GraphQLObjectType({
    name: 'Order',
    fields: {
        productNNames:{
            type:GraphQLString
        },
        price:{
            type:GraphQLInt
        }
    }
});

module.exports = orderType;