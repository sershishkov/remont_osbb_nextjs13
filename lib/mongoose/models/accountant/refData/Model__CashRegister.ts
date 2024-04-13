import { Schema, model, models } from 'mongoose';
import { I_CashRegister } from '@/interfaces/refdata';

const cash_register__Schema = new Schema<I_CashRegister>({
  cashRegisterName: {
    type: String,
    unique: true,
    required: [true, 'Please add a cashRegisterName'],
  },

  allowedWorkers: {
    type: [Schema.Types.ObjectId],
    ref: 'worker',
    required: [true, 'Please add a allowedWorkers id'],
  },
});

export default models.cash_register ||
  model('cash_register', cash_register__Schema);
