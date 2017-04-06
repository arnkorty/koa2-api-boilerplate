import 'babel-polyfill';
import 'isomorphic-fetch';
import importDir from 'import-dir';
import mongoose  from 'mongoose-fill';
import { Schema } from '../utils';
import async     from 'async';
import { production, development }   from '../db/config';
console.log(production);
console.log(new Date());
const routes = importDir('./versions');
const uri = process.env.NODE_ENV == 'production' ? production : development;

mongoose.connect(uri);

import { Permission } from '../models/yy';

const VersionSchema = Schema({
  version: {
    type: String,
    required: true,
    unique: true,
    index: true
  }
})

const Version = mongoose.model('versions', VersionSchema);

const versions = importDir('./versions');
Object.keys(versions).map(version => {
  console.log(version);
  let record = Version.findOne({version}).then(record => {
    if(!record){
      console.log(`start ${version} migrate`);
      if(versions[version].up()){
        record = new Version({version: version})
        record.save(res => {
          console.log(`end  ${version} migrated`);
        })
      }else{
        console.log(`end  ${version} migrated fail`);
      }
    }
  })
})
