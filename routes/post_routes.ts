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

router.post('/posts', async (ctx) => {
    const body = await ctx.request.body();
    const { title, text } = body.value;
    const post = await Posts.create({
        title: title,
        text:text,
        numOfComments: 0,
        comments: []
    })
    ctx.response.body = { createdPost: post }
})

export default router;