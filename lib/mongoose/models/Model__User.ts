import { Schema, model, models } from 'mongoose';
import bcrypt from 'bcryptjs';

import { I_User } from '@/interfaces/refdata';

const user__Schema = new Schema<I_User>(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: [
        'user',
        'client',
        'worker',
        'manager',
        'boss',
        'accountant',
        'admin',
      ],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

//Encrypt password using bcrypt
user__Schema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password!, salt);
  next();
});

//Match user entered password to hashed password in database
user__Schema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default models.user || model('user', user__Schema);
