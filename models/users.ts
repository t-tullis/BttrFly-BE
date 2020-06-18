import { ObjectId } from "https://deno.land/x/mongo@v0.8.0/mod.ts";
import getDb from '../db.ts'

//sets schema for data
interface UserSchema {
    username: string;
    password: string;
  };

export class Users {
    static async create(data: UserSchema){
        //creates collection if it hasn't been created already
       const id = await getDb()
       .collection('users')
       .insertOne(data)

       //after user creation returns userId
       return { id: id.$oid }
    }
    //retrieves all users from database
    static async getAllUsers(){
        const allUsers = await getDb()
            .collection('users')
            .find();
       
        return allUsers.map((users : {
            _id: ObjectId,
            username: string,
            password: string
        } ) => ({
            ...users
        }));
    } 

    //retrieves one user from database
    static async getOneUser(id: string){
        const user = await getDb()
            .collection('users')
            .findOne({ _id: ObjectId(id) });
        
        return user
    }

    //updates user info 
    static async update(id: string, data: UserSchema){
        await getDb()
            .collection('users')
            .updateOne({ _id: ObjectId(id)} , { $set: data });
    }
    //deletes user from database
    static async delete(id: string){
        await getDb()
        .collection('users')
        .deleteOne({_id: ObjectId(id)})
    }
}