import { Schema, model, models } from 'mongoose';
import { I_Client } from '@/interfaces/refdata';

const client__Schema = new Schema<I_Client>({
  clientLongName: {
    type: String,
    required: [true, 'Please add a clientLongName'],
    unique: true,
  },
  clientShortName: {
    type: String,
    required: [true, 'Please add a clientShortName'],
  },
  firmType: {
    type: Schema.Types.ObjectId,
    ref: 'firmType',
    required: [true, 'Please add a firmType id'],
  },

  postIndex: {
    type: String,
    required: [true, 'Please add a post index'],
    match: [/\b\d{5}\b/, 'Индекс может состоять только из 5 цифр'],
  },
  address: {
    type: String,
    required: [true, 'Please add an address'],
  },
  edrpou: {
    type: String,
  },
  inn: {
    type: String,
  },
  iban: {
    type: String,
  },
  iban_budget: {
    type: String,
  },

  passportNumber: {
    type: String,
  },
  firstName_imen: {
    type: String,
    required: [true, 'Please add a first name im'],
  },
  patronymic_imen: {
    type: String,
    required: [true, 'Please add a patronymic im'],
  },
  lastName_imen: {
    type: String,
    required: [true, 'Please add a last name im'],
  },

  firstName_rodit: {
    type: String,
    required: [true, 'Please add a first name rod'],
  },
  patronymic_rodit: {
    type: String,
    required: [true, 'Please add a patronymic rod'],
  },
  lastName_rodit: {
    type: String,
    required: [true, 'Please add a last name rod'],
  },

  certificateNumber: {
    type: String,
  },
  representedBy: {
    type: String,
  },
  whichActsOnTheBasis: {
    type: String,
  },
  jobTitle: {
    type: String,
  },
  jobTitle_rodit: {
    type: String,
  },
  tax: {
    type: Number,
    default: 0,
  },
  taxationType: {
    type: Schema.Types.ObjectId,
    ref: 'taxationType',
  },

  certificate_PDV: {
    type: String,
  },
  telNumber: {
    type: String,
    // required: [true, 'Please add a telNumber'],
  },
  email: {
    type: String,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Пожалуйста введите корректный email',
    ],
    // required: [true, 'Please add an email'],
  },
  clientType: {
    type: [Schema.Types.ObjectId],
    ref: 'clientType',
    required: [true, 'Please add a clientType id'],
  },
});

export default models.client || model('client', client__Schema);
