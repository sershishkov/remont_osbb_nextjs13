import { Schema, model, models } from 'mongoose';

const serviceWorkGroup__Schema = new Schema({
  serviceWorkGroupName: {
    type: String,
    required: [true, 'Please add a serviceWorkGroup name'],
    unique: true,
  },
});

export default models.serviceWorkGroup ||
  model('serviceWorkGroup', serviceWorkGroup__Schema);
