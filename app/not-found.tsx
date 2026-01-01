import React from 'react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream text-charcoal flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <h1 className="text-3xl font-serif font-bold mb-4">Page not found</h1>
        <p className="text-sm text-charcoal-600">
          The page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
}
