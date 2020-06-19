import { ObjectId } from "https://deno.land/x/mongo@v0.8.0/mod.ts";
import getDb from '../db.ts'

//sets schema for data
interface PostSchema {
    title: string;
    text: string;
    numOfComments: number;
    comments: [];
  };

export class Posts {
    static async create(data: PostSchema){
        //creates collection if it hasn't been created already
       const post = await getDb()
       .collection('posts')
       .insertOne(data)

       //after post creation returns postId
       return { 
           id: post.$oid,
           title: post.title,
           text:  post.text
        }
    }
    //retrieves all users from database
    static async getAllPosts(){
        const allPosts = await getDb()
            .collection('posts')
            .find();
       
        return allPosts.map((post : {
            _id: ObjectId,
            title: string,
            text: string,
        } ) => ({
            title: post.title,
            text: post.text,
        }));
    } 

    //retrieves one post from database
    static async getOnePost(id: string){
        const post = await getDb()
            .collection('posts')
            .findOne({ _id: ObjectId(id) });
        
        return post
    }

    //updates user info 
    static async update(id: string, data: PostSchema){
        await getDb()
            .collection('posts')
            .updateOne({ _id: ObjectId(id)} , { $set: data });
    }
    //deletes user from database
    static async delete(id: string){
        await getDb()
        .collection('posts')
        .deleteOne({_id: ObjectId(id)})
    }
}