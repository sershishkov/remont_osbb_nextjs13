import { Schema, model, models } from 'mongoose';
import { I_WorkerProfession } from '@/interfaces/refdata';

const workerProfession__Schema = new Schema<I_WorkerProfession>({
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
