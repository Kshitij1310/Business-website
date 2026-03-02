import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useQuoteStore = create(
  persist(
    (set) => ({
      // State
      loading: false,
      success: false,
      submittedData: null,
      quoteRequests: [],

      // Actions
      setLoading: (loading) => set({ loading }),
      setSuccess: (success) => set({ success }),
      setSubmittedData: (data) => set({ submittedData: data }),

      // Submit quote
      submitQuote: (data) =>
        set((state) => {
          const newRequest = {
            ...data,
            id: Date.now(),
            timestamp: new Date().toISOString(),
          };
          return {
            submittedData: data,
            quoteRequests: [...state.quoteRequests, newRequest],
          };
        }),

      // Reset form
      resetQuoteForm: () =>
        set({
          loading: false,
          success: false,
          submittedData: null,
        }),

      // Get all quote requests
      getQuoteRequests: () => {
        try {
          const stored = localStorage.getItem('quoteRequests');
          return stored ? JSON.parse(stored) : [];
        } catch (error) {
          console.error('Error reading quote requests:', error);
          return [];
        }
      },

      // Clear all data
      clearData: () =>
        set({
          loading: false,
          success: false,
          submittedData: null,
          quoteRequests: [],
        }),
    }),
    {
      name: 'quote-store',
      partialize: (state) => ({
        quoteRequests: state.quoteRequests,
      }),
    }
  )
);

export default useQuoteStore;
