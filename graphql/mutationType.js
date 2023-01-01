const { 
    GraphQLObjectType,
    GraphQLID,
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt
} = require('graphql');

const models = require('../models');

const jwt = require('jsonwebtoken');

const userSessionType = require('./types/userSessionType');
const cartItemType = require('./types/cartItemType');

const JWT_KEY = '1158659639IFIUHSDIUSDF';

const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addToCart:{
            type: cartItemType,
            args:{
                idProdus:{
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve: async (root,args,context,info)=>{
                payload=jwt.verify(context,JWT_KEY)
                const produs= await models.Product.findByPk(args.idProdus)
                const utilizator =  await models.User.findByPk(payload.id)
                const insertie= await models.CartItem.create({
                    quantity:1,
                })
                await insertie.setUser(utilizator)
                await insertie.setProduct(produs)
                obiect= await insertie.getProduct()
                return { 
                    productId:obiect.dataValues.id};
            }
        },
        login: {
            type: userSessionType,
            args: {
                username: {
                    type: new GraphQLNonNull(GraphQLString),
                },
                password: {
                    type: new GraphQLNonNull(GraphQLString),
                },
            },
            resolve: async (source, args) => {
                const {
                    username,
                    password
                } = args;

                const rez=await models.User.findAll({
                    where:{
                        userName:username,
                        password:password
                    }
                })

                if(rez[0]){
                    token=jwt.sign(rez[0].dataValues,JWT_KEY);
                    return{
                        token:token
                    }
                }
                return {
                    token: null,
                };
            }
        }
    }
});

module.exports = mutationType;