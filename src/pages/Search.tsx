import { useState } from "react";
import { Search as SearchIcon, Filter, BookOpen, Volume2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";

// Sample search results
const sampleResults = [
  {
    surah: 2,
    verse: 255,
    surahName: "Al-Baqarah",
    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ",
    translation: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of [all] existence. Neither drowsiness overtakes Him nor sleep.",
  },
  {
    surah: 112,
    verse: 1,
    surahName: "Al-Ikhlas",
    arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ",
    translation: "Say, 'He is Allah, [who is] One.'",
  },
  {
    surah: 36,
    verse: 58,
    surahName: "Ya-Sin",
    arabic: "سَلَامٌ قَوْلًا مِّن رَّبٍّ رَّحِيمٍ",
    translation: "'Peace,' a word from a Merciful Lord.",
  },
];

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState(initialQuery ? sampleResults : []);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    // Simulate search
    setTimeout(() => {
      setResults(sampleResults);
      setIsSearching(false);
    }, 500);
  };

  return (
    <div className="animate-celestial-fade">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl text-primary font-medium mb-4">
          Divine Search
        </h1>
        <p className="text-secondary-foreground text-lg opacity-80">
          Search through the sacred verses
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-12">
        <div className="relative max-w-3xl">
          <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-primary" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for verses, topics, or Arabic words..."
            className="w-full py-4 pl-14 pr-32 rounded-2xl text-lg bg-card/70 border-2 border-primary/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all duration-300 glow-gold"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 btn-gold px-6 py-2"
          >
            Search
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mt-4">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-primary/20 text-secondary-foreground hover:bg-primary/10 transition-colors font-ui text-sm">
            <Filter className="w-4 h-4" />
            All Results
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-primary/20 text-secondary-foreground hover:bg-primary/10 transition-colors font-ui text-sm">
            <BookOpen className="w-4 h-4" />
            Verses Only
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-primary/20 text-secondary-foreground hover:bg-primary/10 transition-colors font-ui text-sm">
            Arabic Text
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-primary/20 text-secondary-foreground hover:bg-primary/10 transition-colors font-ui text-sm">
            Translation
          </button>
        </div>
      </form>

      {/* Results */}
      {isSearching ? (
        <div className="flex justify-center py-12">
          <div className="flex gap-3">
            <div className="w-4 h-4 rounded-full bg-primary animate-bounce-loading" style={{ animationDelay: "-0.32s" }} />
            <div className="w-4 h-4 rounded-full bg-primary animate-bounce-loading" style={{ animationDelay: "-0.16s" }} />
            <div className="w-4 h-4 rounded-full bg-primary animate-bounce-loading" />
          </div>
        </div>
      ) : results.length > 0 ? (
        <div className="space-y-6">
          <p className="text-muted-foreground font-ui text-sm">
            Found {results.length} results for "{query}"
          </p>
          {results.map((result, index) => (
            <div
              key={`${result.surah}-${result.verse}`}
              className="cosmic-card animate-celestial-fade"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-primary font-ui font-medium">
                    {result.surahName}
                  </span>
                  <span className="text-muted-foreground ml-2 font-ui text-sm">
                    {result.surah}:{result.verse}
                  </span>
                </div>
                <button className="action-btn w-10 h-10">
                  <Volume2 className="w-4 h-4 text-secondary-foreground" />
                </button>
              </div>

              {/* Arabic */}
              <p className="font-arabic text-2xl text-foreground text-glow-subtle mb-4">
                {result.arabic}
              </p>

              {/* Translation */}
              <p className="text-secondary-foreground text-lg">
                {result.translation}
              </p>
            </div>
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-12">
          <SearchIcon className="w-16 h-16 text-primary/30 mx-auto mb-4" />
          <p className="text-muted-foreground text-lg">
            No results found for "{query}"
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            Try different keywords or search in Arabic
          </p>
        </div>
      ) : (
        <div className="text-center py-12">
          <SearchIcon className="w-16 h-16 text-primary/30 mx-auto mb-4" />
          <p className="text-muted-foreground text-lg">
            Enter a search term to find divine verses
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
