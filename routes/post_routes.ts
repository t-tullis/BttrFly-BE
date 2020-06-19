import { Router } from "https://deno.land/x/oak@v5.2.0/mod.ts";
import { connect } from '../db.ts';
import { Posts } from '../models/posts.ts'

connect();
const router = new Router();

//retrieves all users
router.get('/posts', async (ctx) => {
    const getAllPosts = await Posts.getAllPosts();
    ctx.response.body = { posts: getAllPosts };
})

export default router;