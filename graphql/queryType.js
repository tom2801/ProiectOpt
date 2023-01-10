const { 
    GraphQLObjectType,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString
} = require('graphql');

const models = require('../models');
const jwt = require('jsonwebtoken');

const userType = require('./types/userType');
const productType = require('./types/productType');
const cartItemType= require('./types/cartItemType');

const JWT_KEY = '1158659639IFIUHSDIUSDF';

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
      users: {
        type: new GraphQLList(userType),
        resolve: () => {
          return models.User.findAll();
        }
      },
      products:{
        type: new GraphQLList(productType),
        resolve: () => {
          return models.Product.findAll();
        }
      },
      user:{
        type: userType,
        resolve: (root, args, context, info) => {
          payload=jwt.verify(context,JWT_KEY)
          return models.User.findByPk(payload.id)
        }

      },
      cart:{
        type: new GraphQLList(cartItemType),
        resolve :async (root, args, context, info)=>{

           
            const  payload=jwt.verify(context,JWT_KEY)
            const currentUser=await models.User.findByPk(payload.id)
            const lista= await currentUser.getCartItems();
  
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
             
            return produse
         
  
        }
      }
    }
  }

    
);


module.exports= queryType;    