import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import "https://deno.land/x/dotenv/load.ts";
import { makeJwt, setExpiration, Jose, Payload } from "https://deno.land/x/djwt/create.ts";
import { Router } from "https://deno.land/x/oak@v5.2.0/mod.ts";
import { connect } from '../db.ts';
import { Users } from '../models/users.ts';


connect();

const router = new Router();

export const key = String(Deno.env.get("JWTKEY"));
//creating the header for the JWT setting the algo and type
const header: Jose = {
    alg: "HS256",
    typ: "JWT",
}

router.post('/user/login', async (ctx) => {
    const body = await ctx.request.body();
    const { email, password } = body.value;
  
    try{
        const user = await Users.getUserProfileByEmail(email)
        console.log(email, password)
        console.log(user)
        if (user && bcrypt.compareSync(password, user.password)) {
            //creating the payload for JWT setting the issuer to the logged in user name and expiration time of the token.
            const payload: Payload = {
                iss: email,
                exp: setExpiration(new Date().getTime() + 60000),
              };
              //creates the JWT Token
             const jwt =  makeJwt({key, header, payload})
             if(jwt){
                  ctx.response.body = {
                      response: ctx.response.status = 200,
                      message: `Welcome back ${user.name}!`,
                      token: jwt
                    }
                }else{
                    ctx.response.body = {
                        response: ctx.response.status = 500,
                        message: 'Invalid token'
                    }
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