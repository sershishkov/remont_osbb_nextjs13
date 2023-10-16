import { Schema, model, models } from 'mongoose';

const unit__Schema = new Schema({
  unitName: {
    type: String,
    required: [true, 'Please add a unit name'],
    unique: true,
  },
});

export default models.unit || model('unit', unit__Schema);
