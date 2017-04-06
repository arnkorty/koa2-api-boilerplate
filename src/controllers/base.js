
import path from 'path';
import { Render } from '../utils';

export class BaseCtrl{
  constructor(ctx){
    this.ctx = ctx;
    // this.current_user = ctx.passport.user;
    // this.controller_name = this.constructor.name;
  }
  currentUser(){
    return this.ctx.passport.user;
  }

  renderSuccess(obj, attrs = []){
    Render.success(this.ctx, obj, attrs);
  }

  renderError(errCode, msg){
    Render.renderError(this.ctx, errCode, msg);
  }

  async run(name){
    let time = new Date();
    console.log(`${this.constructor.name}#${name} => ${time.getYear()%100}-${time.getMonth()+1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}.${time.getMilliseconds()}  ` + this.ctx.request.ip);
    if(this.ctx.request.body && Object.keys(this.ctx.request.body).length > 0){
      // console.log(ctx.request.body);
      console.log(`    ${JSON.stringify(this.ctx.request.body)}`);
    }
    // check auth action name
    // this.check(name)
    await this[name]();
  }

  static go(name){
    let that = this;
    // let run  = new that(name);
    return async (ctx) => {
      await (new that(ctx)).run(name);
    }
  }
}
