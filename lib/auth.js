import bcrypt from 'bcryptjs';

/**
 * Hash a password using bcrypt
 * @param {string} password - Plain text password
 * @returns {Promise<string>} Hashed password
 */
export async function hashPassword(password) {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw new Error('Failed to hash password');
  }
}

/**
 * Verify a password against a hash
 * @param {string} password - Plain text password
 * @param {string} hash - Hashed password
 * @returns {Promise<boolean>} True if password matches
 */
export async function verifyPassword(password, hash) {
  try {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  } catch (error) {
    console.error('Error verifying password:', error);
    throw new Error('Failed to verify password');
  }
}

/**
 * Check if user has required role
 * @param {string} userRole - User's role
 * @param {string|string[]} requiredRole - Required role(s)
 * @returns {boolean} True if user has required role
 */
export function hasRole(userRole, requiredRole) {
  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(userRole);
  }
  return userRole === requiredRole;
}

/**
 * Check if user is admin
 * @param {string} userRole - User's role
 * @returns {boolean} True if user is admin
 */
export function isAdmin(userRole) {
  return userRole === 'admin';
}

/**
 * Check if user is moderator or admin
 * @param {string} userRole - User's role
 * @returns {boolean} True if user is moderator or admin
 */
export function isModerator(userRole) {
  return userRole === 'admin' || userRole === 'moderator';
}

/**
 * Generate a random token for password reset or email verification
 * @param {number} length - Token length (default 32)
 * @returns {string} Random token
 */
export function generateRandomToken(length = 32) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

/**
 * Mask email address for privacy
 * @param {string} email - Email address
 * @returns {string} Masked email
 */
export function maskEmail(email) {
  if (!email || typeof email !== 'string') {
    return '';
  }

  const [localPart, domain] = email.split('@');
  if (!localPart || !domain) {
    return email;
  }

  const visibleChars = Math.min(3, Math.floor(localPart.length / 2));
  const maskedLocal = localPart.substring(0, visibleChars) + '***';
  
  return `${maskedLocal}@${domain}`;
}