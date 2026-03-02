import clientsData from '../data/clients.json';

export default function Clients() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-gray-50 to-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Trusted by Leading Companies
          </h2>
          <p className="text-gray-600">
            Partnering with industry leaders worldwide
          </p>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {clientsData.map((client) => (
            <div
              key={client.id}
              className="flex items-center justify-center p-6 bg-white rounded-lg border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-300 cursor-pointer group"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-200 to-purple-100 rounded-lg flex items-center justify-center mb-2 group-hover:from-purple-300 group-hover:to-purple-200 transition-all">
                  <span className="text-lg font-bold text-purple-600">{client.logo}</span>
                </div>
                <p className="text-sm font-semibold text-gray-900">{client.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
