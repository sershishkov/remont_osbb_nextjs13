import { Schema, model, models } from 'mongoose';
import { I_ContractType } from '@/interfaces/refdata';

const contractType__Schema = new Schema<I_ContractType>({
  contractTypeName: {
    type: String,
    required: [true, 'Please add a contractType'],
    unique: true,
  },
});

export default models.contractType ||
  model('contractType', contractType__Schema);
