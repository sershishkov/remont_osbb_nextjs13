import { Schema, model, models } from 'mongoose';
import { I_CashFlow } from '@/interfaces/refdata';

const cash_flow__Schema = new Schema<I_CashFlow>(
  {
    cashFlowDate: {
      type: Date,
      default: Date.now,
    },
    cashFlowSum: {
      type: Number,
    },
    cashMovementType: {
      type: Schema.Types.ObjectId,
      ref: 'cach_movement_type',
      required: [true, 'Please add a cashMovementType id'],
    },
    contract: {
      type: Schema.Types.ObjectId,
      ref: 'contract',
    },
    responsiblePerson: {
      type: Schema.Types.ObjectId,
      ref: 'worker',
    },

    additionalInformation: {
      type: String,
    },

    creator: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Please add an creatorID'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export default models.cash_flow || model('cash_flow', cash_flow__Schema);
