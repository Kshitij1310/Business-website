import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Eye, Mail, Phone, Calendar, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import useToastStore from '../store/useToastStore';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { success: showSuccess, error: showError } = useToastStore();
  const [activeTab, setActiveTab] = useState('quotes');
  const [quoteRequests, setQuoteRequests] = useState([]);
  const [callbackRequests, setCallbackRequests] = useState([]);
  const [newsletterSubscribers, setNewsletterSubscribers] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      const quotes = JSON.parse(localStorage.getItem('quoteRequests') || '[]');
      const callbacks = JSON.parse(localStorage.getItem('callbackRequests') || '[]');
      const newsletter = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
      
      setQuoteRequests(quotes.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
      setCallbackRequests(callbacks.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
      setNewsletterSubscribers(newsletter.sort((a, b) => new Date(b.subscribedAt) - new Date(a.subscribedAt)));
    } catch (error) {
      showError('Failed to load data');
    }
  };

  const deleteQuote = (id) => {
    const updated = quoteRequests.filter(q => q.id !== id);
    localStorage.setItem('quoteRequests', JSON.stringify(updated));
    setQuoteRequests(updated);
    setDeleteConfirm(null);
    showSuccess('Quote request deleted');
  };

  const deleteCallback = (id) => {
    const updated = callbackRequests.filter(c => c.id !== id);
    localStorage.setItem('callbackRequests', JSON.stringify(updated));
    setCallbackRequests(updated);
    setDeleteConfirm(null);
    showSuccess('Callback request deleted');
  };

  const deleteSubscriber = (email) => {
    const updated = newsletterSubscribers.filter(s => s.email !== email);
    localStorage.setItem('newsletterSubscribers', JSON.stringify(updated));
    setNewsletterSubscribers(updated);
    setDeleteConfirm(null);
    showSuccess('Subscriber removed');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatPhoneDisplay = (phone) => {
    const digits = phone.replace(/\D/g, '');
    if (digits.length !== 10) return phone;
    return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-purple-100">Manage all submissions and subscriber data</p>
            </div>
            <Button
              onClick={() => navigate('/')}
              className="bg-white text-purple-600 hover:bg-gray-100 font-semibold"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white rounded-lg p-2 shadow-md">
          {[
            { id: 'quotes', label: 'Quote Requests', count: quoteRequests.length },
            { id: 'callbacks', label: 'Callback Requests', count: callbackRequests.length },
            { id: 'newsletter', label: 'Newsletter Subscribers', count: newsletterSubscribers.length },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSelectedItem(null); }}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Quote Requests Tab */}
        {activeTab === 'quotes' && (
          <div className="space-y-6">
            {quoteRequests.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center shadow-md border border-gray-200">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No quote requests yet</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {quoteRequests.map(quote => (
                  <div
                    key={quote.id}
                    className="bg-white rounded-lg p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900">{quote.name}</h3>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            <a href={`mailto:${quote.email}`} className="text-purple-600 hover:underline">{quote.email}</a>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            <span>{formatPhoneDisplay(quote.phone)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(quote.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          onClick={() => setSelectedItem(quote)}
                          variant="outline"
                          className="flex items-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </Button>
                        <Button
                          onClick={() => setDeleteConfirm({ type: 'quote', id: quote.id })}
                          variant="outline"
                          className="flex items-center gap-2 text-red-600 hover:bg-red-50 border-red-200"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm font-semibold text-gray-600">Service:</span>
                        <p className="text-gray-900">{quote.service.replace(/([A-Z])/g, ' $1').trim()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Callback Requests Tab */}
        {activeTab === 'callbacks' && (
          <div className="space-y-6">
            {callbackRequests.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center shadow-md border border-gray-200">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No callback requests yet</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {callbackRequests.map(callback => (
                  <div
                    key={callback.id}
                    className="bg-white rounded-lg p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900">{callback.name}</h3>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            <span>{formatPhoneDisplay(callback.phone)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(callback.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          onClick={() => setDeleteConfirm({ type: 'callback', id: callback.id })}
                          variant="outline"
                          className="flex items-center gap-2 text-red-600 hover:bg-red-50 border-red-200"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm font-semibold text-gray-600">Service:</span>
                        <p className="text-gray-900">{callback.service}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Newsletter Tab */}
        {activeTab === 'newsletter' && (
          <div className="space-y-6">
            {newsletterSubscribers.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center shadow-md border border-gray-200">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No newsletter subscribers yet</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Subscribed Date</th>
                        <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {newsletterSubscribers.map(subscriber => (
                        <tr key={subscriber.email} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <a href={`mailto:${subscriber.email}`} className="text-purple-600 hover:underline">
                              {subscriber.email}
                            </a>
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {formatDate(subscriber.subscribedAt)}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Button
                              onClick={() => setDeleteConfirm({ type: 'newsletter', email: subscriber.email })}
                              variant="outline"
                              className="flex items-center gap-2 text-red-600 hover:bg-red-50 border-red-200 ml-auto"
                            >
                              <Trash2 className="w-4 h-4" />
                              Remove
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Quote Request Details</h2>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-white hover:opacity-80 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="text-sm font-semibold text-gray-600">Name</label>
                <p className="text-lg text-gray-900">{selectedItem.name}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold text-gray-600">Email</label>
                  <p className="text-lg text-gray-900"><a href={`mailto:${selectedItem.email}`} className="text-purple-600 hover:underline">{selectedItem.email}</a></p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">Phone</label>
                  <p className="text-lg text-gray-900">{formatPhoneDisplay(selectedItem.phone)}</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold text-gray-600">Service</label>
                  <p className="text-lg text-gray-900">{selectedItem.service.replace(/([A-Z])/g, ' $1').trim()}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">Date & Time</label>
                  <p className="text-lg text-gray-900">{formatDate(selectedItem.timestamp)}</p>
                </div>
              </div>
              {selectedItem.message && (
                <div>
                  <label className="text-sm font-semibold text-gray-600">Message</label>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-2">
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedItem.message}</p>
                  </div>
                </div>
              )}
              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <Button
                  onClick={() => setSelectedItem(null)}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full shadow-2xl">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-red-600 mb-4">Confirm Delete</h2>
              <p className="text-gray-700 mb-6">
                Are you sure you want to delete this {deleteConfirm.type === 'newsletter' ? 'subscriber' : deleteConfirm.type}? This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <Button
                  onClick={() => setDeleteConfirm(null)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    if (deleteConfirm.type === 'quote') {
                      deleteQuote(deleteConfirm.id);
                    } else if (deleteConfirm.type === 'callback') {
                      deleteCallback(deleteConfirm.id);
                    } else if (deleteConfirm.type === 'newsletter') {
                      deleteSubscriber(deleteConfirm.email);
                    }
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
