import { Target, Zap, Cog, ArrowRight } from 'lucide-react';
import servicesData from '../data/services.json';

const ICON_MAP = {
  '🎯': Target,
  '💻': Zap,
  '⚙️': Cog,
};

export default function Services() {
  return (
    <section id="services" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive consulting solutions designed to accelerate your business growth and digital transformation.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {servicesData.map((service) => {
            const IconComponent = ICON_MAP[service.icon] || Target;
            return (
              <div
                key={service.id}
                className="group p-8 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 shadow-sm hover:shadow-2xl hover:border-purple-300 transition-all duration-300 cursor-pointer"
              >
                {/* Icon */}
                <div className="text-4xl mb-6 text-purple-600 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-12 h-12" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Learn More Link */}
                <a
                  href="#"
                  className="inline-flex items-center text-purple-600 font-semibold hover:text-purple-800 transition-colors"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
