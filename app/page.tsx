
import React from 'react';
import type { Metadata } from 'next';
import HomeClient from '@/components/HomeClient';
import { getFeaturedServices } from '@/lib/services';

export const metadata: Metadata = {
  title: "Premium Beauty Salon in Kisumu | Perry D Beauty Studio",
  description: "Experience the ultimate beauty transformation in Kisumu. From bespoke braids to bridal glam, Perry D Beauty Studio elevates your confidence with professional care.",
  openGraph: {
    title: "Perry D Beauty Studio - Kisumu's Premier Salon",
    description: "Discover bespoke hair, professional bridal makeup, and premium skincare in Kisumu.",
    images: ['/og-home.jpg'],
  }
};

export default async function Home() {
  const featuredServices = await getFeaturedServices(6);
  return <HomeClient featuredServices={featuredServices} />;
}
