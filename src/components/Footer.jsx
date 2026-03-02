import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newsletterSchema } from '../lib/validations';
import { trimValue, createSubmissionThrottler } from '../lib/validators';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';
import useToastStore from '../store/useToastStore';
import { Loader2, MapPin, Phone, Mail } from 'lucide-react';

const throttleSubmit = createSubmissionThrottler(2000);

export default function Footer() {
  const [loading, setLoading] = useState(false);
  const { success: showSuccess, error: showError } = useToastStore();

  const form = useForm({
    resolver: zodResolver(newsletterSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
    },
  });

  const isFormValid = form.formState.isValid && form.formState.isDirty;

  const getInputBorderClass = useCallback((fieldName) => {
    const error = form.formState.errors[fieldName];
    const touched = form.formState.touchedFields[fieldName];
    const isDirty = form.getFieldState(fieldName, form.formState).isDirty;

    let borderClass = 'border-gray-700';
    if (error && touched) {
      borderClass = 'border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500';
    } else if (isDirty && !error) {
      borderClass = 'border-green-500 focus-visible:ring-green-500 focus-visible:border-green-500';
    }
    return borderClass;
  }, [form]);

  async function onSubmit(data) {
    // Prevent duplicate submissions
    if (!throttleSubmit()) {
      showError('Please wait before subscribing again');
      return;
    }

    setLoading(true);

    try {
      const sanitizedEmail = trimValue(data.email).toLowerCase();

      // Check for duplicate subscription
      const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
      const emailExists = subscribers.some(
        (sub) => sub.email.toLowerCase() === sanitizedEmail
      );

      if (emailExists) {
        showError('This email is already subscribed to our newsletter.');
        setLoading(false);
        return;
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Save to localStorage
      const newSubscriber = {
        email: sanitizedEmail,
        subscribedAt: new Date().toISOString(),
      };
      subscribers.push(newSubscriber);
      localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));

      // Show success message
      showSuccess('Thank you for subscribing! Check your email for confirmation.');

      // Reset form
      form.reset();
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      showError('Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const quickLinks = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Team', href: '#team' },
    { label: 'Contact', href: '#contact' },
  ];

  const contactInfo = [
    { icon: MapPin, label: 'Address', value: '123 Business Street, New York, NY 10001' },
    { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
    { icon: Mail, label: 'Email', value: 'hello@converge.com' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-100">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <a href="#" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-4 inline-block">
              Converge
            </a>
            <p className="text-gray-400 leading-relaxed text-sm">
              Your trusted partner in business consulting and digital transformation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Contact</h3>
            <div className="space-y-3">
              {contactInfo.map((info) => {
                const IconComponent = info.icon;
                return (
                  <div key={info.label} className="flex items-start gap-2">
                    <IconComponent className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-gray-400">{info.label}</p>
                      <p className="text-gray-300 text-sm break-words">{info.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4 text-sm">
              Subscribe to get the latest insights and updates.
            </p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          className={`transition-colors duration-200 ${getInputBorderClass('email')} bg-gray-800 text-white placeholder:text-gray-500 py-2 text-sm`}
                          disabled={loading}
                          {...field}
                          onChange={(e) => {
                            field.onChange({ ...e, target: { ...e.target, value: trimValue(e.target.value) } });
                          }}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={loading || !isFormValid}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-all duration-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    'Subscribe'
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; 2024 Converge Digital Solutions. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
