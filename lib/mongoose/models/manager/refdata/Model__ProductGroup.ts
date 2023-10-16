import { Schema, model, models } from 'mongoose';

const product_group__Schema = new Schema({
  productGroupName: {
    type: String,
    required: [true, 'Please add a product_group name'],
    unique: true,
  },
  //Трубы, канализация, сыпучие,металлопрокат,краска...
});

export default models.product_group ||
  model('product_group', product_group__Schema);
