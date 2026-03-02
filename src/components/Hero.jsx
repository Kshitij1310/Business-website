import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-purple-50 to-white px-4 sm:px-6 lg:px-8 py-12 md:py-0">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Transform Your <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">Business Today</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Drive growth and innovation with our expert consulting solutions tailored to your business needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button 
              onClick={() => navigate('/quote')}
              className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-semibold px-8 py-3 text-base flex items-center justify-center gap-2 cursor-pointer"
            >
              Get a Quote
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button 
              onClick={() => {
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
              }}
              variant="outline" 
              className="border-purple-600 text-purple-600 hover:bg-purple-50 font-semibold px-8 py-3 text-base cursor-pointer"
            >
              Our Services
            </Button>
          </div>

          {/* Stats */}
          <div className="flex gap-8 pt-8 flex-wrap">
            <div>
              <p className="text-3xl font-bold text-purple-600">90+</p>
              <p className="text-gray-600">Companies Served</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-purple-600">120+</p>
              <p className="text-gray-600">Expert Advisors</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-purple-600">50+</p>
              <p className="text-gray-600">Awards Won</p>
            </div>
          </div>
        </div>

        {/* Right Image/Illustration */}
        <div className="hidden md:flex items-center justify-center">
          <div className="relative w-full h-96 bg-gradient-to-br from-purple-200 to-purple-100 rounded-2xl overflow-hidden shadow-2xl group hover:shadow-3xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-purple-800/20 transition-opacity group-hover:opacity-75"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-8xl">📈</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
