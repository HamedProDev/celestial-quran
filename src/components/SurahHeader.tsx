import { Clock, Star, FileText } from "lucide-react";

interface SurahHeaderProps {
  arabicName: string;
  englishName: string;
  englishNameTranslation: string;
  versesCount: number;
  revelationType: string;
}

const SurahHeader = ({
  arabicName,
  englishName,
  englishNameTranslation,
  versesCount,
  revelationType,
}: SurahHeaderProps) => {
  return (
    <div className="text-center mb-12 relative pb-8 surah-header-line">
      {/* Bismillah */}
      <div className="font-arabic text-4xl text-primary/30 mb-4 select-none">
        ﷽
      </div>
      
      {/* Arabic Name */}
      <h1 className="font-arabic text-5xl md:text-6xl lg:text-7xl text-primary text-glow mb-4">
        {arabicName}
      </h1>
      
      {/* English Name */}
      <h2 className="text-xl md:text-2xl text-secondary-foreground tracking-widest uppercase mb-4 font-ui font-light">
        {englishName} • {englishNameTranslation}
      </h2>
      
      {/* Info */}
      <div className="flex justify-center gap-6 md:gap-12 text-secondary-foreground/80 text-sm md:text-base font-ui">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" />
          <span>{versesCount} Verses</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          <span>{revelationType} Revelation</span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-primary" />
          <span>The Essence</span>
        </div>
      </div>
    </div>
  );
};

export default SurahHeader;
