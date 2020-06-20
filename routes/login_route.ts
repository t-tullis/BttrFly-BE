import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import { Router } from "https://deno.land/x/oak@v5.2.0/mod.ts";
import { connect } from '../db.ts';
import { Users } from '../models/users.ts'

connect();

const router = new Router();

router.post('/user/login', async (ctx) => {
    const body = await ctx.request.body();
    const { email, password } = body.value;
  
    try{
        const user = await Users.getUserProfileByEmail(email)
        console.log(email, password)
        console.log(user)
        if (user && bcrypt.compareSync(password, user.password)) {
            ctx.response.body = {
                response: ctx.response.status = 200,
                message: `Welcome back ${user.name} `
            }
    } else {
        ctx.response.body = {
            response: ctx.response.status = 401,
            message: 'Invalid Credentials'
        }
    }
}
      catch{
        ctx.response.body = {
            response: ctx.response.status = 500,
            message: 'There was an error locating this user'
        }
      };
  });

  export default router;