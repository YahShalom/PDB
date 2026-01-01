
import React from 'react';
import type { Metadata } from 'next';
import GalleryClient from '@/components/GalleryClient';

export const metadata: Metadata = {
  title: "Portfolio | Hair & Makeup Artistry Masterpieces",
  description: "Browse our curated collection of real transformations. From bespoke braids to flawless bridal makeup in Kisumu.",
  openGraph: {
    title: "Gallery | Perry D Beauty Studio",
    description: "Witness the artistry of Kisumu's premier beauty studio.",
    images: ['/og-gallery.jpg'],
  }
};

export default function GalleryPage() {
  return <GalleryClient />;
}
