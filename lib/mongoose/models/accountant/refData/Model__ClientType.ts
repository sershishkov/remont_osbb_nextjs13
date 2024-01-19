import { Schema, model, models } from 'mongoose';

const clientType__Schema = new Schema({
  clientTypeName: {
    type: String,
    required: [true, 'Please add a clientType'],
    unique: true,
  },
});

export default models.clientType || model('clientType', clientType__Schema);
