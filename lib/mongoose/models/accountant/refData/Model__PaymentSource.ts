import { Schema, model, models } from 'mongoose';
import { I_PaymentSource } from '@/interfaces/refdata';

const paymentSource__Schema = new Schema<I_PaymentSource>({
  paymentSourceName: {
    type: String,
    required: [true, 'Please add a paymentSource'],
    unique: true,
  },
});

export default models.paymentSource ||
  model('paymentSource', paymentSource__Schema);
