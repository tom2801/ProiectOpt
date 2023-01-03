'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.CartItem.belongsTo(models.User,{foreignKey: 'userId'})
      models.CartItem.belongsTo(models.Product,{foreignKey: 'productId'})
    }
  }
  CartItem.init({
    quantity: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CartItem',
  });
  return CartItem;
};