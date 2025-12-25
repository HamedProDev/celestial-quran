import { useState } from "react";
import { Bookmark, Lightbulb, Share2, Volume2, BookmarkCheck } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface VerseCardProps {
  verseNumber: number;
  arabicText: string;
  translation: string;
  surahNumber?: number;
  surahName?: string;
  onBookmark?: () => void;
  onPlayAudio?: () => void;
  isBookmarked?: boolean;
  isPlaying?: boolean;
}

const VerseCard = ({
  verseNumber,
  arabicText,
  translation,
  surahNumber = 1,
  surahName,
  onBookmark,
  onPlayAudio,
  isBookmarked = false,
  isPlaying = false,
}: VerseCardProps) => {
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    onBookmark?.();
    toast({
      title: bookmarked ? "Bookmark Removed" : "Verse Preserved",
      description: bookmarked 
        ? "Verse removed from your sacred collection" 
        : "Verse preserved in your sacred collection",
    });
  };

  const handleReflect = () => {
    toast({
      title: "Reflection Mode",
      description: "Reflection saved to your spiritual journal",
    });
  };

  const handleShare = async () => {
    const shareText = `${arabicText}\n\n${translation}\n\n- Quran ${surahNumber}:${verseNumber}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Quran ${surahNumber}:${verseNumber}`,
          text: shareText,
        });
      } catch {
        // User cancelled sharing
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      toast({
        title: "Divine Light Shared",
        description: "Verse copied to clipboard",
      });
    }
  };

  const handlePlayAudio = () => {
    onPlayAudio?.();
    toast({
      title: "Celestial Recitation",
      description: "Divine recitation initiated",
    });
  };

  return (
    <div className="verse-container group animate-celestial-fade">
      {/* Verse Number Badge */}
      <div className="verse-badge">
        {verseNumber}
      </div>

      {/* Arabic Text */}
      <div className="mt-4 mb-6">
        <p className="font-arabic text-2xl md:text-3xl lg:text-4xl leading-[3.2] text-foreground text-glow-subtle">
          {arabicText}
        </p>
      </div>

      {/* Translation */}
      <div className="relative pt-6 border-t border-primary/20">
        <span className="absolute -top-3 left-0 bg-background px-3 text-primary text-sm tracking-widest font-ui">
          Translation
        </span>
        <p className="text-secondary-foreground text-lg md:text-xl leading-relaxed">
          {translation}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 mt-6">
        <button
          onClick={handleBookmark}
          className="verse-action-btn flex items-center gap-2 px-5 py-2 rounded-full bg-secondary/70 border border-primary/30 text-secondary-foreground hover:bg-primary/10 hover:-translate-y-1 hover:border-primary transition-all duration-300 font-ui text-sm"
        >
          {bookmarked ? (
            <BookmarkCheck className="w-4 h-4 text-primary" />
          ) : (
            <Bookmark className="w-4 h-4" />
          )}
          <span>{bookmarked ? "Preserved" : "Preserve"}</span>
        </button>

        <button
          onClick={handleReflect}
          className="verse-action-btn flex items-center gap-2 px-5 py-2 rounded-full bg-secondary/70 border border-primary/30 text-secondary-foreground hover:bg-primary/10 hover:-translate-y-1 hover:border-primary transition-all duration-300 font-ui text-sm"
        >
          <Lightbulb className="w-4 h-4" />
          <span>Reflect</span>
        </button>

        <button
          onClick={handleShare}
          className="verse-action-btn flex items-center gap-2 px-5 py-2 rounded-full bg-secondary/70 border border-primary/30 text-secondary-foreground hover:bg-primary/10 hover:-translate-y-1 hover:border-primary transition-all duration-300 font-ui text-sm"
        >
          <Share2 className="w-4 h-4" />
          <span>Share Light</span>
        </button>

        <button
          onClick={handlePlayAudio}
          className="verse-action-btn flex items-center gap-2 px-5 py-2 rounded-full bg-secondary/70 border border-primary/30 text-secondary-foreground hover:bg-primary/10 hover:-translate-y-1 hover:border-primary transition-all duration-300 font-ui text-sm"
        >
          <Volume2 className="w-4 h-4" />
          <span>Listen Divine</span>
        </button>
      </div>
    </div>
  );
};

export default VerseCard;
