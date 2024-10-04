// writing new code with MongoDB driver instead of mongoose

//for connecting to the database
import { MongoClient } from "mongodb";
import env from "dotenv";

env.config();

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);
//creating mongoclient...
let db ;

async function connectToDb() {
  try {
    await client.connect();
    //connect to the cluster...
    const connectionObject = client.db("test");
    // access our specific database
    // "test" : because we are using test database...

    return connectionObject;
  } catch (error) {
    console.log("error in initializing db", error);
    process.exit(1); // Closing the app, because unable to connect to DB.

  }
}

(async () => {
    try {
      db = await connectToDb(); // Your DB connection function
      console.log("Connected to MongoDB Atlas successfully");
     
    } catch (error) {
      console.log("Error occurred: ", error);
      
    }
})();

const getDb = () => {
    
   if(!db){
        console.error("error occurred: check db.js");
    }
    return db; 
}

export default getDb;