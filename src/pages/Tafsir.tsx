import { GraduationCap, BookOpen, ChevronRight } from "lucide-react";

// Sample tafsir data
const tafsirSources = [
  {
    id: "ibn-kathir",
    name: "Tafsir Ibn Kathir",
    author: "Ibn Kathir",
    description: "One of the most respected and authentic Tafsirs, emphasizing Quran explanation through hadith.",
    language: "Arabic/English",
  },
  {
    id: "jalalayn",
    name: "Tafsir Al-Jalalayn",
    author: "Jalaluddin al-Mahalli & Jalaluddin as-Suyuti",
    description: "A concise tafsir that provides brief explanations of each verse.",
    language: "Arabic/English",
  },
  {
    id: "maariful",
    name: "Ma'ariful Quran",
    author: "Mufti Muhammad Shafi",
    description: "A comprehensive Tafsir that combines classical commentary with modern context.",
    language: "Urdu/English",
  },
];

const featuredTafsir = {
  surah: 1,
  verse: 1,
  surahName: "Al-Fatihah",
  arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
  translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
  tafsir: "This verse, known as the Basmala, is the key to the Quran. It teaches us to begin every action in the name of Allah. 'Rahman' signifies mercy that encompasses all creation, while 'Rahim' refers to the special mercy reserved for the believers. Starting with this phrase reminds us of our dependence on Allah and His infinite grace.",
};

const TafsirPage = () => {
  return (
    <div className="animate-celestial-fade">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl text-primary font-medium mb-4">
          Wisdom Tafsir
        </h1>
        <p className="text-secondary-foreground text-lg opacity-80">
          Deep understanding of the divine verses
        </p>
      </div>

      {/* Featured Tafsir */}
      <div className="cosmic-card mb-12">
        <div className="flex items-center gap-3 mb-6">
          <GraduationCap className="w-6 h-6 text-primary" />
          <h2 className="text-xl text-primary font-medium">Featured Explanation</h2>
        </div>

        <div className="mb-6">
          <span className="text-secondary-foreground font-ui">
            {featuredTafsir.surahName} {featuredTafsir.surah}:{featuredTafsir.verse}
          </span>
        </div>

        {/* Arabic */}
        <p className="font-arabic text-3xl text-foreground text-glow-subtle mb-4">
          {featuredTafsir.arabic}
        </p>

        {/* Translation */}
        <p className="text-secondary-foreground text-lg mb-6 italic">
          "{featuredTafsir.translation}"
        </p>

        {/* Tafsir */}
        <div className="border-t border-primary/20 pt-6">
          <h3 className="text-primary font-ui font-medium mb-3">Explanation</h3>
          <p className="text-foreground text-lg leading-relaxed">
            {featuredTafsir.tafsir}
          </p>
        </div>
      </div>

      {/* Tafsir Sources */}
      <div className="mb-8">
        <h2 className="text-2xl text-primary mb-6 font-medium">Tafsir Sources</h2>
        <div className="space-y-4">
          {tafsirSources.map((source, index) => (
            <button
              key={source.id}
              className="w-full cosmic-card text-left hover:border-primary transition-all duration-300 animate-celestial-fade"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full gradient-gold flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg text-foreground font-medium">{source.name}</h3>
                    <p className="text-muted-foreground text-sm font-ui">{source.author}</p>
                    <p className="text-secondary-foreground text-sm mt-1">
                      {source.description}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-primary flex-shrink-0" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="cosmic-card">
        <h2 className="text-xl text-primary mb-4 font-medium">Popular Verse Explanations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50 hover:bg-primary/10 transition-colors text-left">
            <span className="text-primary font-ui font-bold">2:255</span>
            <span className="text-secondary-foreground font-ui">Ayatul Kursi</span>
          </button>
          <button className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50 hover:bg-primary/10 transition-colors text-left">
            <span className="text-primary font-ui font-bold">36:1-12</span>
            <span className="text-secondary-foreground font-ui">Surah Ya-Sin Opening</span>
          </button>
          <button className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50 hover:bg-primary/10 transition-colors text-left">
            <span className="text-primary font-ui font-bold">55:1-13</span>
            <span className="text-secondary-foreground font-ui">Surah Ar-Rahman</span>
          </button>
          <button className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50 hover:bg-primary/10 transition-colors text-left">
            <span className="text-primary font-ui font-bold">112:1-4</span>
            <span className="text-secondary-foreground font-ui">Surah Al-Ikhlas</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TafsirPage;
