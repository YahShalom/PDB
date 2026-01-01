
'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Loader2 } from 'lucide-react';
import { useContent } from '@/components/LanguageContext';
import Button from '@/components/Button';
import ScrollReveal from '@/components/ScrollReveal';
import { getSupabaseClient, normalizeSupabaseError } from '@/lib/supabase';

export default function ContactClient() {
  const { content } = useContent();
  const { brand, labels } = content;

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase.from('inquiries').insert([formData]);
      if (error) {
        const normalized = normalizeSupabaseError(error, 'Contact submission failed');
        console.error(normalized);
        setStatus('error');
        return;
      }
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      const normalized = normalizeSupabaseError(err, 'Contact submission failed');
      console.error(normalized);
      setStatus('error');
    }
  };

  return (
    <div className="pt-32 pb-24 bg-cream dark:bg-charcoal min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
             <span className="text-gold font-bold tracking-widest text-xs uppercase mb-3 block">Get in Touch</span>
             <h1 className="text-4xl md:text-6xl font-serif font-medium text-charcoal dark:text-cream">{labels.contactTitle}</h1>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white dark:bg-charcoal-800 p-10 rounded-2xl floating-card gold-border-gradient">
            <div className="relative z-10">
              <h3 className="text-2xl font-serif font-medium text-charcoal dark:text-cream mb-8">{labels.sendMessage}</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full p-4 bg-cream-50 dark:bg-charcoal-900 border rounded-xl outline-none focus:ring-2 focus:ring-gold"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full p-4 bg-cream-50 dark:bg-charcoal-900 border rounded-xl outline-none focus:ring-2 focus:ring-gold"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
                <textarea 
                  placeholder="Message" 
                  rows={4}
                  className="w-full p-4 bg-cream-50 dark:bg-charcoal-900 border rounded-xl outline-none focus:ring-2 focus:ring-gold"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                />
                <Button type="submit" disabled={status === 'loading'} className="w-full">
                  {status === 'loading' ? <Loader2 className="animate-spin" /> : labels.send}
                </Button>
                {status === 'success' && <p className="text-green-600 text-center font-bold">Message Sent!</p>}
              </form>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-charcoal-900 p-10 rounded-2xl text-white floating-card gold-border-gradient">
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-4"><Phone className="text-gold" /><p>{brand.phone}</p></div>
                <div className="flex items-center gap-4"><Mail className="text-gold" /><p>{brand.email}</p></div>
                <div className="flex items-center gap-4"><MapPin className="text-gold" /><p>{brand.address}</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
