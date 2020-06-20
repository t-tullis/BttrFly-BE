import { Context } from "https://deno.land/x/oak@v5.2.0/mod.ts";
import { validateJwt } from "https://deno.land/x/djwt/validate.ts";
import { key } from '../routes/login_route.ts';

const middleWare = async (ctx: Context, next: any) => {
    console.log("middleware")
    const headers: Headers = ctx.request.headers;
    //gets auth headers
    const authorization = headers.get('Authorization');
    //if auth is invalid give a 401
    if(!authorization) {
        ctx.response.body = {
            response: ctx.response.status = 401,
            message: 'Authorization invalid'
        }
        return;
    }
    const jwt = authorization.split(' ')[1];
    // if jwt is invalid gives a 401
    if(!jwt ){
        ctx.response.body = {
            response: ctx.response.status = 401,
            message: 'invalid token'
        }
        return;
    }
    //if check to validate provided jwt and key. If valid grants access to route.
    if(await (await validateJwt(jwt, key)).isValid){
        console.log(jwt)
        await next();
        return
    }
    ctx.response.status = 401;
    ctx.response.body = {
        message: 'Invalid JWT token.'
    }
}

export default middleWare