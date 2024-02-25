import { Schema, model, models } from 'mongoose';
import { I_DocumentAktOfWork } from '@/interfaces/refdata';

const dokument_akt__Schema = new Schema<I_DocumentAktOfWork>(
  {
    aktOfWorkNumber: {
      type: String,
      required: [true, 'Please add a aktOfWorkNumber'],
      unique: true,
    },
    aktOfWorkDate: {
      type: Date,
      default: Date.now,
    },
    contract: {
      type: Schema.Types.ObjectId,
      ref: 'contract',
      required: [true, 'Please add a contract id'],
    },
    aktOurFirm: {
      type: Schema.Types.ObjectId,
      ref: 'client',
      required: [true, 'Please add a aktOurFirm id'],
    },
    aktClient: {
      type: Schema.Types.ObjectId,
      ref: 'client',
      required: [true, 'Please add a aktClient id'],
    },

    thirdPartyServices: [
      {
        thirdPartyService: {
          type: Schema.Types.ObjectId,
          ref: 'thirdPartyService',
          required: [true, 'Please add a thirdPartyService id'],
        },
        amount: {
          type: Number,
          required: [true, 'Please add a amount'],
        },
        price: {
          type: Number,
          required: [true, 'Please add a price'],
        },
        extraInformation: {
          type: String,
        },
      },
    ],
    serviceWorks: [
      {
        serviceWork: {
          type: Schema.Types.ObjectId,
          ref: 'serviceWork',
          required: [true, 'Please add a serviceWork id'],
        },
        amount: {
          type: Number,
          required: [true, 'Please add a amount'],
        },
        price: {
          type: Number,
          required: [true, 'Please add a price'],
        },
        extraInformation: {
          type: String,
        },
      },
    ],

    isActive: {
      type: Boolean,
      default: false,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    typeAkt: {
      type: String,
      enum: ['incoming', 'outgoing'],
      default: 'outgoing',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

dokument_akt__Schema.virtual('totalSums').get(function () {
  let totalSumT = 0;
  this.thirdPartyServices.forEach((item) => {
    totalSumT += item.amount! * item.price!;
  });

  let totalSumS = 0;
  this.serviceWorks.forEach((item) => {
    totalSumS += item.amount! * item.price!;
  });
  return {
    totalThirdPartySum: totalSumT.toFixed(2),
    totalServiceWorkSum: totalSumS.toFixed(2),
    totalAktSum: (totalSumS + totalSumT).toFixed(2),
  };
});

export default models.dokument_akt ||
  model('dokument_akt', dokument_akt__Schema);
