interface SurahNavigatorProps {
  currentVerse: number;
  totalVerses: number;
  onVerseClick: (verse: number) => void;
}

const SurahNavigator = ({ currentVerse, totalVerses, onVerseClick }: SurahNavigatorProps) => {
  const visibleVerses = Math.min(7, totalVerses);
  const versesToShow = [];
  
  // Calculate which verses to show
  if (totalVerses <= 7) {
    for (let i = 1; i <= totalVerses; i++) {
      versesToShow.push(i);
    }
  } else {
    // Show first few, ellipsis, and last
    for (let i = 1; i <= 5; i++) {
      versesToShow.push(i);
    }
    versesToShow.push(-1); // Represents ellipsis
    versesToShow.push(totalVerses);
  }

  return (
    <div
      className="fixed right-6 top-1/2 -translate-y-1/2 z-[800] hidden xl:block rounded-2xl p-3 border border-primary/20 glow-gold"
      style={{
        background: "hsla(212, 67%, 11%, 0.95)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="flex flex-col gap-2">
        {versesToShow.map((verse, index) => (
          <button
            key={index}
            onClick={() => verse > 0 && onVerseClick(verse)}
            className={`navigator-item ${currentVerse === verse ? "active" : ""} ${
              verse === -1 ? "cursor-default hover:bg-secondary/50 hover:scale-100" : ""
            }`}
            disabled={verse === -1}
          >
            {verse === -1 ? "..." : verse}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SurahNavigator;
