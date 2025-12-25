import { useState } from "react";
import { Palette, Volume2, Type, Globe, Bell, Shield } from "lucide-react";

const SettingsPage = () => {
  const [arabicFontSize, setArabicFontSize] = useState(22);
  const [translationFontSize, setTranslationFontSize] = useState(13);
  const [activeTheme, setActiveTheme] = useState("gold");
  const [autoPlay, setAutoPlay] = useState(true);
  const [reciter, setReciter] = useState("mishary");

  const themes = [
    { id: "gold", name: "Divine Gold", gradient: "from-divine-deep-blue to-divine-navy" },
    { id: "dark", name: "Cosmic Night", gradient: "from-black to-neutral-900" },
    { id: "sepia", name: "Ancient Scroll", gradient: "from-amber-950 to-amber-900" },
  ];

  const reciters = [
    { id: "mishary", name: "Mishary Rashid (Melodic)" },
    { id: "abdul-basit", name: "Abdul Basit (Classical)" },
    { id: "saad", name: "Saad al-Ghamdi (Emotional)" },
    { id: "husary", name: "Husary (Tajweed)" },
  ];

  return (
    <div className="animate-celestial-fade">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl text-primary font-medium mb-4">
          Divine Settings
        </h1>
        <p className="text-secondary-foreground text-lg opacity-80">
          Customize your spiritual journey
        </p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Appearance */}
        <div className="setting-card">
          <h2 className="flex items-center gap-3 text-xl text-primary mb-6 font-medium">
            <Palette className="w-6 h-6" />
            Appearance
          </h2>

          {/* Theme Selection */}
          <div className="mb-8">
            <label className="block text-secondary-foreground mb-4 font-ui">Theme</label>
            <div className="flex gap-4">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setActiveTheme(theme.id)}
                  className={`flex-1 p-4 rounded-xl text-center transition-all duration-300 border ${
                    activeTheme === theme.id
                      ? "border-primary bg-primary/20"
                      : "border-primary/20 bg-secondary/50 hover:bg-primary/10"
                  }`}
                >
                  <div className={`w-full h-14 rounded-lg mb-2 bg-gradient-to-br ${theme.gradient}`} />
                  <span className="text-secondary-foreground text-sm font-ui">{theme.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Arabic Font Size */}
          <div className="mb-8">
            <div className="flex justify-between mb-4">
              <label className="text-secondary-foreground font-ui">Arabic Font Size</label>
              <span className="text-primary font-ui">{(arabicFontSize / 10).toFixed(1)}rem</span>
            </div>
            <input
              type="range"
              min="16"
              max="32"
              value={arabicFontSize}
              onChange={(e) => setArabicFontSize(Number(e.target.value))}
              className="cosmic-slider"
            />
          </div>

          {/* Translation Font Size */}
          <div className="mb-8">
            <div className="flex justify-between mb-4">
              <label className="text-secondary-foreground font-ui">Translation Font Size</label>
              <span className="text-primary font-ui">{(translationFontSize / 10).toFixed(1)}rem</span>
            </div>
            <input
              type="range"
              min="10"
              max="24"
              value={translationFontSize}
              onChange={(e) => setTranslationFontSize(Number(e.target.value))}
              className="cosmic-slider"
            />
          </div>
        </div>

        {/* Audio */}
        <div className="setting-card">
          <h2 className="flex items-center gap-3 text-xl text-primary mb-6 font-medium">
            <Volume2 className="w-6 h-6" />
            Audio
          </h2>

          {/* Reciter Selection */}
          <div className="mb-8">
            <label className="block text-secondary-foreground mb-4 font-ui">Recitation Style</label>
            <select
              value={reciter}
              onChange={(e) => setReciter(e.target.value)}
              className="w-full py-3 px-4 rounded-xl bg-secondary/50 border border-primary/30 text-secondary-foreground font-ui focus:outline-none focus:border-primary transition-colors"
            >
              {reciters.map((r) => (
                <option key={r.id} value={r.id} className="bg-card">
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          {/* Auto-play Toggle */}
          <div className="flex justify-between items-center mb-8 pb-8 border-b border-primary/10">
            <label className="text-secondary-foreground font-ui">Auto-play Next Verse</label>
            <label className="cosmic-switch">
              <input
                type="checkbox"
                checked={autoPlay}
                onChange={(e) => setAutoPlay(e.target.checked)}
              />
              <span className="slider" />
            </label>
          </div>

          {/* Volume Control */}
          <div>
            <div className="flex justify-between mb-4">
              <label className="text-secondary-foreground font-ui">Volume</label>
              <span className="text-primary font-ui">80%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              defaultValue={80}
              className="cosmic-slider"
            />
          </div>
        </div>

        {/* Translation */}
        <div className="setting-card">
          <h2 className="flex items-center gap-3 text-xl text-primary mb-6 font-medium">
            <Globe className="w-6 h-6" />
            Translation
          </h2>

          <div className="mb-8">
            <label className="block text-secondary-foreground mb-4 font-ui">Primary Translation</label>
            <select
              className="w-full py-3 px-4 rounded-xl bg-secondary/50 border border-primary/30 text-secondary-foreground font-ui focus:outline-none focus:border-primary transition-colors"
            >
              <option className="bg-card">Sahih International (English)</option>
              <option className="bg-card">Pickthall (English)</option>
              <option className="bg-card">Yusuf Ali (English)</option>
              <option className="bg-card">Muhammad Asad (English)</option>
            </select>
          </div>

          <div className="flex justify-between items-center">
            <label className="text-secondary-foreground font-ui">Show Transliteration</label>
            <label className="cosmic-switch">
              <input type="checkbox" />
              <span className="slider" />
            </label>
          </div>
        </div>

        {/* Notifications */}
        <div className="setting-card">
          <h2 className="flex items-center gap-3 text-xl text-primary mb-6 font-medium">
            <Bell className="w-6 h-6" />
            Notifications
          </h2>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <label className="text-secondary-foreground font-ui">Daily Verse Reminder</label>
              <label className="cosmic-switch">
                <input type="checkbox" defaultChecked />
                <span className="slider" />
              </label>
            </div>

            <div className="flex justify-between items-center">
              <label className="text-secondary-foreground font-ui">Prayer Time Alerts</label>
              <label className="cosmic-switch">
                <input type="checkbox" defaultChecked />
                <span className="slider" />
              </label>
            </div>

            <div className="flex justify-between items-center">
              <label className="text-secondary-foreground font-ui">Reading Goals</label>
              <label className="cosmic-switch">
                <input type="checkbox" />
                <span className="slider" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
