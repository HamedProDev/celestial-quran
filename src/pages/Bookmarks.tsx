import { Bookmark, Trash2, Volume2, FolderOpen } from "lucide-react";

// Sample bookmarks
const sampleBookmarks = [
  {
    id: 1,
    surah: 2,
    verse: 255,
    surahName: "Al-Baqarah",
    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ",
    translation: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of [all] existence.",
    addedAt: "2024-01-15",
    category: "Favorites",
  },
  {
    id: 2,
    surah: 1,
    verse: 1,
    surahName: "Al-Fatihah",
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
    addedAt: "2024-01-10",
    category: "Daily Reading",
  },
  {
    id: 3,
    surah: 112,
    verse: 1,
    surahName: "Al-Ikhlas",
    arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ",
    translation: "Say, 'He is Allah, [who is] One.'",
    addedAt: "2024-01-08",
    category: "Favorites",
  },
];

const BookmarksPage = () => {
  return (
    <div className="animate-celestial-fade">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl text-primary font-medium mb-4">
          Sacred Bookmarks
        </h1>
        <p className="text-secondary-foreground text-lg opacity-80">
          Your preserved verses and reflections
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="cosmic-card text-center">
          <Bookmark className="w-8 h-8 text-primary mx-auto mb-2" />
          <p className="text-2xl text-primary font-bold">{sampleBookmarks.length}</p>
          <p className="text-muted-foreground text-sm font-ui">Total Bookmarks</p>
        </div>
        <div className="cosmic-card text-center">
          <FolderOpen className="w-8 h-8 text-primary mx-auto mb-2" />
          <p className="text-2xl text-primary font-bold">2</p>
          <p className="text-muted-foreground text-sm font-ui">Categories</p>
        </div>
      </div>

      {/* Bookmarks List */}
      {sampleBookmarks.length > 0 ? (
        <div className="space-y-6">
          {sampleBookmarks.map((bookmark, index) => (
            <div
              key={bookmark.id}
              className="cosmic-card animate-celestial-fade"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-primary font-ui font-medium">
                    {bookmark.surahName}
                  </span>
                  <span className="text-muted-foreground ml-2 font-ui text-sm">
                    {bookmark.surah}:{bookmark.verse}
                  </span>
                  <span className="ml-4 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-ui">
                    {bookmark.category}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="action-btn w-10 h-10">
                    <Volume2 className="w-4 h-4 text-secondary-foreground" />
                  </button>
                  <button className="action-btn w-10 h-10 hover:bg-destructive/20">
                    <Trash2 className="w-4 h-4 text-secondary-foreground" />
                  </button>
                </div>
              </div>

              {/* Arabic */}
              <p className="font-arabic text-2xl text-foreground text-glow-subtle mb-4">
                {bookmark.arabic}
              </p>

              {/* Translation */}
              <p className="text-secondary-foreground text-lg mb-4">
                {bookmark.translation}
              </p>

              {/* Footer */}
              <p className="text-muted-foreground text-sm font-ui">
                Saved on {new Date(bookmark.addedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Bookmark className="w-16 h-16 text-primary/30 mx-auto mb-4" />
          <p className="text-muted-foreground text-lg">
            No bookmarks yet
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            Start reading and preserve your favorite verses
          </p>
        </div>
      )}
    </div>
  );
};

export default BookmarksPage;
