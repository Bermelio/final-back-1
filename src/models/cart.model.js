import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      quantity: Number
    }
  ]
});

cartSchema.plugin(mongoosePaginate);

const CartModel = mongoose.model('Cart', cartSchema);
export default CartModel;
