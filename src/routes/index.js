'use strict';

import compose from 'koa-compose';
import Router from 'koa-router';
import importDir from 'import-dir';
import { isAuthenticated } from '../auth';

const routerConfigs = [{ folder: 'api', prefix: '/api' }];
// 不登录可以访问的 path
const anonymousPath = ['auth'];
// 添加 resources routers
Router.prototype.resources = function(path, ctrl){
  return this.get(path, ctrl.go('index'))
  .get(`${path}/:id`, ctrl.go('show'))
  .put(`${path}/:id`, ctrl.go('update'))
  .post(path, ctrl.go('create'));
}
export default function routes() {
  const composed = routerConfigs.reduce((prev, curr) => {
    const routes = importDir('./' + curr.folder);
    const router = new Router({
      prefix: curr.prefix
    });

    Object.keys(routes).map(name => {
      if(anonymousPath.includes(name)){
        routes[name](router);
      }else{
        routes[name](router.use(isAuthenticated()));
      }
    });

    return [router.routes(), router.allowedMethods(), ...prev];
  }, []);

  return compose(composed);
}
