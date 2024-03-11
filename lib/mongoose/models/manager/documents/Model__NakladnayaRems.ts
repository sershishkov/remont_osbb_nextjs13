import { Schema, model, models } from 'mongoose';
import { I_NakladnayaRems } from '@/interfaces/refdata';

const nakladnaya_rems__Schema = new Schema<I_NakladnayaRems>(
  {
    nakladnayaRemsNumber1: {
      type: String,
      required: [true, 'Please add a nakladnayaRemsNumber1'],
    },
    nakladnayaRemsNumber2: {
      type: String,
      required: [true, 'Please add a nakladnayaRemsNumber2'],
    },
    nakladnayaRemsNumber3: {
      type: String,
      required: [true, 'Please add a nakladnayaRemsNumber3'],
    },
    nakladnayaRemsDate: {
      type: Date,
      default: Date.now,
    },
    contract: {
      type: Schema.Types.ObjectId,
      ref: 'contract',
      required: [true, 'Please add a contract id'],
    },

    executorFirm1: {
      type: Schema.Types.ObjectId,
      ref: 'client',
      required: [true, 'Please add a executorFirm1 id'],
    },
    executorFirm2: {
      type: Schema.Types.ObjectId,
      ref: 'client',
      required: [true, 'Please add a executorFirm2 id'],
    },
    executorFirm3: {
      type: Schema.Types.ObjectId,
      ref: 'client',
      required: [true, 'Please add a executorFirm3 id'],
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
    percent2: {
      type: Number,
      default: 5.1,
    },
    percent3: {
      type: Number,
      default: 9.8,
    },
    totalRemsNaklSumToShow: {
      type: Number,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'product',
          required: [true, 'Please add a product id'],
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

nakladnaya_rems__Schema.virtual('totalRemsNaklSum').get(function () {
  let totalNaklSumSell = 0;
  this.products.forEach((item) => {
    totalNaklSumSell += item.rowSum;
  });
  return totalNaklSumSell.toFixed(2);
});

export default models.nakladnaya_rems ||
  model('nakladnaya_rems', nakladnaya_rems__Schema);
