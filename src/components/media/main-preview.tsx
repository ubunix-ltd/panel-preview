
'use client';

import React from 'react';
import Image from 'next/image';
import type { MediaItem } from './media-item';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';


interface MainPreviewProps {
  media: MediaItem | null;
}

export default function MainPreview({ media }: MainPreviewProps) {
  if (!media) {
    return (
      <main className="flex-1 flex items-center justify-center p-4 lg:p-8">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image-plus mx-auto text-muted-foreground mb-4 opacity-50"><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"/><line x1="16" x2="22" y1="5" y2="5"/><line x1="19" x2="19" y1="2" y2="8"/><path d="M10.33 16.5L7 12l-2.33 2.79"/><path d="m14.298 12.759 1.68-2.014a.95.95 0 0 1 1.42 0l.662.794"/></svg>
          <p className="text-xl text-muted-foreground">Select an item from the library to preview.</p>
        </div>
      </main>
    );
  }
  
  // Determine a generic hint for AI based on type
  const aiHint = media.type === 'image' ? 'selected image' : 'selected video';

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 overflow-auto" style={{
      backgroundImage: "url(https://qjjklyugfxbxgwqhanfs.supabase.co/storage/v1/object/public/background//background.jpg)",
      backgroundPositionY: "center",
      // backgroundSize: "cover",
      // backgroundPosition: "bottom",
    }}>
      {/* Using React.Fragment with a key to trigger re-render and animation on media change */}
      <div key={media.id} className="w-full flex flex-col items-center animate-fadeInScaleUp">
        <div className="w-full max-w-4xl xl:max-w-5xl 2xl:max-w-6xl aspect-video rounded-xl  overflow-hidden mb-6" style={{
          background: 'none',
        }}>
          {media.type === 'image' ? (
            <Image
              src={media.src}
              alt={media.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1200px"
              className="object-contain select-none"
              priority
              data-ai-hint={aiHint}
            />
          ) : (
            <video
              src={media.src}
              controls
              autoPlay
              muted
              loop
              className="w-full h-full object-contain select-none bg-black"
              poster={media.thumbnailSrc || `https://picsum.photos/1920/1080?random=${media.id}-poster`}
              data-ai-hint={aiHint}
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        
        {/* <Card className="w-full max-w-4xl xl:max-w-5xl 2xl:max-w-6xl bg-transparent border-border shadow-xl animate-fadeInDelay backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-2xl lg:text-3xl font-bold text-foreground">{media.title}</CardTitle>
          </CardHeader>
          {media.description && (
            <CardContent>
              <CardDescription className="text-base lg:text-lg text-muted-foreground">{media.description}</CardDescription>
            </CardContent>
          )}
        </Card> */}
      </div>
    </main>
  );
}

