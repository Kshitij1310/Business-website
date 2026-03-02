import { useEffect, useState } from 'react';
import { CALLBACK_SERVICE_OPTIONS } from '../lib/constants';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Loader2, Send, Check } from 'lucide-react';

const STORAGE_KEY = 'callbackFormData';
const REQUESTS_KEY = 'callbackRequests';

const defaultCallbackData = {
  fullName: '',
  phone: '',
  service: '',
};

export default function CallbackForm() {
  const [callbackData, setCallbackData] = useState(defaultCallbackData);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load saved form data from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCallbackData({ ...defaultCallbackData, ...parsed });
      } catch {
        setCallbackData(defaultCallbackData);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCallbackData((prev) => ({
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
    setCallbackData((prev) => ({
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
    const fullName = callbackData.fullName.trim();
    const phoneDigits = callbackData.phone.replace(/\D/g, '');
    const service = callbackData.service.trim();

    if (fullName.length < 3) {
      nextErrors.fullName = 'Full name must be at least 3 characters';
    }

    if (phoneDigits.length !== 10) {
      nextErrors.phone = 'Phone must be exactly 10 digits';
    }

    if (!service) {
      nextErrors.service = 'Please select a service';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(false);
    setShowError(false);

    setLoading(true);
    const isValid = validateForm();

    if (!isValid) {
      setLoading(false);
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    const sanitizedData = {
      fullName: callbackData.fullName.trim(),
      phone: callbackData.phone.replace(/\D/g, ''),
      service: callbackData.service.trim(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitizedData));

    const existingCallbacks = JSON.parse(localStorage.getItem(REQUESTS_KEY) || '[]');
    existingCallbacks.push({
      ...sanitizedData,
      id: Date.now(),
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem(REQUESTS_KEY, JSON.stringify(existingCallbacks));

    setShowSuccess(true);
    setLoading(false);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const getInputBorderClass = (fieldName) => {
    if (errors[fieldName]) {
      return 'border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500';
    }

    if (callbackData[fieldName]?.trim()) {
      return 'border-green-500 focus-visible:ring-green-500 focus-visible:border-green-500';
    }

    return 'border-gray-300';
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
      {showSuccess && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 z-50">
          ✅ Callback request saved successfully!
        </div>
      )}

      {showError && (
        <div className="fixed top-5 right-5 bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 z-50">
          ❌ Please fill all required fields correctly
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Request a Callback
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Tell us about your business challenges and let our experts help you find the right solution.
            </p>
            <ul className="space-y-4">
              {[
                'Quick response within 24 hours',
                'Personalized consultation',
                'Expert advice tailored to your needs',
              ].map((item, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <Check className="w-5 h-5 text-purple-600 mr-3" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="fullName" className="text-gray-700 font-semibold text-sm md:text-base">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="John Doe"
                  className={`mt-2 transition-colors duration-200 ${getInputBorderClass('fullName')} py-2 md:py-3 text-sm md:text-base`}
                  disabled={loading}
                  value={callbackData.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && <p className="text-red-500 text-xs md:text-sm font-medium mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="text-gray-700 font-semibold text-sm md:text-base">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="(555) 123-4567"
                  className={`mt-2 transition-colors duration-200 ${getInputBorderClass('phone')} py-2 md:py-3 text-sm md:text-base`}
                  disabled={loading}
                  value={callbackData.phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^\d\s\-()]/g, '').slice(0, 20);
                    handleChange({ target: { name: 'phone', value } });
                  }}
                />
                {errors.phone && <p className="text-red-500 text-xs md:text-sm font-medium mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="service" className="text-gray-700 font-semibold text-sm md:text-base">
                  Service Interest <span className="text-red-500">*</span>
                </label>
                <Select onValueChange={handleServiceChange} value={callbackData.service} disabled={loading}>
                  <SelectTrigger
                    id="service"
                    className={`mt-2 transition-colors duration-200 ${getInputBorderClass('service')} py-2 md:py-3 text-sm md:text-base`}
                  >
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {CALLBACK_SERVICE_OPTIONS.map((opt) => (
                      <SelectItem key={opt.id} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.service && <p className="text-red-500 text-xs md:text-sm font-medium mt-1">{errors.service}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 md:py-4 px-6 rounded-lg font-semibold text-base md:text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                  loading
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-purple-800 text-white hover:from-purple-700 hover:to-purple-900 hover:shadow-lg active:scale-95'
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Request Callback</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
