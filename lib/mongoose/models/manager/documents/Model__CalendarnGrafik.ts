import { Schema, model, models } from 'mongoose';
import { I_CalendarnGrafik } from '@/interfaces/refdata';

const calendarn_grafik__Schema = new Schema<I_CalendarnGrafik>({
  contract: {
    type: Schema.Types.ObjectId,
    ref: 'contract',
    required: [true, 'Please add a contract id'],
  },

  serviceWorks: [
    {
      serviceWork: {
        type: String,
        required: [true, 'Please add a serviceWork'],
      },
      unit: {
        type: String,
        required: [true, 'Please add a unit'],
      },
      amount: {
        type: String,
        required: [true, 'Please add a amount'],
      },
    },
  ],
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
});

export default models.calendarn_grafik ||
  model('calendarn_grafik', calendarn_grafik__Schema);
