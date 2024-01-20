import { Schema, model, models } from 'mongoose';
import { I_Contract } from '@/interfaces/refdata';

const contract__Schema = new Schema<I_Contract>({
  contractNumber: {
    type: String,
    required: [true, 'Please add a contractNumber'],
    unique: true,
  },
  ourFirm: {
    type: Schema.Types.ObjectId,
    ref: 'client',
    required: [true, 'Please add a ourFirm id'],
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'client',
    required: [true, 'Please add a client id'],
  },
  contractDate: {
    type: Date,
    default: Date.now,
  },
  contractDescription: {
    type: String,
    required: [true, 'Please add a contractDescription'],
  },
  workAddress: {
    type: String,
    required: [true, 'Please add a workAddress'],
  },
  contractType: {
    type: Schema.Types.ObjectId,
    ref: 'contractType',
    required: [true, 'Please add a contractType id'],
  },
  paymentSource: {
    type: Schema.Types.ObjectId,
    ref: 'paymentSource',
    required: [true, 'Please add a paymentSource id'],
  },
});

export default models.contract || model('contract', contract__Schema);
