/**
 * Validate email address format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string') {
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {boolean} True if valid (minimum 8 characters)
 */
export function validatePassword(password) {
  if (!password || typeof password !== 'string') {
    return false;
  }

  return password.length >= 8;
}

/**
 * Validate name
 * @param {string} name - Name to validate
 * @returns {boolean} True if valid (minimum 2 characters)
 */
export function validateName(name) {
  if (!name || typeof name !== 'string') {
    return false;
  }

  return name.trim().length >= 2;
}

/**
 * Validate post title
 * @param {string} title - Title to validate
 * @returns {boolean} True if valid (minimum 5 characters)
 */
export function validatePostTitle(title) {
  if (!title || typeof title !== 'string') {
    return false;
  }

  return title.trim().length >= 5;
}

/**
 * Validate post content
 * @param {string} content - Content to validate
 * @returns {boolean} True if valid (minimum 20 characters)
 */
export function validatePostContent(content) {
  if (!content || typeof content !== 'string') {
    return false;
  }

  return content.trim().length >= 20;
}

/**
 * Sanitize user input to prevent XSS
 * @param {string} input - Input to sanitize
 * @returns {string} Sanitized input
 */
export function sanitizeInput(input) {
  if (!input || typeof input !== 'string') {
    return '';
  }

  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Format date to "X time ago" format
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
export function formatDistanceToNow(date) {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffInMs = now - dateObj;
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInSeconds < 60) {
      return 'just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffInDays < 30) {
      return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
    } else if (diffInMonths < 12) {
      return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
    } else {
      return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
    }
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'unknown';
  }
}

/**
 * Validate UUID format
 * @param {string} uuid - UUID to validate
 * @returns {boolean} True if valid UUID
 */
export function validateUUID(uuid) {
  if (!uuid || typeof uuid !== 'string') {
    return false;
  }

  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

/**
 * Validate role
 * @param {string} role - Role to validate
 * @returns {boolean} True if valid role
 */
export function validateRole(role) {
  const validRoles = ['admin', 'moderator', 'member'];
  return validRoles.includes(role);
}