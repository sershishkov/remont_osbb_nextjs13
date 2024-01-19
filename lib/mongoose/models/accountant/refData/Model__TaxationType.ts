import { Schema, model, models } from 'mongoose';

const taxationType__Schema = new Schema({
  taxationTypeName: {
    type: String,
    required: [true, 'Please add a taxationType'],
    unique: true,
  },
});

export default models.taxationType ||
  model('taxationType', taxationType__Schema);
