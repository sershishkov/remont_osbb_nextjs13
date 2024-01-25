import { Schema, model, models } from 'mongoose';
import { I_StoreHouse } from '@/interfaces/refdata';

const store_house__Schema = new Schema<I_StoreHouse>(
  {
    storeHouseName: {
      type: String,
      required: [true, 'Please add a storeHouseName'],
      unique: true,
    },
    address: {
      type: String,
      required: [true, 'Please add a storehouse name'],
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
        },
        priceInStore: {
          type: Number,
        },
      },
    ],
    responsiblePerson: {
      type: Schema.Types.ObjectId,
      ref: 'worker',
      required: [true, 'Please add a worker id'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

store_house__Schema.virtual('totalStoreSum').get(function () {
  let totalStoreSum = 0;

  this.products?.forEach((item) => {
    totalStoreSum += item.amount * item.priceInStore;
  });
  return totalStoreSum.toFixed(2);
});

export default models.store_house || model('store_house', store_house__Schema);
