import { Schema, model, models } from 'mongoose';
import { I_TaxationType } from '@/interfaces/refdata';

const taxationType__Schema = new Schema<I_TaxationType>({
  taxationTypeName: {
    type: String,
    required: [true, 'Please add a taxationType'],
    unique: true,
  },
});

export default models.taxationType ||
  model('taxationType', taxationType__Schema);
