import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Shuffle, Download } from "lucide-react";

const reciters = [
  { id: "mishary", name: "Mishary Rashid Alafasy", style: "Melodic" },
  { id: "abdul-basit", name: "Abdul Basit Abdul Samad", style: "Classical" },
  { id: "saad", name: "Saad Al-Ghamdi", style: "Emotional" },
  { id: "husary", name: "Mahmoud Khalil Al-Husary", style: "Tajweed" },
  { id: "sudais", name: "Abdur Rahman As-Sudais", style: "Meditative" },
  { id: "shuraim", name: "Saud Ash-Shuraim", style: "Powerful" },
];

const AudioPage = () => {
  const [selectedReciter, setSelectedReciter] = useState(reciters[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSurah, setCurrentSurah] = useState({ number: 1, name: "Al-Fatihah" });
  const [progress, setProgress] = useState(35);

  return (
    <div className="animate-celestial-fade">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl text-primary font-medium mb-4">
          Celestial Audio
        </h1>
        <p className="text-secondary-foreground text-lg opacity-80">
          Listen to the divine recitation
        </p>
      </div>

      {/* Now Playing Card */}
      <div className="cosmic-card mb-12 max-w-3xl mx-auto">
        <div className="text-center mb-8">
          {/* Reciter Avatar */}
          <div className="w-32 h-32 mx-auto mb-6 rounded-full gradient-gold flex items-center justify-center animate-float glow-gold-strong">
            <Volume2 className="w-16 h-16 text-primary-foreground" />
          </div>

          {/* Currently Playing */}
          <h2 className="font-arabic text-3xl text-primary text-glow mb-2">
            {currentSurah.name}
          </h2>
          <p className="text-secondary-foreground font-ui">
            {selectedReciter.name}
          </p>
          <p className="text-muted-foreground text-sm font-ui">
            {selectedReciter.style} Recitation
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="relative h-2 bg-secondary/50 rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full gradient-gold rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-muted-foreground text-sm font-ui">
            <span>1:45</span>
            <span>5:00</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button className="action-btn w-12 h-12">
            <Shuffle className="w-5 h-5 text-secondary-foreground" />
          </button>
          <button className="action-btn w-12 h-12">
            <SkipBack className="w-5 h-5 text-secondary-foreground" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 rounded-full gradient-gold flex items-center justify-center glow-gold-strong transition-transform duration-300 hover:scale-110"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-primary-foreground" />
            ) : (
              <Play className="w-8 h-8 text-primary-foreground ml-1" />
            )}
          </button>
          <button className="action-btn w-12 h-12">
            <SkipForward className="w-5 h-5 text-secondary-foreground" />
          </button>
          <button className="action-btn w-12 h-12">
            <Repeat className="w-5 h-5 text-secondary-foreground" />
          </button>
        </div>
      </div>

      {/* Reciters Grid */}
      <div className="mb-8">
        <h2 className="text-2xl text-primary mb-6 font-medium">Available Reciters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reciters.map((reciter) => (
            <button
              key={reciter.id}
              onClick={() => setSelectedReciter(reciter)}
              className={`cosmic-card text-left transition-all duration-300 ${
                selectedReciter.id === reciter.id
                  ? "border-primary bg-primary/10"
                  : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full gradient-gold flex items-center justify-center flex-shrink-0">
                  <Volume2 className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg text-foreground font-medium">{reciter.name}</h3>
                  <p className="text-muted-foreground text-sm font-ui">{reciter.style}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Download Section */}
      <div className="cosmic-card">
        <h2 className="text-xl text-primary mb-4 font-medium flex items-center gap-3">
          <Download className="w-6 h-6" />
          Download for Offline
        </h2>
        <p className="text-secondary-foreground mb-4">
          Download complete Surahs to listen offline during your spiritual journey.
        </p>
        <button className="btn-gold">
          Download Surah
        </button>
      </div>
    </div>
  );
};

export default AudioPage;
