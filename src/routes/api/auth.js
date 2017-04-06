'use strict';

import {
  generateToken,
} from '../../auth';

import { register, login } from '../../controllers/auth';

export default (router) => {
  router
    .post('/auth/register',
      register,
      generateToken(),
  );

  router
    .post('/auth/login',
      login,
      generateToken()
  );
};
