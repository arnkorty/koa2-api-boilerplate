'user strict';

import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import GlobalError from './global';

const saltRound = 10;

export function encryptPassword(password){
  let salt = bcrypt.genSaltSync(saltRound);
  return bcrypt.hashSync(password, salt);
}
export function comparePassword(passwdPlain, passwdHash){
  return bcrypt.compareSync(passwdPlain, passwdHash);
}
export function Schema(cols, opts = {}){
  const _schema = new mongoose.Schema(cols, {
    ...opts,
    timestamps: true
  });
  _schema.plugin(function(schema){
    schema.statics.paginate = function(query, options, callback){
      if(options){
        for(let key of Object.keys(options)){
          options[key] = parseInt(options[key]);
        }
      }
      if(!options.page || options.page < 1) options.page = 1;
      if(!options.limit) options.limit = 50;
      return mongoosePaginate.paginate.call(this, query, options, callback);
    }
  });
  return _schema;
}
export const Types = mongoose.Schema.Types;
export const Render = {
  success: function(ctx, obj, attrs = []){
    ctx.body = {
      code: 0,
    };
    if(attrs.length > 0){
      ctx.body.data = {};
      for(let attr of attrs){
        ctx.body.data[attr] = obj[attr];
      }
    }else{
      ctx.body.data = obj;
    }
  },
  renderError(ctx, errCode, msg = null){
    ctx.body = {
      code: errCode,
      msg: msg || GlobalError[errCode] || "请求异常"
    }
  }
}
