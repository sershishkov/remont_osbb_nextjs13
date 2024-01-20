import { Schema, model, models } from 'mongoose';
import { I_Product } from '@/interfaces/refdata';

const product__Schema = new Schema<I_Product>({
  productName: {
    type: String,
    required: [true, 'Please add a product name'],
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
  productGroup: {
    type: [Schema.Types.ObjectId],
    ref: 'product_group',
    required: [true, 'Please add a product_group id'],
  },

  productType: {
    type: Schema.Types.ObjectId,
    ref: 'product_type',
    required: [true, 'Please add a product_type id'],
  },
  priceBuyRecommend: {
    type: Number,
    default: 1,
  },
  normPerOne: {
    type: Number,
    default: 1,
  },
  amountInPackage: {
    type: Number,
    default: 1,
  },
  weight: {
    type: Number,
    default: 0,
  },
  height: {
    type: Number,
    default: 0,
  },
  width: {
    type: Number,
    default: 0,
  },
  length: {
    type: Number,
    default: 0,
  },
  paintingArea: {
    type: Number,
    default: 0,
  },
});

export default models.product || model('product', product__Schema);
