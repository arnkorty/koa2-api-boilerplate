'use strict';

import { UserCtrl }  from '../../controllers/user';

export default (router) => {
  router
    .get('/current_user', UserCtrl.go('me'))
    .resources('/users', UserCtrl);
};
