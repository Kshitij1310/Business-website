import { z } from 'zod';

// Quote Form Schema with strict validation
export const quoteFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters'),
  phone: z
    .string()
    .trim()
    .refine(
      (val) => /^\d{10}$/.test(val.replace(/\D/g, '')),
      'Phone must be exactly 10 digits'
    ),
  service: z
    .string()
    .trim()
    .min(1, 'Please select a service'),
  message: z
    .string()
    .trim()
    .max(1000, 'Message must be less than 1000 characters')
    .refine(
      (val) => !val || val.length === 0 || val.length >= 10,
      'Message must be at least 10 characters if provided'
    ),
});

// Callback Form Schema
export const callbackFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  phone: z
    .string()
    .trim()
    .refine(
      (val) => /^\d{10}$/.test(val.replace(/\D/g, '')),
      'Phone must be exactly 10 digits'
    ),
  service: z
    .string()
    .min(1, 'Please select a service'),
});

// Newsletter Schema with email uniqueness check
export const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters'),
});
