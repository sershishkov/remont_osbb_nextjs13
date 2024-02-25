import { Schema, model, models } from 'mongoose';
import { I_DocumentNakladnaya } from '@/interfaces/refdata';

const dokument_nakladnaya__Schema = new Schema<I_DocumentNakladnaya>(
  {
    nakladnayaNumber: {
      type: String,
      required: [true, 'Please add a nakladnayaNumber'],
      unique: true,
    },
    nakladnayaDate: {
      type: Date,
      default: Date.now,
    },
    contract: {
      type: Schema.Types.ObjectId,
      ref: 'contract',
      required: [true, 'Please add a contract id'],
    },
    naklOurFirm: {
      type: Schema.Types.ObjectId,
      ref: 'client',
      required: [true, 'Please add a aktOurFirm id'],
    },
    naklClient: {
      type: Schema.Types.ObjectId,
      ref: 'client',
      required: [true, 'Please add a aktClient id'],
    },
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
        extraInformation: {
          type: String,
        },
      },
    ],
    storeHouse: {
      type: Schema.Types.ObjectId,
      ref: 'store_house',
      required: [true, 'Please add a store_house id'],
    },

    isActive: {
      type: Boolean,
      default: false,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      // required: [true, 'Please add a worker id'],
    },
    typeNakl: {
      type: String,
      enum: ['incoming', 'outgoing', 'returnFromBuyer', 'returnToSupplier'],
      default: 'outgoing',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

dokument_nakladnaya__Schema.virtual('totalNaklSum').get(function () {
  let totalNaklSumSell = 0;
  this.products.forEach((item) => {
    totalNaklSumSell += item.amount * item.price;
  });
  return totalNaklSumSell.toFixed(2);
});

export default models.dokument_nakladnaya ||
  model('dokument_nakladnaya', dokument_nakladnaya__Schema);
