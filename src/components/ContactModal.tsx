import { useState, useEffect } from 'react';
import { X, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: '',
    // Honeypot field - should remain empty
    website: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({ email: '', subject: '', message: '', website: '' });
      setStatus('idle');
      setErrorMessage('');
    }
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check - if filled, silently "succeed" (bot trap)
    if (formData.website) {
      setStatus('success');
      return;
    }

    // Validation
    if (!formData.email || !formData.subject || !formData.message) {
      setErrorMessage('Please fill in all fields.');
      setStatus('error');
      return;
    }

    if (!validateEmail(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      setStatus('error');
      return;
    }

    if (formData.message.length < 10) {
      setErrorMessage('Message must be at least 10 characters.');
      setStatus('error');
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg mx-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-6 sm:p-8 animate-fade-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <p className="label-mono text-[var(--accent-warm)] mb-2 text-xs">Contact</p>
          <h3 className="text-xl sm:text-2xl font-medium text-[var(--text-primary)]">
            Send a Message
          </h3>
        </div>

        {status === 'success' ? (
          <div className="text-center py-8">
            <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
            <h4 className="text-lg font-medium text-[var(--text-primary)] mb-2">
              Message Sent!
            </h4>
            <p className="text-[var(--text-secondary)] mb-6">
              Thanks for reaching out. I'll get back to you soon.
            </p>
            <button
              onClick={onClose}
              className="btn-primary"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot - hidden from users, visible to bots */}
            <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
              <label>
                Website
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>
            </div>

            {/* Email */}
            <div>
              <label className="label-mono text-xs mb-2 block">Your Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-warm)] focus:outline-none transition-colors text-sm"
                disabled={status === 'submitting'}
              />
            </div>

            {/* Subject */}
            <div>
              <label className="label-mono text-xs mb-2 block">Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="What's this about?"
                className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-warm)] focus:outline-none transition-colors text-sm"
                disabled={status === 'submitting'}
              />
            </div>

            {/* Message */}
            <div>
              <label className="label-mono text-xs mb-2 block">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Your message..."
                rows={5}
                className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-warm)] focus:outline-none transition-colors text-sm resize-none"
                disabled={status === 'submitting'}
              />
            </div>

            {/* Error message */}
            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span className="ml-2">Sending...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send size={14} className="ml-3" />
                </>
              )}
            </button>

            <p className="text-xs text-[var(--text-muted)] text-center mt-4">
              Your information is secure and will never be shared.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
