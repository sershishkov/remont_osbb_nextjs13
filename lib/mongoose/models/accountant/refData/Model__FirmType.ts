import { Schema, model, models } from 'mongoose';

const firmType__Schema = new Schema({
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
