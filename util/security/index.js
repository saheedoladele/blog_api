
import * as bcrypt from 'bcrypt'
import  jwt from 'jsonwebtoken'
import { jwtSecret } from '../../config/index.js';
import apierror from '../../middleware/error/apierror.js';

export const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash(password, salt);
  
    return encryptedPassword;
  };
  
  export const verifyPassword = async (
    userPassword,
    password,
  ) => {
    const isMatch = await bcrypt.compare(password, userPassword);
  
    if (!isMatch) {
      return false
    }
    return true
  };
  
  export const generateToken = (id, email, name) => {
    const accessToken = jwt.sign({ id, email, name }, jwtSecret, {
      expiresIn: '1h',
    });
  
    return accessToken;
  };
  
  export const validateToken = (token) => {
    return jwt.verify(token, jwtSecret);
  };