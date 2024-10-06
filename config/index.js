import dotenv from 'dotenv'

dotenv.config()

export const port = process.env.PORT || 5000;
export const nodeEnv = process.env.NODE_ENV || 'development';
export const url = process.env.URL || 'localhost:5000';
export const mongoURI = process.env.DB_URL;
export const jwtSecret = process.env.JWT_SECRET;

export const cloudSecrete = process.env.CLOUD_API_SECRET
export const cloudKey = process.env.CLOUD_API_KEY
export const cloudName = process.env.CLOUD_NAME

