'use strict';

import mongoose from 'mongoose-fill';
import async    from 'async';
import { encryptPassword, comparePassword, Schema, Types} from '../utils';

const UserSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
    unique: true,
    index: true,
  },
  code: {
    type: String,
    index: true
  },
  departentId: Types.ObjectId,
  encrypt_password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

UserSchema.virtual('password');

UserSchema.methods.validPassword = function(password){
  return comparePassword(password, this.encrypt_password);
}


const User = mongoose.model('employees', UserSchema);
export default User;
