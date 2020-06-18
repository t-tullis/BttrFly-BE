import { Application, Router } from "https://deno.land/x/oak@v5.2.0/mod.ts";
import { connect } from './db.ts';
import { Users } from './models/users.ts'

connect();

const app = new Application();
const router = new Router();

//Homepage of API
router.get('/', (ctx) => {
    ctx.response.body = 'Deno API'
})

//retrieves all users
router.get('/users', async (ctx) => {
    const getAllUsers = await Users.getAllUsers();
    ctx.response.body = { users: getAllUsers };
})

//gets user by ID
router.get('/users/:userId', async(ctx) => {
    const id = ctx.params.userId!
    const getOneUser = await Users.getOneUser(id);
    console.log(id)

    ctx.response.body = { user: getOneUser };
})

//creates user
router.post('/users', async (ctx) => {
    const body = await ctx.request.body(); 
    const { email, name, displayName, password, birthday } = body.value;
    const getAllUsers = await Users.getAllUsers();
    
    //Current email check solution
    let emails: string[] = [];
    getAllUsers.map((user:{
        email: string
    }) => {
        emails.push(user.email)
    })

    if(emails.includes(email)){
        ctx.response.body = {
            message: "This email is already being used! Please enter a new email."
        }
    }else{
        const user = await Users.create({
            email: email,
            name: name,
            displayName: displayName,
            password: password,
            birthday: birthday,
            numOfPosts: 0,
            posts: []
        })
        ctx.response.body = { insertedUser: user }
    }
});

//update user
router.patch('/users/:userId', async(ctx) => {
    const body = await ctx.request.body(); 
    const { email, name, displayName, password, birthday, } = body.value
    const id = ctx.params.userId!;


    const updatedUser = await Users.update(id, {
        email: email,
        name: name,
        displayName: displayName,
        password: password,
        birthday: birthday,
        numOfPosts: 0,
        posts: []
    })
    ctx.response.body = {
        message: 'User updated!',
        updatedUser: updatedUser
    }
})
//Deletes user
router.delete('/users/:userId', async(ctx) => {
    const id = ctx.params.userId!;
    const deletedUser = await Users.delete(id);

    ctx.response.body = { 
        message: 'User deleted successfully',
        id: id
    }
})
    
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({port: 4500})
