import  User from '../models/user';
import { BaseCtrl } from './base';

export class UserCtrl extends BaseCtrl {
  async me(){
    const user = await User.findById(this.ctx.passport.user);
    if (user) this.renderSuccess(user);
}

 async index(){
  let { page } = this.ctx.query;
  const res = await User.paginate({}, {page: page});
  this.renderSuccess(res);
}

 async show(){
  let {id} = this.ctx.request.body;
  let user = await User.findById(id);
}

 async update(){

}

 async create(){
}
}
