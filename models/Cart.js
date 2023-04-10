const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ]
});

const Cart = mongoose.model('Cart', cartSchema);

Cart.addItem = async function(item) {
  const cart = await this.getCart();
  const existingItemIndex = cart.items.findIndex(i => i.product._id.equals(item.product._id));
  if (existingItemIndex !== -1) {
    cart.items[existingItemIndex].quantity += item.quantity;
  } else {
    cart.items.push(item);
  }
  await cart.save();
};

Cart.getCart = async function() {
  let cart = await this.findOne();
  if (!cart) {
    cart = await this.create({});
  }
  return cart;
};

Cart.clearCart = async function() {
  await this.deleteOne();
};

module.exports = Cart;
