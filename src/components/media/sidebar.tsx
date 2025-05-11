import type { MediaItem } from './media-item';
import ThumbnailItem from './thumbnail-item';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MediaSidebarProps {
  items: MediaItem[];
  selectedItemId: string | undefined;
  onSelectItem: (item: MediaItem) => void;
}

export default function MediaSidebar({ items, selectedItemId, onSelectItem }: MediaSidebarProps) {
  return (
    <aside className="w-full lg:w-[300px] xl:w-[350px] 2xl:w-[400px] bg-card text-card-foreground shadow-2xl lg:h-screen flex flex-col">
      <div className="p-4 border-b border-border flex items-center">
        <img src="https://qjjklyugfxbxgwqhanfs.supabase.co/storage/v1/object/public/fraud//logo.png" alt="MediaFlow Logo" className="h-11  w-auto mb-2" />
        <h2 className="text-2xl font-bold text-card-foreground ml-4 font-vodafone">Fraud Awareness</h2>
      </div>
      <ScrollArea className="flex-1 p-4">
        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {items.map((item) => (
              <ThumbnailItem
                key={item.id}
                item={item}
                isSelected={item.id === selectedItemId}
                onClick={() => onSelectItem(item)}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">No media items available.</p>
          </div>
        )}
      </ScrollArea>
    </aside>
  );
}

