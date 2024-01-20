import { Schema, model, models } from 'mongoose';
import { I_ProductType } from '@/interfaces/refdata';

const product_type__Schema = new Schema<I_ProductType>({
  productTypeName: {
    type: String,
    required: [true, 'Please add a product_type name'],
    unique: true,
  },
  //стройматериалы,инвентарь,инструмент, оборудование
});

export default models.product_type ||
  model('product_type', product_type__Schema);
