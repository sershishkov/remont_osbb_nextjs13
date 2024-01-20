import { Schema, model, models } from 'mongoose';
import { I_FirmType } from '@/interfaces/refdata';

const firmType__Schema = new Schema<I_FirmType>({
  firmTypeLongName: {
    type: String,
    required: [true, 'Please add a firmTypeLong'],
    unique: true,
  },
  firmTypeShortName: {
    type: String,
    required: [true, 'Please add a firmType'],
  },
});

export default models.firmType || model('firmType', firmType__Schema);
