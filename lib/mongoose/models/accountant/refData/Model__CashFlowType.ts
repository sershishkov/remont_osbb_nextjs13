import { Schema, model, models } from 'mongoose';
import { I_CashFlowType } from '@/interfaces/refdata';

const cash_flow_type__Schema = new Schema<I_CashFlowType>({
  cashFlowTypeName: {
    type: String,
    required: [true, 'Please add a cashFlowTypeName'],
    unique: true,
  },
  incomeOrExpense: {
    type: String,
    enum: ['income', 'expense'],
    required: [true, 'Please add a incomeOrExpense'],
  },
});

export default models.cash_flow_type ||
  model('cash_flow_type', cash_flow_type__Schema);
