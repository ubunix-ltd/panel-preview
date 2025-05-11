
'use client';

import Image from 'next/image';
import type { MediaItem } from './media-item';
import { cn } from '@/lib/utils';
import { PlayCircleIcon } from 'lucide-react';

interface ThumbnailItemProps {
  item: MediaItem;
  isSelected: boolean;
  onClick: () => void;
}

export default function ThumbnailItem({ item, isSelected, onClick }: ThumbnailItemProps) {
  const thumbnailUrl = item.thumbnailSrc || (item.type === 'image' ? item.src : `https://picsum.photos/400/225?random=${item.id}`);
  
  // Determine a generic hint for AI based on type
  const aiHint = item.type === 'image' ? 'photo still' : 'video still';

  return (
    <div
      className={cn(
        'group relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent',
        isSelected ? 'ring-2 ring-accent ring-offset-card ring-offset-2' : 'ring-1 ring-transparent hover:ring-accent/50',
        'bg-muted/50 hover:bg-muted'
      )}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
      tabIndex={0}
      aria-label={`Select ${item.title}`}
      aria-pressed={isSelected}
      role="button"
    >
      <div className="aspect-video w-full relative">
        <Image
          src={thumbnailUrl}
          alt={item.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 250px" // Example sizes, adjust as needed
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          data-ai-hint={aiHint}
          priority={isSelected} // Potentially prioritize loading selected/nearby thumbnails
        />
        {item.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
            <PlayCircleIcon className="w-12 h-12 text-white opacity-90" />
          </div>
        )}
        {/* Selection indicator (inner border removed as per request) */}
         {/* {isSelected && (
            <div className="absolute inset-0 border-2 border-accent rounded-lg pointer-events-none" />
          )} */}
      </div>
      {/* <div className="p-3">
        <h3 className="font-semibold text-sm text-card-foreground truncate" title={item.title}>{item.title}</h3>
      </div> */}
    </div>
  );
}

