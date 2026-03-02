import { Zap, Target, Lock } from 'lucide-react';
import Navbar from '../components/Navbar';
import QuoteForm from '../components/QuoteForm';

export default function QuotePage() {
  const benefits = [
    {
      icon: Zap,
      title: 'Fast Response',
      description: 'We respond within 24-48 business hours',
    },
    {
      icon: Target,
      title: 'Personalized',
      description: 'Customized solutions for your business',
    },
    {
      icon: Lock,
      title: 'Secure',
      description: 'Your information is completely safe',
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-white py-12 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Request a <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">Free Quote</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Let's discuss your business challenges and how our consulting services can help you achieve your goals.
            </p>
          </div>

          {/* Form Container */}
          <QuoteForm />

          {/* Benefits Section */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
                >
                  <div className="flex justify-center mb-3">
                    <IconComponent className="w-12 h-12 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
