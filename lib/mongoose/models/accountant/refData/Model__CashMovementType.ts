import { Schema, model, models } from 'mongoose';
import { I_CashMovementType } from '@/interfaces/refdata';

const cach_movement_type__Schema = new Schema<I_CashMovementType>({
  cashMovementTypeName: {
    type: String,
    required: [true, 'Please add a cashMovementTypeName'],
    unique: true,
  },
  incomeOrExpense: {
    type: String,
    enum: ['income', 'expense'],
  },
});

export default models.cach_movement_type ||
  model('cach_movement_type', cach_movement_type__Schema);
