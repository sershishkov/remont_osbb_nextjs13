import { Schema, model, models } from 'mongoose';

const paymentSource__Schema = new Schema({
  paymentSourceName: {
    type: String,
    required: [true, 'Please add a paymentSource'],
    unique: true,
  },
});

export default models.paymentSource ||
  model('paymentSource', paymentSource__Schema);
