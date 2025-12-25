import { useState, useEffect } from "react";
import SurahHeader from "@/components/SurahHeader";
import VerseCard from "@/components/VerseCard";
import SurahNavigator from "@/components/SurahNavigator";
import ProgressRing from "@/components/ProgressRing";

// Sample data for Al-Fatihah
const alFatihah = {
  number: 1,
  arabicName: "سُورَةُ الْفَاتِحَة",
  englishName: "Al-Fatihah",
  englishNameTranslation: "The Opening",
  versesCount: 7,
  revelationType: "Meccan",
  verses: [
    {
      number: 1,
      arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
    },
    {
      number: 2,
      arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
      translation: "[All] praise is [due] to Allah, Lord of the worlds.",
    },
    {
      number: 3,
      arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
      translation: "The Entirely Merciful, the Especially Merciful.",
    },
    {
      number: 4,
      arabic: "مَالِكِ يَوْمِ الدِّينِ",
      translation: "Sovereign of the Day of Recompense.",
    },
    {
      number: 5,
      arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
      translation: "It is You we worship and You we ask for help.",
    },
    {
      number: 6,
      arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
      translation: "Guide us to the straight path.",
    },
    {
      number: 7,
      arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
      translation: "The path of those upon whom You have bestowed favor, not of those who have earned [Your] anger or of those who are astray.",
    },
  ],
};

const QuranReader = () => {
  const [currentVerse, setCurrentVerse] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Calculate progress based on scroll
    const handleScroll = () => {
      const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      setProgress(Math.min(100, Math.max(0, scrolled)));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleVerseClick = (verse: number) => {
    setCurrentVerse(verse);
    const element = document.getElementById(`verse-${verse}`);
    element?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handlePlayAudio = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="animate-celestial-fade">
      <SurahHeader
        arabicName={alFatihah.arabicName}
        englishName={alFatihah.englishName}
        englishNameTranslation={alFatihah.englishNameTranslation}
        versesCount={alFatihah.versesCount}
        revelationType={alFatihah.revelationType}
      />

      <div className="space-y-8 max-w-4xl mx-auto">
        {alFatihah.verses.map((verse) => (
          <div key={verse.number} id={`verse-${verse.number}`}>
            <VerseCard
              verseNumber={verse.number}
              arabicText={verse.arabic}
              translation={verse.translation}
              surahNumber={alFatihah.number}
              onPlayAudio={handlePlayAudio}
            />
          </div>
        ))}
      </div>

      <SurahNavigator
        currentVerse={currentVerse}
        totalVerses={alFatihah.versesCount}
        onVerseClick={handleVerseClick}
      />

      <ProgressRing
        progress={progress}
        isPlaying={isPlaying}
        onToggle={handlePlayAudio}
      />
    </div>
  );
};

export default QuranReader;
