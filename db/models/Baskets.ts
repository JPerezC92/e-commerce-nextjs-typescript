import { model, models, Schema } from 'mongoose';

const BasketItemSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  mediaUrl: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const basket = new Schema({
  items: [BasketItemSchema],
});

export default models.basket || model('basket', basket);
