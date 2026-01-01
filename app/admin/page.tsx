'use client';
import React from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-serif font-bold mb-6">Welcome, Belin!</h1>
      <p className="text-gray-600 mb-8 max-w-2xl">
        Manage your website content here. Changes made here will update the public website immediately.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard title="Edit Text" desc="Update titles, descriptions, and buttons." href="/admin/content" />
        <DashboardCard title="Manage Services" desc="Add or change prices and descriptions." href="/admin/services" />
        <DashboardCard title="Testimonials" desc="Add client reviews." href="/admin/testimonials" />
        <DashboardCard title="FAQs" desc="Update common questions." href="/admin/faqs" />
        <DashboardCard title="Gallery" desc="Upload new photos." href="/admin/gallery" />
      </div>
    </div>
  );
}

function DashboardCard({ title, desc, href }: { title: string, desc: string, href: string }) {
  return (
    <Link href={href} className="block p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all hover:border-gold">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-500 text-sm">{desc}</p>
    </Link>
  );
}
