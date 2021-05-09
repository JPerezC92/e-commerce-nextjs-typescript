import { model, models, Schema } from 'mongoose';

const productsSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  mediaUrl: { type: String, required: true },
  rating: { type: Number, required: true },
});

export default models.product || model('product', productsSchema);
