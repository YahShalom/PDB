

import { Service, Testimonial, BlogPost, GalleryItem, FAQ, NavLink, InstagramPost, VideoItem } from './types';

const sharedConfig = {
  brand: {
    name: 'Perry D Beauty Studio',
    tagline: 'Beauty with confidence.',
    phone: '+254712345670',
    email: 'perrydbeautystudio@gmail.com',
    address: 'Kisumu Main Stage, Bus Park (Sasaline), Shop 6, Kisumu, Kenya',
    socials: {
      instagram: 'https://www.instagram.com/perry.d_studio',
      tiktok: 'https://www.tiktok.com/@perry.dbeautystudio?_r=1&_t=ZM-91feLr7qKU7',
      facebook: 'https://www.facebook.com/share/1MfjXoHmZA/'
    }
  },
  galleryImages: [
    { id: '1', src: 'https://images.unsplash.com/photo-1605497788044-5a90406436b5?q=80&w=2574&auto=format&fit=crop', category: 'Braids' },
    { id: '2', src: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=2578&auto=format&fit=crop', category: 'Makeup' },
    { id: '3', src: 'https://images.unsplash.com/photo-1635338692796-03715c907a51?q=80&w=2574&auto=format&fit=crop', category: 'Bridal' },
    { id: '4', src: 'https://images.unsplash.com/photo-1634543415848-356396956690?q=80&w=2574&auto=format&fit=crop', category: 'Braids' },
    { id: '5', src: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2670&auto=format&fit=crop', category: 'Facials' },
    { id: '6', src: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2578&auto=format&fit=crop', category: 'Bridal' },
    { id: '7', src: 'https://images.unsplash.com/photo-1512413914633-b5043f4041ea?q=80&w=2621&auto=format&fit=crop', category: 'Makeup' },
    { id: '8', src: 'https://images.unsplash.com/photo-1623838804961-39c36b6f8460?q=80&w=2574&auto=format&fit=crop', category: 'Braids' },
  ] as GalleryItem[],
  instagramPosts: [
    { id: '1', image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800', likes: 124, caption: 'Knotless braids perfection ✨ #perryd #kisumu', url: 'https://www.instagram.com/perry.d_studio' },
    { id: '2', image: 'https://images.unsplash.com/photo-1595959183082-7bce707828ac?q=80&w=800', likes: 256, caption: 'Bridal glam for our beautiful queen 💍', url: 'https://www.instagram.com/perry.d_studio' },
    { id: '3', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800', likes: 89, caption: 'Skincare Sundays. Facial treatment results.', url: 'https://www.instagram.com/perry.d_studio' },
    { id: '4', image: 'https://images.unsplash.com/photo-1607592984950-705307527636?q=80&w=800', likes: 178, caption: 'Soft glam beats. Book now via link in bio.', url: 'https://www.instagram.com/perry.d_studio' },
  ] as InstagramPost[],
  videos: [
    // Using YouTube Shorts links that mimic the TikTok content vibe (Braids, Bridal, Salon)
    // You can replace these with actual TikTok video URLs if supported, or upload the videos to YouTube Shorts
    { id: '1', title: 'POV: You booked with Perry D 😍', url: 'https://www.youtube.com/watch?v=9_fJq-3_b0w', duration: '0:45' },
    { id: '2', title: 'Bridal Transformation ✨', url: 'https://www.youtube.com/watch?v=F3a37y15e_U', duration: '0:30' },
    { id: '3', title: 'Clean Parts & Knotless Braids', url: 'https://www.youtube.com/watch?v=ysz5S6P_z-U', duration: '0:60' },
  ] as VideoItem[]
};

const enContent = {
  ...sharedConfig,
  hero: {
    title: 'Experience a New Era of African Beauty',
    subtitle: 'Bespoke braids, bridal glam, and dermatology-grade facials in Kisumu. Designed for the modern woman who demands excellence.',
    ctaPrimary: 'Book via WhatsApp',
    ctaSecondary: 'View Services',
    image: 'https://images.unsplash.com/photo-1632765854612-9b02b6ec2b3c?q=80&w=2576&auto=format&fit=crop'
  },
  premiumCTA: {
    title: 'Ready for Your Next Glow-Up?',
    text: 'Your journey to confidence starts with Perry D Beauty Studio. Book your appointment today and let our experts pamper you.',
    primaryBtn: 'Book Appointment',
    secondaryBtn: 'View Services',
    tertiaryBtn: 'Call Us'
  },
  about: {
    mission: 'Empowering beauty through confidence, professionalism, and premium beauty services designed with care.',
    vision: 'To become Kisumu’s leading beauty destination, known for excellence, authenticity, and transformative experiences.',
    coreValues: [
      { title: 'Excellence', desc: 'Delivering top-tier results in every service.' },
      { title: 'Professionalism', desc: 'Respecting your time and trust.' },
      { title: 'Cleanliness & Safety', desc: 'Strict hygiene protocols for your peace of mind.' },
      { title: 'Authentic Beauty', desc: 'Enhancing your natural features.' },
      { title: 'Customer Care', desc: 'Listening to and prioritizing your needs.' },
      { title: 'Integrity', desc: 'Honest consultations and transparent pricing.' }
    ],
    founder: {
      name: 'Beline Perrie',
      role: 'Founder & Lead Stylist',
      bio: 'Beline Perrie is a passionate beauty specialist with years of experience in protective styling, bridal glam, makeup artistry, and premium facial care. Her dedication to excellence and client satisfaction is at the heart of Perry D Beauty Studio.',
      image: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=2568&auto=format&fit=crop'
    },
    introTitle: 'More Than Just a Salon',
    introText: "Founded with a passion for confidence and style, Perry D Beauty Studio has become Kisumu's go-to destination for premium beauty care.",
    meetFounder: 'Meet the Founder'
  },
  features: [
    { title: "Hygienic & Safe", desc: "Strict sterilization protocols for every tool and station." },
    { title: "Expert Stylists", desc: "Highly trained professionals specializing in bridal and protective styles." },
    { title: "Premium Products", desc: "We use only authentic, top-tier international beauty brands." },
    { title: "Personalized Care", desc: "Bespoke consultations to tailor every look to your features." }
  ],
  services: [
    {
      id: '1',
      title: 'Protective Braids',
      description: 'Bespoke knotless braids, cornrows, and twists designed for hair health and longevity. Neat, painless, and perfectly parted.',
      price: 'From KES 1,500',
      category: 'Hair'
    },
    {
      id: '2',
      title: 'Bridal Glam',
      description: 'A luxurious bridal experience including consultation, trial, and full wedding day styling. We ensure you shine on your big day.',
      price: 'Consultation Required',
      category: 'Bridal'
    },
    {
      id: '3',
      title: 'Deep Cleansing Facial',
      description: 'Dermatology-grade facial treatments to exfoliate, hydrate, and rejuvenate your skin using premium skincare lines.',
      price: 'KES 3,000',
      category: 'Spa'
    },
    {
      id: '4',
      title: 'Soft Glam Makeup',
      description: 'The signature Perry D look. Flawless, long-wearing makeup that enhances your natural features for any occasion.',
      price: 'KES 2,500',
      category: 'Makeup'
    }
  ] as Service[],
  testimonials: [
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
  ] as Testimonial[],
  blogPosts: [
    {
      id: '1',
      title: '5 Secrets to Long-Lasting Braids',
      date: 'Oct 12, 2023',
      excerpt: 'Maintenance tips from our expert stylists to keep your protective style fresh for weeks.',
      slug: 'secrets-to-long-lasting-braids',
      image: 'https://images.unsplash.com/photo-1624803738090-a92c040d7042?q=80&w=2574&auto=format&fit=crop'
    },
    {
      id: '2',
      title: 'Bridal Makeup Trends for 2024',
      date: 'Nov 05, 2023',
      excerpt: 'From soft glam to bold lips, discover the bridal aesthetics taking over this season.',
      slug: 'bridal-makeup-trends-2024',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdd403cc2?q=80&w=2576&auto=format&fit=crop'
    },
    {
      id: '3',
      title: 'Why Monthly Facials are a Must',
      date: 'Dec 01, 2023',
      excerpt: 'Understanding the science behind skin renewal and why professional treatment matters.',
      slug: 'why-monthly-facials-are-must',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2670&auto=format&fit=crop'
    }
  ] as BlogPost[],
  faqs: [
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
  ] as FAQ[],
  navLinks: [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Blog', path: '/blog' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ] as NavLink[],
  labels: {
      bookNow: 'Book Now',
      bookViaWhatsapp: 'Book via WhatsApp',
      readMore: 'Read Article',
      viewServices: 'View Services',
      viewGallery: 'View Gallery',
      ourStory: 'Our Story',
      followUs: 'Follow Our Artistry',
      clientLove: 'Client Love',
      faqTitle: 'Frequently Asked Questions',
      signatureServices: 'Signature Services',
      whyChoose: 'The Perry D Difference',
      elevatingBeauty: 'Elevating Beauty Standards in Kisumu',
      elevatingText: "We don't just offer services; we offer an experience. From our hygienic tools to our premium product selection, every detail is curated for your comfort and confidence.",
      readyToShine: 'Ready to Shine?',
      contactTitle: 'Visit Us Today',
      sendMessage: 'Send us a message',
      openingHours: 'Opening Hours',
      portfolio: 'Portfolio',
      masterpieces: 'Our Masterpieces',
      journal: 'Journal',
      beautyWellness: 'Beauty & Wellness',
      mission: 'Our Mission',
      vision: 'Our Vision',
      coreValues: 'Core Values',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send Message',
      backHome: 'Back to Home',
      serviceMenu: 'Service Menu',
      bespokePackages: 'Bespoke Packages',
      requestQuote: 'Request a Quote',
      readyToBook: 'Ready to book?',
      chatWithUs: 'Chat with us directly to secure your slot.',
      videoGalleryTitle: 'Trending on TikTok',
      videoGalleryText: 'Catch the latest styles, transformations, and vibes directly from our TikTok feed.',
      watchVideo: 'Watch on TikTok',
      playingNow: 'Playing Now'
  }
};

const swContent = {
  ...sharedConfig,
  hero: {
    title: 'Jionee Enzi Mpya ya Urembo wa Kiafrika',
    subtitle: 'Kusuka nywele kisasa, urembo wa harusi, na matibabu ya ngozi Kisumu. Imeandaliwa kwa mwanamke wa kisasa anayependa ubora.',
    ctaPrimary: 'Weka Miadi (WhatsApp)',
    ctaSecondary: 'Tazama Huduma',
    image: 'https://images.unsplash.com/photo-1632765854612-9b02b6ec2b3c?q=80&w=2576&auto=format&fit=crop'
  },
  premiumCTA: {
    title: 'Uko Tayari Kung\'ara?',
    text: 'Safari yako ya kujiamini inaanzia Perry D Beauty Studio. Weka miadi leo na uwaache wataalamu wetu wakuhudumie.',
    primaryBtn: 'Weka Miadi',
    secondaryBtn: 'Tazama Huduma',
    tertiaryBtn: 'Tupigie Simu'
  },
  about: {
    mission: 'Kuwezesha urembo kupitia kujiamini, weledi, na huduma za hali ya juu zilizoandaliwa kwa upendo.',
    vision: 'Kuwa kituo kikuu cha urembo Kisumu, kinachojulikana kwa ubora, uhalisia, na huduma za kubadilisha maisha.',
    coreValues: [
      { title: 'Ubora', desc: 'Kutoa matokeo ya kiwango cha juu katika kila huduma.' },
      { title: 'Weledi', desc: 'Kuheshimu muda wako na imani yako kwetu.' },
      { title: 'Usafi na Usalama', desc: 'Taratibu kali za usafi kwa amani yako ya moyo.' },
      { title: 'Urembo Halisi', desc: 'Kuboresha muonekano wako wa asili.' },
      { title: 'Huduma kwa Mteja', desc: 'Kusikiliza na kuweka mahitaji yako mbele.' },
      { title: 'Uadilifu', desc: 'Ushauri wa kweli na bei wazi.' }
    ],
    founder: {
      name: 'Beline Perrie',
      role: 'Mwanzilishi & Mtindo Mkuu',
      bio: 'Beline Perrie ni mtaalamu wa urembo mwenye shauku na uzoefu wa miaka mingi katika mitindo ya kusuka, urembo wa harusi, na utunzaji wa ngozi. Kujitolea kwake kwa ubora na kuridhika kwa wateja ndio msingi wa Perry D Beauty Studio.',
      image: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=2568&auto=format&fit=crop'
    },
    introTitle: 'Zaidi ya Saluni Tu',
    introText: "Ilianzishwa kwa shauku ya kujiamini na mtindo, Perry D Beauty Studio imekuwa kimbilio la Kisumu kwa huduma za urembo za kifahari.",
    meetFounder: 'Kutana na Mwanzilishi'
  },
  features: [
    { title: "Usafi na Usalama", desc: "Taratibu kali za usafi kwa kila kifaa na kituo." },
    { title: "Wataalamu Waliobobea", desc: "Wataalamu waliofunzwa sana wanaobobea katika harusi na mitindo ya nywele." },
    { title: "Bidhaa za Kifahari", desc: "Tunatumia bidhaa halisi za kimataifa za urembo." },
    { title: "Huduma Binafsi", desc: "Ushauri maalum ili kulinganisha kila muonekano na sura yako." }
  ],
  services: [
    {
      id: '1',
      title: 'Kusuka Nywele',
      description: 'Knotless braids, cornrows, na twists zilizoundwa kwa afya ya nywele na kudumu. Safi, bila maumivu, na zilizochanganuliwa kikamilifu.',
      price: 'Kuanzia KES 1,500',
      category: 'Hair'
    },
    {
      id: '2',
      title: 'Urembo wa Harusi',
      description: 'Uzoefu wa kifahari wa harusi ikiwa ni pamoja na ushauri, majaribio, na mtindo kamili wa siku ya harusi. Tunahakikisha unang\'ara siku yako kuu.',
      price: 'Ushauri Unahitajika',
      category: 'Bridal'
    },
    {
      id: '3',
      title: 'Matibabu ya Uso (Facial)',
      description: 'Matibabu ya uso ya kiwango cha daktari wa ngozi ili kusafisha, kulainisha, na kufufua ngozi yako kwa kutumia bidhaa za juu.',
      price: 'KES 3,000',
      category: 'Spa'
    },
    {
      id: '4',
      title: 'Vipodozi (Soft Glam)',
      description: 'Muonekano maalum wa Perry D. Vipodozi visivyo na kasoro, vya kudumu ambavyo vinaongeza uzuri wako wa asili kwa hafla yoyote.',
      price: 'KES 2,500',
      category: 'Makeup'
    }
  ] as Service[],
  testimonials: [
    {
      id: '1',
      name: 'Akinyi O.',
      quote: 'Mazingira ni ya kipekee Kisumu. Kusuka hakukuwa na maumivu, ni safi, na huduma ni ya hali ya juu.',
      rating: 5
    },
    {
      id: '2',
      name: 'Sarah M.',
      quote: 'Perry D alinifanya nijisikie kama malkia siku ya harusi yangu. Vipodozi vilikuwa safi na vilidumu usiku kucha.',
      rating: 5
    },
    {
      id: '3',
      name: 'Linda K.',
      quote: 'Hatimaye, saluni inayoelewa usafi na huduma kwa wateja. Usoni wangu uling\'ara baada ya matibabu.',
      rating: 5
    }
  ] as Testimonial[],
  blogPosts: [
    {
      id: '1',
      title: 'Siri 5 za Nywele Kudumu',
      date: 'Oct 12, 2023',
      excerpt: 'Vidokezo vya utunzaji kutoka kwa wataalamu wetu ili kuweka mtindo wako mpya kwa wiki.',
      slug: 'secrets-to-long-lasting-braids',
      image: 'https://images.unsplash.com/photo-1624803738090-a92c040d7042?q=80&w=2574&auto=format&fit=crop'
    },
    {
      id: '2',
      title: 'Mitindo ya Harusi 2024',
      date: 'Nov 05, 2023',
      excerpt: 'Kutoka urembo laini hadi midomo mikali, gundua mitindo ya harusi inayotamba msimu huu.',
      slug: 'bridal-makeup-trends-2024',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdd403cc2?q=80&w=2576&auto=format&fit=crop'
    },
    {
      id: '3',
      title: 'Kwanini Facial ni Muhimu',
      date: 'Dec 01, 2023',
      excerpt: 'Kuelewa sayansi nyuma ya kufufua ngozi na kwa nini matibabu ya kitaalamu ni muhimu.',
      slug: 'why-monthly-facials-are-must',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2670&auto=format&fit=crop'
    }
  ] as BlogPost[],
  faqs: [
    {
      id: '1',
      question: 'Je, ninawezaje kuweka miadi?',
      answer: 'Tunapendelea kuweka miadi kupitia WhatsApp ili kuhakikisha tunaweza kujadili mahitaji yako maalum. Bonyeza kitufe cha "Weka Miadi (WhatsApp)" kuanza mazungumzo nasi.'
    },
    {
      id: '2',
      question: 'Je, ninahitaji kulipa amana?',
      answer: 'Ndio, amana ndogo inahitajika ili kuhifadhi nafasi yako, haswa kwa vifurushi vya kusuka na harusi. Hii hukatwa kutoka kwa bili yako ya mwisho.'
    },
    {
      id: '3',
      question: 'Kusuka huchukua muda gani?',
      answer: 'Muda hutegemea saizi na urefu, lakini kwa kawaida huanzia masaa 4 hadi 6. Tuna eneo la kusubiri lenye starehe na Wi-Fi kwa ajili yako.'
    },
    {
      id: '4',
      question: 'Je, mnatoa majaribio ya harusi?',
      answer: 'Kabisa. Tunapendekeza sana jaribio la harusi wiki 2-3 kabla ya siku yako ya harusi ili kuboresha muonekano wako.'
    },
    {
      id: '5',
      question: 'Mnatumia bidhaa gani?',
      answer: 'Tunatumia bidhaa halisi za kimataifa kwa vipodozi na matibabu yote ya ngozi ili kuhakikisha usalama na matokeo bora.'
    }
  ] as FAQ[],
  navLinks: [
    { label: 'Nyumbani', path: '/' },
    { label: 'Huduma', path: '/services' },
    { label: 'Matukio', path: '/gallery' },
    { label: 'Blogu', path: '/blog' },
    { label: 'Kutuhusu', path: '/about' },
    { label: 'Wasiliana', path: '/contact' },
  ] as NavLink[],
  labels: {
      bookNow: 'Weka Miadi',
      bookViaWhatsapp: 'Weka Miadi (WhatsApp)',
      readMore: 'Soma Zaidi',
      viewServices: 'Tazama Huduma',
      viewGallery: 'Tazama Picha',
      ourStory: 'Hadithi Yetu',
      followUs: 'Tufuate Instagram',
      clientLove: 'Wateja Wanasema',
      faqTitle: 'Maswali Yanayoulizwa Mara kwa Mara',
      signatureServices: 'Huduma Zetu',
      whyChoose: 'Tofauti ya Perry D',
      elevatingBeauty: 'Kuinua Viwango vya Urembo Kisumu',
      elevatingText: "Hatutoi huduma tu; tunatoa uzoefu. Kutoka kwa vifaa vyetu safi hadi uteuzi wetu wa bidhaa za kifahari, kila undani umezingatiwa kwa faraja na kujiamini kwako.",
      readyToShine: 'Uko Tayari Kung\'ara?',
      contactTitle: 'Tutembelee Leo',
      sendMessage: 'Tutumie Ujumbe',
      openingHours: 'Saa za Kufungua',
      portfolio: 'Picha Zetu',
      masterpieces: 'Kazi Zetu',
      journal: 'Jarida',
      beautyWellness: 'Urembo na Afya',
      mission: 'Dhumuni Letu',
      vision: 'Maono Yetu',
      coreValues: 'Maadili Yetu',
      name: 'Jina',
      email: 'Barua Pepe',
      message: 'Ujumbe',
      send: 'Tuma Ujumbe',
      backHome: 'Rudi Nyumbani',
      serviceMenu: 'Orodha ya Huduma',
      bespokePackages: 'Vifurushi Maalum',
      requestQuote: 'Omba Nukuu',
      readyToBook: 'Uko tayari?',
      chatWithUs: 'Ongea nasi moja kwa moja ili kuhifadhi nafasi yako.',
      videoGalleryTitle: 'Inavuma TikTok',
      videoGalleryText: 'Tazama mitindo mipya, mabadiliko, na burudani moja kwa moja kutoka kwa ukurasa wetu wa TikTok.',
      watchVideo: 'Tazama TikTok',
      playingNow: 'Inacheza Sasa'
  }
};

export { enContent, swContent };
