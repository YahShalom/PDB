export type ContentBlock = {
  id: string;          // Firestore doc id
  key: string;         // e.g. "hero.title"
  value: string;       // plain text
  updatedAt: string;   // ISO datetime
};

export type Service = {
  id: string;
  name: string;
  description: string;
  durationMinutes?: number;
  basePrice?: string; // Changed to string to match existing "From KES 1,500" format
  category?: string;    // e.g. "Hair", "Makeup", "Bridal"
  position: number;
  isFeatured: boolean;
};

export type Testimonial = {
  id: string;
  clientName: string;
  location?: string;
  rating: number;       // 1–5
  text: string;
  position: number;
  featured: boolean;
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
  position: number;
};

export type GalleryImage = {
  id: string;
  title?: string;
  description?: string;
  url: string;          // public https download url
  path: string;         // storage path
  isHeroFeatured: boolean;
  position: number;
  source: 'UPLOAD' | 'INSTAGRAM' | 'TIKTOK' | 'FACEBOOK';
  createdAt: string;
  category?: 'Braids' | 'Bridal' | 'Makeup' | 'Facials' | 'All'; // align with gallery filter
};
