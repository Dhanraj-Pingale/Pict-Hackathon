import  getDb  from '../models/db.js';
import { ObjectId } from 'mongodb';

// Create a new codelab
export const createCodelab = async (req, res) => {
  const { email, title, category } = req.body.data;
    console.log("data ",email, title, category  );
  try {
    const db = getDb();

    // Create the document with dynamic stages
    const newDocument = {
      author: email || "pk@g.c",
      category: category || 'general',  // default category
      createdOn: new Date(),  // current date
      title: title || "Learning Python",
      stages: []  // Empty stages array initially
    };

    // Insert the document into the collection
    const response = await db.collection('codelabs').insertOne(newDocument);

    console.log('id: ', response.insertedId );
    if(response.acknowledged)
    {

      res.status(200).json({ status: true, id: response.insertedId });
    }
    else{

      res.status(500).json({ status: false, message: 'Error creating codelab in Database' });
    }
    // Return the generated _id of the new document
  } catch (error) {
    console.error('Error creating codelab:', error);
    res.status(500).json({ status: false, message: 'Error creating codelab' });
  }
};

export const saveStage = async (req, res) => {
  const { contentItems, codelab } = req.body.data;
  console.log("data ", contentItems, codelab);

  const stageIndex = codelab.stage; // Get the stage index from codelab

  try {
    const db = getDb();
    const codelabId = new ObjectId(codelab.id);

    // Check if the stage index already exists in the codelab's stages
    const existingCodelab = await db.collection('codelabs').findOne({
      _id: codelabId,
      [`stages.${stageIndex}`]: { $exists: true } // Check if the stage index exists
    });

    if (existingCodelab) {
      // If the stage exists, update the contentItems at that index
      const response = await db.collection('codelabs').updateOne(
        { _id: codelabId },
        {
          $set: { [`stages.${stageIndex}.contentItems`]: contentItems } // Update contentItems for the specified stage index
        }
      );
      res.status(200).json({ status: true, message: 'Stage updated successfully' });
    } else {
      // If the stage doesn't exist, insert new contentItems at the specified index
      const response = await db.collection('codelabs').updateOne(
        { _id: codelabId },
        {
          $set: { [`stages.${stageIndex}`]: { contentItems } } // Insert contentItems at the specified stage index
        },
        { upsert: true } // Create a new document if it doesn't exist
      );
      res.status(200).json({ status: true, message: 'New stage added successfully' });
    }
  } catch (error) {
    console.error('Error saving codelab:', error);
    res.status(500).json({ status: false, message: 'Error saving codelab' });
  }
};


// Retrieve all codelabs
export const getCodelabs = async (req, res) => {
  try {
    const db = getDb();
    const codelabs = await db.collection('codelabs').find().toArray();
    
    console.log("codelabs : ", codelabs);
    res.status(200).json({status: true, codelabs: codelabs});
  } catch (error) {
    console.error('Error retrieving codelabs:', error);
    res.status(200).json({status: false, message: "Failed to fetch codelabs"});
  }
};

// Retrieve a specific codelab by ID
export const getCodelabById = async (req, res) => {
  const { id } = req.params;

  try {
    const db = getDb();
    const codelab = await db.collection('codelabs').findOne({ _id: new ObjectId(id) });
const codelabArray = codelab ? [codelab] : [];


    if (!codelab) {
      return res.status(404).json({ message: 'Codelab not found' });
    }

    res.status(200).json(codelabArray);
  } catch (error) {
    console.error(`Error retrieving codelab with ID: ${id}`, error);
    res.status(500).json(null);
  }
};

// Update a specific codelab by ID
export const updateCodelab = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const db = getDb();
    const response = await db.collection('codelabs').updateOne({ _id: new ObjectId(id) }, { $set: updatedData });

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'Codelab not found' });
    }

    res.status(200).json({ status: true, message: 'Codelab updated successfully' });
  } catch (error) {
    console.error(`Error updating codelab with ID: ${id}`, error);
    res.status(500).json({
      status: false,
      message: 'An error occurred while updating the codelab.',
    });
  }
};

// Delete a specific codelab by ID
export const deleteCodelab = async (req, res) => {
  const { id } = req.params;

  try {
    const db = getDb();
    const response = await db.collection('codelabs').deleteOne({ _id: new ObjectId(id) });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: 'Codelab not found' });
    }

    res.status(200).json({ status: true, message: 'Codelab deleted successfully' });
  } catch (error) {
    console.error(`Error deleting codelab with ID: ${id}`, error);
    res.status(500).json({
      status: false,
      message: 'An error occurred while deleting the codelab.',
    });
  }
};