
import React from 'react';
import type { Metadata } from 'next';
import ContactClient from '@/components/ContactClient';

export const metadata: Metadata = {
  title: "Contact Us | Salon Location at Kisumu Bus Park",
  description: "Visit us at Kisumu Main Stage, Bus Park (Sasaline), Shop 6. Call +254 712 345 670 or message us on WhatsApp to book your session.",
  keywords: ["Kisumu Bus Park Salon", "Perry D Location", "Book Salon Kisumu", "Beauty Studio Contact Kisumu"],
  openGraph: {
    title: "Visit Perry D Beauty Studio | Kisumu",
    description: "Find us in the heart of Kisumu for professional beauty services.",
    images: ['/og-contact.jpg'],
  }
};

export default function ContactPage() {
  return <ContactClient />;
}
