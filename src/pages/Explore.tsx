import { useNavigate } from "react-router-dom";
import { Moon, Book, History, Heart, Star, Bookmark, Layers, Crown } from "lucide-react";
import GridCard from "@/components/GridCard";

const categories = [
  {
    icon: <Moon className="w-10 h-10" />,
    title: "Short Surahs",
    description: "Begin your journey with powerful, shorter chapters filled with profound meaning.",
    path: "/reader/112",
  },
  {
    icon: <Book className="w-10 h-10" />,
    title: "Thematic Study",
    description: "Explore verses by theme: Mercy, Patience, Faith, and Divine Wisdom.",
    path: "/search?theme=mercy",
  },
  {
    icon: <History className="w-10 h-10" />,
    title: "Revelation Order",
    description: "Experience the Quran as it was revealed chronologically to the Prophet (PBUH).",
    path: "/search?order=chronological",
  },
  {
    icon: <Heart className="w-10 h-10" />,
    title: "Healing Verses",
    description: "Find solace in verses of healing, comfort, and spiritual remedy.",
    path: "/search?theme=healing",
  },
  {
    icon: <Star className="w-10 h-10" />,
    title: "Favorites",
    description: "Access your most cherished verses saved for daily reflection.",
    path: "/bookmarks",
  },
  {
    icon: <Layers className="w-10 h-10" />,
    title: "Juz' Index",
    description: "Navigate through the 30 parts of the Holy Quran with ease.",
    path: "/juz",
  },
  {
    icon: <Bookmark className="w-10 h-10" />,
    title: "Reading Plan",
    description: "Follow a guided reading plan to complete the Quran in your timeline.",
    path: "/reading-plan",
  },
  {
    icon: <Crown className="w-10 h-10" />,
    title: "Noble Stories",
    description: "Discover the inspiring stories of the Prophets and noble companions.",
    path: "/search?theme=stories",
  },
];

const Explore = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-celestial-fade">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl text-primary font-medium mb-4">
          Explore the Divine
        </h1>
        <p className="text-secondary-foreground text-lg opacity-80">
          Journey through the chapters of wisdom
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div
            key={category.title}
            style={{ animationDelay: `${index * 0.1}s` }}
            className="animate-celestial-fade"
          >
            <GridCard
              icon={category.icon}
              title={category.title}
              description={category.description}
              onClick={() => navigate(category.path)}
            />
          </div>
        ))}
      </div>

      {/* All Surahs Section */}
      <div className="mt-16">
        <h2 className="text-2xl text-primary mb-6 font-medium">All 114 Surahs</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 114 }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => navigate(`/reader/${num}`)}
              className="cosmic-card py-4 px-3 text-center hover:scale-105 transition-transform duration-300"
            >
              <div className="w-10 h-10 mx-auto mb-2 rounded-full gradient-gold flex items-center justify-center text-primary-foreground font-bold text-sm">
                {num}
              </div>
              <p className="text-secondary-foreground text-sm font-ui">
                Surah {num}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
