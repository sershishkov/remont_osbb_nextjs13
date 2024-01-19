import { Schema, model, models } from 'mongoose';

const contractType__Schema = new Schema({
  contractTypeName: {
    type: String,
    required: [true, 'Please add a contractType'],
    unique: true,
  },
});

export default models.contractType ||
  model('contractType', contractType__Schema);
