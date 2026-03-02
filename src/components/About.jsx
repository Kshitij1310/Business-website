import { Target, Lightbulb, Users } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: Target,
      title: 'Strategic Focus',
      description: 'We align every solution with your core business objectives and long-term vision.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation First',
      description: 'Leveraging cutting-edge methodologies and technologies to solve complex challenges.',
    },
    {
      icon: Users,
      title: 'Client Partnership',
      description: 'We work as an extension of your team, ensuring sustainable success and growth.',
    },
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              About Converge
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              With over 15 years of industry expertise, Converge has established itself as a trusted strategic partner for businesses across diverse sectors. Our mission is to empower organizations to achieve their strategic objectives through innovative consulting solutions.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We combine data-driven insights with practical expertise to deliver tangible results that transform businesses and drive sustainable growth.
            </p>
          </div>

          {/* Right Illustration */}
          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-80 h-80 bg-gradient-to-br from-purple-200 to-purple-100 rounded-2xl shadow-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-purple-800/10"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-8xl">🏢</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="text-purple-600 mb-4">
                  <IconComponent className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
