import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// Secret key for signing the token (use environment variable in production)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; 

// Function to generate JWT token using user ID
const generateToken = (userId) => {
  // Define the payload - here we include the user's ID
  const payload = {
    id: userId,
  };

  // Define token options (e.g., expiration time)
  const options = {
    expiresIn: '180d',  // Token will expire in 1 hour
  };

  const token = jwt.sign(payload, JWT_SECRET, options);

  return token;
};

export default generateToken;