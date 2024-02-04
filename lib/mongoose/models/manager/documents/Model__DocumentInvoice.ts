import { Schema, model, models } from 'mongoose';
import { I_DocumentInvoice } from '@/interfaces/refdata';

const dokument_invoice__Schema = new Schema<I_DocumentInvoice>(
  {
    invoiceNumber: {
      type: String,
      required: [true, 'Please add a invoiceNumber'],
      unique: true,
    },
    invoiceDate: {
      type: Date,
      default: Date.now,
    },
    contract: {
      type: Schema.Types.ObjectId,
      ref: 'contract',
      required: [true, 'Please add a contract id'],
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
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'product',
          required: [true, 'Please add a product id'],
        },
        amount: {
          type: Number,
          required: [true, 'Please add a amount'],
        },
        price: {
          type: Number,
          required: [true, 'Please add a price'],
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
    typeInvoice: {
      type: String,
      enum: ['incoming', 'outgoing'],
      default: 'outgoing',
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    whoDeleted: {
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

dokument_invoice__Schema.virtual('totalSums').get(function () {
  let totalSumT = 0;
  this.thirdPartyServices.forEach((item) => {
    totalSumT += item.amount! * item.price!;
  });

  let totalSumS = 0;
  this.serviceWorks.forEach((item) => {
    totalSumS += item.amount! * item.price!;
  });

  let totalSumP = 0;
  this.products.forEach((item) => {
    totalSumP += item.amount * item.price;
  });
  return {
    totalThirdPartySum: totalSumT.toFixed(2),
    totalServiceWorkSum: totalSumS.toFixed(2),
    totalProductSum: totalSumP.toFixed(2),
    totalAktSum: (totalSumS + totalSumT + totalSumP).toFixed(2),
  };
});

export default models.dokument_akt ||
  model('dokument_invoice', dokument_invoice__Schema);
