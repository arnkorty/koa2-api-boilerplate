'use strict';

import compose from 'koa-compose';
import convert from 'koa-convert';
import logger from 'koa-logger';
import cors from 'koa-cors';
import bodyParser from 'koa-bodyparser';
import auth from '../auth';
import passport from 'koa-passport';

//import session from 'koa-generic-session';
const _uploadDir = "./uploader";

export default function middleware() {
  return compose([
    logger(),
    convert(cors()),
    convert(bodyParser()),
    auth(),
  ]);
}
