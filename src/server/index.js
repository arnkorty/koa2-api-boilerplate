'use strict';
import 'babel-polyfill';
import 'isomorphic-fetch';

import Koa from 'koa';
import { connectDatabase, initPaginate } from './config';
import { development, test, production } from './config/db';

import middleware from './middleware';
import auth from './auth';
import routes from './routes';

const app = new Koa();
app.keys = ['0de8f81d649fcb963a46a3b44aca41b1b705884b'];

app.use(middleware());

//app.use(auth());
app.use(routes());

// app.use(ctx => ctx.status = 404);

const port = process.env.PORT || 4000;
const databaseConfig = (process.env.NODE_ENV == 'production' ) ? production : development;

(async() => {
  try {
    const info = await connectDatabase(databaseConfig);
    initPaginate();
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
  } catch (error) {
    console.error('Unable to connect to database');
  }

  await app.listen(port);
  console.log(`Server started on port ${port}`);
})();
