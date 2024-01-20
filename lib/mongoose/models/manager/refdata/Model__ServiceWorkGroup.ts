import { Schema, model, models } from 'mongoose';
import { I_ServiceWorkGroup } from '@/interfaces/refdata';

const serviceWorkGroup__Schema = new Schema<I_ServiceWorkGroup>({
  serviceWorkGroupName: {
    type: String,
    required: [true, 'Please add a serviceWorkGroup name'],
    unique: true,
  },
});

export default models.serviceWorkGroup ||
  model('serviceWorkGroup', serviceWorkGroup__Schema);
