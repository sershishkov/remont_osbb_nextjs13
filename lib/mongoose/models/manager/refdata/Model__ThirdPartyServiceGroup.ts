import { Schema, model, models } from 'mongoose';
import { I_ThirdPartyServiceGroup } from '@/interfaces/refdata';

const thirdPartyServiceGroup__Schema = new Schema<I_ThirdPartyServiceGroup>({
  thirdPartyServiceGroupName: {
    type: String,
    required: [true, 'Please add a thirdPartyServiceGroup name'],
    unique: true,
  },
});

export default models.thirdPartyServiceGroup ||
  model('thirdPartyServiceGroup', thirdPartyServiceGroup__Schema);
