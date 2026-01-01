'use client';
import React, { useEffect, useState } from 'react';
import { GalleryImage } from '@/lib/cmsTypes';
import { Trash2, Star } from 'lucide-react';

export default function GalleryAdmin() {
  const [images, setImages] = useState<GalleryImage[]>([]);

  const fetchImages = () => fetch('/api/cms/gallery').then(res => res.json()).then(setImages);
  useEffect(() => { fetchImages(); }, []);

  const handleDelete = async (img: GalleryImage) => {
    if(!confirm('Delete this image?')) return;
    await fetch(`/api/cms/gallery/${img.id}`, {
        method: 'DELETE',
        body: JSON.stringify({ path: img.path })
    });
    fetchImages();
  };

  const toggleHero = async (img: GalleryImage) => {
    await fetch(`/api/cms/gallery/${img.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isHeroFeatured: !img.isHeroFeatured })
    });
    fetchImages();
  };

  return (
    <div className="max-w-6xl">
       <h1 className="text-3xl font-serif font-bold mb-8">Gallery & Hero Images</h1>
       
       <div className="bg-white p-6 rounded-xl border border-gray-200 mb-8">
          <h2 className="font-bold mb-2">Upload New Image</h2>
          <p className="text-sm text-gray-500">
            Uploads are disabled. Configure Supabase Storage to re-enable gallery uploads.
          </p>
       </div>

       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {images.map(img => (
             <div key={img.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group">
                <div className="aspect-square relative">
                   <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                   {img.isHeroFeatured && <div className="absolute top-2 right-2 bg-gold text-white p-1 rounded-full"><Star size={12} fill="currentColor" /></div>}
                </div>
                <div className="p-3">
                   <p className="text-xs text-gray-500 truncate mb-2">{img.title}</p>
                   <div className="flex justify-between items-center">
                      <button 
                         onClick={() => toggleHero(img)}
                         className={`text-xs px-2 py-1 rounded border ${img.isHeroFeatured ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : 'text-gray-500 border-gray-200'}`}
                      >
                         {img.isHeroFeatured ? 'Hero ★' : 'Set Hero'}
                      </button>
                      <button onClick={() => handleDelete(img)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                   </div>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
}
