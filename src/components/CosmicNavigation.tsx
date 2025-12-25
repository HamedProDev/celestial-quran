import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  BookOpen, 
  Compass, 
  Search, 
  Bookmark, 
  Music, 
  GraduationCap, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Menu,
  BookOpenText
} from "lucide-react";

interface NavItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { id: "reader", icon: <BookOpen className="w-6 h-6" />, label: "Cosmic Reader", path: "/" },
  { id: "explore", icon: <Compass className="w-6 h-6" />, label: "Explore Quran", path: "/explore" },
  { id: "search", icon: <Search className="w-6 h-6" />, label: "Divine Search", path: "/search" },
  { id: "bookmarks", icon: <Bookmark className="w-6 h-6" />, label: "Sacred Bookmarks", path: "/bookmarks" },
  { id: "audio", icon: <Music className="w-6 h-6" />, label: "Celestial Audio", path: "/audio" },
  { id: "tafsir", icon: <GraduationCap className="w-6 h-6" />, label: "Wisdom Tafsir", path: "/tafsir" },
  { id: "settings", icon: <Settings className="w-6 h-6" />, label: "Divine Settings", path: "/settings" },
];

const CosmicNavigation = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={`fixed left-0 top-0 h-screen z-[1000] hidden lg:flex flex-col items-center py-8 transition-transform duration-500 ease-out ${
          collapsed ? "-translate-x-[90px]" : "translate-x-0"
        }`}
        style={{
          width: "90px",
          background: "linear-gradient(135deg, hsla(212, 67%, 11%, 0.95) 0%, hsla(216, 47%, 20%, 0.98) 100%)",
          backdropFilter: "blur(10px)",
          borderRight: "1px solid hsla(43, 76%, 52%, 0.2)",
          boxShadow: "var(--shadow-glow)",
        }}
      >
        {/* Logo */}
        <div className="relative mb-12">
          <div className="w-14 h-14 rounded-full gradient-gold flex items-center justify-center animate-float glow-gold-strong">
            <BookOpenText className="w-7 h-7 text-primary-foreground" />
          </div>
          <div 
            className="absolute inset-[-3px] rounded-full animate-rotate z-[-1]"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary)), transparent, hsl(var(--accent)))",
            }}
          />
        </div>

        {/* Nav Items */}
        <div className="flex flex-col gap-4 flex-1">
          {navItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleNavClick(item.path)}
              className={`nav-cosmic group ${isActive(item.path) ? "active" : ""}`}
            >
              <span className={isActive(item.path) ? "text-primary-foreground" : "text-secondary-foreground"}>
                {item.icon}
              </span>
              <div className="absolute left-[70px] bg-card/95 px-4 py-2 rounded-xl whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none border border-primary/20 glow-gold text-secondary-foreground font-ui text-sm">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute right-[-20px] top-8 w-10 h-10 rounded-full gradient-gold flex items-center justify-center cursor-pointer glow-gold transition-transform duration-300 hover:scale-110 hover:rotate-180"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 text-primary-foreground" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-primary-foreground" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed bottom-8 right-8 z-[1001] lg:hidden w-14 h-14 rounded-full gradient-gold flex items-center justify-center glow-gold-strong transition-transform duration-300 hover:scale-110"
      >
        <Menu className="w-6 h-6 text-primary-foreground" />
      </button>

      {/* Mobile Navigation Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[999] lg:hidden"
          onClick={() => setMobileOpen(false)}
          style={{ background: "hsla(212, 67%, 11%, 0.9)" }}
        />
      )}

      {/* Mobile Navigation Panel */}
      <nav
        className={`fixed left-0 top-0 h-screen z-[1000] lg:hidden flex flex-col items-center py-8 transition-transform duration-500 ease-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          width: "90px",
          background: "linear-gradient(135deg, hsla(212, 67%, 11%, 0.98) 0%, hsla(216, 47%, 20%, 0.98) 100%)",
          backdropFilter: "blur(10px)",
          borderRight: "1px solid hsla(43, 76%, 52%, 0.2)",
          boxShadow: "var(--shadow-glow)",
        }}
      >
        {/* Logo */}
        <div className="relative mb-12">
          <div className="w-14 h-14 rounded-full gradient-gold flex items-center justify-center animate-float glow-gold-strong">
            <BookOpenText className="w-7 h-7 text-primary-foreground" />
          </div>
        </div>

        {/* Nav Items */}
        <div className="flex flex-col gap-4">
          {navItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleNavClick(item.path)}
              className={`nav-cosmic ${isActive(item.path) ? "active" : ""}`}
            >
              <span className={isActive(item.path) ? "text-primary-foreground" : "text-secondary-foreground"}>
                {item.icon}
              </span>
            </div>
          ))}
        </div>
      </nav>
    </>
  );
};

export default CosmicNavigation;
