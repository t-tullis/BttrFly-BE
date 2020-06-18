import {init, MongoClient, Collection, Database} from "https://deno.land/x/mongo@v0.8.0/mod.ts";
import "https://deno.land/x/dotenv/load.ts"


//declaring users collection
let db: Database;

  export function connect() {
    const client = new MongoClient();
    client.connectWithUri(`mongodb+srv://Terrell:${Deno.env.get("PASSWORD")}@bttrfly.ch0tr.mongodb.net/bttrfly?retryWrites=true&w=majority`);
    
    //creating db 'bttrfly'
    db = client.database('bttrfly');
    //setting users variable to the users collection
    // users = db.collection('users')
}

function getDb(){
    return db
}
export default getDb;