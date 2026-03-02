import { useEffect, useState } from 'react';
import { SERVICE_OPTIONS } from '../lib/constants';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Loader2, Send } from 'lucide-react';

const STORAGE_KEY = 'quoteFormData';
const REQUESTS_KEY = 'quoteRequests';

const defaultFormData = {
  name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
};

export default function QuoteForm() {
  const [formData, setFormData] = useState(defaultFormData);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData({ ...defaultFormData, ...parsed });
      } catch {
        setFormData(defaultFormData);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleServiceChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      service: value,
    }));

    if (errors.service) {
      setErrors((prev) => ({
        ...prev,
        service: '',
      }));
    }
  };

  const validateForm = () => {
    const nextErrors = {};
    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const phoneDigits = formData.phone.replace(/\D/g, '');
    const service = formData.service.trim();
    const message = formData.message.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name.length < 3) {
      nextErrors.name = 'Name must be at least 3 characters';
    }

    if (!emailRegex.test(email)) {
      nextErrors.email = 'Please enter a valid email address';
    }

    if (phoneDigits.length !== 10) {
      nextErrors.phone = 'Phone must be exactly 10 digits';
    }

    if (!service) {
      nextErrors.service = 'Please select a service';
    }

    if (message && message.length < 10) {
      nextErrors.message = 'Message must be at least 10 characters if provided';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowSuccess(false);
    setShowError(false);

    setLoading(true);
    const isValid = validateForm();

    if (!isValid) {
      setShowError(true);
      setLoading(false);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    const sanitizedData = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.replace(/\D/g, ''),
      service: formData.service.trim(),
      message: formData.message.trim(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitizedData));

    const existingRequests = JSON.parse(localStorage.getItem(REQUESTS_KEY) || '[]');
    existingRequests.push({
      ...sanitizedData,
      id: Date.now(),
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem(REQUESTS_KEY, JSON.stringify(existingRequests));

    setShowSuccess(true);
    setLoading(false);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const getInputBorderClass = (fieldName) => {
    if (errors[fieldName]) {
      return 'border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500';
    }

    if (formData[fieldName]?.trim()) {
      return 'border-green-500 focus-visible:ring-green-500 focus-visible:border-green-500';
    }

    return 'border-gray-300';
  };

  return (
    <>
      {showSuccess && (
        <div className="fixed top-5 right-5 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300">
          ✅ Quote saved successfully!
        </div>
      )}

      {showError && (
        <div className="fixed top-5 right-5 z-50 bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300">
          ❌ Please fill all required fields correctly
        </div>
      )}

      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 md:p-10 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Get a Quote Today
          </h2>
          <p className="text-gray-600 text-base md:text-lg">
            Fill out the form below and our team will get back to you within 24-48 hours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="text-gray-900 font-semibold text-sm md:text-base">
              Full Name <span className="text-red-500">*</span>
            </label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              className={`mt-2 transition-colors duration-200 ${getInputBorderClass('name')} py-2 md:py-3 text-sm md:text-base`}
              disabled={loading}
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500 text-xs md:text-sm font-medium mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="text-gray-900 font-semibold text-sm md:text-base">
              Email Address <span className="text-red-500">*</span>
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              className={`mt-2 transition-colors duration-200 ${getInputBorderClass('email')} py-2 md:py-3 text-sm md:text-base`}
              disabled={loading}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-xs md:text-sm font-medium mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="text-gray-900 font-semibold text-sm md:text-base">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <Input
              id="phone"
              name="phone"
              placeholder="(555) 123-4567"
              className={`mt-2 transition-colors duration-200 ${getInputBorderClass('phone')} py-2 md:py-3 text-sm md:text-base`}
              disabled={loading}
              value={formData.phone}
              onChange={(e) => {
                const value = e.target.value.replace(/[^\d\s\-()]/g, '').slice(0, 20);
                handleChange({ target: { name: 'phone', value } });
              }}
            />
            <p className="text-gray-500 text-xs mt-1">Format: (555) 123-4567 or 5551234567</p>
            {errors.phone && <p className="text-red-500 text-xs md:text-sm font-medium mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="service" className="text-gray-900 font-semibold text-sm md:text-base">
              Service of Interest <span className="text-red-500">*</span>
            </label>
            <Select onValueChange={handleServiceChange} value={formData.service} disabled={loading}>
              <SelectTrigger
                id="service"
                className={`mt-2 transition-colors duration-200 ${getInputBorderClass('service')} py-2 md:py-3 text-sm md:text-base`}
              >
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {SERVICE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.id} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.service && <p className="text-red-500 text-xs md:text-sm font-medium mt-1">{errors.service}</p>}
          </div>

          <div>
            <label htmlFor="message" className="text-gray-900 font-semibold text-sm md:text-base">
              Message
              <span className="text-gray-500 text-xs ml-1">(Optional, min 10 chars if provided)</span>
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell us about your project, challenges, or goals..."
              className={`mt-2 transition-colors duration-200 ${getInputBorderClass('message')} py-2 md:py-3 text-sm md:text-base min-h-28 md:min-h-32 resize-none`}
              disabled={loading}
              maxLength={1000}
              value={formData.message}
              onChange={handleChange}
            />
            <div className="flex justify-between items-start gap-2 mt-1">
              {errors.message ? (
                <p className="text-red-500 text-xs md:text-sm font-medium">{errors.message}</p>
              ) : (
                <span />
              )}
              <span className="text-gray-400 text-xs">{formData.message.length}/1000</span>
            </div>
          </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 md:py-4 px-6 rounded-lg font-semibold text-base md:text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                  loading
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-purple-800 text-white hover:from-purple-700 hover:to-purple-900 hover:shadow-lg hover:-translate-y-0.5 active:scale-95'
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Get a Free Quote</span>
                  </>
                )}
              </button>
            </div>

            {/* Helper Text */}
            <p className="text-center text-gray-500 text-xs md:text-sm pt-2">
              We respect your privacy. Your information is secure and will only be used to contact you about your quote.
            </p>
          </form>
      </div>
    </>
  );
}
