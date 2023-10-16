import { Schema, model, models } from 'mongoose';

const workerProfession__Schema = new Schema({
  workerProfessionName: {
    type: String,
    required: [true, 'Please add a workerProfession'],
    unique: true,
  },
  description: {
    type: String,
    default: 'Пока нет описания',
  },
});

export default models.workerProfession ||
  model('workerProfession', workerProfession__Schema);
