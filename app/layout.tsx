import React from 'react';
import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "@/components/Providers";
import CookieConsent from "@/components/CookieConsent";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair",
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#050509',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://perrydstudio.com'),
  title: {
    default: "Perry D Beauty Studio | Premium Beauty Salon in Kisumu, Kenya",
    template: "%s | Perry D Beauty Studio"
  },
  description: "Kisumu's premier beauty destination for bespoke hair braiding, professional bridal makeup, and dermatology-grade facials. Experience African beauty redefined.",
  keywords: ["Beauty Salon Kisumu", "Hair Braiding Kisumu", "Bridal Makeup Kenya", "Salon near Kisumu Bus Park", "Skin Care Kisumu", "African Hair Styling", "Knotless Braids Kisumu"],
  authors: [{ name: "Beline Perrie" }],
  creator: "Perry D Beauty Studio",
  publisher: "Perry D Beauty Studio",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://perrydstudio.com",
    siteName: "Perry D Beauty Studio",
    title: "Perry D Beauty Studio | Elevating Beauty Standards in Kisumu",
    description: "Bespoke hair, bridal glam, and premium skincare in the heart of Kisumu.",
    images: [{ 
      url: "/og-main.jpg", 
      width: 1200, 
      height: 630, 
      alt: "Perry D Beauty Studio Interior" 
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Perry D Beauty Studio | Kisumu's Best Salon",
    description: "Experience premium beauty services in Kisumu, Kenya. Braids, Makeup, and Facials.",
    images: ["/og-main.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": "Perry D Beauty Studio",
    "image": "https://perrydstudio.com/og-main.jpg",
    "description": "Premium beauty salon in Kisumu offering bespoke hair braiding, bridal services, and facials.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kisumu Main Stage, Bus Park (Sasaline), Shop 6",
      "addressLocality": "Kisumu",
      "addressCountry": "KE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -0.0909986,
      "longitude": 34.7644213
    },
    "url": "https://perrydstudio.com",
    "telephone": "+254712345670",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "19:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "priceRange": "$$"
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Correctly use self-closing script tag with dangerouslySetInnerHTML to avoid children-related type errors in JSX for LD+JSON blocks */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <Providers>
          <div className="flex flex-col min-h-screen relative">
            <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] dark:opacity-[0.05] bg-repeat" 
                 style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/shattered-island.png')` }}>
            </div>
            
            <Navbar />
            <main className="flex-grow relative z-10">
              {children}
            </main>
            <Footer />
            <CookieConsent />
          </div>
        </Providers>
      </body>
    </html>
  );
}
