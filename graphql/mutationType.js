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
const userType = require('./types/userType');
const orderType = require('./types/orderType')

const JWT_KEY = '1158659639IFIUHSDIUSDF';

const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        checkout:{
            type:orderType,
            resolve: async (root,args,context,info)=>{
                const payload=jwt.verify(context,JWT_KEY)
                const currentUser=await models.User.findByPk(payload.id)
                const lista=await currentUser.getCartItems();

                let produse=[]
                for (let i=0 ;i<lista.length;i++){
                const aux = await lista[i].getProduct()
                console.log('here');
                produse.push({
                    id:lista[i].id,
                    productId:aux.id,
                    productName: aux.productName,
                    quantity: lista[i].quantity,
                    price:parseInt(aux.price)*lista[i].quantity
                })
                }

                let total=0;
                let content=''
                console.log(produse.length);
                for (let i=0;i<produse.length;i++){
                    total=total+produse[i].price
                    content=content+produse[i].productName+'*'+produse[i].quantity+' '
                }
                
                if(currentUser.wallet-total<0){
                    return
                }

                await currentUser.update({
                    wallet:currentUser.wallet-total
                })

                const rez=await models.Order.create({
                    content:content,
                    price:total
                })

                await models.CartItem.destroy({
                    where:{
                        userId:payload.id
                    }
                })

                return rez

            }
        },
        addFunds:{
            type: userType,
            args:{
                funds:{
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve: async(root,args,context,info)=>{  // de dat undo la migrgations ca sa pun wallet in schema
                const payload=jwt.verify(context,JWT_KEY)
                const currentUser=await models.User.findByPk(payload.id)
                await currentUser.update({
                    wallet:currentUser.wallet+args.funds
                })
                return currentUser
            }
        },
        addToCart:{
            type: cartItemType,
            args:{
                idProdus:{
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve: async (root,args,context,info)=>{

                

                const payload=jwt.verify(context,JWT_KEY)

                const prev= await models.CartItem.findAll({where:{
                    productId:args.idProdus,
                    userId:payload.id
                }})
                if (prev.length!=0) {

                    await prev[0].update({
                        quantity:parseInt(prev[0].quantity)+1
                    })
                    await prev[0].save()

                    produsAsociat=await prev[0].getProduct();

                    return {
                        id:prev[0].id,
                        productId:prev[0].productId,
                        productName:produsAsociat.productName,
                        quantity:prev[0].quantity,
                        price:parseInt(prev[0].quantity)*parseInt(produsAsociat.price)
                    }
                }


                const produs= await models.Product.findByPk(args.idProdus)
                const utilizator =  await models.User.findByPk(payload.id)
                const insertie= await models.CartItem.create({
                    quantity:1,
                })
                await insertie.setUser(utilizator)
                await insertie.setProduct(produs)
                
                const  obiect= await insertie.getProduct()
                console.log(obiect.id);
                return { 
                    id:insertie.id,
                    productId:obiect.dataValues.id,
                    productName:obiect.dataValues.productName,
                    quantity:insertie.quantity,
                    price:obiect.price
                };
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