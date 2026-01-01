
import React from 'react';
import type { Metadata } from 'next';
import BlogClient from '@/components/BlogClient';

export const metadata: Metadata = {
  title: "Beauty Blog | Expert Tips & Trends",
  description: "Read the latest from Perry D Beauty Studio. Maintenance secrets for braids, bridal trends, and skincare wellness advice.",
  openGraph: {
    title: "Beauty & Wellness Journal | Perry D Studio",
    description: "Empowering your beauty journey with expert knowledge.",
    images: ['/og-blog.jpg'],
  }
};

export default function BlogPage() {
  return <BlogClient />;
}
