'use client';

import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { Play, Pause } from 'lucide-react';
import { useContent } from './LanguageContext';
import ScrollReveal from './ScrollReveal';

const VideoSection: React.FC = () => {
  const { content } = useContent();
  const { videos, labels } = content;
  const [currentVideo, setCurrentVideo] = useState(videos[0]);
  const [playing, setPlaying] = useState(false);

  if (!videos || videos.length === 0) return null;

  return (
    <section className="py-24 bg-white dark:bg-charcoal-900 relative overflow-hidden">
       {/* Background Decoration */}
       <div className="absolute inset-0 bg-gold/5 opacity-50 pointer-events-none"></div>
       
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
             <div className="text-center mb-16">
               <span className="text-gold font-bold tracking-widest text-xs uppercase mb-3 block">{labels.videoGalleryTitle}</span>
               <h2 className="text-4xl md:text-5xl font-serif font-medium text-charcoal dark:text-cream mb-4">{labels.videoGalleryTitle}</h2>
               <p className="text-charcoal-600 dark:text-cream-200/70 text-lg font-light max-w-2xl mx-auto">
                 {labels.videoGalleryText}
               </p>
             </div>
          </ScrollReveal>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
             {/* Main Player */}
             <div className="w-full lg:w-2/3">
                <ScrollReveal>
                   <div className="rounded-2xl overflow-hidden shadow-2xl floating-card gold-border-gradient aspect-video bg-black relative group">
                      <ReactPlayer 
                         url={currentVideo.url} 
                         width="100%" 
                         height="100%" 
                         controls={true}
                         playing={playing}
                         onPlay={() => setPlaying(true)}
                         onPause={() => setPlaying(false)}
                         light={true} // Shows thumbnail first
                         playIcon={
                            <div className="w-20 h-20 bg-gold/90 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-gold-glow">
                               <Play fill="black" className="text-black ml-1" size={32} />
                            </div>
                         }
                      />
                   </div>
                   <div className="mt-6">
                      <h3 className="text-2xl font-serif font-medium text-charcoal dark:text-cream mb-2">{currentVideo.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        <p className="text-gold font-bold text-xs uppercase tracking-widest">{labels.playingNow}</p>
                      </div>
                   </div>
                </ScrollReveal>
             </div>

             {/* Playlist Side */}
             <div className="w-full lg:w-1/3 flex flex-col gap-4">
                {videos.map((video, idx) => (
                   <ScrollReveal key={video.id} delay={`${idx * 0.1}s`}>
                      <div 
                         onClick={() => {
                            setCurrentVideo(video);
                            setPlaying(true);
                         }}
                         className={`p-4 rounded-xl cursor-pointer transition-all duration-300 flex items-center gap-4 group ${
                            currentVideo.id === video.id 
                            ? 'bg-charcoal text-white gold-border-gradient' 
                            : 'bg-cream-50 dark:bg-charcoal-800 hover:bg-gold/10 dark:hover:bg-charcoal-700'
                         }`}
                      >
                         <div className="w-24 h-16 bg-gray-300 rounded-lg overflow-hidden relative flex-shrink-0">
                            {/* Simple thumbnail placeholder if standard thumbnail fetch isn't used */}
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                               <Play fill="white" className="text-white w-6 h-6 opacity-80" />
                            </div>
                            <img 
                               src={`https://img.youtube.com/vi/${video.url.split('v=')[1]}/0.jpg`} 
                               alt={video.title} 
                               className="w-full h-full object-cover"
                               onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x100?text=Video';
                               }}
                            />
                         </div>
                         <div className="flex-grow">
                            <h4 className={`font-medium text-sm mb-1 ${
                               currentVideo.id === video.id ? 'text-gold' : 'text-charcoal dark:text-cream group-hover:text-gold'
                            }`}>
                               {video.title}
                            </h4>
                            <span className={`text-xs ${
                               currentVideo.id === video.id ? 'text-gray-300' : 'text-gray-500 dark:text-gray-400'
                            }`}>
                               {video.duration}
                            </span>
                         </div>
                      </div>
                   </ScrollReveal>
                ))}
             </div>
          </div>
       </div>
    </section>
  );
};

export default VideoSection;
