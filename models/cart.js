import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, default: 1 },
      price: { type: Number, required: true }
    }
  ]
});

export default Cart = mongoose.model('Cart', CartSchema);




