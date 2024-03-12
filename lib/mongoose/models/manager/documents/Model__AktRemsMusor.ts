import { Schema, model, models } from 'mongoose';
import { I_AktRemsMusor } from '@/interfaces/refdata';

const akt_rems_musor__Schema = new Schema<I_AktRemsMusor>(
  {
    aktRemsMusorNumber: {
      type: String,
      required: [true, 'Please add a aktRemsMusorNumber'],
    },

    aktRemsMusorDate: {
      type: Date,
      default: Date.now,
    },
    contract: {
      type: Schema.Types.ObjectId,
      ref: 'contract',
      required: [true, 'Please add a contract id'],
    },

    executorFirm: {
      type: Schema.Types.ObjectId,
      ref: 'client',
      required: [true, 'Please add a executorFirm id'],
    },

    clientFirm: {
      type: Schema.Types.ObjectId,
      ref: 'client',
      required: [true, 'Please add a clientFirm id'],
    },
    ourFirm: {
      type: Schema.Types.ObjectId,
      ref: 'client',
      required: [true, 'Please add a clientFirm id'],
    },

    totalAktRemsMusorToShow: {
      type: Number,
    },
    serviceWorks: [
      {
        serviceWork: {
          type: Schema.Types.ObjectId,
          ref: 'serviceWork',
          required: [true, 'Please add a serviceWork id'],
        },
        extraInformation: {
          type: String,
        },
        amount: {
          type: Number,
          required: [true, 'Please add a amount'],
        },
        price: {
          type: Number,
          required: [true, 'Please add a price'],
        },
        rowSum: {
          type: Number,
          required: [true, 'Please add a rowSum'],
        },
      },
    ],

    creator: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

akt_rems_musor__Schema.virtual('totalAktRemsMusorSum').get(function () {
  let totalAktRemsMusorSum = 0;
  this.serviceWorks.forEach((item) => {
    totalAktRemsMusorSum += item.rowSum;
  });
  return totalAktRemsMusorSum.toFixed(2);
});

export default models.akt_rems_musor ||
  model('akt_rems_musor', akt_rems_musor__Schema);
