import { Schema, model, models } from 'mongoose';

const worker__Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Please add an userID'],
    unique: true,
  },
  firstName: {
    type: String,
    required: [true, 'Please add a firstName'],
  },
  patronymic: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Please add a firstName'],
  },
  workerProfessions: {
    type: [Schema.Types.ObjectId],
    ref: 'workerProfession',
    required: [true, 'Please add a workerProfessions id'],
  },

  passportSeries: {
    type: String,
  },
  passportNumber: {
    type: String,
  },
  representedBy: {
    type: String,
  },
  whenIssued: {
    type: Date,
  },
  inn: {
    type: String,
    // match: [/\b\d{10}\b/, 'Пожалуйста введите 10 цифр'],
  },
  birthDay: {
    type: Date,
  },
  telNumber: {
    type: String,
  },
  address: {
    type: String,
  },
});

export default models.worker || model('worker', worker__Schema);
