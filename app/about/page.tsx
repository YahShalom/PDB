
import React from 'react';
import type { Metadata } from 'next';
import AboutClient from '@/components/AboutClient';

export const metadata: Metadata = {
  title: "Our Story | Professional Beauty Experts in Kisumu",
  description: "Meet the passion behind Perry D Beauty Studio. Founded by Beline Perrie, we are dedicated to empowering beauty through professional skill and premium service.",
  openGraph: {
    title: "The Perry D Journey | Professional Beauty Team",
    description: "Learn about our mission, vision, and the artists who redefine beauty standards in Kenya.",
    images: ['/og-about.jpg'],
  }
};

export default function AboutPage() {
  return <AboutClient />;
}
