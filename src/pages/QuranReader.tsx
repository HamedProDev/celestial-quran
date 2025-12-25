import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SurahHeader from "@/components/SurahHeader";
import VerseCard from "@/components/VerseCard";
import SurahNavigator from "@/components/SurahNavigator";
import ProgressRing from "@/components/ProgressRing";
import { fetchSurah, fetchVerseAudio, type Surah, type Verse } from "@/services/quranApi";
import { useAuth } from "@/hooks/useAuth";
import { updateReadingProgress } from "@/services/userService";

const QuranReader = () => {
  const { surahId } = useParams();
  const { user } = useAuth();
  const [currentSurahId, setCurrentSurahId] = useState(parseInt(surahId || "1"));
  const [surah, setSurah] = useState<Surah | null>(null);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [currentVerse, setCurrentVerse] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [playingVerseNum, setPlayingVerseNum] = useState<number | null>(null);

  // Fetch surah data
  useEffect(() => {
    const loadSurah = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchSurah(currentSurahId);
        setSurah(data.surah);
        setVerses(data.verses);
        setCurrentVerse(1);
      } catch (err) {
        console.error("Error loading surah:", err);
        setError("Failed to load surah. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadSurah();
  }, [currentSurahId]);

  // Update surah from URL params
  useEffect(() => {
    if (surahId) {
      const id = parseInt(surahId);
      if (id >= 1 && id <= 114) {
        setCurrentSurahId(id);
      }
    }
  }, [surahId]);

  // Calculate progress based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      const newProgress = Math.min(100, Math.max(0, scrolled));
      setProgress(newProgress);

      // Update reading progress for logged-in users
      if (user && surah) {
        const versesPercentage = (currentVerse / verses.length) * 100;
        updateReadingProgress(surah.id, currentVerse, versesPercentage).catch(console.error);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [user, surah, currentVerse, verses.length]);

  const handleVerseClick = (verse: number) => {
    setCurrentVerse(verse);
    const element = document.getElementById(`verse-${verse}`);
    element?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handlePlayAudio = async (verseNumber?: number) => {
    const verseToPlay = verseNumber || currentVerse;
    
    // Stop current audio if playing
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    if (playingVerseNum === verseToPlay && isPlaying) {
      setIsPlaying(false);
      setPlayingVerseNum(null);
      return;
    }

    try {
      const audioUrl = await fetchVerseAudio(currentSurahId, verseToPlay);
      if (audioUrl) {
        const newAudio = new Audio(audioUrl);
        newAudio.play();
        setAudio(newAudio);
        setIsPlaying(true);
        setPlayingVerseNum(verseToPlay);

        newAudio.onended = () => {
          setIsPlaying(false);
          setPlayingVerseNum(null);
          // Auto-play next verse
          if (verseToPlay < verses.length) {
            handlePlayAudio(verseToPlay + 1);
          }
        };
      }
    } catch (err) {
      console.error("Error playing audio:", err);
    }
  };

  const handleTogglePlay = () => {
    if (isPlaying && audio) {
      audio.pause();
      setIsPlaying(false);
    } else {
      handlePlayAudio(currentVerse);
    }
  };

  if (isLoading) {
    return (
      <div className="animate-celestial-fade flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-gold flex items-center justify-center animate-pulse glow-gold">
            <div className="w-8 h-8 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-secondary-foreground">Loading sacred verses...</p>
        </div>
      </div>
    );
  }

  if (error || !surah) {
    return (
      <div className="animate-celestial-fade flex items-center justify-center min-h-[60vh]">
        <div className="text-center cosmic-card max-w-md">
          <p className="text-destructive mb-4">{error || "Failed to load surah"}</p>
          <button
            onClick={() => setCurrentSurahId(1)}
            className="btn-gold"
          >
            Return to Al-Fatihah
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-celestial-fade">
      <SurahHeader
        arabicName={surah.name_arabic}
        englishName={surah.name_simple}
        englishNameTranslation={surah.translated_name?.name || ""}
        versesCount={surah.verses_count}
        revelationType={surah.revelation_place}
      />

      <div className="space-y-8 max-w-4xl mx-auto">
        {verses.map((verse) => (
          <div key={verse.id} id={`verse-${verse.verse_number}`}>
            <VerseCard
              verseNumber={verse.verse_number}
              arabicText={verse.text_uthmani}
              translation={verse.translations?.[0]?.text?.replace(/<[^>]*>/g, '') || ""}
              surahNumber={surah.id}
              surahName={surah.name_simple}
              onPlayAudio={() => handlePlayAudio(verse.verse_number)}
              isPlaying={playingVerseNum === verse.verse_number && isPlaying}
            />
          </div>
        ))}
      </div>

      <SurahNavigator
        currentVerse={currentVerse}
        totalVerses={surah.verses_count}
        onVerseClick={handleVerseClick}
      />

      <ProgressRing
        progress={progress}
        isPlaying={isPlaying}
        onToggle={handleTogglePlay}
      />
    </div>
  );
};

export default QuranReader;
