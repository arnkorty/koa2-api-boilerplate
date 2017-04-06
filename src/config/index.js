'use strict';

import mongoose from 'mongoose';

export function connectDatabase(uri) {
  mongoose.Promise = global.Promise;
  return new Promise((resolve, reject) => {
    mongoose.connection
      .on('error', error => reject(error))
      .on('close', () => console.log('Database connection closed.'))
      .once('open', () => resolve(mongoose.connections[0]));
    mongoose.connect(uri);
  });
}
export initPaginate from './init_paginate';
