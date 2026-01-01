
import { NavLink, Service, Testimonial, BlogPost, GalleryItem, FAQ } from './types';

export const BRAND = {
  name: 'Perry D Beauty Studio',
  tagline: 'Beauty with confidence.',
  phone: '+254712345670', // Updated number from prompt
  email: 'perrydbeautystudio@gmail.com',
  address: 'Kisumu, Kenya',
  socials: {
    instagram: 'https://www.instagram.com/perry.d_studio',
    tiktok: 'https://www.tiktok.com/@perry.dbeautystudio',
    facebook: 'https://www.facebook.com/share/1MfjXoHmZA/'
  }
};

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Blog', path: '/blog' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Protective Braids',
    description: 'Bespoke knotless braids, cornrows, and twists designed for hair health and longevity.',
    price: 'From KES 1,500',
    category: 'Hair',
    duration_mins: 240,
    is_featured: true
  },
  {
    id: '2',
    title: 'Bridal Glam',
    description: 'A luxurious bridal experience including consultation, trial, and full wedding day styling.',
    price: 'Consultation Required',
    category: 'Bridal',
    duration_mins: 180,
    is_featured: true
  },
  {
    id: '3',
    title: 'Deep Cleansing Facial',
    description: 'Dermatology-grade facial treatments to exfoliate, hydrate, and rejuvenate your skin.',
    price: 'KES 3,000',
    category: 'Spa',
    duration_mins: 60,
    is_featured: false
  },
  {
    id: '4',
    title: 'Soft Glam Makeup',
    description: 'The signature Perry D look. Flawless, long-wearing makeup that enhances your natural features.',
    price: 'KES 2,500',
    category: 'Makeup',
    duration_mins: 90,
    is_featured: false
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Akinyi O.',
    quote: 'The ambiance is unmatched in Kisumu. My braids were painless, neat, and the gold standard of service.',
    rating: 5
  },
  {
    id: '2',
    name: 'Sarah M.',
    quote: 'Perry D made me feel like royalty on my wedding day. The makeup was flawless and lasted all night.',
    rating: 5
  },
  {
    id: '3',
    name: 'Linda K.',
    quote: 'Finally, a salon that understands hygiene and customer care. The facial left my skin glowing.',
    rating: 5
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: '5 Secrets to Long-Lasting Braids',
    date: 'Oct 12, 2023',
    excerpt: 'Maintenance tips from our expert stylists to keep your protective style fresh for weeks.',
    slug: 'secrets-to-long-lasting-braids'
  },
  {
    id: '2',
    title: 'Bridal Makeup Trends for 2024',
    date: 'Nov 05, 2023',
    excerpt: 'From soft glam to bold lips, discover the bridal aesthetics taking over this season.',
    slug: 'bridal-makeup-trends-2024'
  },
  {
    id: '3',
    title: 'Why Monthly Facials are a Must',
    date: 'Dec 01, 2023',
    excerpt: 'Understanding the science behind skin renewal and why professional treatment matters.',
    slug: 'why-monthly-facials-are-must'
  }
];

export const GALLERY_IMAGES: GalleryItem[] = [
  { id: '1', src: 'https://picsum.photos/600/800?random=1', category: 'Braids' },
  { id: '2', src: 'https://picsum.photos/600/800?random=2', category: 'Makeup' },
  { id: '3', src: 'https://picsum.photos/600/800?random=3', category: 'Bridal' },
  { id: '4', src: 'https://picsum.photos/600/800?random=4', category: 'Braids' },
  { id: '5', src: 'https://picsum.photos/600/800?random=5', category: 'Facials' },
  { id: '6', src: 'https://picsum.photos/600/800?random=6', category: 'Bridal' },
  { id: '7', src: 'https://picsum.photos/600/800?random=7', category: 'Makeup' },
  { id: '8', src: 'https://picsum.photos/600/800?random=8', category: 'Braids' },
];

export const FAQS: FAQ[] = [
  {
    id: '1',
    question: 'How do I book an appointment?',
    answer: 'We prioritize bookings via WhatsApp to ensure we can discuss your specific needs. Click the "Book via WhatsApp" button to start a chat with us.'
  },
  {
    id: '2',
    question: 'Do I need to pay a deposit?',
    answer: 'Yes, a small deposit is required to secure your slot, especially for braids and bridal packages. This is deducted from your final bill.'
  },
  {
    id: '3',
    question: 'How long do knotless braids take?',
    answer: 'Duration depends on the size and length, but typically ranges from 4 to 6 hours. We have a comfortable waiting area and Wi-Fi for your convenience.'
  },
  {
    id: '4',
    question: 'Do you offer bridal trials?',
    answer: 'Absolutely. We highly recommend a bridal trial 2-3 weeks before your wedding day to perfect your look.'
  },
  {
    id: '5',
    question: 'What products do you use?',
    answer: 'We use premium, authentic international brands for all makeup and skin treatments to ensure safety and longevity.'
  }
];
