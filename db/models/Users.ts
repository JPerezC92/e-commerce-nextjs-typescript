import { model, models, Schema } from 'mongoose';

const usersSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  basketId: { type: String, required: true },
});

export default models.user || model('user', usersSchema);
