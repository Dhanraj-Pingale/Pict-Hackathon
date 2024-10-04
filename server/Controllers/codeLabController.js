import  getDb  from '../models/db.js';
import { ObjectId } from 'mongodb';

// Create a new codelab
export const createCodelab = async (req, res) => {
  const { email, title } = req.body;

  try {
    const db = getDb();

    // Create the document with dynamic stages
    const newDocument = {
      author: email,
      category: 'general',  // default category
      createdOn: new Date(),  // current date
      title: title,
      stages: []  // Empty stages array initially
    };

    // Insert the document into the collection
    const response = await db.collection('codelabs').insertOne(newDocument);

    // Return the generated _id of the new document
    res.status(200).json({ status: true, id: response.insertedId });
  } catch (error) {
    console.error('Error creating codelab:', error);
    res.status(500).json({ status: false, message: 'Error creating codelab' });
  }
};

// Retrieve all codelabs
export const getCodelabs = async (req, res) => {
  try {
    const db = getDb();
    const codelabs = await db.collection('codelabs').find().toArray();
    res.status(200).json(codelabs);
  } catch (error) {
    console.error('Error retrieving codelabs:', error);
    res.status(500).json([]);
  }
};

// Retrieve a specific codelab by ID
export const getCodelabById = async (req, res) => {
  const { id } = req.params;

  try {
    const db = getDb();
    const codelab = await db.collection('codelabs').findOne({ _id: new ObjectId(id) });

    if (!codelab) {
      return res.status(404).json({ message: 'Codelab not found' });
    }

    res.status(200).json(codelab);
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
