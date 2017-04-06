import { ERROR, OK } from '../consts';
import  User   from '../models/user';
import { encryptPassword } from '../utils';


export async function register(ctx, next) {
  const { email, password , name} = ctx.request.body;
  if (email && password) {
    let user = await User.findOne({email});
    let encrypt_password = encryptPassword(password);
    if (!user) {
      user = new User({
        name,
        email,
        encrypt_password
      });

      await user.save();

      ctx.passport = {
        user: user._id,
      };

      await next();

    } else {
      ctx.status = 400;
      ctx.body = { status: 'error', message: 'E-mail already registered'};
    }
  } else {
    ctx.status = 400;
    ctx.body = { status: 'error', message: 'Invalid email or password'};
  }
}

export async function login(ctx, next){
  const { email, password } = ctx.request.body;
  if( email && password){
    let user = await User.findOne({ email })
    if(user && user.validPassword(password)){
      ctx.passport = {
        user: user._id
      }
      await next();
    }else{
      ctx.status = 400;
      ctx.body = {code: 1, err: "messg"};
    }
  }else{
    ctx.status = 400;
    ctx.body = {code: 1, err: "messg"};
  }
}
