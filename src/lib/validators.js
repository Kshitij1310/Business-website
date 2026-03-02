/**
 * Reusable Validation Functions
 */

// Trim input
export const trimValue = (value) => {
  return typeof value === 'string' ? value.trim() : value;
};

// Email validation (regex based)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const validateEmail = (email) => {
  const trimmed = trimValue(email);
  if (!trimmed) return false;
  return EMAIL_REGEX.test(trimmed);
};

// Phone validation - exactly 10 numeric digits
export const validatePhone = (phone) => {
  const trimmed = trimValue(phone);
  // Remove all non-digit characters
  const digitsOnly = trimmed.replace(/\D/g, '');
  // Must be exactly 10 digits
  return digitsOnly.length === 10;
};

// Name validation - at least 2 characters
export const validateName = (name) => {
  const trimmed = trimValue(name);
  return trimmed.length >= 2;
};

// Message validation - min 10 characters if provided
export const validateMessage = (message) => {
  if (!message) return true; // Optional field
  const trimmed = trimValue(message);
  return trimmed.length >= 10;
};

// Generic required field validation
export const validateRequired = (value) => {
  const trimmed = trimValue(value);
  return trimmed.length > 0;
};

// Sanitize input - prevent XSS
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .trim();
};

// Format phone for display (10 digits to +1 (XXX) XXX-XXXX)
export const formatPhoneDisplay = (phone) => {
  const digits = phone.replace(/\D/g, '');
  if (digits.length !== 10) return phone;
  return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

// Check if form is valid (all fields have no errors)
export const isFormValid = (formState) => {
  return Object.keys(formState.errors).length === 0 && formState.isDirty;
};

// Prevent duplicate submission
export const createSubmissionThrottler = (delay = 1000) => {
  let lastSubmit = 0;
  return () => {
    const now = Date.now();
    if (now - lastSubmit < delay) return false;
    lastSubmit = now;
    return true;
  };
};
