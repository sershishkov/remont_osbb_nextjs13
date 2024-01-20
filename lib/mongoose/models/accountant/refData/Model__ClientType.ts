import { Schema, model, models } from 'mongoose';
import { I_ClientType } from '@/interfaces/refdata';

const clientType__Schema = new Schema<I_ClientType>({
  clientTypeName: {
    type: String,
    required: [true, 'Please add a clientType'],
    unique: true,
  },
});

export default models.clientType || model('clientType', clientType__Schema);
