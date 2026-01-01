'use client';

import React, { useEffect } from 'react';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('App error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-cream text-charcoal flex items-center justify-center px-6">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl border border-charcoal-100 p-8">
        <h1 className="text-2xl font-serif font-bold mb-4">Something went wrong</h1>
        <p className="text-sm text-charcoal-600 mb-4 break-words">
          {error.message || 'Unknown error'}
        </p>
        {error.digest && (
          <p className="text-xs text-charcoal-500 mb-6">Digest: {error.digest}</p>
        )}
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center px-6 py-2 rounded-full bg-gold text-charcoal-900 font-bold"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
