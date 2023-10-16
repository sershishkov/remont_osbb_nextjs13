import { Schema, model, models } from 'mongoose';

const product_type__Schema = new Schema({
  productTypeName: {
    type: String,
    required: [true, 'Please add a product_type name'],
    unique: true,
  },
  //стройматериалы,инвентарь,инструмент, оборудование
});

export default models.product_type ||
  model('product_type', product_type__Schema);
