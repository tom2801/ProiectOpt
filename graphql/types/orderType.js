const { 
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    graphql,
    GraphQLInt,
    GraphQLNonNull,
} = require('graphql');


const orderType = new GraphQLObjectType({
    name: 'Order',
    fields: {
        id:{
            type: new GraphQLNonNull(GraphQLInt)
        },
        content:{
            type:GraphQLString
        },
        price:{
            type:GraphQLInt
        }
    }
});

module.exports = orderType;