import mongoose from 'mongoose';
import { mongoURI } from '../config/index.js';


const database = async () => {
  try {
    const uri = mongoURI;
    await mongoose.connect(uri);
    console.log('database connected successfully');
  } catch (error) {
    console.log(error);
  }
};

export default database;
