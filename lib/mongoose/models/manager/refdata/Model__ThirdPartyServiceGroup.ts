import { Schema, model, models } from 'mongoose';

const thirdPartyServiceGroup__Schema = new Schema({
  thirdPartyServiceGroupName: {
    type: String,
    required: [true, 'Please add a thirdPartyServiceGroup name'],
    unique: true,
  },
});

export default models.thirdPartyServiceGroup ||
  model('thirdPartyServiceGroup', thirdPartyServiceGroup__Schema);
