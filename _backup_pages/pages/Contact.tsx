
import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useContent } from '../components/LanguageContext';
import Button from '../components/Button';
import ScrollReveal from '../components/ScrollReveal';
import { getSupabaseClient, normalizeSupabaseError } from '@/lib/supabase';

const Contact: React.FC = () => {
  const { content } = useContent();
  const { brand, labels } = content;

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '', // Anti-spam field
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check honeypot
    if (formData.honeypot) {
      console.log('Spam detected');
      setStatus('success'); // Silently fail to spammer
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase
        .from('inquiries')
        .insert([
          { 
            name: formData.name, 
            email: formData.email, 
            message: formData.message 
          }
        ]);

      if (error) throw normalizeSupabaseError(error, 'Contact submission failed');

      setStatus('success');
      setFormData({ name: '', email: '', message: '', honeypot: '' });
    } catch (err) {
      const normalized = normalizeSupabaseError(err, 'Contact submission failed');
      console.error('Submission error:', normalized);
      setStatus('error');
      setErrorMessage(normalized.message || 'Something went wrong. Please try again or WhatsApp us.');
    }
  };

  return (
    <div className="pt-32 pb-24 bg-cream dark:bg-charcoal min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
             <span className="text-gold font-bold tracking-widest text-xs uppercase mb-3 block">Get in Touch</span>
             <h1 className="text-4xl md:text-6xl font-serif font-medium text-charcoal dark:text-cream">{labels.contactTitle}</h1>
             <p className="text-charcoal-500 dark:text-cream-300 mt-4 text-lg font-light max-w-2xl mx-auto">
               Located conveniently at Kisumu Bus Park, we are ready to serve you.
             </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info & Form */}
          <div className="space-y-8">
            <ScrollReveal delay="0.1s">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-charcoal-800 p-8 rounded-2xl floating-card gold-border-gradient gold-card-text">
                  <div className="relative z-10">
                    <Phone className="text-gold mb-4" size={28} />
                    <h3 className="font-serif text-xl font-medium text-charcoal dark:text-cream mb-2">Phone</h3>
                    <p className="text-charcoal-500 dark:text-cream-300 text-sm mb-4 font-light">Call or WhatsApp us for bookings.</p>
                    <a href={`tel:${brand.phone}`} className="font-bold text-charcoal-900 dark:text-white hover:text-gold transition-colors">{brand.phone}</a>
                  </div>
                </div>
                <div className="bg-white dark:bg-charcoal-800 p-8 rounded-2xl floating-card gold-border-gradient gold-card-text">
                  <div className="relative z-10">
                    <Mail className="text-gold mb-4" size={28} />
                    <h3 className="font-serif text-xl font-medium text-charcoal dark:text-cream mb-2">{labels.email}</h3>
                    <p className="text-charcoal-500 dark:text-cream-300 text-sm mb-4 font-light">For inquiries and feedback.</p>
                    <a href={`mailto:${brand.email}`} className="font-bold text-charcoal-900 dark:text-white hover:text-gold transition-colors">{brand.email}</a>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay="0.2s">
              <div className="bg-white dark:bg-charcoal-800 p-10 rounded-2xl floating-card gold-border-gradient gold-card-text">
                <div className="relative z-10">
                  <h3 className="text-2xl font-serif font-medium text-charcoal dark:text-cream mb-8">{labels.sendMessage}</h3>
                  
                  {status === 'success' ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center animate-fade-in">
                       <CheckCircle size={60} className="text-green-500 mb-4" />
                       <h4 className="text-2xl font-serif font-bold text-charcoal dark:text-cream mb-2">Message Sent!</h4>
                       <p className="text-charcoal-600 dark:text-cream-200/80 mb-6">Thank you for reaching out. We will get back to you shortly.</p>
                       <button 
                         onClick={() => setStatus('idle')}
                         className="text-gold font-bold uppercase tracking-widest text-xs border-b border-gold"
                       >
                         Send another message
                       </button>
                    </div>
                  ) : (
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      {/* Honeypot field - hidden from users */}
                      <input 
                        type="text" 
                        name="honeypot" 
                        value={formData.honeypot} 
                        onChange={handleChange} 
                        className="hidden" 
                        aria-hidden="true" 
                      />

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-charcoal-500 dark:text-cream-300 mb-2">{labels.name}</label>
                        <input 
                          type="text" 
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-cream-50 dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-700 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all dark:text-white" 
                          placeholder="Your name" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-charcoal-500 dark:text-cream-300 mb-2">{labels.email}</label>
                        <input 
                          type="email" 
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-cream-50 dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-700 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all dark:text-white" 
                          placeholder="Your email" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-charcoal-500 dark:text-cream-300 mb-2">{labels.message}</label>
                        <textarea 
                          rows={4} 
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-cream-50 dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-700 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all dark:text-white" 
                          placeholder="How can we help you?"
                        ></textarea>
                      </div>

                      {status === 'error' && (
                        <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200">
                           <AlertCircle size={16} />
                           {errorMessage}
                        </div>
                      )}

                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={status === 'loading'}
                      >
                        {status === 'loading' ? (
                          <>
                            <Loader2 size={18} className="animate-spin mr-2" />
                            Sending...
                          </>
                        ) : (
                          labels.send
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Map & Hours */}
          <div className="space-y-8">
            <ScrollReveal delay="0.3s">
              <div className="bg-white dark:bg-charcoal-800 p-2 rounded-2xl h-80 lg:h-96 relative overflow-hidden floating-card gold-border-gradient gold-card-text">
                <div className="w-full h-full bg-charcoal-100 dark:bg-charcoal-900 rounded-xl overflow-hidden relative z-10">
                   <iframe 
                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.817957788484!2d34.76442127405234!3d-0.09099863554865882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182aa497a1a4734d%3A0x7d8383377227495!2sKisumu%20Bus%20Park!5e0!3m2!1sen!2ske!4v1715694857245!5m2!1sen!2ske" 
                     width="100%" 
                     height="100%" 
                     style={{border:0}} 
                     allowFullScreen={true} 
                     loading="lazy" 
                     referrerPolicy="no-referrer-when-downgrade"
                     title="Perry D Location"
                   ></iframe>
                </div>
              </div>
              <div className="flex items-start gap-3 mt-4 px-2">
                 <MapPin className="text-gold mt-1" size={20} />
                 <p className="text-charcoal-600 dark:text-cream-200">{brand.address}</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay="0.4s">
              <div className="bg-charcoal-900 dark:bg-charcoal-800 text-white p-10 rounded-2xl floating-card gold-border-gradient gold-card-text">
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <Clock className="text-gold" size={28} />
                    <h3 className="text-2xl font-serif font-medium">{labels.openingHours}</h3>
                  </div>
                  <ul className="space-y-4 font-light">
                    <li className="flex justify-between border-b border-charcoal-700 pb-3">
                      <span>Monday - Friday</span>
                      <span className="text-gold">8:00 AM - 7:00 PM</span>
                    </li>
                    <li className="flex justify-between border-b border-charcoal-700 pb-3">
                      <span>Saturday</span>
                      <span className="text-gold">9:00 AM - 6:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sunday</span>
                      <span className="text-charcoal-500">Closed</span>
                    </li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
