// import { Router } from "express";
// import getDb from "../models/db.js";

// const router = Router();

// router.post("/create", async (req, res) => {
//     const {email, title} = req.body;
//     console.log("email: ", email);

//     const db = getDb();

//     // Create the document with dynamic stages
//     const newDocument = {
//       author: email,
//       category: "general",  // default category
//       createdOn: new Date(),  // current date
//       title: title,
//       stages: []  // Stages array passed as input
//     };

//     // Insert the document into the collection
//     const response = await db.collections("codelabs").insertOne(newDocument);

//     // Return the generated _id of the new document
//     return {status: true, id: response.insertedId} ;
// });

// export default router;