import { Schema, model, models } from 'mongoose';
import { I_ServiceWork } from '@/interfaces/refdata';

const serviceWork__Schema = new Schema<I_ServiceWork>({
  serviceWorkName: {
    type: String,
    required: [true, 'Please add a serviceWork name'],
    unique: true,
  },
  description: {
    type: String,
    default: 'Пока нет описания',
  },
  unit: {
    type: Schema.Types.ObjectId,
    ref: 'unit',
    required: [true, 'Please add a unit id'],
  },
  serviceWorkGroup: {
    type: [Schema.Types.ObjectId],
    ref: 'serviceWorkGroup',
    required: [true, 'Please add a group_work id'],
  },
  priceWorkerRecommend: {
    type: Number,
    required: [true, 'Please add a priceWorker'],
  },
  priceClientRecommend: {
    type: Number,
  },
  products: {
    type: [Schema.Types.ObjectId],
    ref: 'product',
  },
  inventars: {
    type: [Schema.Types.ObjectId],
    ref: 'product',
  },
  tools: {
    type: [Schema.Types.ObjectId],
    ref: 'product',
  },
  equipment: {
    type: [Schema.Types.ObjectId],
    ref: 'product',
  },
  workerProtection: {
    type: [Schema.Types.ObjectId],
    ref: 'product',
  },
});

export default models.serviceWork || model('serviceWork', serviceWork__Schema);
