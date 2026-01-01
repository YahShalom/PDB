
export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  category: 'Hair' | 'Makeup' | 'Spa' | 'Bridal';
  duration_mins?: number;
  is_featured?: boolean;
  is_active?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  quote: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  image?: string;
}

export interface NavLink {
  label: string;
  path: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  category: 'Braids' | 'Bridal' | 'Makeup' | 'Facials';
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface InstagramPost {
  id: string;
  image: string;
  likes: number;
  caption: string;
  url: string;
}

export interface VideoItem {
  id: string;
  title: string;
  url: string;
  thumbnail?: string;
  duration?: string;
}
