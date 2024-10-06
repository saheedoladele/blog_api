import express from 'express'
import cors from 'cors'
import multer from 'multer';
import database from './services/database.services.js';
import { port, url } from './config/index.js';
import indexRouter from './routes/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());


app.use('/api/v1', indexRouter);

app.listen(port, async () => {
    try {
      await database();
      console.log(`server is running on ${url}:${port}`);
    } catch (error) {
      console.error(error);
    }
  });
