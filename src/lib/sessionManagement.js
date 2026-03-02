/**
 * Session Management Utility
 * Simulates user authentication and session management using localStorage
 */

const SESSION_KEY = 'app_session';
const USERS_KEY = 'app_users';
const SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Initialize session
 */
export const initSession = () => {
  try {
    const session = localStorage.getItem(SESSION_KEY);
    if (!session) return null;

    const parsed = JSON.parse(session);

    // Check if session has expired
    if (Date.now() - parsed.timestamp > SESSION_TIMEOUT) {
      clearSession();
      return null;
    }

    return parsed;
  } catch (error) {
    console.error('Error initializing session:', error);
    return null;
  }
};

/**
 * Create a new session
 */
export const createSession = (userData) => {
  const session = {
    user: userData,
    timestamp: Date.now(),
    id: `session_${Date.now()}`,
  };

  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  } catch (error) {
    console.error('Error creating session:', error);
    return null;
  }
};

/**
 * Clear current session
 */
export const clearSession = () => {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error('Error clearing session:', error);
  }
};

/**
 * Get current user from session
 */
export const getCurrentUser = () => {
  const session = initSession();
  return session?.user || null;
};

/**
 * Check if user is logged in
 */
export const isLoggedIn = () => {
  return !!initSession();
};

/**
 * Register new user (simulated - stores in localStorage)
 */
export const registerUser = (userData) => {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');

    // Check if email already exists
    if (users.some((user) => user.email.toLowerCase() === userData.email.toLowerCase())) {
      return {
        success: false,
        message: 'Email already registered',
      };
    }

    // If password is provided, validate it
    if (userData.password) {
      const passwordValidation = validatePassword(userData.password);
      if (!passwordValidation) {
        return {
          success: false,
          message: 'Password must be at least 8 characters with uppercase, lowercase, and numbers',
        };
      }
    }

    const newUser = {
      id: `user_${Date.now()}`,
      ...userData,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    return {
      success: true,
      message: 'User registered successfully',
      user: newUser,
    };
  } catch (error) {
    console.error('Error registering user:', error);
    return {
      success: false,
      message: 'Registration failed',
    };
  }
};

/**
 * Login user (simulated)
 */
export const loginUser = (email, password) => {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');

    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    // For demo purposes, simple password check
    if (password !== user.password) {
      return {
        success: false,
        message: 'Invalid password',
      };
    }

    // Create session
    const { password: _, ...userWithoutPassword } = user;
    createSession(userWithoutPassword);

    return {
      success: true,
      message: 'Login successful',
      user: userWithoutPassword,
    };
  } catch (error) {
    console.error('Error logging in:', error);
    return {
      success: false,
      message: 'Login failed',
    };
  }
};

/**
 * Validate password strength
 */
export const validatePassword = (password) => {
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  return (
    password.length >= minLength &&
    hasUppercase &&
    hasLowercase &&
    hasNumber
  );
};

/**
 * Get password validation feedback
 */
export const getPasswordFeedback = (password) => {
  const feedback = [];

  if (password.length < 8) {
    feedback.push('At least 8 characters');
  }
  if (!/[A-Z]/.test(password)) {
    feedback.push('One uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    feedback.push('One lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    feedback.push('One number');
  }

  return feedback;
};
