import { Schema, model, models } from 'mongoose';

import { I_Unit } from '@/interfaces/refdata';

const unit__Schema = new Schema<I_Unit>({
  unitName: {
    type: String,
    required: [true, 'Please add a unit name'],
    unique: true,
  },
});

export default models.unit || model('unit', unit__Schema);
