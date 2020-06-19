import { Application, Router }from "https://deno.land/x/oak@v5.2.0/mod.ts";
import UserRoutes from './routes/user_routes.ts'
import PostRoutes from './routes/post_routes.ts'

const app = new Application();
const router = new Router();

//Homepage of API
router.get('/', (ctx) => {
    ctx.response.body = 'Deno API'
})

//allowing userRoutes
app.use(UserRoutes.routes());
app.use(UserRoutes.allowedMethods());

//allowing postsRoutes
app.use(PostRoutes.routes());
app.use(PostRoutes.allowedMethods());

await app.listen({port: 4500})
