import { config } from '../utils/config.js';
import jwt from 'jsonwebtoken';

// generate ________________________________________________________________

export function generateToken(user) {
    const payload = {
      userId: user.id,
      username: user.username,
      // Additional claims
    };
  
    const token = jwt.sign(payload, config.secretKey, { expiresIn: '1h' });
  
    return token;
}
// Store ________________________________________________________________

const tokenStore = new Map(); // Store tokens in-memory for simplicity (use a database in production)

export function storeToken(userId, token) {
  tokenStore.set(userId, token);
}

// Verif ________________________________________________________________

export function verifyToken(token) {
    try {
      const decoded = jwt.verify(token, secretKey);
      return decoded;
    } catch (error) {
      return null; // Token is invalid or has expired
    }
  }

// authentification ___________________________________________________

export function authenticateRequest(req, res, next) {
    const token = req.headers.authorization; // Extract the token from the request header
  
    const decodedToken = verifyToken(token);
  
    if (!decodedToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    // You can now use `decodedToken` for user-specific operations
    req.user = decodedToken;
    next();
  }

// revocation _____________________________________________________

const tokenBlacklist = new Set();

export function revokeToken(userId) {
  const token = tokenStore.get(userId);
  if (token) {
    tokenBlacklist.add(token);
    tokenStore.delete(userId);
  }
}

export function isTokenRevoked(token) {
  return tokenBlacklist.has(token);
}