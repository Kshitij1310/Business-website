import { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';
import { Button } from './ui/button';
import useQuoteStore from '../store/useQuoteStore';

export default function SuccessMessage() {
  const { success, submittedData, resetQuoteForm } = useQuoteStore();

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        resetQuoteForm();
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [success, resetQuoteForm]);

  if (!success || !submittedData) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-slide-up">
        {/* Success Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-green-400 rounded-full blur-lg opacity-50 animate-pulse"></div>
              <CheckCircle className="w-16 h-16 text-white relative" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Success!</h2>
          <p className="text-green-100">Your quote request has been submitted</p>
        </div>

        {/* Success Content */}
        <div className="px-6 py-8">
          {/* Thank You Message */}
          <div className="mb-6">
            <p className="text-3xl font-bold text-gray-900 mb-1">
              Thank you, <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">{submittedData.name}</span>!
            </p>
            <p className="text-gray-600">We received your quote request and will get back to you shortly.</p>
          </div>

          {/* Contact Details Card */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4 mb-6 border border-purple-100">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-purple-600 font-semibold">Email:</span>
                <p className="text-gray-700 break-all">{submittedData.email}</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-purple-600 font-semibold">Phone:</span>
                <p className="text-gray-700">{submittedData.phone}</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-purple-600 font-semibold">Service:</span>
                <p className="text-gray-700 capitalize">{submittedData.service.replace(/([A-Z])/g, ' $1').trim()}</p>
              </div>
            </div>
          </div>

          {/* Message Preview */}
          {submittedData.message && (
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-900 mb-2">Your Message:</p>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p className="text-gray-700 text-sm line-clamp-3">{submittedData.message}</p>
              </div>
            </div>
          )}

          {/* Success Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-900">
              <span className="font-semibold">📧 Look for our response:</span> We typically respond within 24-48 business hours. Check your email and spam folder.
            </p>
          </div>

          {/* Close Button */}
          <Button
            onClick={() => resetQuoteForm()}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-semibold py-3 rounded-lg transition-all duration-300"
          >
            Close
          </Button>
        </div>

        {/* Close Icon */}
        <button
          onClick={() => resetQuoteForm()}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
}
