import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import QuoteForm from './QuoteForm';

export default function QuoteFormModal({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-gray-900">
            Request a Free Quote
          </DialogTitle>
          <DialogDescription className="text-gray-600 text-base mt-2">
            Tell us about your project and let's discuss how we can help
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-6">
          <QuoteForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
