import { useState } from "react";
import { Search, Moon, Sun, Volume2, VolumeX, Maximize, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DivineHeaderProps {
  onAudioToggle?: () => void;
  isAudioActive?: boolean;
}

const DivineHeader = ({ onAudioToggle, isAudioActive = false }: DivineHeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const navigate = useNavigate();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <header
      className="lg:ml-[90px] px-4 md:px-8 py-4 border-b border-primary/10"
      style={{
        background: "linear-gradient(180deg, hsla(212, 67%, 11%, 0.9) 0%, transparent 100%)",
        backdropFilter: "blur(5px)",
      }}
    >
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search */}
        <div className="relative flex-1 max-w-2xl w-full">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleSearch}
            placeholder="Search the Divine Words..."
            className="cosmic-search"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 items-center">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="action-btn"
            title="Toggle theme"
          >
            {isDarkMode ? (
              <Moon className="w-5 h-5 text-secondary-foreground" />
            ) : (
              <Sun className="w-5 h-5 text-secondary-foreground" />
            )}
          </button>

          <button
            onClick={onAudioToggle}
            className="action-btn"
            title="Toggle audio"
          >
            {isAudioActive ? (
              <Volume2 className="w-5 h-5 text-secondary-foreground" />
            ) : (
              <VolumeX className="w-5 h-5 text-secondary-foreground" />
            )}
          </button>

          <button
            onClick={toggleFullscreen}
            className="action-btn"
            title="Toggle fullscreen"
          >
            <Maximize className="w-5 h-5 text-secondary-foreground" />
          </button>

          <button
            onClick={() => navigate("/auth")}
            className="action-btn"
            title="Account"
          >
            <User className="w-5 h-5 text-secondary-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default DivineHeader;
