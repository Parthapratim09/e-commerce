// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// export const protect = (req, res, next) => {
//   const authHeader = req.header('Authorization');

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ msg: 'No token, authorization denied' });
//   }

//   const token = authHeader.split(' ')[1]; // Get the token after 'Bearer '

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // Attach decoded payload (e.g., { id, email }) to req.user
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: 'Token is not valid' });
//   }
// };

// middleware/authMiddleware.js
// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// export const verifyToken = async (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'No token provided' });
//   }

//   const token = authHeader.split(' ')[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select('-password');
//     next();
//   } catch (err) {
//     console.error(err);
//     return res.status(401).json({ message: 'Invalid token' });
//   }
// };



import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  const authHeader = req.header('Authorization');

  // Check if Authorization header is present and starts with Bearer
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1]; // Extract the token

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Load user from DB using decoded ID (id or userId based on how you signed the token)
    const user = await User.findById(decoded.id || decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({ msg: 'User not found' });
    }

    // Attach full user object to the request
    req.user = user;

    // Continue to next middleware/route
    next();
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
