
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import MediaSidebar from '@/components/media/sidebar';
import MainPreview from '@/components/media/main-preview';
import type { MediaItem } from '@/components/media/media-item';
import { mockMediaItems } from '@/lib/data'; 

const IDLE_TIMEOUT_DURATION = 30000; // 30 seconds
const AUTOPLAY_INTERVAL_DURATION = 30000; // 30 seconds for changing media

export default function MediaFlowPage() {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [allMediaItems, setAllMediaItems] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isIdle, setIsIdle] = useState(false);

  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const resetIdleTimer = useCallback(() => {
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
      autoPlayIntervalRef.current = null;
    }
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
    }
    setIsIdle(false);
    idleTimeoutRef.current = setTimeout(() => {
      setIsIdle(true);
    }, IDLE_TIMEOUT_DURATION);
  }, []); // No dependencies needed as setters and refs are stable

  useEffect(() => {
    // Simulate fetching data
    setAllMediaItems(mockMediaItems);
    if (mockMediaItems.length > 0) {
      setSelectedMedia(mockMediaItems[0]); 
    }
    setIsLoading(false);
    
    resetIdleTimer(); // Initial idle timer setup

    const activityEvents: (keyof WindowEventMap)[] = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
    activityEvents.forEach(event => window.addEventListener(event, resetIdleTimer));

    return () => {
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      if (autoPlayIntervalRef.current) clearInterval(autoPlayIntervalRef.current);
      activityEvents.forEach(event => window.removeEventListener(event, resetIdleTimer));
    };
  }, [resetIdleTimer]);

  useEffect(() => {
    if (isIdle && allMediaItems.length > 0) {
      autoPlayIntervalRef.current = setInterval(() => {
        setSelectedMedia(prevSelectedMedia => {
          if (!prevSelectedMedia && allMediaItems.length > 0) return allMediaItems[0];
          if (!prevSelectedMedia) return null;

          const currentIndex = allMediaItems.findIndex(item => item.id === prevSelectedMedia.id);
          if (currentIndex === -1 && allMediaItems.length > 0) return allMediaItems[0]; // Fallback
          if (currentIndex === -1) return null;


          const nextIndex = (currentIndex + 1) % allMediaItems.length;
          return allMediaItems[nextIndex];
        });
      }, AUTOPLAY_INTERVAL_DURATION);
    } else {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
        autoPlayIntervalRef.current = null;
      }
    }

    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }
    };
  }, [isIdle, allMediaItems]);

  const handleSelectItem = (item: MediaItem) => {
    setSelectedMedia(item);
    resetIdleTimer(); // Reset idle timer on manual selection
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <svg className="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="ml-3 text-lg text-foreground">Loading MediaFlow...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-background text-foreground overflow-hidden">
      <MediaSidebar
        items={allMediaItems}
        selectedItemId={selectedMedia?.id}
        onSelectItem={handleSelectItem}
      />
      <MainPreview media={selectedMedia} />
    </div>
  );
}
